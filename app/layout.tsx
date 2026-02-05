import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  LocalBusinessSchema,
  PersonSchema,
} from "./components/SchemaMarkup";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a6b8a",
};

export const metadata: Metadata = {
  title: {
    default:
      "Dr. Collins, DC | Chiropractor & Acupuncture in Port Orange, FL",
    template: "%s | Dr. Collins, DC - Port Orange Chiropractor",
  },
  description:
    "Dr. Collins provides expert chiropractic care and acupuncture in Port Orange, FL. Palmer College graduate. Spinal adjustments, decompression therapy, pain relief. Most insurances accepted. Call (386) 308-9076.",
  keywords: [
    "chiropractor port orange",
    "chiropractor port orange fl",
    "acupuncture port orange",
    "chiropractic care port orange florida",
    "back pain treatment port orange",
    "neck pain chiropractor",
    "spinal decompression port orange",
    "Dr Collins chiropractor",
    "Palmer College chiropractor",
    "chiropractor near me",
    "acupuncture near me",
    "pain management port orange fl",
    "sports injury chiropractor",
    "auto accident chiropractor port orange",
    "prenatal chiropractor port orange",
  ],
  authors: [{ name: "Dr. Collins, DC" }],
  creator: "Dr. Collins, DC",
  publisher: "Dr. Collins, DC - Chiropractic Care & Acupuncture",
  openGraph: {
    title: "Dr. Collins, DC | Chiropractor & Acupuncture in Port Orange, FL",
    description:
      "Expert chiropractic care and acupuncture in Port Orange, FL. Palmer College graduate. Most insurances accepted. Call (386) 308-9076.",
    type: "website",
    locale: "en_US",
    siteName: "Dr. Collins, DC - Chiropractic Care & Acupuncture",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Collins, DC | Chiropractor & Acupuncture in Port Orange, FL",
    description:
      "Expert chiropractic care and acupuncture in Port Orange, FL. Most insurances accepted.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://drcollinschiropractor.com",
  },
  category: "Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
        <PersonSchema />
      </head>
      <body>{children}</body>
    </html>
  );
}
