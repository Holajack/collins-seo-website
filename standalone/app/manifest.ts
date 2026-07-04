import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Perfect Brew",
    short_name: "Perfect Brew",
    description:
      "Coffee calculator + live brew timer that solves for the cup, not the kettle — V60, Chemex, siphon, AeroPress, French press, and cold brew.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6f0",
    theme_color: "#b06a3b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
