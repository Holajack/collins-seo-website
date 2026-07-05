"use client";

// Half-step star rating. Tap the left half of a star for a .5, the right half
// for the whole; tapping the current value clears it. Shared by the brew-log
// form and the journal editor so a rating always has the same granularity.
export default function RatingStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => {
          const full = value >= n;
          const half = !full && value >= n - 0.5;
          return (
            <span
              key={n}
              className="relative inline-flex h-9 w-9 items-center justify-center"
            >
              <button
                type="button"
                aria-label={`${n - 0.5} stars`}
                onClick={() => onChange(value === n - 0.5 ? 0 : n - 0.5)}
                className="absolute left-0 top-0 h-full w-1/2"
              />
              <button
                type="button"
                aria-label={`${n} stars`}
                onClick={() => onChange(value === n ? 0 : n)}
                className="absolute right-0 top-0 h-full w-1/2"
              />
              <span
                aria-hidden
                className="text-xl leading-none text-[var(--c-border)]"
              >
                ●
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-xl leading-none text-[var(--c-accent-ink)]"
                style={{
                  clipPath: full
                    ? "none"
                    : half
                    ? "inset(0 50% 0 0)"
                    : "inset(0 100% 0 0)",
                }}
              >
                ●
              </span>
            </span>
          );
        })}
      </div>
      <span className="text-[13px] font-semibold text-[var(--c-ink)]">
        {value ? value.toFixed(1) : "—"}
      </span>
      {value > 0 && (
        <button
          type="button"
          onClick={() => onChange(0)}
          className="text-[12px] text-[var(--c-muted)] underline-offset-2 hover:underline"
        >
          clear
        </button>
      )}
    </div>
  );
}
