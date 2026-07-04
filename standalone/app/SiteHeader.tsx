import Link from "next/link";

const NAV = [
  { href: "/", label: "Calculator", short: "Brew" },
  { href: "/beans", label: "Beans & Shops", short: "Beans" },
  { href: "/journal", label: "Journal", short: "Journal" },
];

export default function SiteHeader({ active }: { active: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--c-border)] bg-[var(--c-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <CupMark />
          <span className="c-display text-[17px]">The Perfect Brew</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                active === n.href
                  ? "bg-[var(--c-accent)]/12 text-[var(--c-accent-ink)]"
                  : "text-[var(--c-muted)] hover:text-[var(--c-accent-ink)]"
              }`}
            >
              <span className="sm:hidden">{n.short}</span>
              <span className="hidden sm:inline">{n.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function CupMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--c-accent-ink)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z" />
      <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 2c-.5 1 .5 1.5 0 2.5M11 2c-.5 1 .5 1.5 0 2.5" />
    </svg>
  );
}
