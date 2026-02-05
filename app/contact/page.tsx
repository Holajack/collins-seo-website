import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { BreadcrumbSchema } from "../components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Contact Dr. Collins - Chiropractor in Port Orange, FL",
  description:
    "Contact Dr. Collins' chiropractic and acupuncture office in Port Orange, FL. Located at 209 Dunlawton Ave, Suite 18. Call (386) 308-9076. Most insurances accepted including Medicare and Medicaid.",
  openGraph: {
    title: "Contact Dr. Collins - Chiropractor in Port Orange, FL",
    description:
      "Contact our Port Orange chiropractic office. Call (386) 308-9076. Most insurances accepted.",
  },
  alternates: {
    canonical: "https://drcollinschiropractor.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://drcollinschiropractor.com" },
          {
            name: "Contact",
            url: "https://drcollinschiropractor.com/contact",
          },
        ]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--primary)]/[0.04] to-transparent" />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <nav
                className="mb-6 text-sm text-[var(--muted)]"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-[var(--primary)]">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-[var(--foreground)]">Contact</span>
              </nav>
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl">
                Contact <span className="text-[var(--primary)]">Us</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Ready to schedule your appointment or have questions about our
                services? We are here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Map */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Contact Details */}
              <div className="space-y-8">
                {/* Phone */}
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        Phone
                      </h3>
                      <a
                        href="tel:+13863089076"
                        className="mt-1 text-lg text-[var(--primary)] font-medium hover:text-[var(--primary-dark)]"
                      >
                        (386) 308-9076
                      </a>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Call to schedule an appointment or verify insurance
                        coverage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        Office Address
                      </h3>
                      <p className="mt-1 text-[var(--muted)]">
                        209 Dunlawton Ave, Suite 18
                        <br />
                        Port Orange, FL 32127
                      </p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=209+Dunlawton+Ave+Suite+18+Port+Orange+FL+32127"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-sm text-[var(--primary)] font-medium hover:text-[var(--primary-dark)]"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        Email
                      </h3>
                      <a
                        href="mailto:askradianthealth@gmail.com"
                        className="mt-1 text-[var(--primary)] font-medium hover:text-[var(--primary-dark)]"
                      >
                        askradianthealth@gmail.com
                      </a>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        For non-urgent inquiries. We respond within one business
                        day.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        Office Hours
                      </h3>
                      <div className="mt-2 space-y-1 text-[var(--muted)]">
                        <div className="flex justify-between gap-8">
                          <span>Monday - Friday</span>
                          <span className="font-medium text-[var(--foreground)]">
                            9:00 AM - 6:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span>Saturday</span>
                          <span className="font-medium text-[var(--foreground)]">
                            By Appointment
                          </span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span>Sunday</span>
                          <span className="font-medium text-[var(--foreground)]">
                            Closed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map & Insurance */}
              <div className="space-y-8">
                {/* Map */}
                <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white dark:bg-[var(--slate-900)]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.5!2d-81.0059!3d29.1083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6d5e2f1a3b3b3%3A0x1234567890abcdef!2s209+Dunlawton+Ave+%2318%2C+Port+Orange%2C+FL+32127!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dr. Collins Chiropractic Office Location - 209 Dunlawton Ave, Port Orange, FL"
                  />
                </div>

                {/* Insurance */}
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                    Insurance Accepted
                  </h3>
                  <p className="text-[var(--muted)] mb-4">
                    We accept most major insurance plans. Here are some of the
                    plans we commonly work with:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Medicare",
                      "Medicaid",
                      "Blue Cross Blue Shield",
                      "Aetna",
                      "United Healthcare",
                      "Cigna",
                      "Humana",
                      "Auto Insurance (PIP)",
                      "Workers' Compensation",
                    ].map((plan) => (
                      <span
                        key={plan}
                        className="rounded-full border border-[var(--border)] bg-[var(--slate-50)] px-3 py-1 text-sm text-[var(--muted)] dark:bg-[var(--slate-800)]"
                      >
                        {plan}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    Don&apos;t see your plan? Call us at{" "}
                    <a
                      href="tel:+13863089076"
                      className="text-[var(--primary)] font-medium"
                    >
                      (386) 308-9076
                    </a>{" "}
                    to verify your coverage. We also offer affordable
                    self-pay options.
                  </p>
                </div>

                {/* New Patient CTA */}
                <div className="rounded-2xl bg-[var(--primary)] p-6 sm:p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    New Patient?
                  </h3>
                  <p className="text-white/80 mb-6">
                    Save time by completing your intake forms online before your
                    first visit.
                  </p>
                  <Link
                    href="/new-patient"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-[15px] font-medium text-[var(--primary)] hover:bg-white/90"
                  >
                    Complete Intake Forms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="bg-[var(--slate-50)] py-16 sm:py-24 dark:bg-[var(--slate-900)]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Serving Port Orange and Surrounding Areas
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Dr. Collins provides chiropractic care and acupuncture to patients
              throughout Volusia County, including:
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Port Orange",
                "Daytona Beach",
                "South Daytona",
                "New Smyrna Beach",
                "Ormond Beach",
                "Holly Hill",
                "Edgewater",
                "DeLand",
                "Deltona",
                "Palm Coast",
              ].map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] dark:bg-[var(--slate-800)]"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
