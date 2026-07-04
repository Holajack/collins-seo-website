// ─────────────────────────────────────────────────────────────────────────
// Florida specialty coffee — researched from shops' live websites by a
// multi-agent sweep (one researcher per metro), then each shop verified by a
// second agent that fetched the site and confirmed the beans/notes actually
// appear there. Unverifiable shops were dropped.
//
// Bean names and tasting notes are the roasters' own words. Menus rotate —
// treat notes as a snapshot, and follow the website link for today's list.
// ─────────────────────────────────────────────────────────────────────────

export interface ShopBean {
  name: string;
  roastLevel?: string;
  notes: string;
  origin?: string;
}

export interface CoffeeShop {
  name: string;
  city: string;
  region: "miami" | "orlando" | "tampa" | "jax";
  website: string;
  summary: string;
  roastsOwn: boolean;
  beans: ShopBean[];
  offers: string;
}

export const REGION_LABELS: Record<CoffeeShop["region"], string> = {
  miami: "Miami & South Florida",
  orlando: "Orlando & Central Florida",
  tampa: "Tampa Bay",
  jax: "North Florida",
};

// Filled by the verified research pass — see the workflow note above.
export const FLORIDA_SHOPS: CoffeeShop[] = [];
