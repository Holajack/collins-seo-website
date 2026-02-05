import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { BreadcrumbSchema } from "../components/SchemaMarkup";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: "Chiropractic & Acupuncture Health Blog",
  description:
    "Read expert articles on chiropractic care, acupuncture, back pain treatment, neck pain relief, spinal decompression, and wellness from Dr. Collins in Port Orange, FL.",
  openGraph: {
    title: "Chiropractic & Acupuncture Health Blog - Dr. Collins, DC",
    description:
      "Expert articles on chiropractic care, acupuncture, and wellness from Dr. Collins in Port Orange, FL.",
  },
  alternates: {
    canonical: "https://drcollinschiropractor.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://drcollinschiropractor.com" },
          { name: "Blog", url: "https://drcollinschiropractor.com/blog" },
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
                <span className="text-[var(--foreground)]">Blog</span>
              </nav>
              <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl">
                Health &{" "}
                <span className="text-[var(--primary)]">Wellness Blog</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Expert articles on chiropractic care, acupuncture, pain
                management, and healthy living from Dr. Collins in Port Orange,
                FL.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl border border-[var(--border)] bg-white overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-[var(--primary)]/5 dark:bg-[var(--slate-900)]"
                >
                  {/* Category banner */}
                  <div className="bg-[var(--slate-50)] px-6 py-3 border-b border-[var(--border)] dark:bg-[var(--slate-800)]">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-[var(--muted)] mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span className="text-[var(--border)]">|</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)] line-clamp-3">
                      {post.description}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)]"
                    >
                      Read More
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3.5 8h9M8.5 4l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--slate-950)] py-16 sm:py-24 dark:bg-[var(--slate-800)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Have Questions About Your Condition?
              </h2>
              <p className="mt-4 text-lg text-[var(--slate-400)]">
                Dr. Collins is happy to discuss your specific situation and
                determine the best course of treatment. Call our Port Orange
                office today.
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
