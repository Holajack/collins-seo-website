"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RatingStars from "../RatingStars";
import {
  aggregateBeans,
  analyzeJournal,
  backupNudge,
  buildBackup,
  deleteEntry,
  importBackup,
  loadJournal,
  markBackedUp,
  updateEntry,
  type BeanProfile,
  type JournalEntry,
} from "../journal-store";

function RatingDots({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span
      aria-label={`${value.toFixed(1)} out of 5`}
      className="text-[var(--c-accent-ink)]"
    >
      {"●".repeat(Math.min(5, full))}
      <span className="opacity-30">{"●".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
}

function backupFileName(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `perfect-brew-journal-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}.json`;
}

export default function JournalClient() {
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);
  const [view, setView] = useState<"beans" | "brews" | null>(null);
  const [nudge, setNudge] = useState<string | null>(null);
  const [canShareFile, setCanShareFile] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // localStorage exists only client-side; SSR renders the loading state.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const loaded = loadJournal();
    setEntries(loaded);
    // Land on the bean view when there are beans to show — that's the point
    // of the journal — otherwise the plain brew log.
    setView(aggregateBeans(loaded).length > 0 ? "beans" : "brews");
    setNudge(backupNudge(loaded));
    try {
      const probe = new File(["x"], "probe.json", { type: "application/json" });
      setCanShareFile(!!navigator.canShare?.({ files: [probe] }));
    } catch {}
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const downloadBackup = () => {
    try {
      const blob = new Blob([JSON.stringify(buildBackup(), null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = backupFileName();
      a.click();
      URL.revokeObjectURL(url);
      markBackedUp();
      setNudge(null);
      setRestoreMsg("Backup saved — keep the file somewhere safe (Drive, email, anywhere).");
    } catch {}
  };

  const shareBackup = async () => {
    try {
      const file = new File([JSON.stringify(buildBackup(), null, 2)], backupFileName(), {
        type: "application/json",
      });
      await navigator.share({ files: [file], title: "Perfect Brew journal backup" });
      markBackedUp();
      setNudge(null);
    } catch {
      // user cancelled the share sheet — nothing to do
    }
  };

  const restoreFromFile = async (file: File) => {
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const res = importBackup(parsed);
      if (!res) {
        setRestoreMsg("That file doesn't look like a Perfect Brew journal backup.");
        return;
      }
      const reloaded = loadJournal();
      setEntries(reloaded);
      setView(aggregateBeans(reloaded).length > 0 ? "beans" : "brews");
      setNudge(backupNudge(reloaded));
      setRestoreMsg(
        res.added > 0
          ? `Restored — ${res.added} brew${res.added === 1 ? "" : "s"} added (${res.total} total).`
          : "Nothing new in that backup — every brew in it is already here."
      );
    } catch {
      setRestoreMsg("Couldn't read that file — it isn't valid backup JSON.");
    }
  };

  if (entries === null || view === null) {
    return (
      <p className="mt-8 text-[14px] text-[var(--c-muted)]">Loading your journal…</p>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-[var(--c-border)] p-8 text-center">
        <p className="text-[15px] font-semibold text-[var(--c-ink)]">
          No brews logged yet
        </p>
        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-[var(--c-muted)]">
          Dial in a recipe, brew it, then hit “Log this brew” on the recipe
          card — your beans, rating, and notes will show up here.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/"
            className="inline-flex min-h-[40px] items-center rounded-full bg-[var(--c-accent)] px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Brew something
          </Link>
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-border)] px-5 text-[13px] font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50"
          >
            New phone? Restore a backup
          </button>
        </div>
        {restoreMsg && (
          <p className="mt-3 text-[12px] text-[var(--c-muted)]">{restoreMsg}</p>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) restoreFromFile(f);
            e.target.value = "";
          }}
        />
      </div>
    );
  }

  const insights = analyzeJournal(entries);
  const beans = aggregateBeans(entries);

  return (
    <>
      {/* Durability toolbar — the journal is a file you own */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={downloadBackup}
          className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-accent)]/40 px-4 text-[12px] font-semibold text-[var(--c-accent-ink)] transition hover:bg-[var(--c-accent)]/10"
        >
          Back up journal
        </button>
        {canShareFile && (
          <button
            onClick={shareBackup}
            className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-accent)]/40 px-4 text-[12px] font-semibold text-[var(--c-accent-ink)] transition hover:bg-[var(--c-accent)]/10"
          >
            Share backup
          </button>
        )}
        <button
          onClick={() => fileRef.current?.click()}
          className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-border)] px-4 text-[12px] font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50"
        >
          Restore
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) restoreFromFile(f);
            e.target.value = "";
          }}
        />
      </div>
      {restoreMsg && (
        <p className="mt-2 text-[12px] text-[var(--c-muted)]">{restoreMsg}</p>
      )}
      {nudge && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-[var(--c-accent)]/25 bg-[var(--c-accent)]/[0.05] px-4 py-3">
          <span aria-hidden className="mt-0.5 text-[var(--c-accent-ink)]">↓</span>
          <p className="text-[12px] leading-relaxed text-[var(--c-muted)]">{nudge}</p>
        </div>
      )}

      {insights.length > 0 && (
        <section className="mt-8 rounded-2xl border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/[0.06] p-5">
          <h2 className="c-display text-lg font-bold text-[var(--c-ink)]">
            What your cups are telling you
          </h2>
          <ul className="mt-3 space-y-2">
            {insights.map((i, idx) => (
              <li
                key={idx}
                className="flex gap-2 text-[13px] leading-relaxed text-[var(--c-muted)]"
              >
                <span aria-hidden className="mt-0.5 shrink-0 text-[var(--c-accent-ink)]">
                  {i.kind === "dialed"
                    ? "◎"
                    : i.kind === "beans"
                    ? "❖"
                    : i.kind === "deviation"
                    ? "↺"
                    : "→"}
                </span>
                {i.text}
              </li>
            ))}
          </ul>
        </section>
      )}

      {beans.length > 0 && (
        <div className="mt-6 flex gap-2">
          <ViewChip
            active={view === "beans"}
            onClick={() => setView("beans")}
            label={`Your beans (${beans.length})`}
          />
          <ViewChip
            active={view === "brews"}
            onClick={() => setView("brews")}
            label={`Every brew (${entries.length})`}
          />
        </div>
      )}

      {view === "beans" && beans.length > 0 ? (
        <section aria-label="Your beans, ranked by taste" className="mt-4 space-y-3">
          <p className="text-[12px] uppercase tracking-wide text-[var(--c-muted)]">
            Ranked by how they taste to you
          </p>
          {beans.map((b, i) => (
            <BeanCard key={b.key} profile={b} rank={i + 1} />
          ))}
        </section>
      ) : (
        <ul className="mt-4 space-y-3">
          {entries.map((e) => (
            <BrewRow key={e.id} entry={e} onChange={setEntries} />
          ))}
        </ul>
      )}
    </>
  );
}

// A logged brew: reads as a summary, flips to an inline editor so you can fix
// the rating (half-steps), notes, deviation, or beans without re-brewing. The
// taste-learning insights recompute from the edited data on save.
function BrewRow({
  entry: e,
  onChange,
}: {
  entry: JournalEntry;
  onChange: (all: JournalEntry[]) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(e.rating ?? 0);
  const [notes, setNotes] = useState(e.notes ?? "");
  const [deviation, setDeviation] = useState(e.deviation ?? "");
  const [beans, setBeans] = useState(e.beans ?? "");
  const [roaster, setRoaster] = useState(e.roaster ?? "");

  const startEdit = () => {
    setRating(e.rating ?? 0);
    setNotes(e.notes ?? "");
    setDeviation(e.deviation ?? "");
    setBeans(e.beans ?? "");
    setRoaster(e.roaster ?? "");
    setEditing(true);
  };

  const save = () => {
    onChange(
      updateEntry(e.id, { rating: rating || undefined, notes, deviation, beans, roaster })
    );
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="rounded-2xl border border-[var(--c-accent)]/40 bg-[var(--c-card)] p-5">
        <div className="text-[12px] uppercase tracking-wide text-[var(--c-muted)]">
          Editing · {e.method} · 1:{e.ratio} · {e.oz} oz
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="c-label">Beans</span>
            <input
              value={beans}
              onChange={(ev) => setBeans(ev.target.value)}
              placeholder="e.g. Methodical Blue Boy"
              className="mt-1 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5 text-[14px] text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
            />
          </label>
          <label className="block">
            <span className="c-label">Roaster / shop</span>
            <input
              value={roaster}
              onChange={(ev) => setRoaster(ev.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5 text-[14px] text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
            />
          </label>
        </div>
        <div className="mt-3">
          <span className="c-label">Rating</span>
          <RatingStars value={rating} onChange={setRating} />
        </div>
        <label className="mt-3 block">
          <span className="c-label">Notes</span>
          <textarea
            value={notes}
            onChange={(ev) => setNotes(ev.target.value)}
            rows={2}
            placeholder="How did it taste?"
            className="mt-1 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5 text-[14px] text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
          />
        </label>
        <label className="mt-3 block">
          <span className="c-label">Went differently (optional)</span>
          <input
            value={deviation}
            onChange={(ev) => setDeviation(ev.target.value)}
            placeholder="e.g. added 20 g extra water"
            className="mt-1 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5 text-[14px] text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
          />
        </label>
        <div className="mt-4 flex gap-2">
          <button
            onClick={save}
            className="inline-flex min-h-[40px] items-center rounded-full bg-[var(--c-accent)] px-6 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
          >
            Save changes
          </button>
          <button
            onClick={() => setEditing(false)}
            className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-border)] px-5 text-sm font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[15px] font-bold text-[var(--c-ink)]">
          {e.beans || e.method}
          {e.roaster && (
            <span className="font-normal text-[var(--c-muted)]"> · {e.roaster}</span>
          )}
        </div>
        <span className="text-[12px] text-[var(--c-muted)]">
          {new Date(e.ts).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--c-muted)]">
        <span>{e.method}</span>
        {e.brewer && <span>· {e.brewer}</span>}
        <span className="font-mono">· 1:{e.ratio}</span>
        <span className="font-mono">· {e.oz} oz</span>
        {typeof e.rating === "number" && e.rating > 0 && <RatingDots value={e.rating} />}
      </div>

      {e.deviation && (
        <p className="mt-2 rounded-lg border border-dashed border-[var(--c-accent)]/40 bg-[var(--c-accent)]/[0.05] px-3 py-1.5 text-[12px] leading-relaxed text-[var(--c-muted)]">
          <span className="font-semibold text-[var(--c-accent-ink)]">
            Went differently:{" "}
          </span>
          {e.deviation}
        </p>
      )}

      {e.notes && (
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--c-muted)]">
          {e.notes}
        </p>
      )}

      <div className="mt-3 flex gap-4">
        <button
          onClick={startEdit}
          className="text-[12px] font-semibold text-[var(--c-accent-ink)] underline-offset-2 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onChange(deleteEntry(e.id))}
          className="text-[12px] font-medium text-[var(--c-muted)] underline-offset-2 hover:text-[var(--c-accent-ink)] hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

function BeanCard({ profile, rank }: { profile: BeanProfile; rank: number }) {
  const b = profile;
  return (
    <article className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[13px] font-bold text-[var(--c-muted)]">
            {rank}.
          </span>
          <div className="text-[15px] font-bold text-[var(--c-ink)]">
            {b.beans}
            {b.roaster && (
              <span className="font-normal text-[var(--c-muted)]"> · {b.roaster}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[var(--c-muted)]">
          {b.avgRating != null && <RatingDots value={b.avgRating} />}
          <span>
            {b.count} brew{b.count === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {b.best ? (
        <p className="mt-2.5 rounded-lg bg-[var(--c-accent)]/[0.07] px-3 py-2 text-[13px] leading-relaxed text-[var(--c-muted)]">
          <span className="font-semibold text-[var(--c-accent-ink)]">
            Make it this way:{" "}
          </span>
          {b.best.method} at 1:{b.best.ratio}
          {b.best.brewer ? ` on the ${b.best.brewer}` : ""} — rated {b.best.rating}
          /5.
        </p>
      ) : (
        b.avgRating != null && (
          <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--c-muted)]">
            Still dialing this one in — nothing has hit 4/5 yet. Try a
            different method or style and rate it.
          </p>
        )
      )}

      {b.ways.length > 1 && (
        <div className="mt-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--c-muted)]">
            Ways you’ve made it
          </div>
          <ul className="mt-1.5 space-y-1">
            {b.ways.map((w) => (
              <li
                key={w.label}
                className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[13px] text-[var(--c-muted)]"
              >
                <span>{w.label}</span>
                <span className="flex items-center gap-2 text-[12px]">
                  {w.avgRating != null ? (
                    <RatingDots value={w.avgRating} />
                  ) : (
                    <span>unrated</span>
                  )}
                  {w.count > 1 && <span>×{w.count}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {b.deviations.length > 0 && (
        <div className="mt-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--c-muted)]">
            Experiments & accidents
          </div>
          <ul className="mt-1.5 space-y-1.5">
            {b.deviations.map((d) => (
              <li
                key={d.id}
                className="text-[13px] leading-relaxed text-[var(--c-muted)]"
              >
                <span aria-hidden className="text-[var(--c-accent-ink)]">↺ </span>
                “{d.deviation}”
                {(d.rating ?? 0) > 0 && (
                  <>
                    {" "}
                    — {d.rating}/5
                    {(d.rating ?? 0) >= 4
                      ? ". Worth keeping on purpose."
                      : ". Follow the recipe exactly next time."}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function ViewChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center rounded-full border px-4 py-1 text-[12px] font-medium transition ${
        active
          ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10 text-[var(--c-accent-ink)]"
          : "border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]/50"
      }`}
    >
      {label}
    </button>
  );
}
