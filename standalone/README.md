# The Perfect Brew

*Ask for 12 oz. Get 12 oz.*

A research-backed coffee calculator + live brew timer. Enter the finished cup
volume you want and a taste style; get the exact dose, water, bloom,
temperature, grind, and a timed pour schedule for V60 pour over, Chemex,
siphon, AeroPress, and cold brew.

The landing page fronts the working tool ("Solve for Cup" structure): the
calculator is the hero, and the Water Ledger section renders the engine's
actual equation from live state — proof, not claims.

Timer features: synthesized chime at every pour (works on iPhones, where
`navigator.vibrate` is a no-op), screen Wake Lock for the length of the brew,
wall-clock-anchored timing that survives tab hiding, haptic taps where
supported, and a mute toggle. Recipes serialize to the URL (`Copy recipe
link`), and the last brew is remembered on-device ("your usual").

Beyond the calculator:

- **Capacity-aware brewers** (`app/brewers.ts`): pick your actual hardware —
  AeroPress Original/Go/Clear/XL, V60 01/02/03, Chemex 3–10 cup, Hario/Yama
  siphons, cold brew vessels — and the math respects its real capacity. An
  over-size AeroPress brew automatically becomes a concentrate + bypass plan
  with its own timer steps; siphons warn at the bulb's hard cap; pour-overs
  suggest the right size.
- **Custom dose mode**: enter total coffee (g) and total water (g) directly;
  the ratio, cup yield, bloom, and schedule derive from your dose.
- **Brew journal** (`/journal`): beans, roaster, rating, notes — stored in
  localStorage only. No account.
- **Florida beans & shops** (`/beans`): real specialty roasters researched
  from their live websites by a multi-agent sweep with per-shop verification
  (`app/florida-coffee.ts`).

What makes the math right:

- **Finished-cup solve.** Grounds retain ~2 g water per 1 g coffee, so naive
  `coffee = water / ratio` calculators short your cup. This solves
  `coffee = cup / (ratio − absorption)` so the number you ask for is the
  number you drink.
- **Honest blooms.** A real CO₂-degassing bloom for hot drip methods, a
  saturation stir for immersion, none for cold brew.
- **Cold brew done right.** Brews a 1:5 concentrate and derives the dilution
  to land exactly on your chosen ready-to-drink strength.

Parameters were reconciled through a multi-agent research pass with an
adversarial taste/correctness critic (temps, timings, ratios verified against
specialty-coffee sources).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Brewing parameters live in `app/brew-data.ts`; the pure math in
`app/engine.ts`.
