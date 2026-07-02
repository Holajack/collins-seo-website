"use client";

import { useEffect, useRef, useState } from "react";
import { formatTime, type PourStep } from "./engine";

// An interactive brew timer that walks you through the pour schedule in real
// time: a progress ring counts down the whole brew, the current step lights up
// and pulses when it's time to pour, and your phone gives a gentle haptic tap
// at each step so you can keep your eyes on the scale, not the screen.

export default function BrewTimer({
  steps,
  totalSec,
  isImmersion,
}: {
  steps: PourStep[];
  totalSec: number;
  isImmersion: boolean;
}) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds, fractional
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const lastStepRef = useRef<number>(-1);

  // The parent remounts this component (via `key`) when the recipe changes, so
  // state naturally resets — no reset effect needed.

  useEffect(() => {
    if (!running) return;
    lastTsRef.current = null;
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setElapsed((e) => {
        const next = e + dt;
        if (next >= totalSec) {
          setRunning(false);
          return totalSec;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [running, totalSec]);

  // Which step are we in?
  let activeIdx = -1;
  for (let i = 0; i < steps.length; i++) {
    if (elapsed + 0.0001 >= steps[i].atSec) activeIdx = i;
  }
  const activeStep = activeIdx >= 0 ? steps[activeIdx] : null;
  const nextStep = activeIdx + 1 < steps.length ? steps[activeIdx + 1] : null;

  // Haptic tap on the phone when we cross into a new step.
  useEffect(() => {
    if (!running) return;
    if (activeIdx !== lastStepRef.current && activeIdx >= 0) {
      lastStepRef.current = activeIdx;
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.(60);
      }
    }
  }, [activeIdx, running]);

  // "Pour now" pulse for ~2.5s after a step begins.
  const inPourWindow =
    activeStep != null && elapsed - activeStep.atSec < 2.5 && running;

  const finished = elapsed >= totalSec;
  const remaining = Math.max(0, totalSec - elapsed);

  // Ring geometry
  const R = 86;
  const C = 2 * Math.PI * R;
  const progress = totalSec > 0 ? Math.min(1, elapsed / totalSec) : 0;

  return (
    <div>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
        {/* Progress ring */}
        <div className="relative shrink-0">
          <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="var(--c-border)"
              strokeWidth="10"
            />
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="var(--c-accent)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
              style={{ transition: running ? "none" : "stroke-dashoffset 0.3s ease" }}
            />
            {/* step tick marks around the ring */}
            {steps.map((s, i) => {
              const a = (s.atSec / totalSec) * 2 * Math.PI;
              const x = 100 + R * Math.cos(a);
              const y = 100 + R * Math.sin(a);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i <= activeIdx ? 5 : 3.5}
                  fill={i <= activeIdx ? "var(--c-accent-ink)" : "var(--c-muted)"}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`font-mono text-3xl font-bold tabular-nums text-[var(--c-ink)] ${
                inPourWindow ? "c-pulse" : ""
              }`}
            >
              {formatTime(elapsed)}
            </span>
            <span className="text-[11px] uppercase tracking-wide text-[var(--c-muted)]">
              {finished ? "done" : `−${formatTime(remaining)}`}
            </span>
          </div>
        </div>

        {/* Live status + controls */}
        <div className="flex-1 text-center sm:text-left">
          {finished ? (
            <div>
              <div className="text-lg font-bold text-[var(--c-ink)]">
                Brew complete ☕
              </div>
              <p className="mt-1 text-[13px] text-[var(--c-muted)]">
                {isImmersion
                  ? "Press / draw down and serve right away."
                  : "Let it finish drawing through, then swirl and serve."}
              </p>
            </div>
          ) : activeStep ? (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--c-muted)]">
                {inPourWindow ? "Now" : "Current step"}
              </div>
              <div
                className={`text-xl font-bold text-[var(--c-ink)] ${
                  inPourWindow ? "c-pulse" : ""
                }`}
              >
                {activeStep.label}
                <span className="text-[var(--c-accent-ink)]">
                  {" "}→ {activeStep.waterToG} g
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-snug text-[var(--c-muted)]">
                {activeStep.detail}
              </p>
              {nextStep && (
                <p className="mt-1.5 text-[12px] text-[var(--c-muted)]">
                  Next: {nextStep.label} at {formatTime(nextStep.atSec)} (
                  {nextStep.waterToG} g)
                </p>
              )}
            </div>
          ) : (
            <div>
              <div className="text-xl font-bold text-[var(--c-ink)]">
                Ready when you are
              </div>
              <p className="mt-1 text-[13px] text-[var(--c-muted)]">
                Tare your scale with the dripper and grounds, then press start.
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
            <button
              onClick={() => {
                if (finished) {
                  setElapsed(0);
                  lastStepRef.current = -1;
                }
                setRunning((r) => !r);
              }}
              className="rounded-full bg-[var(--c-accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
            >
              {running ? "Pause" : finished ? "Brew again" : elapsed > 0 ? "Resume" : "Start brew"}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setElapsed(0);
                lastStepRef.current = -1;
              }}
              className="rounded-full border border-[var(--c-border)] px-5 py-2.5 text-sm font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50 active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Step list with live highlighting */}
      <ol className="mt-6 space-y-2.5">
        {steps.map((step, i) => {
          const done = i < activeIdx;
          const active = i === activeIdx;
          return (
            <li
              key={i}
              className={`flex gap-3 rounded-xl px-3 py-2 transition ${
                active
                  ? "bg-[var(--c-accent)]/10 ring-1 ring-[var(--c-accent)]/30"
                  : ""
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  done
                    ? "bg-[var(--c-accent)] text-white"
                    : active
                    ? "bg-[var(--c-accent-ink)] text-white"
                    : "bg-[var(--c-border)] text-[var(--c-muted)]"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-[var(--c-ink)]">
                    <span className="font-mono text-[var(--c-accent-ink)]">
                      {formatTime(step.atSec)}
                    </span>{" "}
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
          );
        })}
      </ol>
    </div>
  );
}
