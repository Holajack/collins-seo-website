// Brew journal, kept entirely on this device (localStorage). No accounts.

export interface JournalEntry {
  id: string;
  ts: number; // epoch ms
  method: string; // display name, e.g. "V60 Pour Over"
  brewer?: string; // e.g. "AeroPress Go"
  ratio: number;
  oz: number;
  beans?: string;
  roaster?: string;
  rating?: number; // 1–5
  notes?: string;
  /** What went differently from the recipe this time — an accident ("added
   *  20 g extra water") or an experiment ("used more beans on purpose").
   *  Rated deviations teach the next brew: keep the change, or follow the
   *  recipe exactly. */
  deviation?: string;
}

const KEY = "pb:journal";

export function loadJournal(): JournalEntry[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (e): e is JournalEntry =>
        e && typeof e === "object" && typeof e.id === "string" && typeof e.ts === "number"
    );
  } catch {
    return [];
  }
}

export function saveEntry(entry: JournalEntry): JournalEntry[] {
  const all = [entry, ...loadJournal()].slice(0, 500);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {}
  return all;
}

export function deleteEntry(id: string): JournalEntry[] {
  const all = loadJournal().filter((e) => e.id !== id);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {}
  return all;
}

export function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  }
}

// ─── Taste learning ─────────────────────────────────────────────────────────
// Pure heuristics over the on-device journal: find what the ratings and note
// language say, and turn it into concrete next-brew adjustments.

export interface TasteInsight {
  kind: "dialed" | "adjust" | "beans" | "deviation";
  text: string;
}

// ─── Bean tracking ──────────────────────────────────────────────────────────
// Group the journal by bean (+ roaster when present) so every bag you've
// bought shows all the ways you've made it, ranked by how it tasted.

export interface BeanWay {
  label: string; // e.g. "V60 Pour Over · 1:16 · AeroPress Go"
  count: number;
  avgRating: number | null;
  lastTs: number;
}

export interface BeanProfile {
  key: string;
  beans: string;
  roaster?: string;
  count: number;
  avgRating: number | null;
  best?: JournalEntry; // highest-rated brew of this bean
  ways: BeanWay[]; // distinct method/ratio/brewer combos, best first
  deviations: JournalEntry[]; // rated experiments/accidents, newest first
}

function beanKey(e: JournalEntry): string | null {
  if (!e.beans?.trim()) return null;
  return `${e.beans.trim().toLowerCase()}|${(e.roaster ?? "").trim().toLowerCase()}`;
}

function avg(list: JournalEntry[]): number | null {
  const rated = list.filter((e) => (e.rating ?? 0) > 0);
  if (rated.length === 0) return null;
  return rated.reduce((s, e) => s + (e.rating ?? 0), 0) / rated.length;
}

export function aggregateBeans(entries: JournalEntry[]): BeanProfile[] {
  const groups = new Map<string, JournalEntry[]>();
  for (const e of entries) {
    const k = beanKey(e);
    if (!k) continue;
    groups.set(k, [...(groups.get(k) ?? []), e]);
  }

  const profiles: BeanProfile[] = [];
  for (const [key, list] of groups) {
    const ways = new Map<string, JournalEntry[]>();
    for (const e of list) {
      const w = `${e.method} · 1:${e.ratio}${e.brewer ? ` · ${e.brewer}` : ""}`;
      ways.set(w, [...(ways.get(w) ?? []), e]);
    }
    const wayList: BeanWay[] = [...ways.entries()]
      .map(([label, es]) => ({
        label,
        count: es.length,
        avgRating: avg(es),
        lastTs: Math.max(...es.map((e) => e.ts)),
      }))
      .sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0) || b.lastTs - a.lastTs);

    const rated = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    profiles.push({
      key,
      beans: list[0].beans!.trim(),
      roaster: list.find((e) => e.roaster?.trim())?.roaster?.trim(),
      count: list.length,
      avgRating: avg(list),
      // Only a genuinely good cup earns a "make it this way" — a 2/5 best
      // is a bean still being figured out, not a recommendation.
      best: (rated[0]?.rating ?? 0) >= 4 ? rated[0] : undefined,
      ways: wayList,
      deviations: list
        .filter((e) => e.deviation?.trim())
        .sort((a, b) => b.ts - a.ts),
    });
  }

  // Preference ranking: the beans you rate highest first, ties to the most
  // recently brewed.
  return profiles.sort(
    (a, b) =>
      (b.avgRating ?? 0) - (a.avgRating ?? 0) ||
      Math.max(...b.ways.map((w) => w.lastTs)) -
        Math.max(...a.ways.map((w) => w.lastTs))
  );
}

const BITTER_WORDS = /bitter|harsh|astringen|burnt|ashy|over.?extract/i;
const SOUR_WORDS = /sour|weak|thin|watery|hollow|under.?extract|grassy/i;

export function analyzeJournal(entries: JournalEntry[]): TasteInsight[] {
  const insights: TasteInsight[] = [];

  const byMethod = new Map<string, JournalEntry[]>();
  for (const e of entries) {
    byMethod.set(e.method, [...(byMethod.get(e.method) ?? []), e]);
  }

  // Deviations teach the very next brew, so they surface even from a single
  // entry: a badly-rated change means "follow the recipe exactly"; a
  // well-rated one is worth keeping on purpose.
  for (const [method, list] of byMethod) {
    const dev = list.find((e) => e.deviation?.trim() && (e.rating ?? 0) > 0);
    if (!dev) continue;
    const what = dev.deviation!.trim();
    if ((dev.rating ?? 0) <= 3) {
      insights.push({
        kind: "deviation",
        text: `${method}: last time "${what}" and it rated ${dev.rating}/5 — next brew, do exactly what the recipe says and rate it again.`,
      });
    } else {
      insights.push({
        kind: "deviation",
        text: `${method}: "${what}" rated ${dev.rating}/5 — that change worked. Try it on purpose next time.`,
      });
    }
  }

  if (entries.length < 2) return insights.slice(0, 6);

  for (const [method, list] of byMethod) {
    const rated = list.filter((e) => typeof e.rating === "number" && e.rating! > 0);
    if (rated.length >= 2) {
      const avg = rated.reduce((s, e) => s + (e.rating ?? 0), 0) / rated.length;
      const good = rated.filter((e) => (e.rating ?? 0) >= 4);
      if (avg >= 4 && good.length >= 2) {
        const ratios = good.map((e) => e.ratio);
        const fav = ratios.sort(
          (a, b) =>
            ratios.filter((r) => r === b).length -
            ratios.filter((r) => r === a).length
        )[0];
        insights.push({
          kind: "dialed",
          text: `${method}: dialed in — your ${good.length} best-rated brews cluster at 1:${fav}. That's your house recipe.`,
        });
      }
    }

    // Recent misses with taste language → a concrete adjustment.
    const recent = list.slice(0, 3);
    const miss = recent.find(
      (e) => (e.rating ?? 5) <= 3 && e.notes && (BITTER_WORDS.test(e.notes) || SOUR_WORDS.test(e.notes))
    );
    if (miss?.notes) {
      if (BITTER_WORDS.test(miss.notes)) {
        insights.push({
          kind: "adjust",
          text: `${method}: "${miss.beans ?? "your last brew"}" read bitter — next time grind a step coarser or move from 1:${miss.ratio} toward 1:${Math.min(miss.ratio + 1, 20)}. Temperature down 5°F also helps dark roasts.`,
        });
      } else if (SOUR_WORDS.test(miss.notes)) {
        insights.push({
          kind: "adjust",
          text: `${method}: "${miss.beans ?? "your last brew"}" read sour/thin — grind a step finer or move from 1:${miss.ratio} toward 1:${Math.max(miss.ratio - 1, 6)}. Hotter water lifts light roasts.`,
        });
      }
    }
  }

  // Repeat beans: surface the best-rated setup for beans you keep buying.
  const byBeans = new Map<string, JournalEntry[]>();
  for (const e of entries) {
    if (!e.beans) continue;
    const k = e.beans.trim().toLowerCase();
    byBeans.set(k, [...(byBeans.get(k) ?? []), e]);
  }
  for (const [, list] of byBeans) {
    if (list.length < 2) continue;
    const best = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];
    if ((best.rating ?? 0) >= 4) {
      insights.push({
        kind: "beans",
        text: `${best.beans}: your best cup was ${best.method} at 1:${best.ratio} (${best.rating}/5)${best.brewer ? ` on the ${best.brewer}` : ""}. Start there next bag.`,
      });
    }
  }

  return insights.slice(0, 6);
}

/** The single most relevant nudge for the calculator, for a given method.
 *  A rated deviation wins — it's direct advice about the very next brew —
 *  then taste adjustments, then the dialed-in confirmation. */
export function nudgeFor(methodShortName: string): string | null {
  const insights = analyzeJournal(loadJournal());
  const hit =
    insights.find((i) => i.kind === "deviation" && i.text.startsWith(methodShortName)) ??
    insights.find((i) => i.kind === "adjust" && i.text.startsWith(methodShortName)) ??
    insights.find((i) => i.kind === "dialed" && i.text.startsWith(methodShortName));
  return hit ? hit.text : null;
}
