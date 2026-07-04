// Hand-built Chemex illustration, v2. Pure vector so it stays razor-sharp on
// any screen, themed entirely from the page palette. Animated: three steam
// wisps rising (c-steam), a drip stream falling from the cone (c-drip), and a
// slow shimmer across the brewed coffee (c-shimmer) — all defined in
// CoffeeTheme and disabled under prefers-reduced-motion.

export default function PourOverArt() {
  return (
    <svg
      viewBox="0 0 280 340"
      fill="none"
      className="h-auto w-full drop-shadow-sm"
      role="img"
      aria-label="A Chemex pour-over carafe mid-brew: steam rising, coffee dripping into the lower bulb"
    >
      {/* Steam */}
      <g
        className="c-steam"
        stroke="var(--c-muted)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M118 70 C108 56 126 48 116 34 C109 24 121 16 116 6" />
        <path d="M140 72 C130 58 148 50 138 36 C131 26 143 18 138 8" />
        <path d="M162 70 C152 56 170 48 160 34 C153 24 165 16 160 6" />
      </g>

      {/* Glass body */}
      <g
        stroke="var(--c-ink)"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinejoin="round"
      >
        {/* top rim */}
        <ellipse cx="140" cy="84" rx="66" ry="12" fill="var(--c-card)" />
        {/* upper funnel */}
        <path
          d="M76 86 L124 160 M204 86 L156 160"
          fill="none"
          strokeLinecap="round"
        />
        {/* lower bulb */}
        <path
          d="M124 176 C124 210 78 214 78 262
             C78 286 100 300 140 300
             C180 300 202 286 202 262
             C202 214 156 210 156 176"
          fill="var(--c-card)"
        />
      </g>

      {/* Filter bed inside the cone */}
      <path
        d="M96 100 C104 96 176 96 184 100 L146 152 C143 156 137 156 134 152 Z"
        fill="var(--c-accent)"
        opacity="0.18"
      />
      <path
        d="M104 106 C120 112 160 112 176 106"
        stroke="var(--c-accent-ink)"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Drip stream from cone to coffee */}
      <g className="c-drip" fill="var(--c-accent-ink)">
        <circle cx="140" cy="172" r="3" />
        <circle cx="140" cy="196" r="2.6" />
        <circle cx="140" cy="222" r="2.2" />
      </g>

      {/* Coffee in the bulb */}
      <path
        d="M86 250 C86 280 106 292 140 292
           C174 292 194 280 194 250
           C194 244 168 240 140 240
           C112 240 86 244 86 250 Z"
        fill="var(--c-accent-ink)"
      />
      <ellipse cx="140" cy="250" rx="54" ry="9" fill="var(--c-accent)" opacity="0.9" />
      {/* shimmer across the surface */}
      <ellipse
        className="c-shimmer"
        cx="126"
        cy="248"
        rx="18"
        ry="3.5"
        fill="#ffffff"
        opacity="0.35"
      />

      {/* Measurement ticks on the bulb — every gram accounted for */}
      <g stroke="var(--c-muted)" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round">
        <path d="M90 232 h9" />
        <path d="M87 250 h9" />
        <path d="M90 268 h9" />
      </g>

      {/* Wooden collar + leather tie */}
      <rect x="110" y="150" width="60" height="30" rx="9" fill="var(--c-accent)" />
      <rect
        x="110"
        y="150"
        width="60"
        height="30"
        rx="9"
        fill="none"
        stroke="var(--c-accent-ink)"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      {/* wood grain */}
      <path
        d="M118 154 C120 162 118 170 119 176 M126 152 C128 162 126 170 127 178 M154 152 C156 162 154 170 155 178 M162 154 C164 162 162 170 163 176"
        stroke="var(--c-accent-ink)"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M138 150 L138 180 M142 150 L142 180"
        stroke="var(--c-accent-ink)"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      {/* leather tie knot */}
      <circle cx="140" cy="165" r="4" fill="var(--c-accent-ink)" opacity="0.55" />

      {/* glass highlights */}
      <path
        d="M96 96 L132 150"
        stroke="var(--c-card)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M104 196 C100 220 96 236 104 258"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
