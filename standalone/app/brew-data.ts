import type { BrewMethod } from "./engine";

// ─────────────────────────────────────────────────────────────────────────
// Per-method brewing spec.
//
// Values are grounded in specialty-coffee brewing science and reconciled
// against a multi-agent research + adversarial-critic pass (see the comment
// block at the bottom for what the critic corrected). Ratios are coffee:water
// denominators (1:R). Bloom only applies to hot methods that degas fresh CO2.
// ─────────────────────────────────────────────────────────────────────────

export type BrewMethodKey =
  | "pourover_v60"
  | "chemex"
  | "siphon"
  | "aeropress"
  | "frenchpress"
  | "coldbrew";

const METHODS: Record<BrewMethodKey, BrewMethod & { shortName: string }> = {
  pourover_v60: {
    key: "pourover_v60",
    name: "Pour Over (Hario V60)",
    shortName: "V60 Pour Over",
    blurb:
      "Conical dripper, fast flow, bright and clean. The most controllable everyday brewer.",
    styleRatios: { strong: 15, balanced: 16, light: 17 },
    recommendedRatio: 16,
    absorptionPerGram: 2.0,
    grind: "Medium-fine — like table salt",
    waterTempF: { low: 195, high: 208 },
    bloom: {
      applies: true,
      waterMultiplier: 2.5,
      timeSec: 45,
      technique:
        "Pour about 2–3× the coffee's weight in water to fully saturate the bed, swirl the dripper gently for even wetting, then rest until 0:45 to degas (longer for fresher, lighter roasts). Fresh coffee will dome and bubble.",
    },
    pourSchedule:
      "Three actions, ever: bloom + swirl at 0:00, pour to 60% at 0:45, pour to 100% at ~1:15 — then Hoffmann's untimed stir + swirl as you set the kettle down, and hands off. A standard cup finishes drawing down around 4:00 (3:15–4:15 is all normal).",
    totalBrewTimeSec: { low: 210, high: 285 },
    isImmersion: false,
    notes: [
      "Aim for ~205–208°F for light roasts, ~200–205°F medium, ~195–200°F dark. Avoid a full rolling boil.",
      "Bitter or hollow? Grind a touch coarser or drop the temp.",
      "Sour or weak? Grind finer or pour a little slower.",
      "Keep the water above the bed — avoid trickling down the sides.",
    ],
    tasteSummary:
      "Clean, bright, and aromatic with a light body — the clarity benchmark.",
    sources: ["James Hoffmann V60 technique", "Hario", "Tetsu Kasuya 4:6"],
  },

  chemex: {
    key: "chemex",
    name: "Chemex",
    shortName: "Chemex",
    blurb:
      "Thick bonded filter for an exceptionally clean, crisp cup. Slower flow, slightly coarser grind.",
    styleRatios: { strong: 15, balanced: 16, light: 17 },
    recommendedRatio: 16,
    absorptionPerGram: 2.0,
    grind: "Medium-coarse — like kosher salt (coarser than V60)",
    waterTempF: { low: 195, high: 205 },
    bloom: {
      applies: true,
      waterMultiplier: 2.5,
      timeSec: 45,
      technique:
        "Pour bloom water (about 2–3× the coffee weight) in a slow spiral from the center out until every ground is wet. Gently swirl the Chemex to soak any dry pockets, then rest until 0:45 to let CO₂ escape. The thick filter is slow, so an even bloom matters even more here.",
    },
    pourSchedule:
      "Rinse the bonded filter first (triple-fold toward the spout). Then the same three actions as a V60 — bloom, pour to 60%, pour to full — with the stir folded into the last pour; batches over ~560 g split into three gentler pours. The thick filter makes drawdown long: ~4:45 for a standard brew is on time.",
    totalBrewTimeSec: { low: 225, high: 405 },
    isImmersion: false,
    notes: [
      "Brew runs slow? Go coarser — a stalled Chemex over-extracts and turns bitter.",
      "The signature is clarity: the filter removes most oils and fines.",
      "Best for larger batches; scales cleanly to 2–4 cups.",
    ],
    tasteSummary:
      "Glassy-clean and crisp with no sediment — bright fruit notes shine.",
    sources: ["Chemex official brew guide", "Specialty roaster guides"],
  },

  siphon: {
    key: "siphon",
    name: "Siphon / Vacuum Pot",
    shortName: "Siphon",
    blurb:
      "Full immersion plus vacuum draw. Theatrical, very hot, and capable of a syrupy, aromatic cup.",
    styleRatios: { strong: 14, balanced: 15, light: 16 },
    recommendedRatio: 15,
    absorptionPerGram: 2.0,
    grind: "Medium — like table salt; coarser to speed drawdown, finer to slow it",
    waterTempF: { low: 198, high: 205 },
    bloom: {
      applies: false,
      waterMultiplier: 0,
      timeSec: 0,
      technique: "",
    },
    pourSchedule:
      "Setup, before the timer: water in the lower bulb, heat until it rises and settles up top, then turn the flame to LOW. From there only two timed actions: add the grounds with a brisk stir at 0:00, and cut the heat with a final gentle stir at ~1:00–1:20. The vacuum does the rest.",
    totalBrewTimeSec: { low: 135, high: 225 },
    isImmersion: true,
    notes: [
      "There's no CO₂ bloom here — the gentle stir on immersion is what evenly saturates the bed.",
      "Total contact time (steep) is your main lever: longer = stronger and more bitter.",
      "Drawdown faster than ~30s? Grind finer. Stalling past ~60s? Grind coarser — slow drawdown over-extracts.",
      "Keep the water hot but off a rolling boil, and serve immediately.",
    ],
    tasteSummary:
      "Full-bodied yet clean, intensely aromatic — immersion depth with filter clarity.",
    sources: ["Hario syphon guide", "Specialty siphon brewing guides"],
  },

  aeropress: {
    key: "aeropress",
    name: "AeroPress",
    shortName: "AeroPress",
    blurb:
      "Short immersion finished with gentle pressure. Forgiving, fast, and endlessly tweakable.",
    styleRatios: { strong: 14, balanced: 16, light: 18 },
    recommendedRatio: 16,
    absorptionPerGram: 1.5,
    grind: "Medium-fine — like table salt (slightly finer than drip)",
    waterTempF: { low: 185, high: 205 },
    // No bloom: full immersion — the 2–3 stir turns folded into the pour do
    // the saturating (AeroPress official; Hoffmann pours everything at once).
    bloom: {
      applies: false,
      waterMultiplier: 0,
      timeSec: 0,
      technique: "",
    },
    pourSchedule:
      "Two actions: pour everything + stir + seal as one motion at 0:00, then swirl-settle-press at 2:30. That's the whole method — the long silent steep in between is where the cup is made. Oversize cups add one more: a bypass top-up after the press.",
    totalBrewTimeSec: { low: 215, high: 300 },
    isImmersion: true,
    notes: [
      "Default ~200–205°F for medium/dark roasts; drop toward 185–195°F for light roasts.",
      "Don't go below ~185°F as a default — it under-extracts into a sour, thin cup.",
      "Press slowly — forcing it fast pushes fines through and muddies the cup.",
      "For an Americano-style longer cup, brew stronger and dilute with hot water after pressing.",
    ],
    tasteSummary:
      "Rich, smooth, and low in bitterness with a heavier body than pour over.",
    sources: ["AeroPress official", "World AeroPress Championship recipes"],
  },

  frenchpress: {
    key: "frenchpress",
    name: "French Press",
    shortName: "French Press",
    blurb:
      "Full immersion in the classic beaker — heavy body, rich texture, zero technique anxiety.",
    styleRatios: { strong: 12, balanced: 15, light: 17 },
    recommendedRatio: 15,
    absorptionPerGram: 2.0,
    grind: "Medium-coarse — like coarse sea salt (don't grind finer for light styles)",
    waterTempF: { low: 195, high: 205 },
    // No discrete bloom: you fill all at once and the crust of grounds that
    // forms on top IS the bloom — breaking it at 4:00 is what ends its steep.
    bloom: {
      applies: false,
      waterMultiplier: 0,
      timeSec: 0,
      technique: "",
    },
    pourSchedule:
      "Pour all the water in one steady pour — no stirring; a crust forms on top and that crust is your bloom. At 4:00 break it with a spoon and skim the foam, and the grounds sink. Strength is set by your RATIO (1:12 bold → 1:17 light); the wait before you pour controls CLARITY, not strength — the longer the fines settle, the cleaner the cup. Never plunge the mesh to the bottom: rest it at the surface and pour off the clean coffee.",
    totalBrewTimeSec: { low: 280, high: 560 },
    isImmersion: true,
    notes: [
      "Strength comes from the ratio, not the timing: 1:12 for bold & rich, 1:15 balanced, 1:17 light-but-flavorful.",
      "The wait after the 4:00 crust break is a clarity dial. Pour right away for a bold, rustic, sediment-heavy cup; wait to ~6:00 for a cleaner one; ~9:00 (Hoffmann) for the cleanest, silt-free cup.",
      "Never plunge to the bottom — lower the mesh only to the surface and pour. Plunging re-suspends the fines you just let settle and adds bitterness.",
      "For a light-but-flavorful cup keep the grind medium-coarse and use hot water (203–205°F) — lift flavor with heat and ratio, not a finer grind.",
      "Pour every cup right away; coffee left sitting on the bed keeps extracting and turns bitter.",
    ],
    tasteSummary:
      "Heavy-bodied, rich, and textured — the fullest expression of the bean.",
    sources: ["James Hoffmann French press technique", "SCA Golden Cup ratios"],
  },

  coldbrew: {
    key: "coldbrew",
    name: "Cold Brew",
    shortName: "Cold Brew",
    blurb:
      "Long, cold immersion. No heat, no bloom — just time. Smooth, low-acid, and naturally sweet.",
    // These are FINAL ready-to-drink strengths (the critic's key fix: don't
    // conflate the concentrate ratio with what you actually drink). Cold water
    // extracts fewer solubles than hot, so ready-to-drink cold brew runs much
    // stronger ratios than drip: ~1:7 bold to ~1:11 light. The engine brews a
    // 1:5 concentrate and derives exactly how much water to cut it with to
    // land on the chosen final strength.
    styleRatios: { strong: 7, balanced: 9, light: 11 },
    recommendedRatio: 9,
    absorptionPerGram: 2.0,
    grind: "Coarse — like raw/turbinado sugar",
    waterTempF: { low: 38, high: 72 },
    bloom: {
      applies: false,
      waterMultiplier: 0,
      timeSec: 0,
      technique: "",
    },
    pourSchedule: "",
    totalBrewTimeSec: { low: 43200, high: 86400 },
    coldBrew: {
      steepHoursLow: 14,
      steepHoursHigh: 18,
      concentrateBrewRatio: 5,
      dilutionRatio: "brew a 1:5 concentrate, then cut to your chosen strength",
    },
    isImmersion: true,
    notes: [
      "No thermal bloom: cold water can't drive off CO₂ the way hot water does.",
      "Steep 14–18h refrigerated (smoothest); room temp up to 72°F works but shorten the steep. Past ~24h it can turn woody.",
      "Stir once at the start so no grounds stay dry, then leave it alone.",
      "You brew a strong 1:5 concentrate, then dilute to the strength you picked — keep concentrate sealed in the fridge up to 2 weeks.",
    ],
    tasteSummary:
      "Smooth, sweet, and very low in acidity and bitterness — chocolatey and mellow.",
    sources: ["Specialty cold brew immersion guides"],
  },
};

export const BREW_METHODS = METHODS;
