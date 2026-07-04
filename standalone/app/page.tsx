import BrewCalculator from "./BrewCalculator";
import PourOverArt from "./PourOverArt";
import CoffeeTheme from "./CoffeeTheme";
import SiteHeader from "./SiteHeader";
import { BREW_METHODS, type BrewMethodKey } from "./brew-data";
import { formatTime } from "./engine";

// Landing structure: "Solve for Cup" — the tool is the hero, and the page
// proves its one differentiating claim (finished-cup math) instead of
// asserting it. Hero copy borrows the product-page directness: a promise the
// engine literally fulfills.

const FAQS: { q: string; a: string }[] = [
  {
    q: "Why does a 12 oz cup call for over 400 g of water?",
    a: "Ground coffee holds on to roughly 2 g of water per gram of coffee (about 1.5 g for the AeroPress's shorter, pressed contact). For a 12 oz V60 at 1:16, that's ~25 g of coffee keeping ~51 g of water in the filter bed. This calculator adds that back in before you pour, so what lands in your cup is what you asked for.",
  },
  {
    q: "It tastes bitter — or sour. Which knob do I turn first?",
    a: "Grind first, ratio second, temperature third. Bitter or drying usually means over-extraction: grind coarser or drop the water temperature. Sour, thin, or hollow means under-extraction: grind finer or pour slower. Only reach for the ratio once the grind is close — ratio changes strength more than balance.",
  },
  {
    q: "Do I really need a scale?",
    a: "Yes — it's the single biggest upgrade in home coffee. A scoop of coffee can swing more than 20% by roast and grind, and 'a cup' of water isn't a stable unit. A 0.1 g kitchen scale costs less than two bags of specialty beans and makes every number on this page repeatable.",
  },
  {
    q: "Why is there no bloom for cold brew?",
    a: "A bloom is hot water driving CO₂ out of fresh grounds so the bed extracts evenly. Cold water can't do that — there's no degassing burst to wait out. For cold brew the honest equivalent is one good stir at the start so no grounds stay dry. (For the same reason, the siphon and AeroPress get a saturation stir, not a pour-over-style bloom.)",
  },
  {
    q: "Will it tell me when to pour?",
    a: "Yes. The timer chimes at every pour step and when the brew completes, and it keeps your screen awake for the whole brew. On phones that support vibration it also taps. You can mute the chime and just watch the ring.",
  },
  {
    q: "Can I save or share a recipe?",
    a: "Every recipe lives in the page's address — hit 'Copy recipe link' and send it to anyone; the calculator opens exactly as you set it. The page also quietly remembers your last recipe on this device, so tomorrow morning your usual is one tap away. No account needed — and your journal backs up to a plain file you own, from the Journal page.",
  },
];

export default function HomePage() {
  return (
    <div className="c-scope min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)]">
      <SiteHeader active="/" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--c-border)]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_85%_0%,var(--c-accent)/0.10,transparent_55%)]" />
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--c-accent)]/25 bg-[var(--c-accent)]/[0.07] px-3 py-1 text-[12px] font-medium text-[var(--c-accent-ink)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--c-accent)]" />
              Free. No account. No ads.
            </span>
            <h1 className="c-display mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Ask for 12 oz.
              <br />
              <span className="italic text-[var(--c-accent-ink)]">
                Get 12 oz.
              </span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--c-muted)]">
              Most calculators tell you how much water to pour. This one tells
              you how much coffee lands in your cup — your grounds drink about
              twice their weight in water, and this page accounts for every
              gram of it.
            </p>
            <p className="mt-3 text-[13px] font-medium text-[var(--c-muted)]">
              V60 · Chemex · Siphon · AeroPress · Cold brew — with the exact
              dose, bloom, temperature, grind, and a live pour timer.
            </p>
          </div>

          <div className="mx-auto hidden w-full max-w-[280px] lg:block">
            <PourOverArt />
          </div>
        </div>
      </section>

      {/* The Instrument — the working calculator IS the page */}
      <main
        id="calculator"
        className="mx-auto max-w-5xl scroll-mt-20 px-5 py-10 sm:px-8 sm:py-12"
      >
        <BrewCalculator />
      </main>

      {/* Five methods, solved properly */}
      <section className="border-t border-[var(--c-border)]">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <h2 className="c-display text-2xl font-semibold tracking-tight">
            Five methods, solved properly
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--c-muted)]">
            Each method carries its own verified numbers — ratio, temperature,
            grind, bloom, and timing — not one drip recipe wearing five hats.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(BREW_METHODS) as BrewMethodKey[]).map((k) => {
              const m = BREW_METHODS[k];
              return (
                <a
                  key={k}
                  href={`/?m=${k}#calculator`}
                  className="group rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-5 transition hover:border-[var(--c-accent)]/50"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[15px] font-bold text-[var(--c-ink)]">
                      {m.shortName}
                    </h3>
                    <span className="font-mono text-[12px] text-[var(--c-accent-ink)]">
                      1:{m.recommendedRatio}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--c-muted)]">
                    {m.tasteSummary}
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-[var(--c-muted)]">
                    {m.coldBrew
                      ? `${m.coldBrew.steepHoursLow}–${m.coldBrew.steepHoursHigh} h steep · ${m.grind.split(" — ")[0].toLowerCase()}`
                      : `${m.waterTempF.low}–${m.waterTempF.high}°F · ~${formatTime(
                          m.totalBrewTimeSec.high
                        )} · ${m.grind.split(" — ")[0].toLowerCase()}`}
                  </p>
                  <span className="mt-3 inline-block text-[12px] font-semibold text-[var(--c-accent-ink)] opacity-0 transition group-hover:opacity-100">
                    Set up this brew →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Field notes */}
      <section className="border-t border-[var(--c-border)]">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <h2 className="c-display text-2xl font-semibold tracking-tight">
            Field notes
          </h2>
          <p className="mt-2 text-[14px] text-[var(--c-muted)]">
            Questions, answered in grams.
          </p>
          <div className="mt-6 max-w-3xl space-y-2">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[var(--c-border)] bg-[var(--c-card)]"
              >
                {/* Padding lives on the summary so the whole visible row is
                    the tap target, not just the text line. */}
                <summary className="cursor-pointer list-none px-5 py-4 text-[15px] font-semibold text-[var(--c-ink)] marker:content-none">
                  <span className="flex items-center justify-between gap-3">
                    {f.q}
                    <span
                      aria-hidden
                      className="shrink-0 text-[var(--c-accent-ink)] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="px-5 pb-4 text-[14px] leading-relaxed text-[var(--c-muted)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The bench */}
      <section className="border-t border-[var(--c-border)]">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="c-display text-2xl font-semibold tracking-tight">
              From the bench
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--c-muted)]">
              This started as a personal tool — one brewer tired of 12 oz
              recipes that poured 10.5 oz cups. The numbers were researched
              method by method, then put through an adversarial review pass
              before anything shipped: every temperature, ratio, and bloom time
              had to survive the question “will this actually taste good, and
              is it physically correct?” It lives on this page for free because
              a good morning cup shouldn’t need an account.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--c-muted)]">
              Roaster or cafe? A white-label version of this calculator — your
              beans, your recipes, your branding — is available for licensing.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--c-border)]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
          <p className="text-[12px] leading-relaxed text-[var(--c-muted)]">
            Ratios shown as coffee:water (1:16 = 1 g coffee per 16 g water). A
            0.1 g kitchen scale and a thermometer are your best friends —
            weigh everything, including the water. Adjust grind first, ratio
            second. The timer chimes at each pour and keeps your screen awake
            while you brew; it also taps on phones that support vibration.
          </p>
        </div>
      </footer>

      <CoffeeTheme />
    </div>
  );
}

