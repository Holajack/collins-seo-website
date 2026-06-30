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
      timeSec: 40,
      technique:
        "Pour about 2–3× the coffee's weight in water to fully saturate the bed, swirl the dripper gently for even wetting, then rest ~30–45s to degas (longer for fresher, lighter roasts). Fresh coffee will dome and bubble.",
    },
    pourSchedule:
      "After the bloom, pour in 2–3 slow concentric pulses, letting the bed draw down between each.",
    totalBrewTimeSec: { low: 180, high: 240 },
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
      timeSec: 40,
      technique:
        "Pour bloom water (about 2–3× the coffee weight) in a slow spiral from the center out until every ground is wet. Gently swirl the Chemex to soak any dry pockets, then rest ~30–45s to let CO₂ escape. The thick filter is slow, so an even bloom matters even more here.",
    },
    pourSchedule:
      "Pour in 2–3 stages in slow circles. The thick filter is forgiving on flow but unforgiving on a clogged bed — go coarser if it stalls.",
    totalBrewTimeSec: { low: 210, high: 300 },
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
      "All water goes in the lower bulb first. Heat until it rises to the top chamber, then add the grounds and stir 3–5 circles to saturate (this is the bloom-equivalent). Hold at a gentle flame ~91–93°C for 60–90s, give a final stir, then cut the heat — the vacuum draws the brew down in ~30–60s.",
    totalBrewTimeSec: { low: 120, high: 210 },
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
    bloom: {
      applies: true,
      waterMultiplier: 2,
      timeSec: 30,
      technique:
        "This isn't a true pour-over bloom — AeroPress is full immersion, so there's no draining bed to degas. But for fresh coffee it still helps: add ~2× the coffee weight, stir to wet everything, and rest 30s to release CO₂ before topping up. Skip the rest for darker roasts.",
    },
    pourSchedule:
      "After the bloom, fill to your target weight, stir once, cap, steep ~1:00, then press slowly and steadily for ~20–30s. Stop at the hiss.",
    totalBrewTimeSec: { low: 120, high: 210 },
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

  coldbrew: {
    key: "coldbrew",
    name: "Cold Brew",
    shortName: "Cold Brew",
    blurb:
      "Long, cold immersion. No heat, no bloom — just time. Smooth, low-acid, and naturally sweet.",
    // These are FINAL ready-to-drink strengths (the critic's key fix: don't
    // conflate the concentrate ratio with what you actually drink). The engine
    // brews a strong 1:5 concentrate and derives exactly how much water to cut
    // it with to land on the chosen final strength.
    styleRatios: { strong: 13, balanced: 15, light: 17 },
    recommendedRatio: 15,
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
