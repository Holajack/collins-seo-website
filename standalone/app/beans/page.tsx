import type { Metadata } from "next";
import CoffeeTheme from "../CoffeeTheme";
import SiteHeader from "../SiteHeader";
import BeansClient from "./BeansClient";

export const metadata: Metadata = {
  title: "Florida Beans & Shops",
  description:
    "Real Florida specialty coffee roasters and shops — bean names, tasting notes, and offers, verified from their own websites.",
};

export default function BeansPage() {
  return (
    <div className="c-scope min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)]">
      <SiteHeader active="/beans" />
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <h1 className="c-display text-3xl font-semibold tracking-tight">
          Florida beans &amp; shops
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--c-muted)]">
          Specialty roasters and shops across Florida, with bean names and
          tasting notes pulled from their own sites and verified against the
          live pages. Menus rotate — the notes are a snapshot, the links are
          the source of truth. Found a bean you love? Log it in your{" "}
          <a href="/journal" className="text-[var(--c-accent-ink)] underline underline-offset-2">
            journal
          </a>
          .
        </p>
        <BeansClient />
      </main>
      <CoffeeTheme />
    </div>
  );
}
