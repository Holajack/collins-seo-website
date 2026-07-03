"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatTime, type PourStep } from "./engine";

// An interactive brew timer that walks you through the pour schedule in real
// time: a progress ring counts the whole brew, the current step lights up and
// pulses when it's time to pour, a synthesized chime marks each step (works on
// every phone, including iPhones where vibration isn't supported), and the
// screen is kept awake for the duration of the brew via the Wake Lock API.
//
// Timing is anchored to performance.now(), not accumulated frame deltas, so
// the clock stays honest even if the tab is briefly hidden or frames drop.

function playChime(ctx: AudioContext, kind: "pour" | "done") {
  // E5→G5 for a pour; C5→E5→G5 rising for brew complete.
  const notes =
    kind === "pour" ? [659.25, 783.99] : [523.25, 659.25, 783.99];
  const t0 = ctx.currentTime;
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = t0 + i * (kind === "pour" ? 0.12 : 0.16);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.55);
  });
}

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
  const [muted, setMuted] = useState(false);
  const startAnchorRef = useRef<number | null>(null); // performance.now() at elapsed=0
  const rafRef = useRef<number | null>(null);
  const lastStepRef = useRef<number>(-1);
  const doneNotifiedRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // The parent remounts this component (via `key`) when the recipe changes, so
  // state naturally resets.

  // Mute preference lives in localStorage, which SSR can't read — hydrate it
  // once after mount.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMuted(window.localStorage.getItem("pb:muted") === "1");
    } catch {}
  }, []);

  const acquireWakeLock = useCallback(async () => {
    try {
      if ("wakeLock" in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      }
    } catch {}
  }, []);

  const releaseWakeLock = useCallback(() => {
    try {
      wakeLockRef.current?.release();
    } catch {}
    wakeLockRef.current = null;
  }, []);

  // Tick loop: rAF for smooth ring motion, a 500ms interval as a fallback so
  // the clock and chimes keep advancing if frames stop, and a recompute on
  // visibilitychange (wake locks auto-release when the page hides, so we also
  // re-acquire there).
  useEffect(() => {
    if (!running) return;
    const compute = () => {
      if (startAnchorRef.current == null) return;
      const e = (performance.now() - startAnchorRef.current) / 1000;
      if (e >= totalSec) {
        setElapsed(totalSec);
        setRunning(false);
      } else {
        setElapsed(e);
      }
    };
    const loop = () => {
      compute();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    const interval = window.setInterval(compute, 500);
    const onVisibility = () => {
      compute();
      if (document.visibilityState === "visible") acquireWakeLock();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [running, totalSec, acquireWakeLock]);

  // Release the wake lock and close audio on unmount.
  useEffect(() => {
    return () => {
      try {
        wakeLockRef.current?.release();
      } catch {}
      audioRef.current?.close().catch(() => {});
    };
  }, []);

  // Which step are we in?
  let activeIdx = -1;
  for (let i = 0; i < steps.length; i++) {
    if (elapsed + 0.0001 >= steps[i].atSec) activeIdx = i;
  }
  const activeStep = activeIdx >= 0 ? steps[activeIdx] : null;
  const nextStep = activeIdx + 1 < steps.length ? steps[activeIdx + 1] : null;

  // Chime + haptic tap when we cross into a new step.
  useEffect(() => {
    if (!running) return;
    if (activeIdx !== lastStepRef.current && activeIdx >= 0) {
      lastStepRef.current = activeIdx;
      if ("vibrate" in navigator) navigator.vibrate?.(60);
      if (!muted && audioRef.current) playChime(audioRef.current, "pour");
    }
  }, [activeIdx, running, muted]);

  const finished = elapsed >= totalSec;

  // Completion chime, once.
  useEffect(() => {
    if (finished && !doneNotifiedRef.current) {
      doneNotifiedRef.current = true;
      if ("vibrate" in navigator) navigator.vibrate?.([80, 60, 80]);
      if (!muted && audioRef.current) playChime(audioRef.current, "done");
      releaseWakeLock();
    }
  }, [finished, muted, releaseWakeLock]);

  const handleStartPause = () => {
    if (running) {
      setRunning(false);
      releaseWakeLock();
      return;
    }
    // Create/resume audio inside the user gesture — required on iOS.
    if (!audioRef.current) {
      try {
        audioRef.current = new AudioContext();
      } catch {}
    }
    audioRef.current?.resume().catch(() => {});
    const resumeFrom = finished ? 0 : elapsed;
    if (finished) {
      setElapsed(0);
      lastStepRef.current = -1;
      doneNotifiedRef.current = false;
    }
    startAnchorRef.current = performance.now() - resumeFrom * 1000;
    setRunning(true);
    acquireWakeLock();
  };

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    lastStepRef.current = -1;
    doneNotifiedRef.current = false;
    releaseWakeLock();
  };

  const toggleMute = () => {
    setMuted((m) => {
      try {
        window.localStorage.setItem("pb:muted", m ? "0" : "1");
      } catch {}
      return !m;
    });
  };

  // "Pour now" pulse for ~2.5s after a step begins.
  const inPourWindow =
    activeStep != null && elapsed - activeStep.atSec < 2.5 && running;

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
                Brew complete
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

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <button
              onClick={handleStartPause}
              className="rounded-full bg-[var(--c-accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
            >
              {running ? "Pause" : finished ? "Brew again" : elapsed > 0 ? "Resume" : "Start brew"}
            </button>
            <button
              onClick={handleReset}
              className="rounded-full border border-[var(--c-border)] px-5 py-2.5 text-sm font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50 active:scale-95"
            >
              Reset
            </button>
            <button
              onClick={toggleMute}
              aria-label={muted ? "Turn chime on" : "Turn chime off"}
              title={muted ? "Turn chime on" : "Turn chime off"}
              className="flex items-center gap-1.5 rounded-full border border-[var(--c-border)] px-4 py-2.5 text-sm font-medium text-[var(--c-muted)] transition hover:border-[var(--c-accent)]/50 active:scale-95"
            >
              <BellIcon muted={muted} />
              {muted ? "Muted" : "Chime"}
            </button>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-[var(--c-muted)]">
            Chimes at every pour and keeps your screen awake while you brew.
            Also taps, on phones that support it.
          </p>
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

function BellIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      {muted && <line x1="2" y1="2" x2="22" y2="22" />}
    </svg>
  );
}
