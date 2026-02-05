import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export const metadata: Metadata = {
  title: "Collins SEO | Search Engine Optimization That Delivers Results",
  description:
    "Collins SEO helps businesses grow through strategic search engine optimization. We focus on sustainable rankings, quality traffic, and real business results.",
  keywords: [
    "SEO",
    "search engine optimization",
    "digital marketing",
    "organic traffic",
    "local SEO",
    "technical SEO",
  ],
  authors: [{ name: "Collins SEO" }],
  openGraph: {
    title: "Collins SEO | Search Engine Optimization That Delivers Results",
    description:
      "Collins SEO helps businesses grow through strategic search engine optimization.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collins SEO | Search Engine Optimization That Delivers Results",
    description:
      "Collins SEO helps businesses grow through strategic search engine optimization.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
