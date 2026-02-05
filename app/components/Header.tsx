"use client";

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--border)] dark:bg-[var(--slate-950)]/95">
      <nav className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Collins<span className="text-[var(--primary)]">SEO</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#services"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              About
            </a>
            <a
              href="#results"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Results
            </a>
            <a
              href="#contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)]"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--slate-100)] md:hidden dark:hover:bg-[var(--slate-800)]"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-[var(--border)] py-4 md:hidden">
            <div className="flex flex-col gap-1">
              <a
                href="#services"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                About
              </a>
              <a
                href="#results"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                Results
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)]"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
