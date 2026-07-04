// ─────────────────────────────────────────────────────────────────────────
// Real brewer hardware, with the capacity that actually constrains the brew:
//  - AeroPress / siphon / cold brew vessels: HARD cap — the chamber, lower
//    bulb, or pitcher physically holds only so much water.
//  - V60 / Chemex: the practical cap is the server/carafe the brew lands in
//    (water is pulse-poured, so the dripper itself isn't the limit).
// Values reconciled against a manufacturer-spec research + critic pass.
// ─────────────────────────────────────────────────────────────────────────

export type CapacityKind = "chamber" | "bulb" | "server" | "vessel" | "carafe";

export interface BrewerModel {
  id: string;
  methodKey: string; // matches BrewMethodKey
  brand: string;
  model: string;
  variant: string; // travel / home / 02 / 6-cup ...
  maxWaterMl: number; // practical max water for capacityKind
  capacityKind: CapacityKind;
  note: string;
}

export const BREWERS: BrewerModel[] = [
  // ── AeroPress — chamber is a hard cap; bigger cups brew concentrate + bypass
  {
    id: "aeropress-original",
    methodKey: "aeropress",
    brand: "AeroPress",
    model: "Original",
    variant: "home",
    maxWaterMl: 296,
    capacityKind: "chamber",
    note: "The classic — officially rated 10 oz (296 ml) per pressing. Bigger cups use a bypass.",
  },
  {
    id: "aeropress-go",
    methodKey: "aeropress",
    brand: "AeroPress",
    model: "Go",
    variant: "travel",
    maxWaterMl: 237,
    capacityKind: "chamber",
    note: "Travel kit that nests in its own mug; the shorter chamber presses a true 8 oz (237 ml) max.",
  },
  {
    id: "aeropress-clear",
    methodKey: "aeropress",
    brand: "AeroPress",
    model: "Clear",
    variant: "home",
    maxWaterMl: 296,
    capacityKind: "chamber",
    note: "Same 10 oz (296 ml) geometry as the Original in crystal-clear Tritan.",
  },
  {
    id: "aeropress-xl",
    methodKey: "aeropress",
    brand: "AeroPress",
    model: "XL",
    variant: "home",
    maxWaterMl: 591,
    capacityKind: "chamber",
    note: "Double-size chamber rated 20 oz (591 ml) — a 12 oz mug fits in one press.",
  },

  // ── Hario V60 — sized by the range server the brew drains into
  {
    id: "v60-01",
    methodKey: "pourover_v60",
    brand: "Hario",
    model: "V60-01",
    variant: "1–2 cups",
    maxWaterMl: 360,
    capacityKind: "server",
    note: "The solo size — sweet spot ~15 g / 250 ml, up to ~22 g / 360 ml into the 01 server.",
  },
  {
    id: "v60-02",
    methodKey: "pourover_v60",
    brand: "Hario",
    model: "V60-02",
    variant: "1–4 cups",
    maxWaterMl: 600,
    capacityKind: "server",
    note: "The most common size; 20–30 g recipes with the 600 ml range server as the ceiling.",
  },
  {
    id: "v60-03",
    methodKey: "pourover_v60",
    brand: "Hario",
    model: "V60-03",
    variant: "1–6 cups",
    maxWaterMl: 800,
    capacityKind: "server",
    note: "Big-batch cone — 30–50 g doses into the 800 ml server for 3–4 people.",
  },

  // ── Chemex — one Chemex "cup" is 5 oz; capacity is to the spout
  {
    id: "chemex-3",
    methodKey: "chemex",
    brand: "Chemex",
    model: "3-Cup (CM-1C)",
    variant: "pint",
    maxWaterMl: 444,
    capacityKind: "server",
    note: "The pint-size — 15 oz to the spout (the button marks FULL on this size). One big mug.",
  },
  {
    id: "chemex-6",
    methodKey: "chemex",
    brand: "Chemex",
    model: "6-Cup (CM-6A)",
    variant: "classic",
    maxWaterMl: 887,
    capacityKind: "server",
    note: "The classic 30 oz size most people own. Keep the dose above ~28 g for enough bed depth.",
  },
  {
    id: "chemex-8",
    methodKey: "chemex",
    brand: "Chemex",
    model: "8-Cup (CM-8A)",
    variant: "classic",
    maxWaterMl: 1183,
    capacityKind: "server",
    note: "40 oz — brunch for three or four. Full-batch doses run 65–70 g.",
  },
  {
    id: "chemex-10",
    methodKey: "chemex",
    brand: "Chemex",
    model: "10-Cup (CM-10A)",
    variant: "classic",
    maxWaterMl: 1479,
    capacityKind: "server",
    note: "The 50 oz full-table carafe; 80–85 g full batches.",
  },

  // ── Siphon — the lower bulb is a hard cap on brew water
  {
    id: "hario-tca-2",
    methodKey: "siphon",
    brand: "Hario",
    model: "Technica TCA-2",
    variant: "2-cup",
    maxWaterMl: 240,
    capacityKind: "bulb",
    note: "The small classic — one large mug of siphon theater.",
  },
  {
    id: "hario-tca-3",
    methodKey: "siphon",
    brand: "Hario",
    model: "Technica TCA-3",
    variant: "3-cup",
    maxWaterMl: 360,
    capacityKind: "bulb",
    note: "The mid-size Technica for one or two drinkers.",
  },
  {
    id: "hario-tca-5",
    methodKey: "siphon",
    brand: "Hario",
    model: "Technica TCA-5",
    variant: "5-cup",
    maxWaterMl: 600,
    capacityKind: "bulb",
    note: "The big Technica — serves two to four.",
  },
  {
    id: "hario-next-5",
    methodKey: "siphon",
    brand: "Hario",
    model: "Syphon NEXT",
    variant: "5-cup",
    maxWaterMl: 600,
    capacityKind: "bulb",
    note: "The modernized Hario with a silicone-sleeved upper bowl and easier handling.",
  },
  {
    id: "yama-3",
    methodKey: "siphon",
    brand: "Yama",
    model: "Tabletop 3-Cup",
    variant: "12 oz",
    maxWaterMl: 360,
    capacityKind: "bulb",
    note: "Budget-friendly hand-blown tabletop siphon for one or two.",
  },
  {
    id: "yama-5",
    methodKey: "siphon",
    brand: "Yama",
    model: "Tabletop 5-Cup",
    variant: "20 oz",
    maxWaterMl: 590,
    capacityKind: "bulb",
    note: "The larger Yama tabletop for sharing.",
  },
  {
    id: "yama-8-stovetop",
    methodKey: "siphon",
    brand: "Yama",
    model: "Stovetop 8-Cup (SY-8)",
    variant: "24 oz",
    maxWaterMl: 710,
    capacityKind: "bulb",
    note: "The biggest Yama — heats directly on the range with a wire diffuser.",
  },

  // ── French press — the beaker caps total brew water (seed values; being
  //    reconciled against a manufacturer-spec research pass)
  {
    id: "bodum-chambord-3",
    methodKey: "frenchpress",
    brand: "Bodum",
    model: "Chambord",
    variant: "3-cup / 12 oz",
    maxWaterMl: 350,
    capacityKind: "carafe",
    note: "The one-mug classic.",
  },
  {
    id: "bodum-chambord-4",
    methodKey: "frenchpress",
    brand: "Bodum",
    model: "Chambord",
    variant: "4-cup / 17 oz",
    maxWaterMl: 500,
    capacityKind: "carafe",
    note: "Two smaller cups or one generous mug.",
  },
  {
    id: "bodum-chambord-8",
    methodKey: "frenchpress",
    brand: "Bodum",
    model: "Chambord",
    variant: "8-cup / 34 oz",
    maxWaterMl: 1000,
    capacityKind: "carafe",
    note: "The kitchen standard — comfortably serves two or three.",
  },
  {
    id: "bodum-chambord-12",
    methodKey: "frenchpress",
    brand: "Bodum",
    model: "Chambord",
    variant: "12-cup / 51 oz",
    maxWaterMl: 1500,
    capacityKind: "carafe",
    note: "The brunch-table beaker.",
  },

  // ── Cold brew vessels — cap applies to the STEEP water (the concentrate)
  {
    id: "mizudashi-600",
    methodKey: "coldbrew",
    brand: "Hario",
    model: "Mizudashi (MCPN-7)",
    variant: "600 ml",
    maxWaterMl: 650,
    capacityKind: "vessel",
    note: "Fridge-door pot with a built-in mesh filter — designed for ready-to-drink strength, happily brews concentrate too.",
  },
  {
    id: "mizudashi-1000",
    methodKey: "coldbrew",
    brand: "Hario",
    model: "Mizudashi (MCPN-14)",
    variant: "1 L",
    maxWaterMl: 1150,
    capacityKind: "vessel",
    note: "The larger fridge pot — Hario's manual runs 1150 ml of water per batch.",
  },
  {
    id: "oxo-compact-24",
    methodKey: "coldbrew",
    brand: "OXO",
    model: "Compact Cold Brew",
    variant: "24 oz",
    maxWaterMl: 710,
    capacityKind: "vessel",
    note: "Countertop drip-release brewer — 24 oz of water yields ~16 oz of concentrate.",
  },
  {
    id: "oxo-32",
    methodKey: "coldbrew",
    brand: "OXO",
    model: "Good Grips Cold Brew",
    variant: "32 oz",
    maxWaterMl: 1200,
    capacityKind: "vessel",
    note: "Rainmaker lid for even saturation; 40 oz of water in yields 32 oz of concentrate.",
  },
  {
    id: "toddy-home",
    methodKey: "coldbrew",
    brand: "Toddy",
    model: "Cold Brew System",
    variant: "home",
    maxWaterMl: 1656,
    capacityKind: "vessel",
    note: "The felt-filter bucket classic — 12 oz of coffee and 7 cups of water per batch.",
  },
  {
    id: "mason-32",
    methodKey: "coldbrew",
    brand: "Any",
    model: "Mason jar",
    variant: "32 oz",
    maxWaterMl: 946,
    capacityKind: "vessel",
    note: "The budget classic — leave headroom so the grounds can float.",
  },
];

export function brewersFor(methodKey: string): BrewerModel[] {
  return BREWERS.filter((b) => b.methodKey === methodKey);
}

export function getBrewer(id: string): BrewerModel | undefined {
  return BREWERS.find((b) => b.id === id);
}
