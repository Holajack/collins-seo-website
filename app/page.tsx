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
                  SEO that actually works
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                Get found by the
                <br />
                <span className="text-[var(--primary)]">
                  customers you want
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
                We help businesses rank higher on Google through proven SEO
                strategies. No tricks, no shortcuts—just sustainable growth.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[var(--primary)] px-8 text-[15px] font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] sm:w-auto"
                >
                  Start Your Project
                </a>
                <a
                  href="#services"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-8 text-[15px] font-medium text-[var(--foreground)] hover:border-[var(--muted)] hover:bg-[var(--slate-50)] sm:w-auto dark:bg-[var(--slate-900)] dark:hover:bg-[var(--slate-800)]"
                >
                  See Our Services
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
                  50+ clients served
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
                  97% retention rate
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
                  8+ years experience
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
                What we do best
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                Comprehensive SEO services tailored to your business goals.
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
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                }
                title="Technical SEO"
                description="Site audits, speed optimization, structured data, and fixing crawl issues that hold your site back from ranking."
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
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                title="Local SEO"
                description="Google Business Profile optimization, local citations, and strategies to dominate your local market."
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
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                }
                title="Content Strategy"
                description="Keyword research, content planning, and SEO writing that attracts traffic and converts visitors."
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
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                }
                title="Link Building"
                description="Quality backlink acquisition through outreach, digital PR, and content-driven strategies."
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
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                }
                title="Analytics & Reporting"
                description="Clear, actionable reports that show exactly how your SEO investment is performing."
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
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                }
                title="International SEO"
                description="Multi-language and multi-region optimization for businesses targeting global audiences."
              />
            </div>
          </div>
        </section>

        {/* About/Why Section */}
        <section
          id="about"
          className="bg-[var(--slate-50)] py-16 sm:py-24 scroll-mt-20 dark:bg-[var(--slate-900)]"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Content */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  SEO that focuses on what matters
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
                  Too many agencies chase vanity metrics. We focus on the things
                  that actually move your business forward: qualified traffic,
                  real leads, and measurable revenue growth.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                  Our approach is straightforward—we learn your business, find
                  the opportunities, and execute with precision. No fluff, no
                  confusing jargon, just clear communication and steady
                  progress.
                </p>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      2.4x
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Avg. traffic increase
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      180%
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Avg. lead growth
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      Top 3
                    </div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      Rankings achieved
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8 dark:bg-[var(--slate-800)]">
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
                <blockquote className="mt-6 text-lg leading-relaxed text-[var(--foreground)]">
                  &ldquo;Collins SEO transformed our online presence. Within 6
                  months, we went from page 3 to position 1 for our main
                  keywords. The increase in qualified leads has been
                  remarkable.&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 text-lg font-semibold text-[var(--primary)]">
                    SK
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">
                      Sarah Kim
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      Marketing Director, TechStart Inc.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Real results, real growth
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)]">
                A few examples of what we&apos;ve achieved for our clients.
              </p>
            </div>

            {/* Results grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Result 1 */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
                  E-commerce
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                  Online Retail Store
                </h3>
                <p className="mt-3 text-[var(--muted)]">
                  Organic traffic increased by 340% in 8 months through
                  technical fixes and content optimization.
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[var(--foreground)]">
                    +340%
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    organic traffic
                  </span>
                </div>
              </div>

              {/* Result 2 */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
                  Professional Services
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                  Law Firm
                </h3>
                <p className="mt-3 text-[var(--muted)]">
                  Local SEO campaign resulted in 5x more consultation requests
                  from the target service area.
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[var(--foreground)]">
                    5x
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    more leads
                  </span>
                </div>
              </div>

              {/* Result 3 */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 sm:col-span-2 lg:col-span-1 dark:bg-[var(--slate-900)]">
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
                  SaaS
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                  B2B Software Company
                </h3>
                <p className="mt-3 text-[var(--muted)]">
                  Content strategy and link building led to ranking for 200+ new
                  keywords in competitive market.
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[var(--foreground)]">
                    200+
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    new keyword rankings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="bg-[var(--slate-950)] py-16 sm:py-24 scroll-mt-20 dark:bg-[var(--slate-800)]"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to grow your organic traffic?
              </h2>
              <p className="mt-4 text-lg text-[var(--slate-400)]">
                Let&apos;s talk about your SEO goals. Book a free consultation
                and we&apos;ll show you exactly where the opportunities are.
              </p>

              {/* Contact Form */}
              <form className="mt-10 space-y-4 text-left">
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
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="mb-2 block text-sm font-medium text-[var(--slate-300)]"
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="h-12 w-full rounded-lg border border-[var(--slate-700)] bg-[var(--slate-900)] px-4 text-white placeholder:text-[var(--slate-500)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[var(--slate-300)]"
                  >
                    Tell us about your goals
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-[var(--slate-700)] bg-[var(--slate-900)] px-4 py-3 text-white placeholder:text-[var(--slate-500)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                    placeholder="What are you looking to achieve with SEO?"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[var(--primary)] font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] sm:w-auto sm:px-8"
                >
                  Send Message
                </button>
              </form>

              <p className="mt-6 text-sm text-[var(--slate-500)]">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
