"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteEntry,
  loadJournal,
  type JournalEntry,
} from "../journal-store";

export default function JournalClient() {
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);

  // localStorage exists only client-side; SSR renders the loading state.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(loadJournal());
  }, []);

  if (entries === null) {
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

  return (
    <ul className="mt-8 space-y-3">
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
              <span aria-label={`${e.rating} out of 5`} className="text-[var(--c-accent-ink)]">
                {"●".repeat(e.rating)}
                <span className="opacity-30">{"●".repeat(5 - e.rating)}</span>
              </span>
            )}
          </div>

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
  );
}
