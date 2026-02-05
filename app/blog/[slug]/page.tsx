import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  BreadcrumbSchema,
  BlogPostSchema,
} from "../../components/SchemaMarkup";
import { getPostBySlug, getAllSlugs, blogPosts } from "../posts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Dr. Collins, DC"],
    },
    alternates: {
      canonical: `https://drcollinschiropractor.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different slug)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://drcollinschiropractor.com" },
          { name: "Blog", url: "https://drcollinschiropractor.com/blog" },
          {
            name: post.title,
            url: `https://drcollinschiropractor.com/blog/${post.slug}`,
          },
        ]}
      />
      <BlogPostSchema
        title={post.title}
        description={post.description}
        datePublished={post.date}
        slug={post.slug}
      />
      <Header />

      <main>
        {/* Article Header */}
        <section className="relative overflow-hidden pt-36 pb-8 sm:pt-44 sm:pb-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--primary)]/[0.04] to-transparent" />
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <nav
              className="mb-6 text-sm text-[var(--muted)]"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-[var(--primary)]">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-[var(--primary)]">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--foreground)]">{post.category}</span>
            </nav>

            <div className="flex items-center gap-3 text-sm text-[var(--muted)] mb-4">
              <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">
                {post.category}
              </span>
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

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-semibold text-[var(--primary)]">
                DC
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--foreground)]">
                  Dr. Collins, DC
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Chiropractor & Acupuncturist, Port Orange, FL
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <article
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to action within article */}
            <div className="mt-12 rounded-2xl bg-[var(--slate-50)] border border-[var(--border)] p-6 sm:p-8 dark:bg-[var(--slate-800)]">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                Ready to Get Started?
              </h3>
              <p className="mt-2 text-[var(--muted)]">
                If you are in Port Orange or the surrounding area and would like
                to discuss your condition with Dr. Collins, call our office or
                complete your new patient forms online.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+13863089076"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 text-sm font-medium text-white hover:bg-[var(--primary-dark)]"
                >
                  Call (386) 308-9076
                </a>
                <Link
                  href="/new-patient"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border)] px-6 text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  New Patient Forms
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-[var(--slate-50)] py-16 sm:py-24 dark:bg-[var(--slate-900)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-8 text-center">
              More Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="group rounded-xl border border-[var(--border)] bg-white p-5 hover:border-[var(--primary)]/30 dark:bg-[var(--slate-800)]"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                    {related.category}
                  </span>
                  <h3 className="mt-2 text-[15px] font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] leading-snug">
                    <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                    {related.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
