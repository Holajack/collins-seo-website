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
      kind: "action",
      label: "Fill — all at once",
      atSec: 0,
      waterToG: round(totalWaterG),
      addG: round(totalWaterG),
      detail:
        "One steady pour to the target weight, wetting everything. No stirring — a crust of grounds will form on top; that crust is your bloom. Lid on, plunger up.",
    });
    steps.push({
      kind: "action",
      label: "Break the crust & skim",
      atSec: plan.breakAtSec,
      waterToG: round(totalWaterG),
      addG: 0,
      detail:
        "Push the crust gently with a spoon (2–3 strokes) and skim off the floating foam and stray grounds. The grounds now sink, so extraction largely plateaus — the wait from here is about letting fines settle for a cleaner cup.",
    });
    const settleWait = plan.pressAtSec - plan.breakAtSec;
    if (settleWait > 60) {
      steps.push({
        kind: "phase",
        label: "Settle",
        atSec: plan.breakAtSec + 15,
        waterToG: round(totalWaterG),
        addG: 0,
        detail: `Hands off for ~${Math.round(
          (settleWait - 15) / 60
        )} min. Temperature falls and extraction stalls while the fines drop — clarity is the only thing still improving.`,
      });
    }
    steps.push({
      kind: "action",
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
    return aeropressSchedule(coffeeG, totalWaterG);
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
// THE PACING RULE (multi-agent research + critic pass, Jul 2026 — obey when
// editing any schedule below):
//  1. A step is a chimed ACTION only if it is a discrete hands-on task whose
//     start time matters to extraction within ~±5 s (start a pour, cut heat,
//     press). One chime per action, at its start.
//  2. Micro-moves under ~5 s with no independent timing (stir, swirl, tare,
//     set the kettle down) are FOLDED into the parent action's detail text —
//     never their own chime. Hoffmann performs his V60 stir+swirl as one
//     untimed gesture after the final pour; splitting it into timed steps is
//     what made schedules impossible to follow.
//  3. Next chime ≥ previous action's expected completion (pour ≈ 6 g/s) plus
//     a buffer; never two chimes within 15 s.
//  4. Passive stretches (steep, drawdown) are kind:"phase" — silent, soft —
//     and start 10–15 s AFTER the parent action ends so "hands off" never
//     lands mid-gesture.
//  5. The Done phase sits at the TOP of the expert's normal finish window
//     (err LONG): a brew that beats the timer feels like a win; a timer that
//     beats the brew feels like a failure. The completion chime is the one
//     terminal alarm.

// Hario V60 — Hoffmann's clock has exactly THREE moments: bloom 0:00, pour to
// 60% at 0:45, pour to 100% at 1:15. Stir + swirl are untimed finishing moves
// folded into pour 2. Real-world drawdown at ~400 g lands ≈4:00 (3:15–4:15
// normal). Sources: Hoffmann Ultimate V60 + Better 1 Cup, Hario official,
// Kasuya 4:6 (as the outer bound of followable chime density).
function v60Schedule(totalWaterG: number, bloomWaterG: number): PourStep[] {
  const total = round(totalWaterG);
  const bloom = round(bloomWaterG);
  const small = totalWaterG < 300;
  const large = totalWaterG > 450;
  const p1 = round(totalWaterG * 0.6);

  // Per-size finish anchors (critic-patched: Done at the TOP of the normal
  // window; Drawdown card delayed past the folded stir/swirl gesture).
  const pour2At = small ? 75 : large ? 75 : 80;
  const pour2FinishBy = small ? "1:35" : large ? "1:45" : "1:50";
  const drawdownAt = small ? 115 : large ? 125 : 130;
  const doneAt = small ? 210 : large ? 285 : 255;
  const doneDetail = small
    ? "Drawdown should be complete by now (~3:30). Anywhere from 2:40 to 3:30 is normal at this size. Past 3:30? Grind coarser next time — never rush this brew."
    : large
    ? "Drawdown should be complete by now (~4:45). 3:30 to 4:45 is a normal finish for a big batch. Past 4:45? Grind coarser next time."
    : "Drawdown should be complete by now (~4:15). 3:15 to 4:15 is the normal window — a 4:00 finish is spot on. Past 4:15? Grind coarser next time.";

  return [
    {
      kind: "action",
      label: "Bloom",
      atSec: 0,
      waterToG: bloom,
      addG: bloom,
      detail: `Pour ${bloom} g to wet every ground, then gently swirl the dripper until the slurry looks even (Hoffmann). Rest until the next chime.`,
    },
    {
      kind: "action",
      label: "Pour 1 — to 60%",
      atSec: 45,
      waterToG: p1,
      addG: round(p1 - bloomWaterG),
      detail: `Pour steadily in slow circles up to ${p1} g, finishing by ~${
        small ? "1:10" : "1:15"
      }. No stirring — just a smooth, controlled pour.`,
    },
    {
      kind: "action",
      label: "Pour 2 — to full weight",
      atSec: pour2At,
      waterToG: total,
      addG: round(totalWaterG - p1),
      detail: `Pour gently to ${total} g, finishing by ~${pour2FinishBy}. Kettle down, then Hoffmann's untimed finishing moves in one motion: a gentle spoon-stir clockwise and counter-clockwise to knock grounds off the walls, then a soft swirl to flatten the bed. Do them as you finish — no cue is coming.`,
    },
    {
      kind: "phase",
      label: "Drawdown",
      atSec: drawdownAt,
      waterToG: total,
      addG: 0,
      detail:
        "Once your swirl settles: hands off. The water drains through on its own; the bed should end flat and even.",
    },
    {
      kind: "phase",
      label: "Done — remove dripper",
      atSec: doneAt,
      waterToG: total,
      addG: 0,
      detail: doneDetail,
    },
  ];
}

// Chemex — same three-action shape as the V60 for small/standard (Hoffmann's
// Better Chemex is literally bloom / 60% / 100%); batches over ~560 g add one
// pour so no single pour exceeds a controllable ~6–7 g/s. The bonded filter
// makes drawdown long — Done errs accordingly. Sources: Chemex official,
// Hoffmann, Blue Bottle.
function chemexSchedule(totalWaterG: number, bloomWaterG: number): PourStep[] {
  const total = round(totalWaterG);
  const bloom = round(bloomWaterG);
  const small = totalWaterG < 300;
  const large = totalWaterG > 560;

  if (large) {
    const p1 = round(totalWaterG * 0.45);
    const p2 = round(totalWaterG * 0.75);
    return [
      {
        kind: "action",
        label: "Bloom",
        atSec: 0,
        waterToG: bloom,
        addG: bloom,
        detail: `Filter rinsed and rinse water dumped? Triple-fold side toward the spout. Then pour ${bloom} g in gentle circles from the center, wetting all the grounds; wiggle the slurry softly to kill dry pockets. Rest until the next chime.`,
      },
      {
        kind: "action",
        label: "Pour 1 — to 45%",
        atSec: 45,
        waterToG: p1,
        addG: round(p1 - bloomWaterG),
        detail: `Slow center-out spiral to ${p1} g, finishing by ~1:30. Keep the water level a quarter inch below the rim.`,
      },
      {
        kind: "action",
        label: "Pour 2 — to 75%",
        atSec: 105,
        waterToG: p2,
        addG: round(p2 - p1),
        detail: `Same spiral to ${p2} g, finishing by ~2:15 (a full 10-cup can take to ~2:30 — keep the pour gentle, never rushed). Rinse grounds off the filter walls with the stream as you go.`,
      },
      {
        kind: "action",
        label: "Pour 3 — to full weight",
        atSec: 150,
        waterToG: total,
        addG: round(totalWaterG - p2),
        detail: `Pour gently to ${total} g by ~3:00 (up to ~3:10 for the biggest batches). As the pour ends: one gentle spoon-stir each direction or a light swirl — untimed finishing moves, done as you set the kettle down.`,
      },
      {
        kind: "phase",
        label: "Drawdown",
        atSec: 195,
        waterToG: total,
        addG: 0,
        detail:
          "Once your swirl settles: hands off. Big Chemex batches drain slowly through the bonded filter — minutes of quiet drawdown is expected. The bed should end flat.",
      },
      {
        kind: "phase",
        label: "Done — serve",
        atSec: 405,
        waterToG: total,
        addG: 0,
        detail:
          "Should be finished by now. Normal totals: ~5:00–6:00 for 700 g, ~5:30–6:45 for a liter. Past 7:15? Grind coarser next time, or check the filter's triple-fold is toward the spout.",
      },
    ];
  }

  const p1 = round(totalWaterG * 0.6);
  const pour1At = small ? 40 : 45;
  const pour2At = small ? 80 : 85;
  const drawdownAt = small ? 120 : 130;
  const doneAt = small ? 225 : 285;
  return [
    {
      kind: "action",
      label: "Bloom",
      atSec: 0,
      waterToG: bloom,
      addG: bloom,
      detail: `Filter rinsed and rinse water dumped? Triple-fold side toward the spout. Then pour ${bloom} g in gentle circles from the center until every ground is wet; a soft wiggle of the slurry as you finish kills dry pockets. Rest until the ${
        small ? "0:40" : "0:45"
      } chime.`,
    },
    {
      kind: "action",
      label: "Pour 1 — to 60%",
      atSec: pour1At,
      waterToG: p1,
      addG: round(p1 - bloomWaterG),
      detail: `Slow center-out spiral to ${p1} g, finishing by ~${
        small ? "1:10" : "1:15"
      }. Use the stream to break up clumps and rinse grounds off the filter walls.`,
    },
    {
      kind: "action",
      label: "Pour 2 — to full weight",
      atSec: pour2At,
      waterToG: total,
      addG: round(totalWaterG - p1),
      detail: `Pour gently to ${total} g by ~${
        small ? "1:50" : "1:55"
      }. As the pour ends: one gentle spoon-stir clockwise, one counter-clockwise (or a light swirl of the carafe) to knock grounds off the walls — Hoffmann's untimed finishing move, done as you set the kettle down.`,
    },
    {
      kind: "phase",
      label: "Drawdown",
      atSec: drawdownAt,
      waterToG: total,
      addG: 0,
      detail:
        "Once your stir settles: hands off. The bonded filter is the thickest in common use — slower than a V60 is normal. The bed should end flat.",
    },
    {
      kind: "phase",
      label: "Done — serve",
      atSec: doneAt,
      waterToG: total,
      addG: 0,
      detail: small
        ? "Should be finished by now (~3:45). 2:45–3:45 is the normal window at this size. Past 4:15? Grind coarser next time; under 2:30, finer."
        : "Should be finished by now (~4:45). 3:45–4:45 is normal (Hoffmann targets 4–5 min for 500 g). Past 5:15? Grind coarser next time.",
    },
  ];
}

// Siphon — only TWO true actions from grounds-in: (1) add grounds + brisk
// stir, (2) cut heat + final stir, done together per Hario/Prufrock/Hoffmann.
// Flame-to-low happens during setup BEFORE the timer starts (see the method's
// setup text). Near-capacity batches keep the steep short and grind coarser.
function siphonSchedule(coffeeG: number, totalWaterG: number): PourStep[] {
  const total = round(totalWaterG);
  const small = totalWaterG < 300;
  const large = totalWaterG > 560;
  const cutAt = small ? 60 : large ? 80 : 75;
  const doneAt = small ? 135 : large ? 225 : 165;
  return [
    {
      kind: "action",
      label: "Add grounds & stir",
      atSec: 0,
      waterToG: total,
      addG: 0,
      detail: `Water risen, settled, flame already on low (that's setup, before you start the timer). Add the ${round(
        coffeeG,
        1
      )} g of grounds and stir briskly ${
        large ? "4–6" : "3–5"
      } circles so every particle submerges fast.${
        large
          ? " Near-capacity batch: grind one step coarser than usual — big siphon beds over-extract."
          : ""
      }`,
    },
    {
      kind: "phase",
      label: "Steep",
      atSec: 12,
      waterToG: total,
      addG: 0,
      detail:
        "Hands off — the low flame just holds the water up top. If a dry raft forms, one gentle mid-steep stir is optional insurance; otherwise leave it.",
    },
    {
      kind: "action",
      label: "Cut heat + final stir",
      atSec: cutAt,
      waterToG: total,
      addG: 0,
      detail:
        "Kill the flame (or lift the pot off), then immediately give 3 gentle circles — or one smooth 360° turn — to launch an even drawdown. One motion, then hands off.",
    },
    {
      kind: "phase",
      label: "Drawdown",
      atSec: cutAt + 12,
      waterToG: total,
      addG: 0,
      detail:
        "The vacuum pulls the coffee down on its own — don't touch. Sputtering at the end is normal; a domed grounds bed means it went well.",
    },
    {
      kind: "phase",
      label: "Done — serve",
      atSec: doneAt,
      waterToG: total,
      addG: 0,
      detail: small
        ? "Should be down by now (1:50–2:15 is normal). Remove the upper chamber, swirl the lower globe, serve immediately."
        : large
        ? "Should be down by now (3:00–3:45 is normal near capacity). Past 4:15? Grind coarser or clean the cloth filter. Remove the top, swirl, serve."
        : "Should be down by now (2:20–2:45 is normal). Past 3:15? Grind coarser or clean the cloth filter. Remove the top, swirl, serve.",
    },
  ];
}

// AeroPress — the official method needs FEWER chimes than a V60, not more:
// pour everything + seal (the stir folds into the pour), one long silent
// steep, then swirl-settle-press as a single cued sequence. No bloom — it's
// full immersion; the stir does the saturating. Sources: AeroPress official,
// Hoffmann AeroPress, WAC recipe patterns.
function aeropressSchedule(
  coffeeG: number,
  totalWaterG: number
): PourStep[] {
  const total = round(totalWaterG);
  return [
    {
      kind: "action",
      label: "Pour & seal",
      atSec: 0,
      waterToG: total,
      addG: total,
      detail: `Pour all ${total} g of water over the grounds in about 15 s, wetting everything — no bloom needed, this is full immersion. As the pour ends: 2–3 quick stir turns, then seal the plunger in about 1 cm and pull up slightly so the vacuum stops drip-through. One continuous motion.`,
    },
    {
      kind: "phase",
      label: "Steep",
      atSec: 20,
      waterToG: total,
      addG: 0,
      detail:
        "Hands off until 2:30. Leave the sealed brewer on your cup — nothing you do here helps the coffee.",
    },
    {
      kind: "action",
      label: "Swirl, settle, press",
      atSec: 150,
      waterToG: total,
      addG: 0,
      detail:
        "One gentle swirl of the whole brewer (grounds come off the walls), let it sit 15–20 s while they settle, then press slowly for ~30 s. Stop at the hiss — pressing past it adds bitterness. Very hard to push? Grind coarser next time.",
    },
    {
      kind: "phase",
      label: "Done",
      atSec: 215,
      waterToG: total,
      addG: 0,
      detail:
        "About 3:35 total. Late is fine — immersion plateaus, so a press at 4:00 tastes nearly identical. The only real failure is a rushed 10-second press. Remove, swirl the cup, enjoy.",
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
    // same total water in the cup — standard championship technique. The
    // rated capacity is brimful WATER, but wet grounds displace ~2.5 ml per
    // gram — cap the pour so grounds + water + plunger actually fit.
    const chamberWaterG = round(cap - result.coffeeG * 2.5);
    const bypassWaterG = round(result.totalWaterG - chamberWaterG);
    return {
      fits: false,
      plan: "bypass",
      usedMl,
      capacityMl: cap,
      message: `${result.totalWaterG} g of water won't fit the ${name} chamber (${cap} ml rated, less once the wet grounds are in). Brew a concentrate with ${chamberWaterG} g in the chamber, press, then top the cup with ${bypassWaterG} g of hot water — same strength, same cup.`,
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
  const totalCup = round(chamberWaterG + bypassWaterG);
  // Big doses press slower against a thicker bed — give them the time.
  const bigDose = coffeeG > 25;
  const pressAt = bigDose ? 165 : 150;
  const bypassAt = bigDose ? 250 : 210;
  const doneAt = bigDose ? 295 : 240;
  return [
    {
      kind: "action",
      label: "Pour & seal",
      atSec: 0,
      waterToG: chamber,
      addG: chamber,
      detail: `Grounds in, tared. Pour all ${chamber} g in about 15 s — this brews a concentrate, so no bloom. As the pour ends: stir firmly ${
        bigDose ? "5–6" : "3–4"
      } turns, then seal the plunger in ~1 cm and pull up slightly to stop drip-through. One continuous motion. (The chamber water is capped below the brim so the wet grounds still fit.)`,
    },
    {
      kind: "phase",
      label: "Steep",
      atSec: 25,
      waterToG: chamber,
      addG: 0,
      detail: `Hands off until ${bigDose ? "2:45" : "2:30"} — the doubled strength needs the full steep. The rest of your water waits in the kettle.`,
    },
    {
      kind: "action",
      label: "Press — slowly",
      atSec: pressAt,
      waterToG: chamber,
      addG: 0,
      detail: `Optional gentle swirl first, then press ${
        bigDose ? "VERY slowly, 45–60 s — a big bed fights back; forcing it sprays" : "slowly for 30–45 s — the thick bed resists more than a normal cup"
      }. Stop at the hiss.`,
    },
    {
      kind: "action",
      label: "Bypass — top up the cup",
      atSec: bypassAt,
      waterToG: totalCup,
      addG: round(bypassWaterG),
      detail: `Add ${round(
        bypassWaterG
      )} g of hot water straight into the cup. Judge by the scale, not by sipping — it's scalding right now; taste once it's drinkable and top up then if it runs thin.`,
    },
    {
      kind: "phase",
      label: "Done",
      atSec: doneAt,
      waterToG: totalCup,
      addG: 0,
      detail:
        "Swirl and enjoy — same strength, same cup, bigger than the chamber. Timing slack here is enormous; only the slow press ever mattered.",
    },
  ];
}
