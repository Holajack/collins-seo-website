"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--border)] dark:bg-[var(--slate-950)]/95">
      {/* Top bar with phone number */}
      <div className="bg-[var(--primary)] text-white text-sm">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-9">
          <span className="hidden sm:inline">
            209 Dunlawton Ave, Suite 18, Port Orange, FL 32127
          </span>
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <a
              href="tel:+13863089076"
              className="flex items-center gap-1.5 hover:text-white/80"
            >
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (386) 308-9076
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline">Most Insurances Accepted</span>
          </div>
        </div>
      </div>

      <nav className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Dr. Collins
            <span className="text-[var(--primary)]">, DC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            <Link
              href="/"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-[15px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Contact
            </Link>
            <Link
              href="/new-patient"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)]"
            >
              New Patient Forms
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--slate-100)] lg:hidden dark:hover:bg-[var(--slate-800)]"
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
          <div className="border-t border-[var(--border)] py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                About
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                Services
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] text-[var(--muted)] hover:bg-[var(--slate-100)] hover:text-[var(--foreground)] dark:hover:bg-[var(--slate-800)]"
              >
                Contact
              </Link>
              <Link
                href="/new-patient"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)]"
              >
                New Patient Forms
              </Link>
              <a
                href="tel:+13863089076"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--primary)] px-5 text-[15px] font-medium text-[var(--primary)] hover:bg-[var(--primary)]/5"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call (386) 308-9076
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
