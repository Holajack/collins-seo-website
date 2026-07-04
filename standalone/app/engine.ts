// ─────────────────────────────────────────────────────────────────────────
// Coffee Brew Engine — pure, dependency-free math.
//
// The whole point: you tell it the FINISHED beverage volume you want in the
// cup, the method, and the taste style. It returns the exact dose, water,
// bloom, temperature, grind and a timed pour schedule.
//
// The non-obvious bit most calculators get wrong: ground coffee retains
// water. For drip/immersion the grounds hold back roughly 2 g of water per
// 1 g of coffee. So if you pour exactly your target volume of water, you end
// up with noticeably LESS in the cup. We solve the coupled equation so the
// number you ask for is the number you actually drink.
// ─────────────────────────────────────────────────────────────────────────

export type StyleKey = "strong" | "balanced" | "light";

export type TargetMode = "cup" | "water";

export interface BloomSpec {
  applies: boolean;
  waterMultiplier: number; // bloom water grams = coffee grams * this
  timeSec: number;
  technique: string;
}

export interface ColdBrewSpec {
  steepHoursLow: number;
  steepHoursHigh: number;
  /** The ratio the concentrate is actually brewed at (coffee:water, 1:R). */
  concentrateBrewRatio: number;
  dilutionRatio: string; // human readable, e.g. "1:1 concentrate to water"
}

export interface BrewMethod {
  key: string;
  name: string;
  blurb: string;
  styleRatios: Record<StyleKey, number>; // ratio denominator (coffee:water = 1:R)
  recommendedRatio: number;
  /** Liquid retained by the grounds, grams of water per gram of coffee. */
  absorptionPerGram: number;
  grind: string;
  waterTempF: { low: number; high: number };
  bloom: BloomSpec;
  pourSchedule: string;
  totalBrewTimeSec: { low: number; high: number };
  coldBrew?: ColdBrewSpec;
  isImmersion: boolean;
  notes: string[];
  tasteSummary: string;
  sources: string[];
}

export interface PourStep {
  label: string;
  atSec: number; // cumulative time the step should begin
  waterToG: number; // cumulative water on the scale after this pour (grams)
  addG: number; // water added during this step (grams)
  detail: string;
}

export interface BrewResult {
  method: BrewMethod;
  style: StyleKey;
  ratio: number;
  // weights
  coffeeG: number;
  totalWaterG: number;
  bloomWaterG: number;
  brewWaterG: number; // water poured after the bloom
  finishedVolumeMl: number;
  finishedVolumeOz: number;
  absorbedG: number;
  // brewing detail
  waterTempF: { low: number; high: number };
  waterTempC: { low: number; high: number };
  steps: PourStep[];
  // cold brew specifics (only present for cold brew)
  coldBrew?: {
    concentrateWaterG: number;
    dilutionWaterG: number;
    steepHoursLow: number;
    steepHoursHigh: number;
  };
}

// Unit helpers ──────────────────────────────────────────────────────────────
export const OZ_TO_ML = 29.5735;
export const ML_PER_G_WATER = 1; // water density ≈ 1 g/ml at brew-relevant temps
export const fToC = (f: number) => Math.round(((f - 32) * 5) / 9);
export const round = (n: number, dp = 0) => {
  const m = Math.pow(10, dp);
  return Math.round(n * m) / m;
};

export function ozToMl(oz: number) {
  return oz * OZ_TO_ML;
}

/**
 * Core solve.
 *
 * targetMode "cup": `targetMl` is the liquid you want IN THE CUP. We back out
 *   the dose from  cup = coffee*ratio - coffee*absorption  →
 *   coffee = cup / (ratio - absorption).
 *
 * targetMode "water": `targetMl` is the total water you pour. Then
 *   coffee = water / ratio  and the cup is whatever survives absorption.
 *
 * Cold brew is handled separately because it brews a concentrate that is then
 * diluted; the steep "water" is the concentrate water, and dilution makes up
 * the finished volume.
 */
export function calculateBrew(
  method: BrewMethod,
  style: StyleKey,
  targetMl: number,
  targetMode: TargetMode,
  customRatio?: number
): BrewResult {
  const ratio = customRatio && customRatio > 0 ? customRatio : method.styleRatios[style];
  const absorption = method.absorptionPerGram;

  if (method.coldBrew) {
    return coldBrewSolve(method, style, ratio, targetMl);
  }

  let coffeeG: number;
  let totalWaterG: number;

  if (targetMode === "cup") {
    // grams of liquid we want out the bottom = targetMl (water density ≈ 1)
    coffeeG = targetMl / (ratio - absorption);
    totalWaterG = coffeeG * ratio;
  } else {
    totalWaterG = targetMl;
    coffeeG = totalWaterG / ratio;
  }

  const absorbedG = coffeeG * absorption;
  const finishedVolumeMl = totalWaterG - absorbedG;

  const bloomWaterG = method.bloom.applies
    ? coffeeG * method.bloom.waterMultiplier
    : 0;
  const brewWaterG = totalWaterG - bloomWaterG;

  const steps = buildPourSchedule(method, coffeeG, totalWaterG, bloomWaterG);

  return {
    method,
    style,
    ratio,
    coffeeG: round(coffeeG, 1),
    totalWaterG: round(totalWaterG),
    bloomWaterG: round(bloomWaterG),
    brewWaterG: round(brewWaterG),
    finishedVolumeMl: round(finishedVolumeMl),
    finishedVolumeOz: round(finishedVolumeMl / OZ_TO_ML, 1),
    absorbedG: round(absorbedG),
    waterTempF: method.waterTempF,
    waterTempC: { low: fToC(method.waterTempF.low), high: fToC(method.waterTempF.high) },
    steps,
  };
}

function coldBrewSolve(
  method: BrewMethod,
  style: StyleKey,
  ratio: number,
  targetMl: number
): BrewResult {
  // The critic's key catch: do NOT conflate the concentrate ratio with the
  // ready-to-drink ratio. Here `ratio` is the FINAL in-glass strength the user
  // picked (e.g. 1:15). We brew a strong concentrate at a fixed brew ratio and
  // derive exactly how much water to cut it with to land on that final strength.
  //
  //   coffee   = V / (ratio - absorption)        (same absorption solve as drip)
  //   total    = coffee * ratio                  (all water that ends up as drink)
  //   brew     = coffee * concentrateBrewRatio   (water that steeps with grounds)
  //   dilution = total - brew                    (cold water/milk added after)
  const absorption = method.absorptionPerGram;
  const brewRatio = method.coldBrew!.concentrateBrewRatio;

  const coffeeG = targetMl / (ratio - absorption);
  const totalWaterG = coffeeG * ratio;
  const concentrateWaterG = coffeeG * brewRatio;
  const dilutionWaterG = totalWaterG - concentrateWaterG;
  const absorbedG = coffeeG * absorption;
  const finishedVolumeMl = totalWaterG - absorbedG;

  return {
    method,
    style,
    ratio,
    coffeeG: round(coffeeG, 1),
    totalWaterG: round(totalWaterG),
    bloomWaterG: 0,
    brewWaterG: round(concentrateWaterG),
    finishedVolumeMl: round(finishedVolumeMl),
    finishedVolumeOz: round(finishedVolumeMl / OZ_TO_ML, 1),
    absorbedG: round(absorbedG),
    waterTempF: method.waterTempF,
    waterTempC: { low: fToC(method.waterTempF.low), high: fToC(method.waterTempF.high) },
    steps: [],
    coldBrew: {
      concentrateWaterG: round(concentrateWaterG),
      dilutionWaterG: round(dilutionWaterG),
      steepHoursLow: method.coldBrew!.steepHoursLow,
      steepHoursHigh: method.coldBrew!.steepHoursHigh,
    },
  };
}

/**
 * Build a timed pour schedule. Hot pour-over style methods get a bloom + a
 * number of pulse pours sized to the brewer. Immersion methods (AeroPress,
 * siphon) collapse to a single steep step.
 */
function buildPourSchedule(
  method: BrewMethod,
  coffeeG: number,
  totalWaterG: number,
  bloomWaterG: number
): PourStep[] {
  const steps: PourStep[] = [];

  // French press gets its own staged timeline: bloom -> fill -> break the
  // crust & skim -> slow press. The press moment is what shapes the cup.
  if (method.key === "frenchpress") {
    const bloomG = method.bloom.applies ? round(bloomWaterG) : 0;
    const t = method.totalBrewTimeSec.high; // press lands at the end
    if (bloomG > 0) {
      steps.push({
        label: "Bloom & stir",
        atSec: 0,
        waterToG: bloomG,
        addG: bloomG,
        detail: `${round(method.bloom.timeSec)}s rest. ${method.bloom.technique}`,
      });
    }
    steps.push({
      label: "Fill",
      atSec: method.bloom.timeSec,
      waterToG: round(totalWaterG),
      addG: round(totalWaterG - bloomG),
      detail:
        "Pour to the target weight, put the lid on with the plunger raised, and leave it alone — no stirring yet.",
    });
    steps.push({
      label: "Break the crust & skim",
      atSec: 240,
      waterToG: round(totalWaterG),
      addG: 0,
      detail:
        "Push the crust gently with a spoon (2–3 strokes), then skim off the floating foam and grounds. This drops the bed and stops the crust from over-steeping.",
    });
    steps.push({
      label: "Press — slowly",
      atSec: Math.max(300, t - 30),
      waterToG: round(totalWaterG),
      addG: 0,
      detail:
        "Press over ~20–30s, stopping at the liquid's surface — don't crush the bed. Pour every cup immediately so it stops extracting.",
    });
    return steps;
  }

  if (method.isImmersion && !method.bloom.applies) {
    steps.push({
      label: "Add all water",
      atSec: 0,
      waterToG: round(totalWaterG),
      addG: round(totalWaterG),
      detail: "Pour all water over the grounds and stir to fully saturate.",
    });
    return steps;
  }

  if (method.bloom.applies) {
    steps.push({
      label: "Bloom",
      atSec: 0,
      waterToG: round(bloomWaterG),
      addG: round(bloomWaterG),
      detail: `${round(method.bloom.timeSec)}s rest. ${method.bloom.technique}`,
    });
  }

  const remaining = totalWaterG - bloomWaterG;

  if (method.isImmersion) {
    // siphon / AeroPress with a bloom: one main charge after the bloom
    steps.push({
      label: "Add remaining water",
      atSec: method.bloom.timeSec,
      waterToG: round(totalWaterG),
      addG: round(remaining),
      detail: "Add the rest of the water, stir gently, then steep / press per the method.",
    });
    return steps;
  }

  // Pour-over (V60 / Chemex): split the remaining water into staged pulses.
  // Bigger brews get more pulses so the bed never floods.
  const pulses = remaining > 500 ? 3 : 2;
  const perPulse = remaining / pulses;
  const window = method.totalBrewTimeSec.high - method.bloom.timeSec;
  const interval = window / (pulses + 1);
  let cumulative = bloomWaterG;
  for (let i = 1; i <= pulses; i++) {
    cumulative += perPulse;
    steps.push({
      label: `Pour ${i}`,
      atSec: round(method.bloom.timeSec + interval * i),
      waterToG: round(cumulative),
      addG: round(perPulse),
      detail:
        i === pulses
          ? "Final pour — bring the water up to the target weight in slow concentric circles."
          : "Pour in slow concentric circles, keeping the bed level. Let it draw down before the next pour.",
    });
  }
  return steps;
}

export function formatTime(totalSec: number): string {
  // Derive minutes and seconds from the same floored integer — rounding the
  // remainder alone renders impossible times like "0:60" for fractional
  // inputs (the live timer feeds this every frame).
  const t = Math.floor(totalSec);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Custom dose mode ───────────────────────────────────────────────────────
// The user gives total coffee and total water directly; we derive the ratio
// and everything downstream. For cold brew the water is the STEEP water, so
// the yield is strained concentrate — dilution is left to taste.

export function calculateFromDose(
  method: BrewMethod,
  coffeeG: number,
  waterG: number
): BrewResult {
  const safeCoffee = Math.max(0.1, coffeeG);
  const safeWater = Math.max(1, waterG);
  const ratio = round(safeWater / safeCoffee, 1);
  const absorbedG = safeCoffee * method.absorptionPerGram;
  const finishedVolumeMl = Math.max(0, safeWater - absorbedG);

  const bloomWaterG = method.bloom.applies
    ? safeCoffee * method.bloom.waterMultiplier
    : 0;
  const brewWaterG = safeWater - bloomWaterG;

  const steps = method.coldBrew
    ? []
    : buildPourSchedule(method, safeCoffee, safeWater, bloomWaterG);

  return {
    method,
    style: "balanced",
    ratio,
    coffeeG: round(safeCoffee, 1),
    totalWaterG: round(safeWater),
    bloomWaterG: round(bloomWaterG),
    brewWaterG: round(brewWaterG),
    finishedVolumeMl: round(finishedVolumeMl),
    finishedVolumeOz: round(finishedVolumeMl / OZ_TO_ML, 1),
    absorbedG: round(absorbedG),
    waterTempF: method.waterTempF,
    waterTempC: {
      low: fToC(method.waterTempF.low),
      high: fToC(method.waterTempF.high),
    },
    steps,
    ...(method.coldBrew
      ? {
          coldBrew: {
            concentrateWaterG: round(safeWater),
            dilutionWaterG: 0,
            steepHoursLow: method.coldBrew.steepHoursLow,
            steepHoursHigh: method.coldBrew.steepHoursHigh,
          },
        }
      : {}),
  };
}

// ─── Capacity fit ───────────────────────────────────────────────────────────
// Does this recipe physically fit the chosen brewer? Immersion chambers and
// siphon bulbs are hard caps on brew water; pour-over/Chemex are capped by
// the server the brew drains into; cold brew vessels cap the steep water.

export interface BrewerLike {
  id: string;
  brand: string;
  model: string;
  maxWaterMl: number;
  capacityKind: "chamber" | "bulb" | "server" | "vessel" | "carafe";
}

export interface FitReport {
  fits: boolean;
  plan: "ok" | "bypass" | "reduce" | "upsize";
  usedMl: number; // the volume this brewer must actually hold
  capacityMl: number;
  message: string;
  bypass?: {
    chamberWaterG: number; // water that brews in the chamber (concentrate)
    bypassWaterG: number; // hot water added to the cup after pressing
  };
}

export function assessFit(result: BrewResult, brewer: BrewerLike): FitReport {
  const cap = brewer.maxWaterMl;
  const name = `${brewer.brand} ${brewer.model}`;

  // What the brewer must hold, by capacity kind:
  //  chamber/bulb — all brew water sits with the grounds at once
  //  server       — the finished brew drains into it
  //  vessel       — the steep water (cold brew concentrate)
  const usedMl =
    brewer.capacityKind === "server"
      ? result.finishedVolumeMl
      : brewer.capacityKind === "vessel"
      ? result.brewWaterG
      : result.totalWaterG;

  if (usedMl <= cap) {
    return {
      fits: true,
      plan: "ok",
      usedMl,
      capacityMl: cap,
      message: `Fits your ${name} — ${usedMl} of ${cap} ml.`,
    };
  }

  if (brewer.capacityKind === "chamber") {
    // AeroPress-style: brew a concentrate at full dose with as much water as
    // the chamber holds, then top the cup with hot bypass water. Same coffee,
    // same total water in the cup — standard championship technique.
    const chamberWaterG = cap;
    const bypassWaterG = round(result.totalWaterG - cap);
    return {
      fits: false,
      plan: "bypass",
      usedMl,
      capacityMl: cap,
      message: `${result.totalWaterG} g of water won't fit the ${name} chamber (${cap} ml). Brew a concentrate with ${chamberWaterG} g in the chamber, press, then top the cup with ${bypassWaterG} g of hot water — same strength, same cup.`,
      bypass: { chamberWaterG, bypassWaterG },
    };
  }

  if (brewer.capacityKind === "bulb" || brewer.capacityKind === "carafe") {
    const vesselWord = brewer.capacityKind === "bulb" ? "lower bulb" : "beaker";
    const maxCupMl = Math.floor(
      (cap / result.totalWaterG) * result.finishedVolumeMl
    );
    return {
      fits: false,
      plan: "reduce",
      usedMl,
      capacityMl: cap,
      message: `The ${name} ${vesselWord} holds ${cap} ml — this brew needs ${usedMl} g of water. Brew up to ~${maxCupMl} ml (${round(maxCupMl / OZ_TO_ML, 1)} oz) in it, or step up a size.`,
    };
  }

  // server / vessel
  return {
    fits: false,
    plan: "upsize",
    usedMl,
    capacityMl: cap,
    message: `This brew ${
      brewer.capacityKind === "vessel" ? "steeps" : "yields"
    } ${usedMl} ml — over the ${name}'s ${cap} ml. Pick a larger size or brew less.`,
  };
}

// Pour steps for an AeroPress bypass brew: bloom, fill only to the chamber
// cap, press, then top the cup with the bypass water.
export function buildBypassSteps(
  coffeeG: number,
  chamberWaterG: number,
  bypassWaterG: number,
  bloomMultiplier: number,
  bloomTimeSec: number,
  totalSec: number
): PourStep[] {
  const bloomG = round(coffeeG * bloomMultiplier);
  const pressStart = Math.max(bloomTimeSec + 60, totalSec - 45);
  return [
    {
      label: "Bloom",
      atSec: 0,
      waterToG: bloomG,
      addG: bloomG,
      detail: `Wet all the grounds with ${bloomG} g and stir. Rest ${bloomTimeSec}s.`,
    },
    {
      label: "Fill chamber",
      atSec: bloomTimeSec,
      waterToG: round(chamberWaterG),
      addG: round(chamberWaterG - bloomG),
      detail: `Fill to ${round(chamberWaterG)} g — the chamber's practical max. This brews a concentrate; the strength math already accounts for it.`,
    },
    {
      label: "Stir, cap & press",
      atSec: pressStart,
      waterToG: round(chamberWaterG),
      addG: 0,
      detail: "Stir once, cap, and press slowly for ~20–30s. Stop at the hiss.",
    },
    {
      label: "Bypass",
      atSec: totalSec,
      waterToG: round(chamberWaterG + bypassWaterG),
      addG: round(bypassWaterG),
      detail: `Top the cup with ${round(bypassWaterG)} g of hot water to reach full volume at the right strength.`,
    },
  ];
}
