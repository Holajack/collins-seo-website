import BrewCalculator from "./BrewCalculator";
import PourOverArt from "./PourOverArt";

export default function HomePage() {
  return (
    <div className="c-scope min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)]">
      <header className="sticky top-0 z-20 border-b border-[var(--c-border)] bg-[var(--c-bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <CupMark />
            <span className="c-display text-[17px]">The Perfect Brew</span>
          </span>
          <a
            href="#calculator"
            className="text-[13px] text-[var(--c-muted)] transition hover:text-[var(--c-accent-ink)]"
          >
            Calculator ↓
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--c-border)]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_85%_0%,var(--c-accent)/0.10,transparent_55%)]" />
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--c-accent)]/25 bg-[var(--c-accent)]/[0.07] px-3 py-1 text-[12px] font-medium text-[var(--c-accent-ink)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--c-accent)]" />
              Grounded in specialty-coffee brewing science
            </span>
            <h1 className="c-display mt-5 text-[2.4rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              The perfect cup,
              <br />
              <span className="italic text-[var(--c-accent-ink)]">
                every single time.
              </span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--c-muted)]">
              Tell it how much coffee you want in the cup and the style you’re
              chasing. It works backward through the brew ratio — accounting for
              the water your grounds soak up — to give you the exact dose, the
              perfect bloom, water temperature, grind, and a live, timed pour
              schedule you can brew along with.
            </p>
            <a
              href="#calculator"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--c-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
            >
              Build my recipe
              <span aria-hidden>↓</span>
            </a>
          </div>

          <div className="mx-auto w-full max-w-[320px]">
            <PourOverArt />
          </div>
        </div>
      </section>

      <main
        id="calculator"
        className="mx-auto max-w-5xl scroll-mt-20 px-5 py-10 sm:px-8 sm:py-14"
      >
        <BrewCalculator />

        <footer className="mt-12 border-t border-[var(--c-border)] pt-6 text-[12px] leading-relaxed text-[var(--c-muted)]">
          <p>
            Ratios shown as coffee:water (1:16 = 1 g coffee per 16 g water). A
            kitchen scale accurate to 0.1 g and a thermometer are your best
            friends here — weigh everything, including the water. Adjust grind
            first, ratio second. On your phone, the timer taps to mark each pour,
            so you can keep your eyes on the scale.
          </p>
        </footer>
      </main>

      {/* Coffee-shop palette + editorial type. */}
      <style>{`
        .c-scope {
          --c-bg: #faf6f0;
          --c-card: #ffffff;
          --c-ink: #2b2018;
          --c-muted: #8a7a6c;
          --c-border: #e8ddd0;
          --c-accent: #b06a3b;
          --c-accent-ink: #8a4f29;
          --c-display: "Iowan Old Style", "Palatino Linotype", Palatino,
            "Book Antiqua", "Hoefler Text", Georgia, ui-serif, serif;
        }
        @media (prefers-color-scheme: dark) {
          .c-scope {
            --c-bg: #16110c;
            --c-card: #211a13;
            --c-ink: #f3ece2;
            --c-muted: #b3a392;
            --c-border: #382c20;
            --c-accent: #d08a52;
            --c-accent-ink: #e6ad7a;
          }
        }
        .c-scope .c-display {
          font-family: var(--c-display);
          letter-spacing: -0.01em;
        }
        .c-scope .c-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--c-muted);
        }
        @keyframes c-pulse-kf {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.04); }
        }
        .c-scope .c-pulse {
          animation: c-pulse-kf 1s ease-in-out infinite;
          transform-origin: left center;
        }
        @keyframes c-steam-kf {
          0% { opacity: 0; transform: translateY(6px) scaleX(0.9); }
          35% { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(-26px) scaleX(1.15); }
        }
        .c-scope .c-steam path {
          animation: c-steam-kf 4.5s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .c-scope .c-steam path:nth-child(2) { animation-delay: 1.5s; }
        .c-scope .c-steam path:nth-child(3) { animation-delay: 3s; }
        @media (prefers-reduced-motion: reduce) {
          .c-scope .c-pulse, .c-scope .c-steam path { animation: none; }
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
