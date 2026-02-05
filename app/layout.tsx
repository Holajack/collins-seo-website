import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0891b2",
};

export const metadata: Metadata = {
  title: "Radiant Health Chiropractic | Dr. Collins - Natural Pain Relief",
  description:
    "Dr. Collins at Radiant Health Chiropractic provides expert chiropractic care for back pain, neck pain, headaches, and overall wellness. Schedule your appointment today.",
  keywords: [
    "chiropractor",
    "chiropractic care",
    "back pain",
    "neck pain",
    "headaches",
    "spinal adjustment",
    "Dr. Collins",
    "Radiant Health Chiropractic",
    "natural pain relief",
    "wellness",
  ],
  authors: [{ name: "Dr. Collins" }],
  openGraph: {
    title: "Radiant Health Chiropractic | Dr. Collins",
    description:
      "Expert chiropractic care for back pain, neck pain, headaches, and overall wellness. Experience natural healing with Dr. Collins.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiant Health Chiropractic | Dr. Collins",
    description:
      "Expert chiropractic care for back pain, neck pain, headaches, and overall wellness.",
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
