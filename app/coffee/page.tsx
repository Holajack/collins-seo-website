import type { Metadata } from "next";
import Link from "next/link";
import BrewCalculator from "./BrewCalculator";

export const metadata: Metadata = {
  title: "Perfect Brew Calculator — Pour Over, Chemex, AeroPress & More",
  description:
    "Enter the cup size you want and your taste style; get the exact coffee dose, water, bloom, temperature, grind and a timed pour schedule for V60, Chemex, siphon, AeroPress and cold brew.",
  robots: { index: false, follow: false },
};

export default function CoffeePage() {
  return (
    <div className="c-scope min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)]">
      <header className="border-b border-[var(--c-border)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <CupMark />
            The Perfect Brew
          </span>
          <Link
            href="/"
            className="text-[13px] text-[var(--c-muted)] hover:text-[var(--c-accent-ink)]"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-9 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dial in the perfect cup, every single time.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--c-muted)]">
            Tell it how much coffee you want in the cup and the style you’re
            chasing. It works backward through the brew ratio — accounting for
            the water your grounds soak up — to give you the exact dose, the
            perfect bloom, water temperature, grind, and a timed pour schedule.
            Numbers are grounded in specialty-coffee brewing science.
          </p>
        </div>

        <BrewCalculator />

        <footer className="mt-12 border-t border-[var(--c-border)] pt-6 text-[12px] leading-relaxed text-[var(--c-muted)]">
          <p>
            Ratios shown as coffee:water (1:16 = 1 g coffee per 16 g water). A
            kitchen scale accurate to 0.1 g and a thermometer are your best
            friends here — weigh everything, including the water. Adjust grind
            first, ratio second.
          </p>
        </footer>
      </main>

      {/* Coffee-shop palette, scoped so it never touches the rest of the site. */}
      <style>{`
        .c-scope {
          --c-bg: #faf6f0;
          --c-card: #ffffff;
          --c-ink: #2b2018;
          --c-muted: #8a7a6c;
          --c-border: #e8ddd0;
          --c-accent: #b06a3b;
          --c-accent-ink: #8a4f29;
        }
        @media (prefers-color-scheme: dark) {
          .c-scope {
            --c-bg: #1a1510;
            --c-card: #241d16;
            --c-ink: #f3ece2;
            --c-muted: #b3a392;
            --c-border: #3a2f24;
            --c-accent: #d08a52;
            --c-accent-ink: #e0a877;
          }
        }
        .c-scope .c-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--c-muted);
        }
      `}</style>
    </div>
  );
}

function CupMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--c-accent-ink)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z" />
      <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 2c-.5 1 .5 1.5 0 2.5M11 2c-.5 1 .5 1.5 0 2.5" />
    </svg>
  );
}
