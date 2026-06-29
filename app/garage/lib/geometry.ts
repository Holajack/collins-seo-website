import type { CatalogItem, PlacedItem } from "./types";

export interface Rect {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/** Footprint of an item on the floor (width along X, depth along Z), in inches,
 *  accounting for 90° rotation and rear-facing car-seat depth. */
export function footprint(
  item: CatalogItem,
  placed: Pick<PlacedItem, "rot" | "rearFacing">,
): { w: number; d: number; h: number } {
  const depth =
    placed.rearFacing && item.rearFacingDepth ? item.rearFacingDepth : item.length;
  const baseW = item.width;
  const baseD = depth;
  const swapped = placed.rot === 1 || placed.rot === 3;
  return {
    w: swapped ? baseD : baseW,
    d: swapped ? baseW : baseD,
    h: item.height,
  };
}

export function itemRect(item: CatalogItem, placed: PlacedItem): Rect {
  const { w, d } = footprint(item, placed);
  return {
    minX: placed.x - w / 2,
    maxX: placed.x + w / 2,
    minZ: placed.z - d / 2,
    maxZ: placed.z + d / 2,
  };
}

export function rectsOverlap(a: Rect, b: Rect, tol = 0.01): boolean {
  return (
    a.minX < b.maxX - tol &&
    a.maxX > b.minX + tol &&
    a.minZ < b.maxZ - tol &&
    a.maxZ > b.minZ + tol
  );
}

/** Cargo floor rectangle: width is centered on 0, depth runs 0..length. */
export function cargoRect(width: number, length: number): Rect {
  return { minX: -width / 2, maxX: width / 2, minZ: 0, maxZ: length };
}

export function withinBounds(rect: Rect, bounds: Rect, tol = 0.05): boolean {
  return (
    rect.minX >= bounds.minX - tol &&
    rect.maxX <= bounds.maxX + tol &&
    rect.minZ >= bounds.minZ - tol &&
    rect.maxZ <= bounds.maxZ + tol
  );
}

/** Clamp a center position so the item's footprint stays inside the bounds. */
export function clampToBounds(
  item: CatalogItem,
  placed: PlacedItem,
  bounds: Rect,
): { x: number; z: number } {
  const { w, d } = footprint(item, placed);
  const x = clamp(placed.x, bounds.minX + w / 2, bounds.maxX - w / 2);
  const z = clamp(placed.z, bounds.minZ + d / 2, bounds.maxZ - d / 2);
  return { x, z };
}

function clamp(v: number, lo: number, hi: number): number {
  if (lo > hi) return (lo + hi) / 2; // item wider/longer than the space
  return Math.max(lo, Math.min(hi, v));
}

/** Find the first non-overlapping, in-bounds slot for a new item (packed from
 *  the opening, left to right). Returns null if nothing fits. */
export function findFreeSpot(
  item: CatalogItem,
  placed: PlacedItem[],
  resolve: (id: string) => CatalogItem | undefined,
  width: number,
  length: number,
  rearFacing = false,
): { x: number; z: number } | null {
  const draft: PlacedItem = { uid: "", itemId: item.id, x: 0, z: 0, rot: 0, rearFacing };
  const { w, d } = footprint(item, draft);
  if (w > width + 0.5 || d > length + 0.5) return null;

  const existing = placed
    .map((p) => {
      const def = resolve(p.itemId);
      return def ? itemRect(def, p) : null;
    })
    .filter((r): r is Rect => r !== null);

  const step = 2;
  for (let z = d / 2; z <= length - d / 2 + 0.01; z += step) {
    for (let x = -width / 2 + w / 2; x <= width / 2 - w / 2 + 0.01; x += step) {
      const rect: Rect = {
        minX: x - w / 2,
        maxX: x + w / 2,
        minZ: z - d / 2,
        maxZ: z + d / 2,
      };
      if (existing.some((r) => rectsOverlap(rect, r))) continue;
      return { x, z };
    }
  }
  return null;
}

export interface ItemFit {
  uid: string;
  inBounds: boolean;
  overlapping: boolean;
  tooTall: boolean;
  ok: boolean;
}

export interface FitReport {
  items: ItemFit[];
  allFit: boolean;
  floorUsedPct: number;
}

export function evaluateFit(
  placed: PlacedItem[],
  resolve: (id: string) => CatalogItem | undefined,
  width: number,
  length: number,
  height: number,
): FitReport {
  const bounds = cargoRect(width, length);
  const rects = placed.map((p) => {
    const item = resolve(p.itemId);
    return item ? { p, item, rect: itemRect(item, p) } : null;
  });

  const items: ItemFit[] = rects.map((entry) => {
    if (!entry) {
      return { uid: "", inBounds: false, overlapping: false, tooTall: false, ok: false };
    }
    const inBounds = withinBounds(entry.rect, bounds);
    const tooTall = footprint(entry.item, entry.p).h > height + 0.5;
    let overlapping = false;
    for (const other of rects) {
      if (!other || other.p.uid === entry.p.uid) continue;
      if (rectsOverlap(entry.rect, other.rect)) {
        overlapping = true;
        break;
      }
    }
    return {
      uid: entry.p.uid,
      inBounds,
      overlapping,
      tooTall,
      ok: inBounds && !overlapping && !tooTall,
    };
  });

  const floorArea = width * length;
  const usedArea = rects.reduce((sum, e) => {
    if (!e) return sum;
    const { w, d } = footprint(e.item, e.p);
    return sum + w * d;
  }, 0);

  return {
    items,
    allFit: items.length > 0 && items.every((i) => i.ok),
    floorUsedPct: floorArea > 0 ? Math.min(100, (usedArea / floorArea) * 100) : 0,
  };
}
