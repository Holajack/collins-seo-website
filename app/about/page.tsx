import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  BreadcrumbSchema,
  MedicalWebPageSchema,
} from "../components/SchemaMarkup";

export const metadata: Metadata = {
  title: "About Dr. Collins, DC - Palmer College Graduate Chiropractor",
  description:
    "Learn about Dr. Collins, a Doctor of Chiropractic and licensed acupuncturist in Port Orange, FL. Graduate of Palmer College of Chiropractic. Whole-person approach to pain relief and wellness.",
  openGraph: {
    title: "About Dr. Collins, DC - Palmer College Graduate Chiropractor",
    description:
      "Learn about Dr. Collins, a Doctor of Chiropractic and licensed acupuncturist in Port Orange, FL. Palmer College graduate.",
  },
  alternates: {
    canonical: "https://drcollinschiropractor.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://drcollinschiropractor.com" },
          { name: "About", url: "https://drcollinschiropractor.com/about" },
        ]}
      />
      <MedicalWebPageSchema
        title="About Dr. Collins, DC"
        description="Learn about Dr. Collins, a Doctor of Chiropractic and licensed acupuncturist in Port Orange, FL."
        url="https://drcollinschiropractor.com/about"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--primary)]/[0.04] to-transparent" />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <nav className="mb-6 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[var(--primary)]">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-[var(--foreground)]">About</span>
              </nav>
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl">
                About <span className="text-[var(--primary)]">Dr. Collins</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                A Palmer College of Chiropractic graduate dedicated to helping
                Port Orange residents live healthier, pain-free lives through
                chiropractic care and acupuncture.
              </p>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Photo placeholder */}
              <div className="rounded-2xl bg-[var(--slate-100)] dark:bg-[var(--slate-800)] aspect-[4/5] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto h-32 w-32 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold text-[var(--primary)]">
                      DC
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">
                    Dr. Collins, DC
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Doctor of Chiropractic
                  </p>
                </div>
              </div>

              {/* Bio content */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Education & Training
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-[var(--muted)]">
                  <p>
                    Dr. Collins earned his Doctor of Chiropractic degree from
                    Palmer College of Chiropractic at the Florida campus in Port
                    Orange. Palmer College is widely recognized as the
                    foundational institution of chiropractic education, and its
                    rigorous curriculum prepares graduates with the skills
                    needed to provide the highest standard of patient care.
                  </p>
                  <p>
                    In addition to his chiropractic training, Dr. Collins is
                    skilled in acupuncture, allowing him to offer patients a
                    comprehensive approach to pain management and wellness that
                    draws from both Western and Eastern healing traditions.
                  </p>
                </div>

                <h2 className="mt-10 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Philosophy of Care
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-[var(--muted)]">
                  <p>
                    Dr. Collins believes in treating the whole person, not just
                    symptoms. His approach focuses on identifying and correcting
                    the underlying causes of disease, discomfort, and pain. By
                    looking at the body as an integrated system, he creates
                    personalized treatment plans that address your specific
                    needs.
                  </p>
                  <p>
                    Many health problems can be traced back to imbalances in the
                    spinal column. When the spine is misaligned, it can
                    interfere with the nervous system, which controls every
                    function in your body. Through precise chiropractic
                    adjustments and complementary acupuncture, Dr. Collins works
                    to restore proper alignment and allow your body to heal
                    itself naturally.
                  </p>
                </div>

                <h2 className="mt-10 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Serving the Port Orange Community
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-[var(--muted)]">
                  <p>
                    Located at 209 Dunlawton Ave, Suite 18, in Port Orange, FL,
                    Dr. Collins serves patients throughout Volusia County,
                    including Daytona Beach, South Daytona, New Smyrna Beach,
                    Ormond Beach, and the surrounding areas.
                  </p>
                  <p>
                    The practice accepts most major insurance plans, including
                    Medicare and Medicaid, making chiropractic care and
                    acupuncture accessible to as many patients as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="bg-[var(--slate-50)] py-16 sm:py-24 dark:bg-[var(--slate-900)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Credentials & Expertise
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center dark:bg-[var(--slate-800)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  Palmer College of Chiropractic
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Doctor of Chiropractic (DC) - Florida Campus, Port Orange
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center dark:bg-[var(--slate-800)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  Licensed Acupuncturist
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Trained in acupuncture for complementary pain management and
                  wellness
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center dark:bg-[var(--slate-800)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  Florida Licensed
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Licensed to practice chiropractic care in the state of Florida
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center dark:bg-[var(--slate-800)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  Insurance Accepted
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Most major insurance plans including Medicare and Medicaid
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--slate-950)] py-16 sm:py-24 dark:bg-[var(--slate-800)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Schedule Your First Visit
              </h2>
              <p className="mt-4 text-lg text-[var(--slate-400)]">
                Experience the difference that personalized, whole-body
                chiropractic care can make. Call today or complete your new
                patient forms online.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="tel:+13863089076"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)] sm:w-auto"
                >
                  Call (386) 308-9076
                </a>
                <Link
                  href="/new-patient"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-[var(--slate-700)] px-8 text-[15px] font-medium text-white hover:bg-[var(--slate-800)] sm:w-auto"
                >
                  New Patient Forms
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
