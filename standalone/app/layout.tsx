import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b06a3b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://perfect-brew.vercel.app"),
  title: {
    default:
      "The Perfect Brew — Pour Over, Chemex, AeroPress & Cold Brew Calculator",
    template: "%s | The Perfect Brew",
  },
  description:
    "Enter the cup size you want and your taste style; get the exact coffee dose, water, bloom, temperature, grind, and a live timed pour schedule for V60, Chemex, siphon, AeroPress, and cold brew. Grounded in specialty-coffee brewing science.",
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
    title: "The Perfect Brew — the perfect cup, every single time",
    description:
      "Tell it how much coffee you want in the cup. It gives you the exact dose, the perfect bloom, temperature, grind, and a live pour timer.",
    type: "website",
    siteName: "The Perfect Brew",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Perfect Brew",
    description:
      "The exact dose, bloom, temperature, and a live pour timer — for the cup size you actually want.",
  },
  robots: { index: true, follow: true },
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
