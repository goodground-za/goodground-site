import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /_styleguide and /brand-guide are the redesign's private reference
    // pages (both also noindex). No `host`: it is a non-standard directive
    // that only Yandex ever read; the canonical tags carry the www host.
    rules: { userAgent: "*", allow: "/", disallow: ["/_styleguide", "/brand-guide"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
