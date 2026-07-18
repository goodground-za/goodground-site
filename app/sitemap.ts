import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { site } from "@/content/site";

/**
 * Dev brief §8. Only routes that actually exist and are indexable go in — a
 * sitemap listing not-yet-built pages would ship broken links, which the brief
 * treats as a launch blocker. Add routes here as their pages land.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/start-project", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/insights", priority: 0.7 },
    { path: "/work", priority: 0.6 },
    { path: "/legal", priority: 0.3 },
  ];

  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...articlePages];
}
