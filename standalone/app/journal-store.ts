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
  kind: "dialed" | "adjust" | "beans";
  text: string;
}

const BITTER_WORDS = /bitter|harsh|astringen|burnt|ashy|over.?extract/i;
const SOUR_WORDS = /sour|weak|thin|watery|hollow|under.?extract|grassy/i;

export function analyzeJournal(entries: JournalEntry[]): TasteInsight[] {
  const insights: TasteInsight[] = [];
  if (entries.length < 2) return insights;

  const byMethod = new Map<string, JournalEntry[]>();
  for (const e of entries) {
    byMethod.set(e.method, [...(byMethod.get(e.method) ?? []), e]);
  }

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

/** The single most relevant nudge for the calculator, for a given method. */
export function nudgeFor(methodShortName: string): string | null {
  const insights = analyzeJournal(loadJournal());
  const hit =
    insights.find((i) => i.kind === "adjust" && i.text.startsWith(methodShortName)) ??
    insights.find((i) => i.kind === "dialed" && i.text.startsWith(methodShortName));
  return hit ? hit.text : null;
}
