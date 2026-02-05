import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--slate-50)] dark:bg-[var(--slate-900)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
            >
              Dr. Collins<span className="text-[var(--primary)]">, DC</span>
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
              Expert chiropractic care and acupuncture in Port Orange, FL.
              Palmer College of Chiropractic graduate dedicated to helping you
              live pain-free.
            </p>
            <div className="mt-4">
              <a
                href="tel:+13863089076"
                className="text-[15px] font-medium text-[var(--primary)] hover:text-[var(--primary-dark)]"
              >
                (386) 308-9076
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Chiropractic Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Acupuncture
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Spinal Decompression
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Pain Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  About Dr. Collins
                </Link>
              </li>
              <li>
                <Link
                  href="/new-patient"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  New Patient Forms
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Health Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Office
            </h4>
            <ul className="space-y-3">
              <li className="text-[15px] text-[var(--muted)]">
                209 Dunlawton Ave, Suite 18
                <br />
                Port Orange, FL 32127
              </li>
              <li>
                <a
                  href="tel:+13863089076"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  (386) 308-9076
                </a>
              </li>
              <li>
                <a
                  href="mailto:askradianthealth@gmail.com"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  askradianthealth@gmail.com
                </a>
              </li>
              <li className="text-[15px] text-[var(--muted)]">
                Mon-Fri: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Insurance notice */}
        <div className="mt-10 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/10 p-4 text-center">
          <p className="text-sm text-[var(--muted)]">
            We accept most major insurance plans including Medicare and Medicaid.{" "}
            <Link
              href="/contact"
              className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)]"
            >
              Contact us to verify your coverage.
            </Link>
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--muted)]">
            &copy; {currentYear} Dr. Collins, DC - Chiropractic Care &
            Acupuncture. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-[var(--muted)] hover:text-[var(--primary)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--muted)] hover:text-[var(--primary)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
