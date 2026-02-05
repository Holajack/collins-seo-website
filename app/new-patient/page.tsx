import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { BreadcrumbSchema } from "../components/SchemaMarkup";

export const metadata: Metadata = {
  title: "New Patient Intake Forms - Complete Online Before Your Visit",
  description:
    "Complete your new patient intake forms online before your first visit to Dr. Collins' Port Orange chiropractic office. Save time and get started on your path to pain relief.",
  openGraph: {
    title: "New Patient Intake Forms - Dr. Collins, DC",
    description:
      "Complete your intake forms online before visiting our Port Orange chiropractic office.",
  },
  alternates: {
    canonical: "https://drcollinschiropractor.com/new-patient",
  },
};

export default function NewPatientPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://drcollinschiropractor.com" },
          {
            name: "New Patient",
            url: "https://drcollinschiropractor.com/new-patient",
          },
        ]}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-36 pb-8 sm:pt-44 sm:pb-12">
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
                <span className="text-[var(--foreground)]">New Patient</span>
              </nav>
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl">
                New Patient{" "}
                <span className="text-[var(--primary)]">Intake Forms</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Save time at your first appointment by completing your intake
                forms online. Your information is sent securely to our office.
              </p>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="pb-8 sm:pb-12">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-3 mb-10">
              <div className="rounded-xl border border-[var(--border)] bg-white p-5 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)] mb-2">
                  Step 1
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  Complete Forms Below
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Fill out your health history, contact information, and reason
                  for visit using the secure form below.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)] mb-2">
                  Step 2
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  Call to Schedule
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Call{" "}
                  <a
                    href="tel:+13863089076"
                    className="text-[var(--primary)] font-medium"
                  >
                    (386) 308-9076
                  </a>{" "}
                  to schedule your first appointment at a time that works for
                  you.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)] mb-2">
                  Step 3
                </div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  Visit Our Office
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Come to 209 Dunlawton Ave, Suite 18, Port Orange. Bring your
                  insurance card and photo ID.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intake Form */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden dark:bg-[var(--slate-900)]">
              <div className="bg-[var(--primary)] px-6 py-4">
                <h2 className="text-lg font-semibold text-white">
                  Patient Intake Form
                </h2>
                <p className="text-sm text-white/80">
                  Complete this secure form to submit your information directly
                  to our office.
                </p>
              </div>
              <div className="p-0">
                <iframe
                  src="https://intake.mychirotouch.com/?clinic=RHCL0001"
                  title="Patient Intake Form - Dr. Collins Chiropractic"
                  className="w-full border-0"
                  style={{ height: "800px", minHeight: "600px" }}
                  loading="lazy"
                  allow="clipboard-write"
                />
                {/* Fallback for browsers that block iframe */}
                <noscript>
                  <div className="p-8 text-center">
                    <p className="text-[var(--muted)] mb-4">
                      Please enable JavaScript to view the intake form, or use
                      the link below.
                    </p>
                    <a
                      href="https://intake.mychirotouch.com/?clinic=RHCL0001"
                      className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Intake Form
                    </a>
                  </div>
                </noscript>
              </div>
              <div className="border-t border-[var(--border)] px-6 py-4 bg-[var(--slate-50)] dark:bg-[var(--slate-800)]">
                <p className="text-sm text-[var(--muted)] text-center">
                  Having trouble with the form?{" "}
                  <a
                    href="https://intake.mychirotouch.com/?clinic=RHCL0001"
                    className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here to open it in a new window
                  </a>{" "}
                  or call us at{" "}
                  <a
                    href="tel:+13863089076"
                    className="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)]"
                  >
                    (386) 308-9076
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Bring */}
        <section className="bg-[var(--slate-50)] py-16 sm:py-24 dark:bg-[var(--slate-900)]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl text-center mb-10">
              What to Bring to Your First Visit
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-white p-5 dark:bg-[var(--slate-800)]">
                <div className="flex gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[var(--primary)]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">
                      Insurance Card
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Bring your current insurance card so we can verify
                      coverage.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5 dark:bg-[var(--slate-800)]">
                <div className="flex gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[var(--primary)]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">
                      Photo ID
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      A valid driver&apos;s license or government-issued ID.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5 dark:bg-[var(--slate-800)]">
                <div className="flex gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[var(--primary)]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">
                      List of Medications
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      A list of any current medications and supplements you
                      take.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5 dark:bg-[var(--slate-800)]">
                <div className="flex gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[var(--primary)]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">
                      Medical Records
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Any relevant X-rays, MRIs, or medical records related to
                      your condition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--slate-950)] py-16 sm:py-24 dark:bg-[var(--slate-800)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Questions About Your First Visit?
              </h2>
              <p className="mt-4 text-lg text-[var(--slate-400)]">
                Our team is happy to answer any questions and help you prepare
                for your appointment. Call us today.
              </p>
              <div className="mt-10">
                <a
                  href="tel:+13863089076"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)]"
                >
                  Call (386) 308-9076
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
