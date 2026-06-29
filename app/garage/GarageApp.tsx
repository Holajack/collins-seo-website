"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import {
  type CatalogItem,
  type FoldState,
  type PlacedItem,
  type SceneMode,
  type Vehicle,
} from "./lib/types";
import { VEHICLES } from "./lib/vehicles";
import { CAR_SEATS, STROLLERS, GEAR, findItem } from "./lib/items";
import {
  cargoRect,
  clampToBounds,
  evaluateFit,
  findFreeSpot,
  footprint,
} from "./lib/geometry";

// The 3D canvas must be client-only (no SSR).
const FitScene = dynamic(() => import("./components/FitScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-slate-500">
      Loading 3D view…
    </div>
  ),
});

const VehicleModel = dynamic(() => import("./components/VehicleModel"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-slate-500">
      Loading 3D model…
    </div>
  ),
});

const SEAT_HEIGHT_CLEARANCE = 34; // inches of headroom assumed in the cabin

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function GarageApp() {
  const [vehicle, setVehicle] = useState<Vehicle>(VEHICLES[0]);
  const [mode, setMode] = useState<SceneMode>("cargo");
  const [fold, setFold] = useState<FoldState>("all-up");
  const [frontSeat, setFrontSeat] = useState(0.5); // 0 = back, 1 = forward
  // Placements are tracked per mode so cargo items aren't judged against the
  // cabin space and vice-versa.
  const [placedByMode, setPlacedByMode] = useState<{
    cargo: PlacedItem[];
    cabin: PlacedItem[];
  }>({ cargo: [], cabin: [] });
  const placed = placedByMode[mode];
  const setPlaced = (
    updater: PlacedItem[] | ((prev: PlacedItem[]) => PlacedItem[]),
  ) =>
    setPlacedByMode((prev) => ({
      ...prev,
      [mode]: typeof updater === "function" ? updater(prev[mode]) : updater,
    }));
  const [selected, setSelected] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [view, setView] = useState<"fit" | "model">("model");
  const [lookup, setLookup] = useState("");
  const [lookupBusy, setLookupBusy] = useState(false);
  const [lookupMsg, setLookupMsg] = useState<string | null>(null);
  const counter = useRef(0);

  // --- Active space dimensions for the current mode -----------------------
  const space = useMemo(() => {
    if (mode === "cabin") {
      const legroom = lerp(
        vehicle.secondRowLegroomMin,
        vehicle.secondRowLegroomMax,
        frontSeat,
      );
      return {
        width: vehicle.secondRowWidth,
        length: legroom,
        height: SEAT_HEIGHT_CLEARANCE,
      };
    }
    let length = vehicle.lengthBehindLastRow;
    if (fold === "third-folded") length = vehicle.lengthThirdFolded;
    if (fold === "all-rear-folded") length = vehicle.lengthAllRearFolded;
    return { width: vehicle.cargoWidth, length, height: vehicle.cargoHeight };
  }, [mode, fold, frontSeat, vehicle]);

  const fit = useMemo(
    () => evaluateFit(placed, findItem, space.width, space.length, space.height),
    [placed, space],
  );

  // --- Actions ------------------------------------------------------------
  function addItem(item: CatalogItem) {
    const rearFacing = mode === "cabin" && !!item.rearFacingDepth;
    const draft: PlacedItem = {
      uid: `${item.id}-${counter.current++}`,
      itemId: item.id,
      x: 0,
      z: 0,
      rot: 0,
      rearFacing,
    };
    const bounds = cargoRect(space.width, space.length);
    // Auto-place in the first free slot so items don't pile up on each other.
    const spot = findFreeSpot(
      item,
      placed,
      findItem,
      space.width,
      space.length,
      rearFacing,
    );
    if (spot) {
      draft.x = spot.x;
      draft.z = spot.z;
    } else {
      // Nothing fits cleanly — drop near the opening so the user sees the clash.
      draft.z = footprint(item, draft).d / 2 + 1;
      const c = clampToBounds(item, draft, bounds);
      draft.x = c.x;
      draft.z = c.z;
    }
    setPlaced((prev) => [...prev, draft]);
    setSelected(draft.uid);
  }

  function moveItem(uid: string, x: number, z: number) {
    setPlaced((prev) =>
      prev.map((p) => {
        if (p.uid !== uid) return p;
        const item = findItem(p.itemId);
        if (!item) return p;
        const bounds = cargoRect(space.width, space.length);
        const c = clampToBounds(item, { ...p, x, z }, bounds);
        return { ...p, x: c.x, z: c.z };
      }),
    );
  }

  function updateSelected(fn: (p: PlacedItem) => PlacedItem) {
    if (!selected) return;
    setPlaced((prev) =>
      prev.map((p) => {
        if (p.uid !== selected) return p;
        const next = fn(p);
        const item = findItem(p.itemId);
        if (item) {
          const c = clampToBounds(
            item,
            next,
            cargoRect(space.width, space.length),
          );
          next.x = c.x;
          next.z = c.z;
        }
        return next;
      }),
    );
  }

  function removeSelected() {
    if (!selected) return;
    setPlaced((prev) => prev.filter((p) => p.uid !== selected));
    setSelected(null);
  }

  function editVehicle(patch: Partial<Vehicle>) {
    setVehicle((v) => ({ ...v, ...patch }));
  }

  async function runLookup() {
    if (!lookup.trim()) return;
    setLookupBusy(true);
    setLookupMsg(null);
    try {
      const res = await fetch("/api/vehicle-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: lookup }),
      });
      const data = await res.json();
      if (data.vehicle) {
        setVehicle(data.vehicle);
        setPlacedByMode({ cargo: [], cabin: [] });
        setSelected(null);
        setLookupMsg(
          data.matched
            ? `Loaded ${data.vehicle.make} ${data.vehicle.model}. Verify the dimensions below.`
            : `No exact match — generated a ${data.vehicle.category} estimate. Please verify the dimensions.`,
        );
        setShowEditor(true);
      } else {
        setLookupMsg("Could not interpret that vehicle. Try 'Make Model Year'.");
      }
    } catch {
      setLookupMsg("Lookup failed. You can still pick from the list or edit dimensions.");
    } finally {
      setLookupBusy(false);
    }
  }

  const catalog = mode === "cabin" ? CAR_SEATS : [...STROLLERS, ...GEAR];
  const selectedItem = selected
    ? placed.find((p) => p.uid === selected)
    : undefined;
  const selectedDef = selectedItem ? findItem(selectedItem.itemId) : undefined;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr] lg:gap-6">
      {/* ---------------- Left control panel ---------------- */}
      <div className="flex flex-col gap-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto lg:pr-1">
        {/* Vehicle picker */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-bold tracking-wide text-slate-700 uppercase">
            1 · Choose a vehicle
          </h2>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            value={VEHICLES.some((v) => v.id === vehicle.id) ? vehicle.id : "custom"}
            onChange={(e) => {
              const v = VEHICLES.find((x) => x.id === e.target.value);
              if (v) {
                setVehicle(v);
                setPlacedByMode({ cargo: [], cabin: [] });
                setSelected(null);
              }
            }}
          >
            {VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.make} {v.model} ({v.category})
              </option>
            ))}
            {!VEHICLES.some((v) => v.id === vehicle.id) && (
              <option value="custom">
                {vehicle.make} {vehicle.model} (custom)
              </option>
            )}
          </select>

          <div className="mt-3 rounded-lg bg-slate-50 p-3">
            <label className="text-xs font-semibold text-slate-600">
              🔎 Or research any vehicle (AI estimate)
            </label>
            <div className="mt-1 flex gap-2">
              <input
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                placeholder="e.g. Ford Explorer 2024"
                value={lookup}
                onChange={(e) => setLookup(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runLookup()}
              />
              <button
                onClick={runLookup}
                disabled={lookupBusy}
                className="shrink-0 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: "#1a6b8a" }}
              >
                {lookupBusy ? "…" : "Find"}
              </button>
            </div>
            {lookupMsg && (
              <p className="mt-2 text-xs text-slate-600">{lookupMsg}</p>
            )}
          </div>

          {vehicle.estimated && (
            <p className="mt-3 text-xs text-amber-700">
              ⚠ Dimensions are estimates — verify against the manufacturer&apos;s
              spec sheet using the editor below.
            </p>
          )}

          <button
            onClick={() => setShowEditor((s) => !s)}
            className="mt-2 text-xs font-semibold text-[#1a6b8a] underline"
          >
            {showEditor ? "Hide" : "Edit"} dimensions
          </button>

          {showEditor && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <NumField label="Cargo width" value={vehicle.cargoWidth} onChange={(n) => editVehicle({ cargoWidth: n })} />
              <NumField label="Cargo height" value={vehicle.cargoHeight} onChange={(n) => editVehicle({ cargoHeight: n })} />
              <NumField label="Depth (rows up)" value={vehicle.lengthBehindLastRow} onChange={(n) => editVehicle({ lengthBehindLastRow: n })} />
              <NumField label="Depth (3rd down)" value={vehicle.lengthThirdFolded} onChange={(n) => editVehicle({ lengthThirdFolded: n })} />
              <NumField label="Depth (all down)" value={vehicle.lengthAllRearFolded} onChange={(n) => editVehicle({ lengthAllRearFolded: n })} />
              <NumField label="2nd row width" value={vehicle.secondRowWidth} onChange={(n) => editVehicle({ secondRowWidth: n })} />
              <NumField label="Legroom max" value={vehicle.secondRowLegroomMax} onChange={(n) => editVehicle({ secondRowLegroomMax: n })} />
              <NumField label="Legroom min" value={vehicle.secondRowLegroomMin} onChange={(n) => editVehicle({ secondRowLegroomMin: n })} />
            </div>
          )}
        </section>

        {/* Mode + space controls */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-bold tracking-wide text-slate-700 uppercase">
            2 · What are you fitting?
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <ModeButton active={mode === "cargo"} onClick={() => { setMode("cargo"); setSelected(null); }}>
              🧳 Trunk / cargo
            </ModeButton>
            <ModeButton active={mode === "cabin"} onClick={() => { setMode("cabin"); setSelected(null); }}>
              👶 Back-seat seats
            </ModeButton>
          </div>

          {mode === "cargo" ? (
            <div className="mt-3">
              <label className="text-xs font-semibold text-slate-600">Seat configuration</label>
              <div className="mt-1 flex flex-col gap-1">
                <FoldButton active={fold === "all-up"} onClick={() => setFold("all-up")}>
                  All rows up
                </FoldButton>
                {vehicle.rows === 3 && (
                  <FoldButton active={fold === "third-folded"} onClick={() => setFold("third-folded")}>
                    3rd row folded down
                  </FoldButton>
                )}
                <FoldButton active={fold === "all-rear-folded"} onClick={() => setFold("all-rear-folded")}>
                  {vehicle.rows === 3 ? "2nd + 3rd rows folded" : "Rear seats folded"}
                </FoldButton>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <label className="text-xs font-semibold text-slate-600">
                Front seat position — legroom: {space.length.toFixed(0)}&quot;
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={frontSeat}
                onChange={(e) => setFrontSeat(parseFloat(e.target.value))}
                className="mt-1 w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>seat back</span>
                <span>seat forward</span>
              </div>
            </div>
          )}
        </section>

        {/* Catalog */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-bold tracking-wide text-slate-700 uppercase">
            3 · Add items
          </h2>
          <div className="flex flex-col gap-1.5">
            {catalog.map((item) => (
              <button
                key={item.id}
                onClick={() => addItem(item)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2 text-left text-sm hover:border-[#1a6b8a] hover:bg-slate-50"
              >
                <span
                  className="inline-block h-4 w-4 shrink-0 rounded"
                  style={{ background: item.color }}
                />
                <span className="flex-1">
                  <span className="font-medium text-slate-800">{item.name}</span>
                  <span className="block text-[11px] text-slate-500">
                    {item.length}&quot; × {item.width}&quot; × {item.height}&quot;
                    {item.note ? ` — ${item.note}` : ""}
                  </span>
                </span>
                <span className="text-lg text-[#1a6b8a]">＋</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ---------------- 3D scene + status ---------------- */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <ModeButton active={view === "model"} onClick={() => setView("model")}>
            🚗 Vehicle model
          </ModeButton>
          <ModeButton active={view === "fit"} onClick={() => setView("fit")}>
            🧪 Fit test
          </ModeButton>
        </div>
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:h-[calc(100vh-7rem)]">
          {view === "model" ? (
            <VehicleModel vehicle={vehicle} />
          ) : (
            <FitScene
              width={space.width}
              length={space.length}
              height={space.height}
              placed={placed}
              resolve={findItem}
              fit={fit}
              selectedUid={selected}
              onSelect={setSelected}
              onMove={moveItem}
            />
          )}

          {/* Model-view caption */}
          {view === "model" && (
            <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-2">
              <div className="rounded-lg bg-[#1a6b8a] px-3 py-1.5 text-sm font-bold text-white shadow">
                {vehicle.make} {vehicle.model}
              </div>
              <div className="rounded-lg bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 shadow">
                To-scale 3D model · drag to orbit · green panel = cargo opening
              </div>
            </div>
          )}

          {/* Fit badge */}
          {view === "fit" && (
          <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-2">
            <div
              className={`rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow ${
                placed.length === 0
                  ? "bg-slate-400"
                  : fit.allFit
                    ? "bg-emerald-600"
                    : "bg-red-600"
              }`}
            >
              {placed.length === 0
                ? "Add items to test the fit"
                : fit.allFit
                  ? "✓ Everything fits"
                  : "✗ Doesn't fit"}
            </div>
            <div className="rounded-lg bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 shadow">
              Space: {space.width}&quot; W × {space.length.toFixed(0)}&quot; D ×{" "}
              {space.height}&quot; H · floor used {fit.floorUsedPct.toFixed(0)}%
            </div>
          </div>
          )}

          {/* Selected item toolbar */}
          {view === "fit" && selectedItem && selectedDef && (
            <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-lg lg:left-auto">
              <span className="px-1 text-sm font-semibold text-slate-800">
                {selectedDef.name.replace(/\s*\(folded\)/, "")}
              </span>
              <button
                onClick={() =>
                  updateSelected((p) => ({
                    ...p,
                    rot: ((p.rot + 1) % 4) as PlacedItem["rot"],
                  }))
                }
                className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold hover:bg-slate-100"
              >
                ↻ Rotate 90°
              </button>
              {selectedDef.rearFacingDepth && (
                <button
                  onClick={() =>
                    updateSelected((p) => ({ ...p, rearFacing: !p.rearFacing }))
                  }
                  className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold hover:bg-slate-100"
                >
                  {selectedItem.rearFacing ? "↪ Forward-facing" : "↩ Rear-facing"}
                </button>
              )}
              <button
                onClick={removeSelected}
                className="rounded-lg border border-red-300 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                ✕ Remove
              </button>
              <span className="ml-auto px-1 text-[11px] text-slate-500">
                drag the box to reposition
              </span>
            </div>
          )}
        </div>

        {placed.length > 0 && (
          <button
            onClick={() => {
              setPlaced([]);
              setSelected(null);
            }}
            className="self-start text-xs font-semibold text-slate-500 underline"
          >
            Clear all items
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------- small UI helpers ----------------

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="text-[11px] text-slate-600">
      {label} (in)
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-sm"
      />
    </label>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#1a6b8a] text-white"
          : "border border-slate-300 text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function FoldButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-left text-sm transition ${
        active
          ? "bg-[#2d8a6e] font-semibold text-white"
          : "border border-slate-300 text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}
