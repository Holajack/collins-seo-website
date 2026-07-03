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
  type BrewResult,
  type StyleKey,
  type TargetMode,
} from "./engine";
import BrewTimer from "./BrewTimer";

type Unit = "oz" | "ml" | "cups";
const CUP_ML = 240; // a "cup" of coffee ≈ 8 fl oz ≈ 240 ml
const USUAL_KEY = "pb:usual";

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
}

const UNITS: Unit[] = ["oz", "ml", "cups"];

function parseState(params: URLSearchParams): Partial<BrewState> | null {
  const out: Partial<BrewState> = {};
  const m = params.get("m");
  if (m && m in BREW_METHODS) out.m = m as BrewMethodKey;
  const s = params.get("s");
  if (s && STYLES.some((x) => x.key === s)) out.s = s as StyleKey;
  const a = Number(params.get("a"));
  // Clamp rather than drop, so a shared 1.5 L cold-brew batch never silently
  // reverts to the 12-unit default (20000 covers 20 L in ml).
  if (Number.isFinite(a) && a > 0) out.a = Math.min(a, 20000);
  const u = params.get("u");
  if (u && UNITS.includes(u as Unit)) out.u = u as Unit;
  const mode = params.get("mode");
  if (mode === "cup" || mode === "water") out.mode = mode;
  const r = Number(params.get("r"));
  if (Number.isFinite(r) && r >= 4 && r <= 25) out.r = r;
  return Object.keys(out).length > 0 ? out : null;
}

export default function BrewCalculator() {
  const [methodKey, setMethodKey] = useState<BrewMethodKey>("pourover_v60");
  const [style, setStyle] = useState<StyleKey>("balanced");
  const [amount, setAmount] = useState<number>(12);
  const [unit, setUnit] = useState<Unit>("oz");
  const [targetMode, setTargetMode] = useState<TargetMode>("cup");
  const [useCustomRatio, setUseCustomRatio] = useState(false);
  const [customRatio, setCustomRatio] = useState<number>(16);
  const [usualLoaded, setUsualLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  // Only a real user interaction may write the "usual" or rewrite the URL —
  // merely opening a shared link must never overwrite the saved recipe.
  const dirtyRef = useRef(false);

  const method = BREW_METHODS[methodKey];

  // Custom ratio bounds differ by method: cold brew ready-to-drink strengths
  // run much lower denominators than drip.
  const ratioBounds = method.coldBrew
    ? { min: 6, max: 12, minLabel: "1:6 (bold)", maxLabel: "1:12 (delicate)" }
    : { min: 12, max: 20, minLabel: "1:12 (intense)", maxLabel: "1:20 (delicate)" };

  const applyState = (s: Partial<BrewState>) => {
    const targetMethod = s.m ?? methodKey;
    if (s.m) setMethodKey(s.m);
    if (s.s) setStyle(s.s);
    if (s.a != null) setAmount(s.a);
    if (s.u) setUnit(s.u);
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
    params.set("s", style);
    params.set("a", String(amount));
    params.set("u", unit);
    if (!BREW_METHODS[methodKey].coldBrew) params.set("mode", targetMode);
    if (useCustomRatio) params.set("r", String(customRatio));
    return params;
  };

  // After any real interaction: keep the URL shareable and remember the
  // recipe on this device.
  useEffect(() => {
    if (!dirtyRef.current) return;
    const state: BrewState = {
      m: methodKey,
      s: style,
      a: amount,
      u: unit,
      mode: targetMode,
      ...(useCustomRatio ? { r: customRatio } : {}),
    };
    try {
      window.localStorage.setItem(USUAL_KEY, JSON.stringify(state));
    } catch {}
    const params = new URLSearchParams();
    params.set("m", state.m);
    params.set("s", state.s);
    params.set("a", String(state.a));
    params.set("u", state.u);
    if (!BREW_METHODS[state.m].coldBrew) params.set("mode", state.mode);
    if (state.r != null) params.set("r", String(state.r));
    try {
      window.history.replaceState(
        null,
        "",
        `?${params.toString()}${window.location.hash}`
      );
    } catch {}
  }, [methodKey, style, amount, unit, targetMode, useCustomRatio, customRatio]);

  const markDirty = () => {
    dirtyRef.current = true;
  };

  const targetMl = useMemo(() => {
    if (unit === "oz") return ozToMl(amount);
    if (unit === "cups") return amount * CUP_ML;
    return amount;
  }, [amount, unit]);

  const result = useMemo(
    () =>
      calculateBrew(
        method,
        style,
        targetMl,
        targetMode,
        useCustomRatio ? customRatio : undefined
      ),
    [method, style, targetMl, targetMode, useCustomRatio, customRatio]
  );

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
          </div>

          {/* Amount */}
          <div>
            <label className="c-label">
              How much do you want{" "}
              {method.coldBrew || targetMode === "cup"
                ? "in the cup"
                : "of total water"}?
            </label>
            <div className="mt-3 flex gap-2">
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => {
                  markDirty();
                  setAmount(Math.max(0, Number(e.target.value)));
                }}
                className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-4 py-3 text-lg font-semibold text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
              />
              <div className="flex overflow-hidden rounded-xl border border-[var(--c-border)]">
                {UNITS.map((u) => (
                  <button
                    key={u}
                    onClick={() => {
                      markDirty();
                      setUnit(u);
                    }}
                    className={`px-3 text-sm font-medium transition ${
                      unit === u
                        ? "bg-[var(--c-accent)] text-white"
                        : "bg-transparent text-[var(--c-muted)] hover:bg-[var(--c-accent)]/10"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
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

          {/* Style */}
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
        </div>

        {/* ───────────── Recipe ───────────── */}
        <div className="space-y-5">
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
                  value={`+${coldDilutionShownG} g`}
                  sub="cold water or milk"
                />
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--c-muted)]">
                Steep {result.coffeeG} g of coarse grounds in{" "}
                {result.coldBrew.concentrateWaterG} g of cold water (a strong 1:5
                concentrate). Strain, then add {coldDilutionShownG} g of cold
                water or milk to land on your {ratioLabel} strength —{" "}
                {result.finishedVolumeOz} oz in the glass.
              </p>
            </div>
          )}

          {/* Pour schedule + interactive timer */}
          {result.steps.length > 0 && (
            <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="c-display text-base font-bold text-[var(--c-ink)]">
                  {method.isImmersion ? "Steps & timer" : "Pour schedule & timer"}
                </h3>
                <span className="text-[12px] text-[var(--c-muted)]">
                  target total ~{formatTime(method.totalBrewTimeSec.high)}
                </span>
              </div>
              <BrewTimer
                key={`${methodKey}-${result.ratio}-${result.totalWaterG}`}
                steps={result.steps}
                totalSec={method.totalBrewTimeSec.high}
                isImmersion={method.isImmersion}
              />
            </div>
          )}

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
