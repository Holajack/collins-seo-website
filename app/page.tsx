import Header from "./components/Header";
import ServiceCard from "./components/ServiceCard";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--primary)]/[0.03] to-transparent" />

          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--primary)]">
                  Now accepting new patients
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                Live pain-free with
                <br />
                <span className="text-[var(--primary)]">natural healing</span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
                Dr. Collins at Radiant Health Chiropractic helps you find relief
                from back pain, neck pain, and headaches through gentle,
                effective chiropractic care.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] sm:w-auto"
                >
                  Book Your Appointment
                </a>
                <a
                  href="#services"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-8 text-[15px] font-medium text-[var(--foreground)] hover:border-[var(--muted)] hover:bg-[var(--slate-50)] sm:w-auto dark:bg-[var(--slate-900)] dark:hover:bg-[var(--slate-800)]"
                >
                  Our Services
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
                </a>
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
                  15+ years experience
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
                  5,000+ patients helped
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
                  Same-day appointments
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            {/* Section header */}
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Chiropractic services
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Personalized care to help you feel your best and move without
                pain.
              </p>
            </div>

            {/* Services grid */}
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
                    <path d="M18 4a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3z" />
                    <path d="M6 4a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3z" />
                    <path d="M3 12h3M18 12h3M12 2v2M12 20v2" />
                  </svg>
                }
                title="Spinal Adjustments"
                description="Gentle, precise adjustments to restore proper spinal alignment and relieve pressure on your nervous system."
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
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
                title="Back Pain Relief"
                description="Targeted treatment for lower back pain, sciatica, and disc problems to get you back to your daily activities."
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
                    <circle cx="12" cy="5" r="3" />
                    <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" />
                  </svg>
                }
                title="Neck & Shoulder Care"
                description="Relief from neck stiffness, tension headaches, and shoulder pain caused by poor posture or injury."
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
                title="Headache Treatment"
                description="Natural relief for chronic headaches and migraines without relying on medication."
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
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
                title="Family Chiropractic"
                description="Safe, gentle care for the whole family—from infants and children to adults and seniors."
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
                title="Sports Injuries"
                description="Get back in the game faster with treatment designed for athletes and active individuals."
              />
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
              {/* Content */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Meet Dr. Collins
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
                  With over 15 years of experience, Dr. Collins founded Radiant
                  Health Chiropractic with a simple mission: to help people live
                  without pain using natural, drug-free methods.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                  Every patient receives personalized attention and a treatment
                  plan tailored to their specific needs. Dr. Collins believes in
                  treating the whole person, not just the symptoms, to achieve
                  lasting results.
                </p>

                {/* Credentials */}
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      15+
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Years of practice
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      5,000+
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Patients treated
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      98%
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Patient satisfaction
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      4.9
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Google rating
                    </div>
                  </div>
                </div>
              </div>

              {/* Philosophy Card */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8 dark:bg-[var(--slate-800)]">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  Our approach
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-[var(--foreground)]">
                        Listen & Understand
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        We take time to understand your pain, history, and goals.
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      2
                    </div>
                    <div>
                      <div className="font-medium text-[var(--foreground)]">
                        Thorough Examination
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        Comprehensive assessment to find the root cause.
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      3
                    </div>
                    <div>
                      <div className="font-medium text-[var(--foreground)]">
                        Personalized Treatment
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        A care plan designed specifically for you.
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      4
                    </div>
                    <div>
                      <div className="font-medium text-[var(--foreground)]">
                        Lasting Results
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        Education and exercises for long-term wellness.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                What patients say
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Real stories from people who found relief at Radiant Health.
              </p>
            </div>

            {/* Testimonials grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                <div className="flex gap-1 text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-[var(--foreground)]">
                  &ldquo;After years of chronic back pain, I finally found
                  relief with Dr. Collins. I can play with my kids again without
                  wincing.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-semibold text-[var(--primary)]">
                    MJ
                  </div>
                  <div>
                    <div className="font-medium text-[var(--foreground)]">
                      Michael J.
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      Patient for 2 years
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                <div className="flex gap-1 text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-[var(--foreground)]">
                  &ldquo;I was skeptical at first, but Dr. Collins explained
                  everything clearly. My migraines have decreased dramatically
                  since starting treatment.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-semibold text-[var(--primary)]">
                    ST
                  </div>
                  <div>
                    <div className="font-medium text-[var(--foreground)]">
                      Sarah T.
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      Patient for 8 months
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 sm:col-span-2 lg:col-span-1 dark:bg-[var(--slate-900)]">
                <div className="flex gap-1 text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-[var(--foreground)]">
                  &ldquo;The whole family sees Dr. Collins now. The office is
                  welcoming, appointments are easy to schedule, and we all feel
                  better.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-semibold text-[var(--primary)]">
                    RL
                  </div>
                  <div>
                    <div className="font-medium text-[var(--foreground)]">
                      Rachel L.
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      Patient for 3 years
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-[var(--slate-950)] py-16 sm:py-24 scroll-mt-20 dark:bg-[var(--slate-800)]"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left side - Info */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Schedule your visit
                </h2>
                <p className="mt-4 text-lg text-[var(--slate-400)]">
                  Ready to start feeling better? Book your appointment today or
                  give us a call. New patients welcome.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/20 text-[var(--primary-light)]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Location</div>
                      <div className="mt-1 text-[var(--slate-400)]">
                        123 Wellness Way, Suite 100
                        <br />
                        Healthville, CA 90210
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/20 text-[var(--primary-light)]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Phone</div>
                      <div className="mt-1 text-[var(--slate-400)]">
                        (555) 123-4567
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/20 text-[var(--primary-light)]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Hours</div>
                      <div className="mt-1 text-[var(--slate-400)]">
                        Mon-Fri: 8am - 6pm
                        <br />
                        Sat: 9am - 1pm
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-[var(--slate-300)]"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="h-12 w-full rounded-lg border border-[var(--slate-700)] bg-[var(--slate-900)] px-4 text-white placeholder:text-[var(--slate-500)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-[var(--slate-300)]"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="h-12 w-full rounded-lg border border-[var(--slate-700)] bg-[var(--slate-900)] px-4 text-white placeholder:text-[var(--slate-500)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[var(--slate-300)]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="h-12 w-full rounded-lg border border-[var(--slate-700)] bg-[var(--slate-900)] px-4 text-white placeholder:text-[var(--slate-500)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-[var(--slate-300)]"
                    >
                      What brings you in?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-[var(--slate-700)] bg-[var(--slate-900)] px-4 py-3 text-white placeholder:text-[var(--slate-500)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                      placeholder="Tell us about your pain or concerns..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 w-full rounded-lg bg-[var(--primary)] font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] sm:w-auto sm:px-8"
                  >
                    Request Appointment
                  </button>
                </form>

                <p className="mt-4 text-sm text-[var(--slate-500)]">
                  We&apos;ll get back to you within 24 hours to confirm your
                  appointment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
