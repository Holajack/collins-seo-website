"use client";

import { useMemo, useState } from "react";
import {
  FLORIDA_SHOPS,
  REGION_LABELS,
  type CoffeeShop,
} from "../florida-coffee";

const REGIONS = ["all", "miami", "orlando", "tampa", "jax"] as const;
type RegionFilter = (typeof REGIONS)[number];

export default function BeansClient() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FLORIDA_SHOPS.filter((s) => {
      if (region !== "all" && s.region !== region) return false;
      if (!q) return true;
      const hay = [
        s.name,
        s.city,
        s.summary,
        s.offers,
        ...s.beans.flatMap((b) => [b.name, b.notes, b.origin ?? ""]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, region]);

  if (FLORIDA_SHOPS.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-[var(--c-border)] p-8 text-center text-[14px] text-[var(--c-muted)]">
        The Florida shop directory is being researched and verified — check
        back shortly.
      </div>
    );
  }

  return (
    <div className="mt-7">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shops, beans, tasting notes…"
          className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-card)] px-4 py-3 text-[14px] text-[var(--c-ink)] outline-none placeholder:text-[var(--c-muted)]/70 focus:border-[var(--c-accent)] sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`inline-flex min-h-[40px] items-center rounded-full border px-3.5 text-[12px] font-medium transition ${
                region === r
                  ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10 text-[var(--c-accent-ink)]"
                  : "border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]/50"
              }`}
            >
              {r === "all" ? "All Florida" : REGION_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[12px] text-[var(--c-muted)]">
        {filtered.length} of {FLORIDA_SHOPS.length} shops
      </p>

      {/* Cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <ShopCard key={s.name} shop={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-[var(--c-border)] p-8 text-center text-[14px] text-[var(--c-muted)]">
          Nothing matches that search — try a bean note like “chocolate” or a
          city name.
        </div>
      )}
    </div>
  );
}

function ShopCard({ shop }: { shop: CoffeeShop }) {
  return (
    <article className="flex flex-col rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-[var(--c-ink)]">
            {shop.name}
          </h2>
          <p className="text-[12px] text-[var(--c-muted)]">
            {shop.city} · {REGION_LABELS[shop.region]}
            {shop.roastsOwn && " · roasts in-house"}
          </p>
        </div>
        <a
          href={shop.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-[var(--c-accent)]/40 px-3.5 text-[12px] font-semibold text-[var(--c-accent-ink)] transition hover:bg-[var(--c-accent)]/10"
        >
          Visit site ↗
        </a>
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-[var(--c-muted)]">
        {shop.summary}
      </p>

      {shop.beans.length > 0 && (
        <div className="mt-3 space-y-2">
          {shop.beans.map((b) => (
            <div
              key={b.name}
              className="rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5"
            >
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[13px] font-semibold text-[var(--c-ink)]">
                  {b.name}
                </span>
                {b.roastLevel && (
                  <span className="text-[11px] uppercase tracking-wide text-[var(--c-muted)]">
                    {b.roastLevel}
                  </span>
                )}
                {b.origin && (
                  <span className="text-[11px] text-[var(--c-muted)]">
                    {b.origin}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[12px] italic leading-relaxed text-[var(--c-muted)]">
                “{b.notes}”
              </p>
            </div>
          ))}
        </div>
      )}

      {shop.offers && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--c-accent-ink)]">
          <TagIcon /> {shop.offers}
        </p>
      )}
    </article>
  );
}

function TagIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l8.58-8.58a1 1 0 0 0 0-1.42z" />
      <circle cx="7" cy="7" r="1.5" />
    </svg>
  );
}
