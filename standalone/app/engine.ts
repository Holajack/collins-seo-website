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
  /** "action" (default): the human must DO something now — chime + tap.
   *  "phase": passive stretch (steep/drawdown/done) — shown softly, silent;
   *  the human paces against pours, not against waiting. */
  kind?: "action" | "phase";
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

  const steps = buildPourSchedule(method, coffeeG, totalWaterG, bloomWaterG, style);

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

// French press timing is style-dependent (verified against Hoffmann-method
// research + an adversarial critic): bold decants right after the crust
// break; balanced settles the full nine minutes; light extends the steep to
// lift extraction WITHOUT grinding finer.
export function frenchPressPlan(style: StyleKey) {
  const plans = {
    strong: { breakAtSec: 240, pressAtSec: 255, pressDurSec: 25, totalSec: 280 },
    balanced: { breakAtSec: 240, pressAtSec: 540, pressDurSec: 20, totalSec: 560 },
    light: { breakAtSec: 240, pressAtSec: 360, pressDurSec: 25, totalSec: 385 },
  } as const;
  return plans[style];
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
  bloomWaterG: number,
  style: StyleKey = "balanced"
): PourStep[] {
  const steps: PourStep[] = [];

  // French press: fill -> crust break & skim at 4:00 -> style-timed press.
  // No separate bloom — the crust that forms on top IS the bloom, and
  // breaking it at 4:00 is what ends its steep. The press moment is the
  // style lever: right away for bold, ~6:00 for light, ~9:00 for balanced.
  if (method.key === "frenchpress") {
    const plan = frenchPressPlan(style);
    steps.push({
      label: "Fill — all at once",
      atSec: 0,
      waterToG: round(totalWaterG),
      addG: round(totalWaterG),
      detail:
        "One steady pour to the target weight, wetting everything. No stirring — a crust of grounds will form on top; that crust is your bloom. Lid on, plunger up.",
    });
    steps.push({
      label: "Break the crust & skim",
      atSec: plan.breakAtSec,
      waterToG: round(totalWaterG),
      addG: 0,
      detail:
        "Push the crust gently with a spoon (2–3 strokes) and skim off the floating foam and stray grounds. The grounds now sink, so extraction largely plateaus — the wait from here is about letting fines settle for a cleaner cup.",
    });
    const settleWait = plan.pressAtSec - plan.breakAtSec;
    steps.push({
      label:
        style === "strong" ? "Pour now (rustic)" : "Rest the plunger & pour",
      atSec: plan.pressAtSec,
      waterToG: round(totalWaterG),
      addG: 0,
      detail:
        style === "strong"
          ? "Lower the plunger just to the surface — do NOT plunge to the bottom — and pour right away. Decanting this early keeps the most body but also the most sediment, for a bold, rustic cup."
          : `Fines have had ~${Math.round(
              settleWait / 60
            )} min to settle. Lower the plunger only until the mesh rests on the surface — never plunge to the bottom, or you'll stir the silt back up — then pour off the clean coffee. Serve every cup so it stops extracting.`,
    });
    return steps;
  }

  // Method-specific full-process timelines, verified against a per-method
  // research + adversarial-critic pass (Hoffmann techniques, Hario / Chemex /
  // AeroPress official guides, Blue Bottle / Prufrock / WAC recipes). Every
  // event the brewer must act on gets its own timed, chimed step.
  if (method.key === "pourover_v60") {
    return v60Schedule(totalWaterG, bloomWaterG);
  }
  if (method.key === "chemex") {
    return chemexSchedule(totalWaterG, bloomWaterG);
  }
  if (method.key === "siphon") {
    return siphonSchedule(coffeeG, totalWaterG);
  }
  if (method.key === "aeropress") {
    return aeropressSchedule(coffeeG, totalWaterG, bloomWaterG);
  }

  // Fallback for any future immersion method without a bespoke timeline.
  steps.push({
    label: "Add all water",
    atSec: 0,
    waterToG: round(totalWaterG),
    addG: round(totalWaterG),
    detail: "Pour all water over the grounds and stir to fully saturate.",
  });
  return steps;
}

// ─── Verified per-method timelines ─────────────────────────────────────────
// The timer's total time is the last step's atSec — each schedule ends with
// an explicit "Done" step so the completion chime lands on the real finish.

// Hario V60 — James Hoffmann's Ultimate V60 (2-pour) for standard batches,
// his 1-cup technique (equal pulses) below ~300 g, slower drawdown above
// ~450 g. Sources: Hoffmann Ultimate V60 + Better 1 Cup, Hario official,
// Stumptown (2:30–3:00 small-batch drawdown target).
function v60Schedule(totalWaterG: number, bloomWaterG: number): PourStep[] {
  const total = round(totalWaterG);
  const bloom = round(bloomWaterG);

  if (totalWaterG < 300) {
    // 1-cup technique: bloom, then four equal pulses.
    const perPour = (totalWaterG - bloomWaterG) / 4;
    const at = [45, 70, 90, 110];
    const steps: PourStep[] = [
      {
        label: "Bloom & swirl",
        atSec: 0,
        waterToG: bloom,
        addG: bloom,
        detail: `Pour ${bloom} g to wet every ground, then gently swirl the dripper until the slurry is even. Rest until 0:45.`,
      },
    ];
    let cum = bloomWaterG;
    at.forEach((t, i) => {
      cum += perPour;
      steps.push({
        label: `Pour ${i + 1} of 4`,
        atSec: t,
        waterToG: round(cum),
        addG: round(perPour),
        detail:
          i === 3
            ? `Final pulse up to ${round(cum)} g, then one gentle swirl to flatten the bed.`
            : `Pour to ${round(cum)} g in slow circles over ~10s, keeping the bed level.`,
      });
    });
    steps.push({
      label: "Drawdown",
      atSec: 130,
      waterToG: total,
      addG: 0,
      detail: "Hands off — let it drain. The bed should end flat and even.",
    });
    steps.push({
      label: "Done — remove dripper",
      atSec: 180,
      waterToG: total,
      addG: 0,
      detail:
        "Drawdown should finish around 3:00. Well past 3:30? Grind coarser next time. Under 2:45? Grind finer.",
    });
    return steps;
  }

  const large = totalWaterG > 450;
  const p1 = round(Math.max(totalWaterG * 0.6, bloomWaterG));
  return [
    {
      label: "Bloom & swirl",
      atSec: 0,
      waterToG: bloom,
      addG: bloom,
      detail: `Pour ${bloom} g quickly to saturate every ground, swirl the dripper gently until even, then rest — CO₂ escapes and the bed settles. Next pour at 0:45.`,
    },
    {
      label: "First pour — to 60%",
      atSec: 45,
      waterToG: p1,
      addG: round(p1 - bloomWaterG),
      detail: `Pour steadily in slow circles up to ${p1} g by 1:15${
        large ? " — a bigger batch means a faster pour, keep it smooth" : ""
      }. This pour drives extraction, so stay controlled.`,
    },
    {
      label: "Second pour — to 100%",
      atSec: 75,
      waterToG: total,
      addG: round(totalWaterG - p1),
      detail: `Pour a little slower, in gentle circles, up to ${total} g by 1:45.`,
    },
    {
      label: "Stir",
      atSec: 105,
      waterToG: total,
      addG: 0,
      detail:
        "One gentle stir clockwise, one counter-clockwise, to knock grounds off the filter walls.",
    },
    {
      label: "Final swirl",
      atSec: 115,
      waterToG: total,
      addG: 0,
      detail:
        "Once the level drops a little, one gentle swirl to flatten the bed for an even drawdown.",
    },
    {
      label: "Drawdown",
      atSec: 125,
      waterToG: total,
      addG: 0,
      detail: "Hands off — let the water drain through. Aim for a flat, even bed.",
    },
    {
      label: "Done — remove dripper",
      atSec: large ? 225 : 195,
      waterToG: total,
      addG: 0,
      detail: large
        ? "Big batches draw down slowly — done by ~3:45 is on target. Past 4:15? Grind slightly coarser."
        : "Drawdown should finish between 3:00 and 3:30. Well past 3:30? Grind coarser. Before 2:45? Grind finer.",
    },
  ];
}

// Chemex — official Chemex guide + Hoffmann + Blue Bottle staged pours; the
// thick bonded filter makes drawdown roughly as long as the pouring phase.
// Small carafes take two main pours, the classic three, big batches four.
function chemexSchedule(totalWaterG: number, bloomWaterG: number): PourStep[] {
  const total = round(totalWaterG);
  const bloom = round(bloomWaterG);

  const pourStep = (
    n: number,
    of: number,
    atSec: number,
    toG: number,
    fromG: number,
    finishBy: string
  ): PourStep => ({
    label: `Pour ${n} of ${of}`,
    atSec,
    waterToG: round(toG),
    addG: round(toG - fromG),
    detail: `Spiral from the center out to ${round(
      toG
    )} g, rinsing grounds off the filter walls — finish around ${finishBy}. Keep the level below the filter's top.`,
  });

  const bloomStep: PourStep = {
    label: "Bloom",
    atSec: 0,
    waterToG: bloom,
    addG: bloom,
    detail: `Pour ${bloom} g in a slow spiral until every ground is wet, give one gentle stir or swirl, then rest — the thick filter makes an even bloom matter even more. Next pour at 0:45.`,
  };

  let pours: PourStep[];
  let stirAt: number;
  let doneAt: number;
  let doneDetail: string;

  if (totalWaterG < 340) {
    // 3-cup: two main pours, total ~3:45.
    const mid = Math.max(totalWaterG * 0.55, bloomWaterG);
    pours = [
      pourStep(1, 2, 45, mid, bloomWaterG, "1:15"),
      pourStep(2, 2, 90, totalWaterG, mid, "1:50"),
    ];
    stirAt = 120;
    doneAt = 225;
    doneDetail =
      "A small Chemex should finish around 3:30–4:00. Discard the filter, swirl the carafe, and pour.";
  } else if (totalWaterG <= 560) {
    // classic 6-cup: three staged pours, total ~4:45.
    const p1 = Math.max(totalWaterG * 0.5, bloomWaterG);
    const p2 = totalWaterG * 0.75;
    pours = [
      pourStep(1, 3, 45, p1, bloomWaterG, "1:15"),
      pourStep(2, 3, 90, p2, p1, "1:50"),
      pourStep(3, 3, 135, totalWaterG, p2, "2:30"),
    ];
    stirAt = 165;
    doneAt = 285;
    doneDetail =
      "Drawdown should finish around 4:30–5:00 total. Well past 5:30? Grind coarser. Under 4:00? Grind finer.";
  } else {
    // 8/10-cup: four staged pours, total ~5:30 — add pours, not bigger ones.
    const marks = [0.4, 0.6, 0.8, 1.0].map((f) =>
      Math.max(totalWaterG * f, bloomWaterG)
    );
    const at = [45, 85, 125, 165];
    const finish = ["1:15", "1:55", "2:35", "3:15"];
    pours = marks.map((m, i) =>
      pourStep(i + 1, 4, at[i], m, i === 0 ? bloomWaterG : marks[i - 1], finish[i])
    );
    stirAt = 195;
    doneAt = 330;
    doneDetail =
      "Big batches run ~5:00–6:00 total. Grind slightly coarser than the classic size to keep it under 6:00.";
  }

  return [
    bloomStep,
    ...pours,
    {
      label: "Stir & swirl",
      atSec: stirAt,
      waterToG: total,
      addG: 0,
      detail:
        "One gentle stir clockwise and counter-clockwise, then a light swirl — knocks grounds off the walls and flattens the bed.",
    },
    {
      label: "Drawdown",
      atSec: stirAt + 10,
      waterToG: total,
      addG: 0,
      detail:
        "Hands off — the thick filter takes its time. A flat, even bed at the end means even extraction.",
    },
    {
      label: "Done — serve",
      atSec: doneAt,
      waterToG: total,
      addG: 0,
      detail: doneDetail,
    },
  ];
}

// Siphon — timer starts the moment the water has fully risen into the top
// chamber (heat-up varies by burner). Steep scales with batch: ~60s small,
// ~75s standard, ~95s large (barismo: 90s for 3-cup, 100s for 5-cup).
// Sources: Hario official (70s steep), Prufrock (heat off at 1:00),
// Blue Bottle (90s), Hoffmann (keep total contact under ~2 min).
function siphonSchedule(coffeeG: number, totalWaterG: number): PourStep[] {
  const total = round(totalWaterG);
  const small = totalWaterG < 300;
  const large = totalWaterG > 560;
  const crustAt = small ? 30 : large ? 50 : 45;
  const heatOffAt = small ? 60 : large ? 95 : 75;
  const doneAt = small ? 105 : large ? 165 : 120;

  return [
    {
      label: "Add coffee & first stir",
      atSec: 0,
      waterToG: total,
      addG: total,
      detail: `Before starting: filter seated (chain hooked under the funnel), ${total} g of hot water in the bulb, heat on until the water has fully risen — that moment is 0:00. Add ${round(
        coffeeG,
        1
      )} g of coffee and stir gently 3–5 circles so every ground submerges.`,
    },
    {
      label: "Steep — heat to low",
      atSec: 10,
      waterToG: total,
      addG: 0,
      detail:
        "Turn the burner to the lowest flame that keeps the water up top. Gentle activity in the slurry is right — violent bubbling is too much heat.",
    },
    {
      label: "Break the crust",
      atSec: crustAt,
      waterToG: total,
      addG: 0,
      detail:
        "One brief, gentle mid-steep stir — a light cross pattern — to break the floating crust and keep extraction even.",
    },
    {
      label: "Final stir — kill the heat",
      atSec: heatOffAt,
      waterToG: total,
      addG: 0,
      detail:
        "Remove the heat, then one gentle full-circle stir to start the drawdown and shape an even dome in the bed.",
    },
    {
      label: "Drawdown",
      atSec: heatOffAt + 5,
      waterToG: total,
      addG: 0,
      detail:
        "As the bulb cools, the vacuum pulls the brew down — don't rush it or reheat. A domed bed and a burst of bubbles at the end mean it went well.",
    },
    {
      label: "Done — serve",
      atSec: doneAt,
      waterToG: total,
      addG: 0,
      detail:
        "Rock the top chamber loose, swirl the lower globe, and pour. It's the STEEP that turns astringent past ~90s — the drawdown doesn't count — so with the heat already off, just serve right away.",
    },
  ];
}

// AeroPress — standard orientation, official recipe + Hoffmann Ultimate +
// WAC recipe conventions: bloom 30s, fill, brief stir, cap with a slight
// pull-up (the vacuum stops drip-through), steep to 2:00, 25–30s press.
function aeropressSchedule(
  coffeeG: number,
  totalWaterG: number,
  bloomWaterG: number
): PourStep[] {
  const total = round(totalWaterG);
  const bloom = round(bloomWaterG);
  return [
    {
      label: "Add coffee",
      atSec: 0,
      waterToG: 0,
      addG: 0,
      detail: `Filter in the cap, cap on the chamber, chamber on a sturdy mug on your scale. Have ${round(
        coffeeG,
        1
      )} g dosed and tared as the timer starts — 0:10 is purely the pour cue.`,
    },
    {
      label: "Bloom",
      atSec: 10,
      waterToG: bloom,
      addG: bloom,
      detail: `Pour ${bloom} g, wetting all the grounds, and give the slurry a quick gentle swirl. Rest until 0:40 — skip the rest for dark roasts.`,
    },
    {
      label: `Fill to ${total} g`,
      atSec: 40,
      waterToG: total,
      addG: round(totalWaterG - bloomWaterG),
      detail: `Pour the remaining ${round(
        totalWaterG - bloomWaterG
      )} g in a steady spiral, finishing by about 1:00.`,
    },
    {
      label: "Stir",
      atSec: 60,
      waterToG: total,
      addG: 0,
      detail: "Stir gently back and forth for about 3 seconds — don't over-agitate.",
    },
    {
      label: "Cap with the plunger",
      atSec: 70,
      waterToG: total,
      addG: 0,
      detail:
        "Insert the plunger about 1 cm and pull up slightly — the vacuum stops drip-through while you steep.",
    },
    {
      label: "Steep",
      atSec: 75,
      waterToG: total,
      addG: 0,
      detail: "Hands off until 2:00. Patience here is what buys the smooth cup.",
    },
    {
      label: "Press — slowly",
      atSec: 120,
      waterToG: total,
      addG: 0,
      detail:
        "Gentle, constant pressure for 25–30 seconds. Very hard to push? Grind coarser next time. Plunges instantly? Finer.",
    },
    {
      label: "Done",
      atSec: 150,
      waterToG: total,
      addG: 0,
      detail:
        "Stop at the hiss — pressing past it adds bitterness. Remove, swirl the cup, enjoy.",
    },
  ];
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
  // "open" = a dripper that sits on any mug (no fixed vessel) — the only
  // limit is that the cup underneath holds the finished volume.
  capacityKind: "chamber" | "bulb" | "server" | "vessel" | "carafe" | "open";
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
    brewer.capacityKind === "server" || brewer.capacityKind === "open"
      ? result.finishedVolumeMl
      : brewer.capacityKind === "vessel"
      ? result.brewWaterG
      : result.totalWaterG;

  // Open dripper on a mug: never a hard limit — just size the cup. Recommend a
  // mug that holds the finished volume plus a little headroom so it doesn't
  // brim while the last of the water drips through.
  if (brewer.capacityKind === "open") {
    const needMl = Math.ceil((result.finishedVolumeMl + 40) / 10) * 10;
    const needOz = Math.ceil(needMl / OZ_TO_ML);
    return {
      fits: true,
      plan: "ok",
      usedMl: result.finishedVolumeMl,
      capacityMl: needMl,
      message: `No capacity limit — the ${name} sits right on your cup. Just brew into a mug that holds at least ~${needOz} oz (${needMl} ml) so it won't overflow while it drips.`,
    };
  }

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

// Pour steps for an AeroPress bypass brew. Research-verified concentrate
// technique: a thick 1:7-ish slurry extracts fast, so skip the bloom, steep
// only ~60s, and press SLOWER than a normal cup (the finer-resisting bed
// channels if you rush) — then top the cup with hot bypass water.
export function buildBypassSteps(
  coffeeG: number,
  chamberWaterG: number,
  bypassWaterG: number
): PourStep[] {
  const chamber = round(chamberWaterG);
  return [
    {
      label: "Add coffee",
      atSec: 0,
      waterToG: 0,
      addG: 0,
      detail: `Filter in the cap, chamber on a mug big enough for the full cup. Have ${round(
        coffeeG,
        1
      )} g dosed and tared as the timer starts. This brews a concentrate — no bloom needed at this strength.`,
    },
    {
      label: `Fill chamber to ${chamber} g`,
      atSec: 10,
      waterToG: chamber,
      addG: chamber,
      detail: `Pour all ${chamber} g — the chamber's practical max — finishing by about 0:25. The strength math already accounts for the concentrate.`,
    },
    {
      label: "Stir & cap",
      atSec: 30,
      waterToG: chamber,
      addG: 0,
      detail:
        "Stir gently ~3 seconds, then insert the plunger about 1 cm and pull up slightly to stop drip-through.",
    },
    {
      label: "Steep",
      atSec: 40,
      waterToG: chamber,
      addG: 0,
      detail: "Hands off until 1:30 — a concentrate this strong extracts fast.",
    },
    {
      label: "Press — extra slow",
      atSec: 90,
      waterToG: chamber,
      addG: 0,
      detail:
        "Gentle, constant pressure over 30–45 seconds — the thick bed resists more, and rushing it channels. Stop at the hiss.",
    },
    {
      label: "Bypass — top up the cup",
      atSec: 135,
      waterToG: round(chamberWaterG + bypassWaterG),
      addG: round(bypassWaterG),
      detail: `Add ${round(
        bypassWaterG
      )} g of hot water straight into the cup — full volume at the right strength.`,
    },
    {
      label: "Done",
      atSec: 150,
      waterToG: round(chamberWaterG + bypassWaterG),
      addG: 0,
      detail: "Swirl and enjoy — same strength, same cup, bigger than the chamber.",
    },
  ];
}
