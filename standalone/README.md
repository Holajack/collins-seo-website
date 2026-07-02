# The Perfect Brew

A research-backed coffee calculator + live brew timer. Enter the finished cup
volume you want and a taste style; get the exact dose, water, bloom,
temperature, grind, and a timed pour schedule for V60 pour over, Chemex,
siphon, AeroPress, and cold brew.

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
