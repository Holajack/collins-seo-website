"use client";

import { useMemo, useState } from "react";
import {
  BREW_METHODS,
  type BrewMethodKey,
} from "./brew-data";
import {
  calculateBrew,
  formatTime,
  ozToMl,
  type StyleKey,
  type TargetMode,
} from "./engine";

type Unit = "oz" | "ml" | "cups";
const CUP_ML = 240; // a "cup" of coffee ≈ 8 fl oz ≈ 240 ml

const STYLES: { key: StyleKey; label: string; hint: string }[] = [
  { key: "strong", label: "Strong & bold", hint: "Lower ratio, more coffee" },
  { key: "balanced", label: "Balanced", hint: "The sweet spot" },
  { key: "light", label: "Light & bright", hint: "Higher ratio, more tea-like" },
];

export default function BrewCalculator() {
  const [methodKey, setMethodKey] = useState<BrewMethodKey>("pourover_v60");
  const [style, setStyle] = useState<StyleKey>("balanced");
  const [amount, setAmount] = useState<number>(12);
  const [unit, setUnit] = useState<Unit>("oz");
  const [targetMode, setTargetMode] = useState<TargetMode>("cup");
  const [useCustomRatio, setUseCustomRatio] = useState(false);
  const [customRatio, setCustomRatio] = useState<number>(16);

  const method = BREW_METHODS[methodKey];

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

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
      {/* ───────────── Controls ───────────── */}
      <div className="space-y-7 rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6 sm:p-7">
        {/* Method */}
        <div>
          <label className="c-label">Brew method</label>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.keys(BREW_METHODS) as BrewMethodKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setMethodKey(k)}
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
            {targetMode === "cup" ? "in the cup" : "of total water"}?
          </label>
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg)] px-4 py-3 text-lg font-semibold text-[var(--c-ink)] outline-none focus:border-[var(--c-accent)]"
            />
            <div className="flex overflow-hidden rounded-xl border border-[var(--c-border)]">
              {(["oz", "ml", "cups"] as Unit[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
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
                  onClick={() => setTargetMode("cup")}
                  label="Finished in cup"
                />
                <ModeChip
                  active={targetMode === "water"}
                  onClick={() => setTargetMode("water")}
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
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--c-ink)]">
              <input
                type="checkbox"
                checked={useCustomRatio}
                onChange={(e) => setUseCustomRatio(e.target.checked)}
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
                  min={12}
                  max={20}
                  step={0.5}
                  value={customRatio}
                  onChange={(e) => setCustomRatio(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--c-accent)]"
                />
                <div className="flex justify-between text-[11px] text-[var(--c-muted)]">
                  <span>1:12 (intense)</span>
                  <span>1:20 (delicate)</span>
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
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-[var(--c-ink)]">
              Your recipe
            </h2>
            <span className="rounded-full bg-[var(--c-accent)]/15 px-3 py-1 font-mono text-sm font-semibold text-[var(--c-accent-ink)]">
              {ratioLabel}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat big label="Coffee" value={`${result.coffeeG} g`} />
            <Stat
              big
              label={method.coldBrew ? "Steep water" : "Total water"}
              value={`${result.totalWaterG} g`}
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

        {/* Bloom — the hero of the request */}
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
                value={`+${result.coldBrew.dilutionWaterG} g`}
                sub="cold water or milk"
              />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--c-muted)]">
              Steep {result.coffeeG} g of coarse grounds in{" "}
              {result.coldBrew.concentrateWaterG} g of cold water (a strong 1:5
              concentrate). Strain, then add {result.coldBrew.dilutionWaterG} g
              of cold water or milk to land on your {ratioLabel} strength —{" "}
              {result.finishedVolumeOz} oz in the glass.
            </p>
          </div>
        )}

        {/* Pour schedule */}
        {result.steps.length > 0 && (
          <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-card)] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--c-ink)]">
                {method.isImmersion ? "Steps" : "Pour schedule"}
              </h3>
              <span className="text-[12px] text-[var(--c-muted)]">
                target total ~
                {formatTime(method.totalBrewTimeSec.high)}
              </span>
            </div>
            <ol className="mt-4 space-y-3">
              {result.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 w-12 shrink-0 font-mono text-sm font-semibold text-[var(--c-accent-ink)]">
                    {formatTime(step.atSec)}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-[var(--c-ink)]">
                        {step.label}
                      </span>
                      <span className="font-mono text-[13px] text-[var(--c-muted)]">
                        → {step.waterToG} g
                      </span>
                    </span>
                    <span className="block text-[12px] leading-relaxed text-[var(--c-muted)]">
                      {step.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
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
      className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
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
