// Shared visual identity for every page: the coffee palette, editorial serif,
// and the small animation set. Render once inside each page's .c-scope root.

export default function CoffeeTheme() {
  return (
    <style>{`
      .c-scope {
        --c-bg: #faf6f0;
        --c-card: #ffffff;
        --c-ink: #2b2018;
        --c-muted: #8a7a6c;
        --c-border: #e8ddd0;
        --c-accent: #b06a3b;
        --c-accent-ink: #8a4f29;
        --c-display: var(--font-display-serif), "Iowan Old Style",
          "Palatino Linotype", Palatino, "Book Antiqua", "Hoefler Text",
          Georgia, ui-serif, serif;
      }
      @media (prefers-color-scheme: dark) {
        .c-scope {
          --c-bg: #16110c;
          --c-card: #211a13;
          --c-ink: #f3ece2;
          --c-muted: #b3a392;
          --c-border: #382c20;
          --c-accent: #d08a52;
          --c-accent-ink: #e6ad7a;
        }
      }
      .c-scope .c-display {
        font-family: var(--c-display);
        letter-spacing: -0.01em;
      }
      .c-scope .c-label {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--c-muted);
      }
      @keyframes c-pulse-kf {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.55; transform: scale(1.04); }
      }
      .c-scope .c-pulse {
        animation: c-pulse-kf 1s ease-in-out infinite;
        transform-origin: left center;
      }
      @keyframes c-steam-kf {
        0% { opacity: 0; transform: translateY(6px) scaleX(0.9); }
        35% { opacity: 0.7; }
        100% { opacity: 0; transform: translateY(-26px) scaleX(1.15); }
      }
      .c-scope .c-steam path {
        animation: c-steam-kf 4.5s ease-in-out infinite;
        transform-origin: center bottom;
      }
      .c-scope .c-steam path:nth-child(2) { animation-delay: 1.5s; }
      .c-scope .c-steam path:nth-child(3) { animation-delay: 3s; }
      @keyframes c-drip-kf {
        0% { opacity: 0; transform: translateY(-14px); }
        25% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translateY(46px); }
      }
      .c-scope .c-drip circle {
        animation: c-drip-kf 2.2s cubic-bezier(0.5, 0, 0.9, 0.6) infinite;
      }
      .c-scope .c-drip circle:nth-child(2) { animation-delay: 0.7s; }
      .c-scope .c-drip circle:nth-child(3) { animation-delay: 1.4s; }
      @keyframes c-shimmer-kf {
        0%, 100% { transform: translateX(0); opacity: 0.35; }
        50% { transform: translateX(26px); opacity: 0.15; }
      }
      .c-scope .c-shimmer {
        animation: c-shimmer-kf 5.5s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .c-scope .c-pulse, .c-scope .c-steam path,
        .c-scope .c-drip circle, .c-scope .c-shimmer { animation: none; }
      }
    `}</style>
  );
}
