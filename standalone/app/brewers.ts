// ─────────────────────────────────────────────────────────────────────────
// Real brewer hardware, with the capacity that actually constrains the brew:
//  - AeroPress / siphon / cold brew vessels: HARD cap — the chamber, lower
//    bulb, or pitcher physically holds only so much water.
//  - V60 / Chemex: the practical cap is the server/carafe the brew lands in
//    (water is pulse-poured, so the dripper itself isn't the limit).
// Values reconciled against a manufacturer-spec research + critic pass.
// ─────────────────────────────────────────────────────────────────────────

export type CapacityKind = "chamber" | "bulb" | "server" | "vessel";

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
    maxWaterMl: 237,
    capacityKind: "chamber",
    note: "The classic. Chamber brews up to ~8 oz in one pass; bigger cups use a bypass.",
  },
  {
    id: "aeropress-go",
    methodKey: "aeropress",
    brand: "AeroPress",
    model: "Go",
    variant: "travel",
    maxWaterMl: 200,
    capacityKind: "chamber",
    note: "Travel kit that nests in its own mug — a slightly shorter chamber than the Original.",
  },
  {
    id: "aeropress-clear",
    methodKey: "aeropress",
    brand: "AeroPress",
    model: "Clear",
    variant: "home",
    maxWaterMl: 237,
    capacityKind: "chamber",
    note: "Same geometry as the Original in crystal-clear Tritan.",
  },
  {
    id: "aeropress-xl",
    methodKey: "aeropress",
    brand: "AeroPress",
    model: "XL",
    variant: "home",
    maxWaterMl: 473,
    capacityKind: "chamber",
    note: "Double-size chamber — a 12 oz mug fits in one press.",
  },

  // ── Hario V60 — sized by the server the brew drains into
  {
    id: "v60-01",
    methodKey: "pourover_v60",
    brand: "Hario",
    model: "V60-01",
    variant: "1–2 cups",
    maxWaterMl: 360,
    capacityKind: "server",
    note: "The single-cup size; pairs with the 360 ml range server.",
  },
  {
    id: "v60-02",
    methodKey: "pourover_v60",
    brand: "Hario",
    model: "V60-02",
    variant: "1–4 cups",
    maxWaterMl: 600,
    capacityKind: "server",
    note: "The most common size; pairs with the 600 ml range server.",
  },
  {
    id: "v60-03",
    methodKey: "pourover_v60",
    brand: "Hario",
    model: "V60-03",
    variant: "1–6 cups",
    maxWaterMl: 800,
    capacityKind: "server",
    note: "Big-batch cone for the 800 ml server.",
  },

  // ── Chemex — one Chemex "cup" is 5 oz; capacity is to the button/spout
  {
    id: "chemex-3",
    methodKey: "chemex",
    brand: "Chemex",
    model: "3-Cup",
    variant: "pint",
    maxWaterMl: 473,
    capacityKind: "server",
    note: "Pint-size — one big mug. Needs a decent dose for enough bed depth.",
  },
  {
    id: "chemex-6",
    methodKey: "chemex",
    brand: "Chemex",
    model: "6-Cup",
    variant: "classic",
    maxWaterMl: 887,
    capacityKind: "server",
    note: "The classic size most people own.",
  },
  {
    id: "chemex-8",
    methodKey: "chemex",
    brand: "Chemex",
    model: "8-Cup",
    variant: "classic",
    maxWaterMl: 1183,
    capacityKind: "server",
    note: "Brunch-size — comfortably serves three or four.",
  },
  {
    id: "chemex-10",
    methodKey: "chemex",
    brand: "Chemex",
    model: "10-Cup",
    variant: "classic",
    maxWaterMl: 1478,
    capacityKind: "server",
    note: "The full-table carafe.",
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
    note: "Two demitasse cups — the small classic.",
  },
  {
    id: "hario-tca-3",
    methodKey: "siphon",
    brand: "Hario",
    model: "Technica TCA-3",
    variant: "3-cup",
    maxWaterMl: 360,
    capacityKind: "bulb",
    note: "The mid-size Technica.",
  },
  {
    id: "hario-tca-5",
    methodKey: "siphon",
    brand: "Hario",
    model: "Technica TCA-5",
    variant: "5-cup",
    maxWaterMl: 600,
    capacityKind: "bulb",
    note: "The big Technica — full siphon theater for guests.",
  },
  {
    id: "yama-5",
    methodKey: "siphon",
    brand: "Yama",
    model: "Tabletop 5-Cup",
    variant: "5-cup",
    maxWaterMl: 600,
    capacityKind: "bulb",
    note: "Yama's stovetop/tabletop 20 oz syphon.",
  },

  // ── Cold brew vessels — cap applies to the STEEP water (the concentrate)
  {
    id: "mizudashi-600",
    methodKey: "coldbrew",
    brand: "Hario",
    model: "Mizudashi",
    variant: "600 ml",
    maxWaterMl: 600,
    capacityKind: "vessel",
    note: "Fridge-door pot with a built-in mesh filter.",
  },
  {
    id: "mizudashi-1000",
    methodKey: "coldbrew",
    brand: "Hario",
    model: "Mizudashi",
    variant: "1 L",
    maxWaterMl: 1000,
    capacityKind: "vessel",
    note: "The larger fridge pot — a weekend's worth of concentrate.",
  },
  {
    id: "oxo-32",
    methodKey: "coldbrew",
    brand: "OXO",
    model: "Compact Cold Brew",
    variant: "32 oz",
    maxWaterMl: 946,
    capacityKind: "vessel",
    note: "Rainmaker lid for even saturation; brews a strong concentrate.",
  },
  {
    id: "mason-32",
    methodKey: "coldbrew",
    brand: "Any",
    model: "Mason jar",
    variant: "32 oz",
    maxWaterMl: 850,
    capacityKind: "vessel",
    note: "The budget classic — leave headroom for the grounds to float.",
  },
];

export function brewersFor(methodKey: string): BrewerModel[] {
  return BREWERS.filter((b) => b.methodKey === methodKey);
}

export function getBrewer(id: string): BrewerModel | undefined {
  return BREWERS.find((b) => b.id === id);
}
