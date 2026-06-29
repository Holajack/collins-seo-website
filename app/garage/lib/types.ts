// Core domain types for the Trunk & Cargo Fit Simulator.
// All human-facing dimensions are in INCHES. The 3D scene converts to meters.

export const IN_TO_M = 0.0254;

export type VehicleCategory =
  | "Minivan"
  | "3-Row SUV"
  | "2-Row SUV"
  | "Sedan"
  | "Wagon";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  years: string;
  category: VehicleCategory;
  rows: 2 | 3;

  /** Usable cargo floor width between the wheel wells (in). */
  cargoWidth: number;
  /** Cargo area height, floor to ceiling/liftgate (in). */
  cargoHeight: number;

  /** Cargo floor depth with every seat upright (in). */
  lengthBehindLastRow: number;
  /** Cargo floor depth with the 3rd row folded (3-row) — for 2-row cars this equals "2nd row folded". */
  lengthThirdFolded: number;
  /** Cargo floor depth with everything behind the front seats folded (in). */
  lengthAllRearFolded: number;

  /** Second-row usable seating width across the bench (in). */
  secondRowWidth: number;
  secondRowSeats: 2 | 3;
  /** Legroom behind the front seat when the front seat is all the way FORWARD (in). */
  secondRowLegroomMax: number;
  /** Legroom behind the front seat when the front seat is all the way BACK (in). */
  secondRowLegroomMin: number;

  /** Published cargo volumes for reference (cu ft). */
  cargoCuFtBehindLast?: number;
  cargoCuFtMax?: number;

  /** True when the dimensions are best-effort estimates the user should verify. */
  estimated: boolean;
}

export type ItemKind = "carseat" | "stroller" | "gear";

export interface CatalogItem {
  id: string;
  name: string;
  kind: ItemKind;
  category: string;
  /** Dimensions in inches. length runs front-to-back, width side-to-side, height up. */
  length: number;
  width: number;
  height: number;
  /** For car seats installed rear-facing, the depth they actually occupy (in). */
  rearFacingDepth?: number;
  color: string;
  note?: string;
}

export interface PlacedItem {
  /** Unique instance id. */
  uid: string;
  itemId: string;
  /** Center position on the floor, inches, in cargo-local coords (x = width axis, z = depth axis). */
  x: number;
  z: number;
  /** Rotation in 90° steps: 0,1,2,3. Even = footprint as authored, odd = swapped. */
  rot: 0 | 1 | 2 | 3;
  /** Whether a car seat is installed rear-facing (uses rearFacingDepth). */
  rearFacing?: boolean;
}

export type SceneMode = "cargo" | "cabin";
export type FoldState = "all-up" | "third-folded" | "all-rear-folded";
