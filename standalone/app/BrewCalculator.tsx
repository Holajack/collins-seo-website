"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BREW_METHODS,
  type BrewMethodKey,
} from "./brew-data";
import {
  calculateBrew,
  formatTime,
  ozToMl,
  round,
  OZ_TO_ML,
  type BrewResult,
  type StyleKey,
  type TargetMode,
} from "./engine";
import BrewTimer from "./BrewTimer";
import {
  assessFit,
  buildBypassSteps,
  calculateFromDose,
  frenchPressPlan,
} from "./engine";
import { brewersFor, getBrewer } from "./brewers";
import { newId, nudgeFor, saveEntry } from "./journal-store";

type Unit = "oz" | "ml" | "cups"; // legacy links may carry ml/cups; the dial is oz
const USUAL_KEY = "pb:usual";

// The cup dial: fixed stops only — no typing, no odd sizes. The math for
// every stop is pre-solved against the chosen brewer, so a size that
// physically can't fit is disabled (or, on an AeroPress, flips the plan to
// concentrate + bypass instead).
const DIAL_SIZES_OZ = [2, 4, 6, 8, 10, 12, 16, 24] as const;

function snapToDial(oz: number): number {
  let best: number = DIAL_SIZES_OZ[0];
  for (const s of DIAL_SIZES_OZ) {
    if (Math.abs(s - oz) < Math.abs(best - oz)) best = s;
  }
  return best;
}

const STYLES: { key: StyleKey; label: string; hint: string }[] = [
  { key: "strong", label: "Strong & bold", hint: "Lower ratio, more coffee" },
  { key: "balanced", label: "Balanced", hint: "The sweet spot" },
  { key: "light", label: "Light & bright", hint: "Higher ratio, more tea-like" },
];

interface BrewState {
  m: BrewMethodKey;
  s: StyleKey;
  a: number;
  u: Unit;
  mode: TargetMode;
  r?: number; // custom ratio, only when enabled
  im?: "cup" | "dose"; // input mode; default cup
  c?: number; // dose mode: coffee grams
  w?: number; // dose mode: water grams
  b?: string; // brewer id
}

function parseState(params: URLSearchParams): Partial<BrewState> | null {
  const out: Partial<BrewState> = {};
  const m = params.get("m");
  if (m && m in BREW_METHODS) out.m = m as BrewMethodKey;
  const s = params.get("s");
  if (s && STYLES.some((x) => x.key === s)) out.s = s as StyleKey;
  const a = Number(params.get("a"));
  const u = params.get("u");
  if (Number.isFinite(a) && a > 0) {
    // Links from the pre-dial era could carry any amount in oz/ml/cups —
    // normalize to ounces, then snap to the nearest dial stop so the shared
    // recipe lands on a size the dial can actually show.
    const oz =
      u === "ml" ? a / OZ_TO_ML : u === "cups" ? a * 8 : a;
    out.a = snapToDial(oz);
    out.u = "oz";
  }
  const mode = params.get("mode");
  if (mode === "cup" || mode === "water") out.mode = mode;
  const r = Number(params.get("r"));
  if (Number.isFinite(r) && r >= 4 && r <= 25) out.r = r;
  const im = params.get("im");
  if (im === "dose") out.im = "dose";
  const c = Number(params.get("c"));
  if (Number.isFinite(c) && c > 0) out.c = Math.min(c, 500);
  const w = Number(params.get("w"));
  if (Number.isFinite(w) && w > 0) out.w = Math.min(w, 20000);
  const b = params.get("b");
  if (b && getBrewer(b)) out.b = b;
  return Object.keys(out).length > 0 ? out : null;
}

export default function BrewCalculator() {
  const [methodKey, setMethodKey] = useState<BrewMethodKey>("pourover_v60");
  const [style, setStyle] = useState<StyleKey>("balanced");
  const [amount, setAmount] = useState<number>(12); // always a dial stop, in oz
  const [targetMode, setTargetMode] = useState<TargetMode>("cup");
  const [useCustomRatio, setUseCustomRatio] = useState(false);
  const [customRatio, setCustomRatio] = useState<number>(16);
  const [inputMode, setInputMode] = useState<"cup" | "dose">("cup");
  const [doseCoffeeG, setDoseCoffeeG] = useState<number>(25);
  const [doseWaterG, setDoseWaterG] = useState<number>(400);
  const [brewerId, setBrewerId] = useState<string>("");
  const [usualLoaded, setUsualLoaded] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [logSaved, setLogSaved] = useState(false);
  const [logBeans, setLogBeans] = useState("");
  const [logRoaster, setLogRoaster] = useState("");
  const [logRating, setLogRating] = useState(0);
  const [logNotes, setLogNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [journalNudge, setJournalNudge] = useState<string | null>(null);
  // Only a real user interaction may write the "usual" or rewrite the URL —
  // merely opening a shared link must never overwrite the saved recipe.
  const dirtyRef = useRef(false);

  const method = BREW_METHODS[methodKey];

  // Taste-learning nudge from the on-device journal (client-only data, so it
  // hydrates after mount and refreshes when the method or a new log changes).
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setJournalNudge(nudgeFor(BREW_METHODS[methodKey].shortName));
    } catch {}
  }, [methodKey, logSaved]);

  // Custom ratio bounds differ by method: cold brew ready-to-drink strengths
  // run much lower denominators than drip.
  const ratioBounds = method.coldBrew
    ? { min: 6, max: 12, minLabel: "1:6 (bold)", maxLabel: "1:12 (delicate)" }
    : { min: 12, max: 20, minLabel: "1:12 (intense)", maxLabel: "1:20 (delicate)" };

  // Brewer + dial derivation. Every dial stop is pre-solved against the
  // active brewer: "ok" fits outright; "bypass" stays selectable on chamber
  // brewers (AeroPress brews a concentrate, then tops up with hot water);
  // anything else is physically too big and gets disabled. The shown size is
  // DERIVED, never clamped in state — pick a smaller brewer and the dial
  // instantly lands on the biggest stop that still works.
  const brewer = brewerId ? getBrewer(brewerId) : undefined;
  const activeBrewer =
    brewer && brewer.methodKey === methodKey ? brewer : undefined;

  const dialFits = useMemo(
    () =>
      DIAL_SIZES_OZ.map((oz) => {
        if (!activeBrewer) return { oz, plan: "ok" as const };
        const r = calculateBrew(
          method,
          style,
          ozToMl(oz),
          targetMode,
          useCustomRatio ? customRatio : undefined
        );
        return { oz, plan: assessFit(r, activeBrewer).plan };
      }),
    [method, style, targetMode, useCustomRatio, customRatio, activeBrewer]
  );

  const selectableStops = dialFits.filter(
    (d) => d.plan === "ok" || d.plan === "bypass"
  );
  const snapped = snapToDial(amount);
  const effectiveAmount =
    selectableStops.some((d) => d.oz === snapped) || selectableStops.length === 0
      ? snapped
      : selectableStops.filter((d) => d.oz < snapped).map((d) => d.oz).pop() ??
        selectableStops[0].oz;
  const maxSelectableOz =
    selectableStops.length > 0
      ? selectableStops[selectableStops.length - 1].oz
      : null;
  const hasDisabledStops = dialFits.some(
    (d) => d.plan !== "ok" && d.plan !== "bypass"
  );
  const hasBypassStops = dialFits.some((d) => d.plan === "bypass");

  const applyState = (s: Partial<BrewState>) => {
    const targetMethod = s.m ?? methodKey;
    if (s.m) setMethodKey(s.m);
    if (s.s) setStyle(s.s);
    if (s.a != null) setAmount(snapToDial(s.a));
    if (s.mode) setTargetMode(s.mode);
    if (s.r != null) {
      // Clamp into the method's sensible range — cold brew below 1:6 would
      // mean diluting with less water than the concentrate itself holds.
      const bounds = BREW_METHODS[targetMethod].coldBrew
        ? { min: 6, max: 12 }
        : { min: 12, max: 20 };
      setCustomRatio(Math.min(bounds.max, Math.max(bounds.min, s.r)));
      setUseCustomRatio(true);
    }
    if (s.im === "dose") setInputMode("dose");
    if (s.c != null) setDoseCoffeeG(s.c);
    if (s.w != null) setDoseWaterG(s.w);
    if (s.b) {
      const bw = getBrewer(s.b);
      if (bw && bw.methodKey === targetMethod) setBrewerId(s.b);
    }
  };

  // On mount: a shared link's URL params win; otherwise restore "your usual"
  // from this device — run through the same validator as the URL path, since
  // a stale/foreign stored value must degrade to defaults, not crash. SSR
  // must render the defaults (URL/storage don't exist server-side), so this
  // state can only be applied after hydration.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const fromUrl = parseState(new URLSearchParams(window.location.search));
      if (fromUrl) {
        applyState(fromUrl);
      } else {
        const raw = window.localStorage.getItem(USUAL_KEY);
        if (raw) {
          const obj: unknown = JSON.parse(raw);
          if (obj && typeof obj === "object") {
            const qs = new URLSearchParams();
            for (const [k, v] of Object.entries(obj)) {
              if (v != null) qs.set(k, String(v));
            }
            const saved = parseState(qs);
            if (saved) {
              applyState(saved);
              setUsualLoaded(true);
            }
          }
        }
      }
    } catch {}
    // Mount-only by design; applyState is stable in behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const serializeParams = () => {
    const params = new URLSearchParams();
    params.set("m", methodKey);
    if (inputMode === "dose") {
      params.set("im", "dose");
      params.set("c", String(doseCoffeeG));
      params.set("w", String(doseWaterG));
    } else {
      params.set("s", style);
      // Serialize the size the recipe actually shows (post-clamp), always oz.
      params.set("a", String(effectiveAmount));
      if (!BREW_METHODS[methodKey].coldBrew) params.set("mode", targetMode);
      if (useCustomRatio) params.set("r", String(customRatio));
    }
    if (brewerId) params.set("b", brewerId);
    return params;
  };

  // After any real interaction: keep the URL shareable and remember the
  // recipe on this device.
  useEffect(() => {
    if (!dirtyRef.current) return;
    const state: BrewState = {
      m: methodKey,
      s: style,
      a: effectiveAmount,
      u: "oz",
      mode: targetMode,
      ...(useCustomRatio ? { r: customRatio } : {}),
      ...(inputMode === "dose"
        ? { im: "dose" as const, c: doseCoffeeG, w: doseWaterG }
        : {}),
      ...(brewerId ? { b: brewerId } : {}),
    };
    try {
      window.localStorage.setItem(USUAL_KEY, JSON.stringify(state));
    } catch {}
    const params = serializeParams();
    try {
      window.history.replaceState(
        null,
        "",
        `?${params.toString()}${window.location.hash}`
      );
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methodKey, style, effectiveAmount, targetMode, useCustomRatio, customRatio, inputMode, doseCoffeeG, doseWaterG, brewerId]);

  const markDirty = () => {
    dirtyRef.current = true;
  };

  const targetMl = useMemo(() => ozToMl(effectiveAmount), [effectiveAmount]);

  const result = useMemo(
    () =>
      inputMode === "dose"
        ? calculateFromDose(method, doseCoffeeG, doseWaterG)
        : calculateBrew(
            method,
            style,
            targetMl,
            targetMode,
            useCustomRatio ? customRatio : undefined
          ),
    [method, style, targetMl, targetMode, useCustomRatio, customRatio, inputMode, doseCoffeeG, doseWaterG]
  );

  // Capacity fit against the chosen brewer (if any), and the steps the timer
  // should walk — an over-capacity AeroPress switches to concentrate+bypass.
  const fit = activeBrewer ? assessFit(result, activeBrewer) : null;
  const timerSteps =
    fit?.plan === "bypass" && fit.bypass
      ? buildBypassSteps(
          result.coffeeG,
          fit.bypass.chamberWaterG,
          fit.bypass.bypassWaterG
        )
      : result.steps;
  // French press total time is style-dependent (bold ~4:40, light ~6:25,
  // balanced ~9:20). Every other schedule ends with an explicit "Done" step,
  // so the last step's time IS the brew's target total.
  const timerTotalSec =
    methodKey === "frenchpress"
      ? frenchPressPlan(inputMode === "dose" ? "balanced" : style).totalSec
      : timerSteps.length > 0
      ? timerSteps[timerSteps.length - 1].atSec
      : method.totalBrewTimeSec.high;

  const ratioLabel = `1:${result.ratio}`;

  // Displayed cold-brew dilution, derived from rounded headline figures so
  // the plan card and the water ledger always agree to the gram.
  const coldDilutionShownG = result.coldBrew
    ? round(result.finishedVolumeMl - (result.brewWaterG - result.absorbedG))
    : 0;

  // Serialize current state explicitly — location.href stays clean until an
  // interaction, and a "usual"-restored recipe never writes the URL at all.
  const copyLink = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}?${serializeParams().toString()}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const selectMethod = (k: BrewMethodKey) => {
    markDirty();
    setMethodKey(k);
    // Keep a custom ratio inside the new method's sensible range.
    const bounds = BREW_METHODS[k].coldBrew
      ? { min: 6, max: 12 }
      : { min: 12, max: 20 };
    if (useCustomRatio && (customRatio < bounds.min || customRatio > bounds.max)) {
      setCustomRatio(BREW_METHODS[k].recommendedRatio);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        {/* ───────────── Controls ───────────── */}
        <div className="space-y-7 rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6 sm:p-7">
          {usualLoaded && (
            <div className="flex items-center gap-2 rounded-full border border-[var(--c-accent)]/25 bg-[var(--c-accent)]/[0.06] px-3 py-1.5 text-[12px] text-[var(--c-accent-ink)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--c-accent)]" />
              Your usual — saved on this device
            </div>
          )}

          {/* Method */}
          <div>
            <label className="c-label">Brew method</label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(BREW_METHODS) as BrewMethodKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => selectMethod(k)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-[13px] font-medium leading-tight transition ${
                    methodKey === k
                      ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10 text-[var(--c-accent-ink)]"
                      : "border-[var(--c-border)] bg-transparent text-[var(--c-muted)] hover:border-[var(--c-accent)]/50"
                  }`}
                >
                  {BREW_METHODS[k].shortName}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--c-muted)]">
              {method.blurb}
            </p>
            <div className="mt-3">
              <label className="c-label" htmlFor="brewer-select">
                Your brewer (for capacity-aware math)
              </label>
              <select
                id="brewer-select"
                value={brewerId}
                onChange={(e) => {
                  markDirty();
                  setBrewerId(e.target.value);
                }}
                className="mt-2 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-3 text-[14px] text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
              >
                <option value="">No specific brewer</option>
                {brewersFor(methodKey).map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brand} {b.model} ({b.variant}) — {b.maxWaterMl} ml
                  </option>
                ))}
              </select>
              {activeBrewer && (
                <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--c-muted)]">
                  {activeBrewer.note}
                </p>
              )}
            </div>
          </div>

          {/* Input mode */}
          <div>
            <label className="c-label">How do you want to plan it?</label>
            <div className="mt-2 flex gap-2">
              <ModeChip
                active={inputMode === "cup"}
                onClick={() => {
                  markDirty();
                  setInputMode("cup");
                }}
                label="By cup size"
              />
              <ModeChip
                active={inputMode === "dose"}
                onClick={() => {
                  markDirty();
                  setInputMode("dose");
                }}
                label="Custom dose (g)"
              />
            </div>
          </div>

          {inputMode === "dose" && (
            <div>
              <label className="c-label">Your dose — it derives the ratio</label>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[12px] text-[var(--c-muted)]">Coffee (g)</div>
                  <input
                    type="number"
                    min={1}
                    step={0.5}
                    value={doseCoffeeG}
                    onChange={(e) => {
                      markDirty();
                      setDoseCoffeeG(Math.max(0, Number(e.target.value)));
                    }}
                    className="mt-1 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-4 py-3 text-lg font-semibold text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
                  />
                </div>
                <div>
                  <div className="text-[12px] text-[var(--c-muted)]">Water (g)</div>
                  <input
                    type="number"
                    min={1}
                    step={5}
                    value={doseWaterG}
                    onChange={(e) => {
                      markDirty();
                      setDoseWaterG(Math.max(0, Number(e.target.value)));
                    }}
                    className="mt-1 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-4 py-3 text-lg font-semibold text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
                  />
                </div>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--c-muted)]">
                That works out to{" "}
                <span className="font-mono font-semibold text-[var(--c-accent-ink)]">
                  1:{result.ratio}
                </span>{" "}
                —{" "}
                {method.coldBrew
                  ? `steep water for a concentrate; dilute the strained yield to taste.`
                  : `about ${result.finishedVolumeOz} oz (${result.finishedVolumeMl} ml) in the cup after the grounds keep their share.`}
              </p>
            </div>
          )}

          {/* Amount */}
          {inputMode === "cup" && (
          <div>
            <label className="c-label">
              How much do you want{" "}
              {method.coldBrew || targetMode === "cup"
                ? "in the cup"
                : "of total water"}?
            </label>
            {/* The cup dial — fixed stops only, pre-solved against the brewer */}
            <div
              role="radiogroup"
              aria-label="Cup size in ounces"
              className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8"
            >
              {dialFits.map(({ oz, plan }) => {
                const selectable = plan === "ok" || plan === "bypass";
                const selected = effectiveAmount === oz;
                return (
                  <button
                    key={oz}
                    role="radio"
                    aria-checked={selected}
                    disabled={!selectable}
                    onClick={() => {
                      markDirty();
                      setAmount(oz);
                    }}
                    className={`relative rounded-xl border px-1 py-2.5 text-center transition ${
                      selected
                        ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10"
                        : selectable
                        ? "border-[var(--c-border)] hover:border-[var(--c-accent)]/50"
                        : "cursor-not-allowed border-[var(--c-border)]/60 opacity-35"
                    }`}
                  >
                    <span
                      className={`block font-mono text-lg font-bold tabular-nums leading-none ${
                        selected
                          ? "text-[var(--c-accent-ink)]"
                          : "text-[var(--c-ink)]"
                      }`}
                    >
                      {oz}
                      {plan === "bypass" && (
                        <span
                          aria-hidden
                          className="align-super text-[11px] font-semibold text-[var(--c-accent-ink)]"
                        >
                          *
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-[var(--c-muted)]">
                      oz
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--c-muted)]">
              <span className="font-mono font-semibold text-[var(--c-accent-ink)]">
                {effectiveAmount} oz
              </span>{" "}
              ≈ {round(ozToMl(effectiveAmount))} ml.
              {activeBrewer && hasDisabledStops && maxSelectableOz != null && (
                <>
                  {" "}
                  Your {activeBrewer.brand} {activeBrewer.model} tops out at{" "}
                  {maxSelectableOz} oz on this dial.
                </>
              )}
              {hasBypassStops && (
                <>
                  {" "}
                  <span className="font-semibold text-[var(--c-accent-ink)]">
                    *
                  </span>{" "}
                  Over the chamber — brews a concentrate, then tops up with hot
                  water at the end. Same strength, same cup.
                </>
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {method.coldBrew ? (
                <span className="text-[12px] text-[var(--c-muted)]">
                  Cold brew amount is the finished, ready-to-drink volume after dilution.
                </span>
              ) : (
                <>
                  <ModeChip
                    active={targetMode === "cup"}
                    onClick={() => {
                      markDirty();
                      setTargetMode("cup");
                    }}
                    label="Finished in cup"
                  />
                  <ModeChip
                    active={targetMode === "water"}
                    onClick={() => {
                      markDirty();
                      setTargetMode("water");
                    }}
                    label="Total water"
                  />
                </>
              )}
            </div>
          </div>
          )}

          {/* Style */}
          {inputMode === "cup" && (
          <div>
            <label className="c-label">Taste style</label>
            <div className="mt-3 space-y-2">
              {STYLES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => {
                    markDirty();
                    setStyle(s.key);
                    setUseCustomRatio(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    !useCustomRatio && style === s.key
                      ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10"
                      : "border-[var(--c-border)] hover:border-[var(--c-accent)]/50"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold text-[var(--c-ink)]">
                      {s.label}
                    </span>
                    <span className="block text-[12px] text-[var(--c-muted)]">
                      {s.hint}
                    </span>
                  </span>
                  <span className="font-mono text-sm text-[var(--c-accent-ink)]">
                    1:{method.styleRatios[s.key]}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom ratio */}
            <div className="mt-3 rounded-xl border border-[var(--c-border)] p-4">
              <label className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm font-medium text-[var(--c-ink)]">
                <input
                  type="checkbox"
                  checked={useCustomRatio}
                  onChange={(e) => {
                    markDirty();
                    setUseCustomRatio(e.target.checked);
                    if (
                      e.target.checked &&
                      (customRatio < ratioBounds.min || customRatio > ratioBounds.max)
                    ) {
                      setCustomRatio(method.recommendedRatio);
                    }
                  }}
                  className="h-4 w-4 accent-[var(--c-accent)]"
                />
                Dial in a custom ratio
              </label>
              {useCustomRatio && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--c-muted)]">Coffee to water</span>
                    <span className="font-mono font-semibold text-[var(--c-accent-ink)]">
                      1:{customRatio}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={ratioBounds.min}
                    max={ratioBounds.max}
                    step={0.5}
                    value={customRatio}
                    onChange={(e) => {
                      markDirty();
                      setCustomRatio(Number(e.target.value));
                    }}
                    className="mt-2 w-full accent-[var(--c-accent)]"
                  />
                  <div className="flex justify-between text-[11px] text-[var(--c-muted)]">
                    <span>{ratioBounds.minLabel}</span>
                    <span>{ratioBounds.maxLabel}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
        </div>

        {/* ───────────── Recipe ───────────── */}
        <div className="space-y-5">
          {journalNudge && (
            <div className="flex items-start gap-2 rounded-2xl border border-[var(--c-accent)]/25 bg-[var(--c-accent)]/[0.05] px-4 py-3">
              <span aria-hidden className="mt-0.5 text-[var(--c-accent-ink)]">→</span>
              <p className="text-[12px] leading-relaxed text-[var(--c-muted)]">
                <span className="font-semibold text-[var(--c-accent-ink)]">From your journal: </span>
                {journalNudge}
              </p>
            </div>
          )}
          {/* Headline numbers */}
          <div className="rounded-2xl border border-[var(--c-border)] bg-gradient-to-br from-[var(--c-accent)]/10 to-transparent p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="c-display text-xl font-bold text-[var(--c-ink)]">
                Your recipe
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyLink}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-accent)]/40 px-3.5 py-1 text-[12px] font-semibold text-[var(--c-accent-ink)] transition hover:bg-[var(--c-accent)]/10 active:scale-95"
                >
                  {copied ? "Link copied" : "Copy recipe link"}
                </button>
                <span className="rounded-full bg-[var(--c-accent)]/15 px-3 py-1 font-mono text-sm font-semibold text-[var(--c-accent-ink)]">
                  {ratioLabel}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat big label="Coffee" value={`${result.coffeeG} g`} />
              <Stat
                big
                label={method.coldBrew ? "Steep water" : "Total water"}
                value={`${method.coldBrew ? result.brewWaterG : result.totalWaterG} g`}
              />
              <Stat
                label="In the cup"
                value={`${result.finishedVolumeOz} oz`}
                sub={`${result.finishedVolumeMl} ml`}
              />
              <Stat
                label="Water temp"
                value={
                  method.waterTempF.low === method.waterTempF.high
                    ? `${result.waterTempF.high}°F`
                    : `${result.waterTempF.low}–${result.waterTempF.high}°F`
                }
                sub={`${result.waterTempC.low}–${result.waterTempC.high}°C`}
              />
            </div>

            <p className="mt-5 text-[13px] italic leading-relaxed text-[var(--c-muted)]">
              “{method.tasteSummary}”
            </p>
          </div>

          {/* Capacity fit */}
          {fit && activeBrewer && (
            <div
              className={`rounded-2xl border p-5 ${
                fit.fits
                  ? "border-[var(--c-border)] bg-[var(--c-card)]"
                  : "border-[var(--c-accent)]/40 bg-[var(--c-accent)]/[0.07]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FitIcon ok={fit.fits} />
                <h3 className="text-[14px] font-bold text-[var(--c-ink)]">
                  {fit.fits
                    ? `Fits your ${activeBrewer.brand} ${activeBrewer.model}`
                    : fit.plan === "bypass"
                    ? "Too big for the chamber — bypass plan"
                    : fit.plan === "reduce"
                    ? "Over this brewer's capacity"
                    : "Pick a bigger size"}
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--c-muted)]">
                {fit.message}
              </p>
              {fit.plan === "bypass" && fit.bypass && (
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <Stat
                    label="In the chamber"
                    value={`${fit.bypass.chamberWaterG} g`}
                    sub="brews the concentrate"
                  />
                  <Stat
                    label="Bypass after press"
                    value={`+${fit.bypass.bypassWaterG} g`}
                    sub="hot water into the cup"
                  />
                </div>
              )}
            </div>
          )}

          {/* Bloom */}
          {method.bloom.applies && (
            <div className="rounded-2xl border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/[0.06] p-6">
              <div className="flex items-center gap-2">
                <BloomIcon />
                <h3 className="text-base font-bold text-[var(--c-ink)]">
                  The bloom
                </h3>
              </div>
              <div className="mt-3 flex flex-wrap items-end gap-x-8 gap-y-2">
                <div>
                  <div className="text-2xl font-bold text-[var(--c-accent-ink)]">
                    {result.bloomWaterG} g
                  </div>
                  <div className="text-[12px] text-[var(--c-muted)]">
                    bloom water ({method.bloom.waterMultiplier}× the coffee)
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--c-accent-ink)]">
                    {method.bloom.timeSec}s
                  </div>
                  <div className="text-[12px] text-[var(--c-muted)]">rest time</div>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--c-muted)]">
                {method.bloom.technique}
              </p>
            </div>
          )}

          {/* Cold brew specifics */}
          {result.coldBrew && (
            <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6">
              <h3 className="text-base font-bold text-[var(--c-ink)]">
                Cold brew plan
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <Stat
                  label="Steep"
                  value={`${result.coldBrew.steepHoursLow}–${result.coldBrew.steepHoursHigh} h`}
                  sub="in the fridge"
                />
                <Stat
                  label="Then dilute"
                  value={
                    inputMode === "dose" ? "to taste" : `+${coldDilutionShownG} g`
                  }
                  sub={
                    inputMode === "dose"
                      ? "you set the steep water directly"
                      : "cold water or milk"
                  }
                />
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--c-muted)]">
                {inputMode === "dose"
                  ? `Steep ${result.coffeeG} g of coarse grounds in ${result.coldBrew.concentrateWaterG} g of cold water (${ratioLabel}). After straining you'll have about ${result.finishedVolumeMl} ml — dilute each glass to taste.`
                  : `Steep ${result.coffeeG} g of coarse grounds in ${result.coldBrew.concentrateWaterG} g of cold water (a strong 1:5 concentrate). Strain, then add ${coldDilutionShownG} g of cold water or milk to land on your ${ratioLabel} strength — ${result.finishedVolumeOz} oz in the glass.`}
              </p>
            </div>
          )}

          {/* Pour schedule + interactive timer */}
          {timerSteps.length > 0 && (
            <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="c-display text-base font-bold text-[var(--c-ink)]">
                  {method.isImmersion ? "Steps & timer" : "Pour schedule & timer"}
                </h3>
                <span className="text-[12px] text-[var(--c-muted)]">
                  target total ~{formatTime(timerTotalSec)}
                </span>
              </div>
              <BrewTimer
                key={`${methodKey}-${result.ratio}-${result.totalWaterG}-${fit?.plan ?? "none"}-${timerTotalSec}`}
                steps={timerSteps}
                totalSec={timerTotalSec}
                isImmersion={method.isImmersion}
              />
            </div>
          )}

          {/* Log this brew */}
          <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="c-display text-base font-bold text-[var(--c-ink)]">
                Log this brew
              </h3>
              {!logOpen && (
                <button
                  onClick={() => {
                    setLogOpen(true);
                    setLogSaved(false);
                  }}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-accent)]/40 px-4 text-[12px] font-semibold text-[var(--c-accent-ink)] transition hover:bg-[var(--c-accent)]/10"
                >
                  {logSaved ? "Log another" : "Add to journal"}
                </button>
              )}
            </div>
            {logSaved && !logOpen && (
              <p className="mt-2 text-[13px] text-[var(--c-muted)]">
                Saved to your on-device journal.{" "}
                <a
                  href="/journal"
                  className="font-medium text-[var(--c-accent-ink)] underline underline-offset-2"
                >
                  View journal
                </a>
              </p>
            )}
            {!logOpen && !logSaved && (
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--c-muted)]">
                Track the beans, the roaster, and how it tasted — saved on this
                device, no account.
              </p>
            )}
            {logOpen && (
              <div className="mt-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={logBeans}
                    onChange={(e) => setLogBeans(e.target.value)}
                    placeholder="Beans (e.g. Panther Big Bang)"
                    className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5 text-[14px] text-[var(--c-ink)] outline-none placeholder:text-[var(--c-muted)]/70 focus:border-[var(--c-accent)]"
                  />
                  <input
                    type="text"
                    value={logRoaster}
                    onChange={(e) => setLogRoaster(e.target.value)}
                    placeholder="Roaster / shop"
                    className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5 text-[14px] text-[var(--c-ink)] outline-none placeholder:text-[var(--c-muted)]/70 focus:border-[var(--c-accent)]"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="c-label mr-1">Rating</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setLogRating(n === logRating ? 0 : n)}
                      aria-label={`${n} of 5`}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition ${
                        n <= logRating
                          ? "text-[var(--c-accent-ink)]"
                          : "text-[var(--c-border)]"
                      }`}
                    >
                      ●
                    </button>
                  ))}
                </div>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="How did it taste? What would you change?"
                  rows={2}
                  className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-3.5 py-2.5 text-[14px] text-[var(--c-ink)] outline-none placeholder:text-[var(--c-muted)]/70 focus:border-[var(--c-accent)]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      saveEntry({
                        id: newId(),
                        ts: Date.now(),
                        method: method.shortName,
                        brewer: activeBrewer
                          ? `${activeBrewer.brand} ${activeBrewer.model}`
                          : undefined,
                        ratio: result.ratio,
                        oz: result.finishedVolumeOz,
                        beans: logBeans.trim() || undefined,
                        roaster: logRoaster.trim() || undefined,
                        rating: logRating || undefined,
                        notes: logNotes.trim() || undefined,
                      });
                      setLogOpen(false);
                      setLogSaved(true);
                      setLogBeans("");
                      setLogRoaster("");
                      setLogRating(0);
                      setLogNotes("");
                    }}
                    className="inline-flex min-h-[40px] items-center rounded-full bg-[var(--c-accent)] px-6 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
                  >
                    Save to journal
                  </button>
                  <button
                    onClick={() => setLogOpen(false)}
                    className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--c-border)] px-5 text-sm font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Grind + notes */}
          <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-6">
              <div>
                <div className="c-label">Grind</div>
                <div className="mt-1 text-sm font-semibold text-[var(--c-ink)]">
                  {method.grind}
                </div>
              </div>
              <div>
                <div className="c-label">Dial it in</div>
                <ul className="mt-1 space-y-1">
                  {method.notes.map((n, i) => (
                    <li
                      key={i}
                      className="text-[13px] leading-relaxed text-[var(--c-muted)]"
                    >
                      • {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────── The Water Ledger ───────────── */}
      <WaterLedger result={result} mode={method.coldBrew ? "cup" : targetMode} />
    </div>
  );
}

// The Water Ledger — the page's proof section. Every number here is computed
// live from the same engine call that produced the recipe above; nothing is
// hardcoded copy.
function WaterLedger({
  result,
  mode,
}: {
  result: BrewResult;
  mode: TargetMode;
}) {
  const m = result.method;
  const absorption = m.absorptionPerGram;
  // Derive displayed splits from the already-rounded headline figures so the
  // ledger always sums exactly — independent rounding must never make this
  // page disagree with itself by a gram. For the hot flow, "held" is the gap
  // between the two endpoints the user actually sees (water in, cup out).
  const brewShownG = round(result.totalWaterG - result.bloomWaterG);
  const heldShownG = round(result.totalWaterG - result.finishedVolumeMl);
  const concentrateOutG = round(result.brewWaterG - result.absorbedG);
  const dilutionShownG = round(result.finishedVolumeMl - concentrateOutG);

  return (
    <section
      aria-label="The water ledger — where every gram goes"
      className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="c-display text-lg font-bold text-[var(--c-ink)]">
          The water ledger
        </h3>
        <span className="text-[12px] uppercase tracking-wide text-[var(--c-muted)]">
          show your work
        </span>
      </div>

      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[var(--c-muted)]">
        Your grounds hold on to about {absorption} g of water for every gram of
        coffee. A calculator that ignores that shorts your cup by{" "}
        {result.coldBrew ? result.absorbedG : heldShownG} g.{" "}
        {mode === "cup"
          ? "This one solves for the cup:"
          : "In total-water mode, the cup is what survives:"}
      </p>

      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[300px] rounded-xl border border-dashed border-[var(--c-accent)]/40 bg-[var(--c-accent)]/[0.04] p-4 font-mono text-[13px] leading-7 text-[var(--c-ink)]">
          {mode === "cup" ? (
            <>
              <div className="text-[var(--c-muted)]">
                coffee = cup ÷ (ratio − absorption)
              </div>
              <div>
                {result.coffeeG} g = {result.finishedVolumeMl} ml ÷ (
                {result.ratio} − {absorption})
              </div>
            </>
          ) : (
            <>
              <div className="text-[var(--c-muted)]">
                cup = water − coffee × absorption
              </div>
              <div>
                {result.finishedVolumeMl} ml = {result.totalWaterG} g −{" "}
                {result.coffeeG} g × {absorption}
              </div>
            </>
          )}
        </div>
      </div>

      {/* The flow of every gram */}
      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        {result.coldBrew ? (
          <>
            <LedgerCell
              label="Steep water"
              value={`${result.brewWaterG} g`}
              sub={`1:5 concentrate on ${result.coffeeG} g coffee`}
            />
            <LedgerArrow />
            <LedgerCell
              label="Held by the grounds"
              value={`−${result.absorbedG} g`}
              sub={`${absorption} g per gram of coffee`}
              negative
            />
            <LedgerArrow />
            <LedgerCell
              label="In your glass"
              value={`${result.finishedVolumeMl} ml`}
              sub={`concentrate ${concentrateOutG} g + dilution ${dilutionShownG} g = ${result.finishedVolumeOz} oz`}
              highlight
            />
          </>
        ) : (
          <>
            <LedgerCell
              label="Water in"
              value={`${result.totalWaterG} g`}
              sub={
                result.bloomWaterG > 0
                  ? `${result.bloomWaterG} g bloom + ${brewShownG} g brew`
                  : "single charge, fully saturated"
              }
            />
            <LedgerArrow />
            <LedgerCell
              label="Held by the grounds"
              value={`−${heldShownG} g`}
              sub={`${absorption} g per gram of coffee`}
              negative
            />
            <LedgerArrow />
            <LedgerCell
              label="In your cup"
              value={`${result.finishedVolumeMl} ml`}
              sub={`${result.finishedVolumeOz} oz — what you asked for`}
              highlight
            />
          </>
        )}
      </div>
    </section>
  );
}

function LedgerCell({
  label,
  value,
  sub,
  negative,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  negative?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-[var(--c-accent)]/50 bg-[var(--c-accent)]/[0.08]"
          : "border-[var(--c-border)]"
      }`}
    >
      <div className="c-label">{label}</div>
      <div
        className={`mt-1 font-mono text-xl font-bold tabular-nums ${
          negative
            ? "text-[var(--c-muted)]"
            : highlight
            ? "text-[var(--c-accent-ink)]"
            : "text-[var(--c-ink)]"
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[12px] leading-snug text-[var(--c-muted)]">
        {sub}
      </div>
    </div>
  );
}

function LedgerArrow() {
  return (
    <div
      aria-hidden
      className="hidden justify-center text-lg text-[var(--c-muted)] sm:flex"
    >
      →
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  big,
}: {
  label: string;
  value: string;
  sub?: string;
  big?: boolean;
}) {
  return (
    <div>
      <div className="c-label">{label}</div>
      <div
        className={`mt-1 font-bold text-[var(--c-ink)] ${
          big ? "text-2xl" : "text-lg"
        }`}
      >
        {value}
      </div>
      {sub && <div className="text-[12px] text-[var(--c-muted)]">{sub}</div>}
    </div>
  );
}

function ModeChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center rounded-full border px-3 py-1 text-[12px] font-medium transition ${
        active
          ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10 text-[var(--c-accent-ink)]"
          : "border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]/50"
      }`}
    >
      {label}
    </button>
  );
}

function FitIcon({ ok }: { ok: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--c-accent-ink)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ok ? (
        <path d="M20 6 9 17l-5-5" />
      ) : (
        <>
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </>
      )}
    </svg>
  );
}

function BloomIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--c-accent-ink)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v6m0 0c-2 0-4 1.5-4 4a4 4 0 0 0 8 0c0-2.5-2-4-4-4z" />
      <path d="M5 14c0 4 3 7 7 7s7-3 7-7" />
    </svg>
  );
}
