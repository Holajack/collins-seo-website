export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--slate-50)] dark:bg-[var(--slate-900)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
            >
              Collins<span className="text-[var(--primary)]">SEO</span>
            </a>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
              Helping businesses grow through strategic, results-driven search
              engine optimization.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Technical SEO
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Local SEO
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Content Strategy
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Link Building
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="text-[15px] text-[var(--muted)]">
                hello@collinsseo.com
              </li>
              <li className="text-[15px] text-[var(--muted)]">
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--muted)]">
            &copy; {currentYear} Collins SEO. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-[var(--muted)] hover:text-[var(--primary)]"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-[var(--muted)] hover:text-[var(--primary)]"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
