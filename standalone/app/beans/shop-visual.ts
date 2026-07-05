import type { CoffeeShop, ShopBean, BeanKind } from "../florida-coffee";

// ─── Monogram tiles ─────────────────────────────────────────────────────────
// The directory shows each shop with a clean initial-monogram tile rather than
// a scraped logo: it's on-brand (warm editorial), loads instantly, never
// 404s when a roaster restyles their site, and carries no trademark/hotlink
// baggage in a product that may be licensed. A verified brandColor from the
// research pass tints the tile when we have one; otherwise a stable warm hue
// is derived from the name so every shop keeps a consistent identity.

const WARM_HUES = [24, 18, 32, 12, 40, 8, 28, 45]; // espresso→copper→amber band

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function monogram(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !/^(the|and|co|company|coffee|roasters?|roasting|specialty|bar|cafe)$/i.test(w));
  const pick = words.length ? words : name.split(/\s+/).filter(Boolean);
  const letters = (pick[0]?.[0] ?? "") + (pick[1]?.[0] ?? "");
  return (letters || name.slice(0, 2)).toUpperCase();
}

export function tileColor(shop: Pick<CoffeeShop, "name" | "brandColor">): string {
  if (shop.brandColor && /^#[0-9a-fA-F]{6}$/.test(shop.brandColor)) {
    return shop.brandColor;
  }
  const hue = WARM_HUES[hash(shop.name) % WARM_HUES.length];
  return `hsl(${hue} 42% 34%)`;
}

// ─── Bean categorization ────────────────────────────────────────────────────

export const KIND_LABELS: Record<BeanKind, string> = {
  "single-origin": "Single origin",
  blend: "Blends",
  espresso: "Espresso",
  decaf: "Decaf",
  other: "Other",
};

export const KIND_ORDER: BeanKind[] = [
  "single-origin",
  "blend",
  "espresso",
  "decaf",
  "other",
];

// Infer a category when the data doesn't carry one, so the detail view can
// group a long lineup instead of listing 12 beans flat.
export function beanKind(b: ShopBean): BeanKind {
  if (b.kind) return b.kind;
  const t = `${b.name} ${b.roastLevel ?? ""} ${b.origin ?? ""}`.toLowerCase();
  if (/decaf/.test(t)) return "decaf";
  if (/espresso/.test(t)) return "espresso";
  if (/blend/.test(t)) return "blend";
  if (
    b.origin &&
    !/blend/.test(b.origin.toLowerCase()) &&
    /(ethiopia|colombia|kenya|guatemala|brazil|peru|honduras|rwanda|panama|costa rica|el salvador|burundi|mexico|indonesia|sumatra|tanzania|nicaragua|uganda|congo|yemen|bolivia|ecuador)/.test(
      t
    )
  ) {
    return "single-origin";
  }
  return "other";
}

export function groupBeans(beans: ShopBean[]): { kind: BeanKind; beans: ShopBean[] }[] {
  const map = new Map<BeanKind, ShopBean[]>();
  for (const b of beans) {
    const k = beanKind(b);
    map.set(k, [...(map.get(k) ?? []), b]);
  }
  return KIND_ORDER.filter((k) => map.has(k)).map((k) => ({
    kind: k,
    beans: map.get(k)!,
  }));
}
