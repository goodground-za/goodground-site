import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Web app manifest (/manifest.webmanifest). Colours are the gg tokens: the
 * canvas (--gg-canvas) behind the page and as the browser bar colour, matching
 * `themeColor` in app/layout.tsx. Icons are sized copies of app/icon.png's
 * original artwork (public/icons/).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: "Website development studio in George, South Africa.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f7f4",
    theme_color: "#f7f7f4",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
