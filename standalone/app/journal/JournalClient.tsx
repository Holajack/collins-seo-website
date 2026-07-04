"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  aggregateBeans,
  analyzeJournal,
  deleteEntry,
  loadJournal,
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

export default function JournalClient() {
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);
  const [view, setView] = useState<"beans" | "brews" | null>(null);

  // localStorage exists only client-side; SSR renders the loading state.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const loaded = loadJournal();
    setEntries(loaded);
    // Land on the bean view when there are beans to show — that's the point
    // of the journal — otherwise the plain brew log.
    setView(aggregateBeans(loaded).length > 0 ? "beans" : "brews");
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

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
        <Link
          href="/"
          className="mt-5 inline-flex min-h-[40px] items-center rounded-full bg-[var(--c-accent)] px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Brew something
        </Link>
      </div>
    );
  }

  const insights = analyzeJournal(entries);
  const beans = aggregateBeans(entries);

  return (
    <>
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
            <li
              key={e.id}
              className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-[15px] font-bold text-[var(--c-ink)]">
                  {e.beans || e.method}
                  {e.roaster && (
                    <span className="font-normal text-[var(--c-muted)]">
                      {" "}
                      · {e.roaster}
                    </span>
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
                {typeof e.rating === "number" && e.rating > 0 && (
                  <RatingDots value={e.rating} />
                )}
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

              <button
                onClick={() => setEntries(deleteEntry(e.id))}
                className="mt-3 text-[12px] font-medium text-[var(--c-muted)] underline-offset-2 hover:text-[var(--c-accent-ink)] hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
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
