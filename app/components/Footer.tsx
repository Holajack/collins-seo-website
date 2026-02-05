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
              <span className="text-[var(--primary)]">Radiant</span> Health
            </a>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
              Helping you live pain-free through natural, personalized
              chiropractic care.
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
                  Spinal Adjustments
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Back Pain Relief
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Neck & Shoulder Care
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Headache Treatment
                </a>
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
                <a
                  href="#about"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  About Dr. Collins
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Patient Stories
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[15px] text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-[15px] text-[var(--muted)]">
                123 Wellness Way, Suite 100
                <br />
                Healthville, CA 90210
              </li>
              <li className="text-[15px] text-[var(--muted)]">
                (555) 123-4567
              </li>
              <li className="text-[15px] text-[var(--muted)]">
                info@radianthealth.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--muted)]">
            &copy; {currentYear} Radiant Health Chiropractic. All rights
            reserved.
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
