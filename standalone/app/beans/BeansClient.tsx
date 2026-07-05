"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FLORIDA_SHOPS,
  REGION_LABELS,
  type CoffeeShop,
} from "../florida-coffee";
import { groupBeans, KIND_LABELS, monogram, tileColor } from "./shop-visual";

const REGIONS = ["all", "miami", "orlando", "tampa", "jax", "sc"] as const;
type RegionFilter = (typeof REGIONS)[number];

const totalBeans = FLORIDA_SHOPS.reduce((a, s) => a + s.beans.length, 0);

export default function BeansClient() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [roastsOnly, setRoastsOnly] = useState(false);
  const [open, setOpen] = useState<CoffeeShop | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FLORIDA_SHOPS.filter((s) => {
      if (region !== "all" && s.region !== region) return false;
      if (roastsOnly && !s.roastsOwn) return false;
      if (!q) return true;
      const hay = [
        s.name,
        s.city,
        s.summary,
        s.tagline ?? "",
        s.offers,
        ...s.beans.flatMap((b) => [b.name, b.notes, b.origin ?? ""]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, region, roastsOnly]);

  if (FLORIDA_SHOPS.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-[var(--c-border)] p-8 text-center text-[14px] text-[var(--c-muted)]">
        The shop directory is being researched and verified — check back shortly.
      </div>
    );
  }

  return (
    <div className="mt-7">
      {/* Search */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a shop, city, or a tasting note like “chocolate”…"
        className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-card)] px-4 py-3 text-[14px] text-[var(--c-ink)] outline-none placeholder:text-[var(--c-muted)]/70 focus:border-[var(--c-accent)]"
      />

      {/* Region + roasts filter row */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`inline-flex min-h-[38px] items-center rounded-full border px-3.5 text-[12px] font-medium transition ${
              region === r
                ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10 text-[var(--c-accent-ink)]"
                : "border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]/50"
            }`}
          >
            {r === "all" ? "Everywhere" : REGION_LABELS[r]}
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-[var(--c-border)] sm:block" />
        <button
          onClick={() => setRoastsOnly((v) => !v)}
          aria-pressed={roastsOnly}
          className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full border px-3.5 text-[12px] font-medium transition ${
            roastsOnly
              ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10 text-[var(--c-accent-ink)]"
              : "border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]/50"
          }`}
        >
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${
              roastsOnly ? "bg-[var(--c-accent)]" : "bg-[var(--c-muted)]/50"
            }`}
          />
          Roasts in-house
        </button>
      </div>

      <p className="mt-3 text-[12px] text-[var(--c-muted)]">
        {filtered.length} of {FLORIDA_SHOPS.length} shops · {totalBeans} beans
        catalogued · tap a card for the full lineup
      </p>

      {/* Compact card grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <ShopTile key={s.name} shop={s} onOpen={() => setOpen(s)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-[var(--c-border)] p-8 text-center text-[14px] text-[var(--c-muted)]">
          Nothing matches that search — try a bean note like “chocolate,” a city,
          or clear the filters.
        </div>
      )}

      {open && <ShopModal shop={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Monogram({
  shop,
  size = 44,
}: {
  shop: CoffeeShop;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-xl font-bold text-white"
      style={{
        width: size,
        height: size,
        background: tileColor(shop),
        fontSize: size * 0.36,
        letterSpacing: "0.02em",
      }}
    >
      {monogram(shop.name)}
    </span>
  );
}

function ShopTile({ shop, onOpen }: { shop: CoffeeShop; onOpen: () => void }) {
  const teaser =
    shop.tagline ||
    shop.beans[0]?.name ||
    (shop.roastsOwn ? "Roasts in-house" : "Specialty coffee bar");
  return (
    <button
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-4 text-left transition hover:border-[var(--c-accent)]/50 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <Monogram shop={shop} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-bold text-[var(--c-ink)]">
            {shop.name}
          </h2>
          <p className="truncate text-[12px] text-[var(--c-muted)]">
            {shop.city.split("(")[0].trim()} · {REGION_LABELS[shop.region]}
          </p>
        </div>
      </div>

      <p className="mt-2.5 line-clamp-2 text-[12.5px] leading-relaxed text-[var(--c-muted)]">
        {teaser}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {shop.beans.length > 0 && (
          <Badge>
            {shop.beans.length} bean{shop.beans.length === 1 ? "" : "s"}
          </Badge>
        )}
        {shop.roastsOwn && <Badge>Roasts in-house</Badge>}
        {shop.offers && <Badge>Subscription</Badge>}
        <span className="ml-auto text-[12px] font-semibold text-[var(--c-accent-ink)] opacity-0 transition group-hover:opacity-100">
          View →
        </span>
      </div>
    </button>
  );
}

function ShopModal({ shop, onClose }: { shop: CoffeeShop; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const groups = groupBeans(shop.beans);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={shop.name}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="c-scope flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-[var(--c-bg)] shadow-xl sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-[var(--c-border)] p-5">
          <Monogram shop={shop} size={52} />
          <div className="min-w-0 flex-1">
            <h2 className="c-display text-xl font-bold text-[var(--c-ink)]">
              {shop.name}
            </h2>
            <p className="text-[13px] text-[var(--c-muted)]">
              {shop.city} · {REGION_LABELS[shop.region]}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {shop.roastsOwn && <Badge>Roasts in-house</Badge>}
              {shop.beans.length > 0 && (
                <Badge>
                  {shop.beans.length} coffee{shop.beans.length === 1 ? "" : "s"}
                </Badge>
              )}
              {shop.offers && <Badge>Subscription</Badge>}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-1.5 text-[var(--c-muted)] transition hover:bg-[var(--c-card)] hover:text-[var(--c-ink)]"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-[13px] leading-relaxed text-[var(--c-muted)]">
            {shop.summary}
          </p>

          {groups.length > 0 ? (
            <div className="mt-4 space-y-5">
              {groups.map((g) => (
                <div key={g.kind}>
                  <div className="c-label mb-2">{KIND_LABELS[g.kind]}</div>
                  <div className="space-y-2">
                    {g.beans.map((b) => (
                      <div
                        key={b.name}
                        className="rounded-xl border border-[var(--c-border)] bg-[var(--c-card)] px-3.5 py-2.5"
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
                        {b.notes && (
                          <p className="mt-0.5 text-[12px] italic leading-relaxed text-[var(--c-muted)]">
                            “{b.notes}”
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-[var(--c-muted)]">
              We haven’t catalogued this shop’s bean list yet — the site link has
              the current menu.
            </p>
          )}

          {shop.offers && (
            <div className="mt-5 rounded-xl border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/[0.06] p-3.5">
              <div className="c-label mb-1">Subscription &amp; offers</div>
              <p className="text-[12.5px] leading-relaxed text-[var(--c-muted)]">
                {shop.offers}
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 border-t border-[var(--c-border)] p-4">
          <a
            href={shop.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-[var(--c-accent)] px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Visit {shortHost(shop.website)} ↗
          </a>
          <a
            href="/journal"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--c-border)] px-5 text-sm font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50"
          >
            Log a bean
          </a>
        </div>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--c-accent)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--c-accent-ink)]">
      {children}
    </span>
  );
}

function shortHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "site";
  }
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
