import Header from "./components/Header";
import Footer from "./components/Footer";
import ServiceCard from "./components/ServiceCard";
import Link from "next/link";
import { FAQSchema } from "./components/SchemaMarkup";

const faqs = [
  {
    question:
      "Does Dr. Collins accept insurance for chiropractic care in Port Orange?",
    answer:
      "Yes, Dr. Collins accepts most major insurance plans including Medicare and Medicaid. Contact our office at (386) 308-9076 to verify your specific coverage before your visit.",
  },
  {
    question: "What should I expect at my first chiropractic visit?",
    answer:
      "Your first visit includes a thorough consultation, health history review, physical examination, and if necessary, diagnostic imaging. Dr. Collins will discuss findings and create a personalized treatment plan. You can complete your intake forms online before arriving to save time.",
  },
  {
    question: "Does Dr. Collins provide acupuncture treatment?",
    answer:
      "Yes, Dr. Collins is trained in acupuncture and offers it as a complementary treatment alongside chiropractic care. Acupuncture can help with pain management, stress relief, headaches, and many other conditions.",
  },
  {
    question:
      "What conditions does chiropractic care treat?",
    answer:
      "Dr. Collins treats a wide range of conditions including back pain, neck pain, headaches, migraines, sciatica, herniated discs, sports injuries, auto accident injuries, carpal tunnel syndrome, and general joint pain. Both chiropractic adjustments and acupuncture are available.",
  },
  {
    question: "Where is Dr. Collins located in Port Orange?",
    answer:
      "Dr. Collins is located at 209 Dunlawton Ave, Suite 18, Port Orange, FL 32127. The office is conveniently located and serves patients from Port Orange, Daytona Beach, South Daytona, New Smyrna Beach, and surrounding Volusia County communities.",
  },
];

export default function Home() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <Header />

      <main>
        {/* Hero Section - Three Second Rule: Problem, Solution, Contact */}
        <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--primary)]/[0.04] to-transparent" />

          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Problem - immediate identification */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--primary)]">
                  Chiropractor & Acupuncture in Port Orange, FL
                </span>
              </div>

              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                Living with
                <br />
                <span className="text-[var(--primary)]">
                  back pain, neck pain,
                </span>
                <br />
                or headaches?
              </h1>

              {/* Solution */}
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
                Dr. Collins provides expert chiropractic adjustments and
                acupuncture to relieve your pain and restore your quality of
                life. Palmer College graduate serving Port Orange and surrounding
                communities.
              </p>

              {/* Contact - immediate action */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="tel:+13863089076"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] sm:w-auto"
                >
                  <svg
                    width="18"
                    height="18"
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
                <Link
                  href="/new-patient"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-8 text-[15px] font-medium text-[var(--foreground)] hover:border-[var(--muted)] hover:bg-[var(--slate-50)] sm:w-auto dark:bg-[var(--slate-900)] dark:hover:bg-[var(--slate-800)]"
                >
                  New Patient? Start Here
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3.5 8h9M8.5 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-[var(--primary)]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Palmer College Graduate
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-[var(--primary)]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Most Insurances Accepted
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-[var(--primary)]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Chiropractic & Acupuncture
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Comprehensive Care for Your Health
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Dr. Collins offers a range of chiropractic and wellness services
                designed to address the root cause of your pain, not just the
                symptoms.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon={
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
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
                    <path d="M2 20h20" />
                    <path d="M14 12v.01" />
                  </svg>
                }
                title="Chiropractic Adjustments"
                description="Precise spinal adjustments to correct misalignments, reduce nerve interference, and restore proper function to your body. Relief for back pain, neck pain, and headaches."
              />
              <ServiceCard
                icon={
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
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                }
                title="Acupuncture"
                description="Traditional acupuncture therapy to manage pain, reduce inflammation, relieve stress, and promote natural healing throughout the body."
              />
              <ServiceCard
                icon={
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
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                }
                title="Spinal Decompression"
                description="Non-surgical spinal decompression therapy for herniated discs, bulging discs, sciatica, and degenerative disc disease without medication or surgery."
              />
              <ServiceCard
                icon={
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
                title="Auto Accident Injuries"
                description="Specialized treatment for whiplash, soft tissue injuries, and musculoskeletal damage resulting from auto accidents. We work with your insurance."
              />
              <ServiceCard
                icon={
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                }
                title="Prenatal Chiropractic"
                description="Gentle, safe chiropractic care for expecting mothers to reduce pregnancy-related discomfort, improve alignment, and support a healthier pregnancy."
              />
              <ServiceCard
                icon={
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
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
                title="Wellness & Maintenance"
                description="Ongoing wellness care with periodic adjustments to maintain spinal health, prevent future issues, and keep your body functioning at its best."
              />
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-8 text-[15px] font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] dark:bg-[var(--slate-900)]"
              >
                View All Services
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3.5 8h9M8.5 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="bg-[var(--slate-50)] py-16 sm:py-24 scroll-mt-20 dark:bg-[var(--slate-900)]"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Your Health Is More Than Just Symptom Relief
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
                  Dr. Collins takes a whole-person approach to chiropractic care.
                  Rather than simply treating symptoms, he looks for the
                  underlying causes of your discomfort and pain. By addressing
                  spinal misalignments and nervous system interference, the body
                  can heal itself naturally.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                  As a graduate of Palmer College of Chiropractic here in Port
                  Orange, Dr. Collins combines rigorous clinical training with a
                  genuine commitment to each patient&apos;s long-term wellness.
                  He also offers acupuncture as a complementary treatment for
                  enhanced results.
                </p>

                {/* Why Dr. Collins */}
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                      Palmer
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      College Graduate
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                      Dual
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Chiropractic & Acupuncture
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                      Insurance
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Most Plans Accepted
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                      Whole
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Person Approach
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)]"
                  >
                    Learn More About Dr. Collins
                  </Link>
                </div>
              </div>

              {/* What Sets Us Apart Card */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8 dark:bg-[var(--slate-800)]">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">
                  What Sets Dr. Collins Apart
                </h3>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-[var(--primary)]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">
                        Insurance-Friendly Practice
                      </h4>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        We accept most major insurance plans, Medicare, and
                        Medicaid, making quality care accessible and affordable.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-[var(--primary)]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">
                        Palmer-Trained Excellence
                      </h4>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Graduate of Palmer College of Chiropractic, the
                        foundational institution of chiropractic education,
                        located right here in Port Orange.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-[var(--primary)]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">
                        Chiropractic + Acupuncture
                      </h4>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Combining two powerful healing modalities for
                        comprehensive pain relief and wellness that addresses
                        your body as a whole.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-[var(--primary)]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">
                        Root-Cause Focus
                      </h4>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        We treat the underlying cause of your pain, not just the
                        symptoms, for lasting relief and long-term health
                        improvement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Process Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Your Path to Pain-Free Living
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Dr. Collins follows a proven three-phase approach to get you
                feeling better and keep you that way.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
                  Phase 1
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                  Relief Care
                </h3>
                <p className="mt-3 text-[var(--muted)]">
                  The first priority is to reduce your pain and discomfort.
                  Depending on the severity of your condition, visits are
                  typically 2-3 times per week for 4-12 weeks.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
                  Phase 2
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                  Corrective Care
                </h3>
                <p className="mt-3 text-[var(--muted)]">
                  Once pain subsides, muscles and tissues need time to heal more
                  completely. This phase strengthens and stabilizes your body to
                  prevent recurrence.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
                  Phase 3
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                  Wellness Care
                </h3>
                <p className="mt-3 text-[var(--muted)]">
                  Periodic adjustments (1-4 times per month) help maintain your
                  spinal health, prevent future problems, and keep you feeling
                  your best long-term.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[var(--slate-50)] py-16 sm:py-24 dark:bg-[var(--slate-900)]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Common questions about chiropractic care and our practice.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[var(--border)] bg-white p-6 dark:bg-[var(--slate-800)]"
                >
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[var(--slate-950)] py-16 sm:py-24 dark:bg-[var(--slate-800)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Start Feeling Better?
              </h2>
              <p className="mt-4 text-lg text-[var(--slate-400)]">
                Take the first step toward a pain-free life. Call our Port
                Orange office or complete your new patient forms online to get
                started.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="tel:+13863089076"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] sm:w-auto"
                >
                  <svg
                    width="18"
                    height="18"
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
                <Link
                  href="/new-patient"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[var(--slate-700)] bg-transparent px-8 text-[15px] font-medium text-white hover:bg-[var(--slate-800)] sm:w-auto"
                >
                  Complete Patient Forms Online
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--slate-400)]">
                <span>209 Dunlawton Ave, Suite 18</span>
                <span className="hidden sm:inline text-[var(--slate-600)]">
                  |
                </span>
                <span>Port Orange, FL 32127</span>
                <span className="hidden sm:inline text-[var(--slate-600)]">
                  |
                </span>
                <span>Mon-Fri: 9am - 6pm</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
