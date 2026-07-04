import type { Metadata } from "next";
import CoffeeTheme from "../CoffeeTheme";
import SiteHeader from "../SiteHeader";
import JournalClient from "./JournalClient";

export const metadata: Metadata = {
  title: "Brew Journal",
  description:
    "Your brews, beans, and tasting notes — saved on this device. No account.",
  robots: { index: false, follow: true },
};

export default function JournalPage() {
  return (
    <div className="c-scope min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)]">
      <SiteHeader active="/journal" />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <h1 className="c-display text-3xl font-semibold tracking-tight">
          Brew journal
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--c-muted)]">
          Every brew you log lives on this device only — no account, nothing
          uploaded. Log one from the calculator after the timer finishes (or
          any time from the recipe card).
        </p>
        <JournalClient />
      </main>
      <CoffeeTheme />
    </div>
  );
}
