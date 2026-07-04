import type { Metadata, Viewport } from "next";
import { Alegreya } from "next/font/google";
import "./globals.css";
import RegisterSW from "./RegisterSW";

// Self-hosted display serif so the editorial voice survives on Android, where
// the Iowan/Palatino system stack falls back to a generic serif.
const displaySerif = Alegreya({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b06a3b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://perfect-brew.vercel.app"),
  title: {
    default: "The Perfect Brew — Ask for 12 oz. Get 12 oz.",
    template: "%s | The Perfect Brew",
  },
  description:
    "A coffee calculator that solves for the cup, not the kettle. Exact dose, water, bloom, temperature, grind, and a live chiming pour timer for V60, Chemex, siphon, AeroPress, and cold brew — accounting for the water your grounds absorb.",
  keywords: [
    "coffee ratio calculator",
    "pour over calculator",
    "chemex ratio",
    "v60 recipe calculator",
    "coffee bloom calculator",
    "aeropress recipe",
    "cold brew ratio calculator",
    "coffee to water ratio",
    "brew timer",
  ],
  openGraph: {
    title: "Ask for 12 oz. Get 12 oz. — The Perfect Brew",
    description:
      "Most calculators tell you how much water to pour. This one tells you how much coffee lands in your cup.",
    type: "website",
    siteName: "The Perfect Brew",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ask for 12 oz. Get 12 oz. — The Perfect Brew coffee calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask for 12 oz. Get 12 oz. — The Perfect Brew",
    description:
      "A coffee calculator that solves for the cup, not the kettle — with a live chiming pour timer.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={displaySerif.variable}>
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
