import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /_styleguide is the redesign's private component sheet (also noindex).
    rules: { userAgent: "*", allow: "/", disallow: ["/_styleguide"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
