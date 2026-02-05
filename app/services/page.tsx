import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  BreadcrumbSchema,
  MedicalWebPageSchema,
} from "../components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Chiropractic & Acupuncture Services in Port Orange, FL",
  description:
    "Dr. Collins offers chiropractic adjustments, acupuncture, spinal decompression, auto accident injury treatment, prenatal chiropractic, and wellness care in Port Orange, FL. Most insurances accepted.",
  openGraph: {
    title: "Chiropractic & Acupuncture Services - Dr. Collins, DC",
    description:
      "Chiropractic adjustments, acupuncture, spinal decompression, and more in Port Orange, FL. Most insurances accepted.",
  },
  alternates: {
    canonical: "https://drcollinschiropractor.com/services",
  },
};

const services = [
  {
    id: "chiropractic-adjustments",
    title: "Chiropractic Adjustments",
    description:
      "Chiropractic adjustments are the cornerstone of care at our Port Orange office. Dr. Collins uses precise, controlled force applied to specific joints of the spine or other parts of the body to correct structural alignment and improve your body's physical function.",
    details: [
      "Spinal manipulation to restore joint mobility",
      "Correction of vertebral subluxations (misalignments)",
      "Reduction of nerve interference for improved nervous system function",
      "Relief from back pain, neck pain, headaches, and migraines",
      "Personalized adjustment techniques based on your condition",
      "Safe and effective for patients of all ages",
    ],
    conditions: [
      "Lower back pain",
      "Upper back pain",
      "Neck pain and stiffness",
      "Headaches and migraines",
      "Sciatica",
      "Joint pain",
      "Muscle tension",
      "Poor posture",
    ],
  },
  {
    id: "acupuncture",
    title: "Acupuncture",
    description:
      "Dr. Collins combines chiropractic care with acupuncture to provide a comprehensive approach to healing. Acupuncture involves the insertion of thin, sterile needles into specific points on the body to stimulate the nervous system and promote natural healing.",
    details: [
      "Stimulates the body's natural pain-relieving chemicals",
      "Reduces inflammation and promotes circulation",
      "Complements chiropractic adjustments for enhanced results",
      "Effective for both acute and chronic conditions",
      "Minimal discomfort with thin, sterile needles",
      "Sessions tailored to your specific health needs",
    ],
    conditions: [
      "Chronic pain",
      "Headaches and migraines",
      "Stress and anxiety",
      "Insomnia",
      "Digestive issues",
      "Allergies",
      "Neck and shoulder tension",
      "Fibromyalgia",
    ],
  },
  {
    id: "spinal-decompression",
    title: "Spinal Decompression Therapy",
    description:
      "Spinal decompression is a non-surgical, drug-free treatment option for patients suffering from disc-related conditions. This therapy gently stretches the spine, creating negative pressure within the disc that can help retract bulging or herniated disc material and promote nutrient flow for healing.",
    details: [
      "Non-surgical alternative to back surgery",
      "Creates negative intradiscal pressure to promote healing",
      "Relieves pressure on spinal nerves",
      "Treatment sessions are comfortable and relaxing",
      "Effective for both cervical (neck) and lumbar (lower back) conditions",
      "Can be combined with chiropractic care for optimal results",
    ],
    conditions: [
      "Herniated discs",
      "Bulging discs",
      "Degenerative disc disease",
      "Sciatica",
      "Spinal stenosis",
      "Facet syndrome",
      "Chronic neck pain",
      "Chronic lower back pain",
    ],
  },
  {
    id: "auto-accident-injuries",
    title: "Auto Accident Injury Treatment",
    description:
      "If you have been involved in an auto accident, prompt chiropractic treatment is critical. Even minor collisions can cause significant musculoskeletal injuries that may not be immediately apparent. Dr. Collins provides thorough evaluation and targeted treatment for accident-related injuries.",
    details: [
      "Comprehensive post-accident evaluation",
      "Whiplash diagnosis and treatment",
      "Soft tissue injury rehabilitation",
      "Documentation for insurance and legal purposes",
      "We work with auto insurance and personal injury cases",
      "Early treatment helps prevent chronic conditions from developing",
    ],
    conditions: [
      "Whiplash",
      "Neck pain and stiffness",
      "Back pain",
      "Shoulder pain",
      "Headaches following an accident",
      "Reduced range of motion",
      "Numbness or tingling",
      "Muscle spasms",
    ],
  },
  {
    id: "prenatal-chiropractic",
    title: "Prenatal Chiropractic Care",
    description:
      "Chiropractic care during pregnancy is a safe and gentle way to manage the physical changes your body undergoes. Dr. Collins uses specialized techniques to help expecting mothers maintain proper spinal alignment, reduce discomfort, and support a healthier pregnancy.",
    details: [
      "Gentle, pregnancy-safe adjustment techniques",
      "Helps maintain pelvic balance and alignment",
      "Can reduce pregnancy-related back and hip pain",
      "May help create a more favorable environment for baby positioning",
      "Supports overall comfort during pregnancy",
      "Safe throughout all trimesters",
    ],
    conditions: [
      "Pregnancy-related back pain",
      "Hip pain during pregnancy",
      "Sciatica during pregnancy",
      "Round ligament pain",
      "Pelvic misalignment",
      "General pregnancy discomfort",
    ],
  },
  {
    id: "wellness-care",
    title: "Wellness & Maintenance Care",
    description:
      "After the initial relief and corrective phases of treatment, ongoing wellness care helps maintain the health of your spine and prevent future problems. Regular chiropractic adjustments, combined with proper nutrition and exercise, are key to long-term health and well-being.",
    details: [
      "Periodic adjustments to maintain spinal alignment (1-4 times per month)",
      "Prevention-focused care to avoid future problems",
      "Nutritional guidance and supplementation recommendations",
      "Exercise and lifestyle recommendations",
      "Ongoing monitoring of spinal health",
      "Supports overall immune function and wellness",
    ],
    conditions: [
      "Preventive health maintenance",
      "Stress management",
      "Athletic performance optimization",
      "General wellness and vitality",
      "Immune system support",
      "Posture improvement",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://drcollinschiropractor.com" },
          {
            name: "Services",
            url: "https://drcollinschiropractor.com/services",
          },
        ]}
      />
      <MedicalWebPageSchema
        title="Chiropractic & Acupuncture Services"
        description="Dr. Collins offers chiropractic adjustments, acupuncture, spinal decompression, auto accident injury treatment, and more in Port Orange, FL."
        url="https://drcollinschiropractor.com/services"
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
                <span className="text-[var(--foreground)]">Services</span>
              </nav>
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl">
                Our{" "}
                <span className="text-[var(--primary)]">Services</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Dr. Collins offers a full range of chiropractic and acupuncture
                services to help you live pain-free. All services are available
                with most insurance plans.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-32"
                >
                  <div
                    className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
                      index % 2 === 1 ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""
                    }`}
                  >
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                        {service.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex gap-3 text-[var(--muted)]">
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
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--slate-50)] p-6 sm:p-8 dark:bg-[var(--slate-800)]">
                      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                        Conditions Treated
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.conditions.map((condition, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-sm text-[var(--muted)] dark:bg-[var(--slate-900)]"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-[var(--border)]">
                        <p className="text-sm text-[var(--muted)] mb-3">
                          Ready to get started with {service.title.toLowerCase()}?
                        </p>
                        <a
                          href="tel:+13863089076"
                          className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-sm font-medium text-white hover:bg-[var(--primary-dark)]"
                        >
                          Call (386) 308-9076
                        </a>
                      </div>
                    </div>
                  </div>

                  {index < services.length - 1 && (
                    <hr className="mt-16 border-[var(--border)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance */}
        <section className="bg-[var(--slate-50)] py-16 sm:py-24 dark:bg-[var(--slate-900)]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Insurance & Payment
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Dr. Collins accepts most major insurance plans, including Medicare
              and Medicaid. We believe quality chiropractic care and acupuncture
              should be accessible to everyone.
            </p>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Not sure if your insurance is accepted? Call our office and we will
              verify your coverage before your visit.
            </p>
            <div className="mt-8">
              <a
                href="tel:+13863089076"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white hover:bg-[var(--primary-dark)]"
              >
                Call to Verify Insurance - (386) 308-9076
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--slate-950)] py-16 sm:py-24 dark:bg-[var(--slate-800)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Start Your Journey to Better Health
              </h2>
              <p className="mt-4 text-lg text-[var(--slate-400)]">
                Whether you are dealing with chronic pain, recovering from an
                injury, or looking to maintain your overall wellness, Dr. Collins
                is here to help.
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
