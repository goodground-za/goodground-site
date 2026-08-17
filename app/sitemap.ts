import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { caseStudies } from "@/content/caseStudies";
import { industryPages } from "@/content/industryPages";
import { servicePages } from "@/content/servicePages";
import { site } from "@/content/site";

const buildTime = new Date();

/**
 * Real last-modified date for a source file, from git history, rather than
 * every static route silently claiming "changed today" on every deploy
 * regardless of whether anything actually did (SEO audit 2026-08-16, item
 * 20 — only article dates were real before this). Falls back to build time
 * if git isn't available (e.g. a shallow checkout with no history for that
 * path) so the sitemap never breaks over this.
 */
function lastModifiedFor(relativeFile: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%aI -- ${relativeFile}`, { encoding: "utf-8" }).trim();
    return iso ? new Date(iso) : buildTime;
  } catch {
    return buildTime;
  }
}

/**
 * Dev brief §8. Only routes that actually exist and are indexable go in — a
 * sitemap listing not-yet-built pages would ship broken links, which the brief
 * treats as a launch blocker. Add routes here as their pages land.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; file: string }[] = [
    { path: "", priority: 1, file: "app/page.tsx" },
    { path: "/pricing", priority: 0.95, file: "app/pricing/page.tsx" },
    { path: "/services", priority: 0.9, file: "app/services/page.tsx" },
    ...servicePages.map(({ slug }) => ({ path: `/services/${slug}`, priority: 0.8, file: "content/servicePages.ts" })),
    ...industryPages.map(({ slug }) => ({ path: `/services/${slug}`, priority: 0.75, file: "content/industryPages.ts" })),
    { path: "/start-project", priority: 0.8, file: "app/start-project/page.tsx" },
    { path: "/about", priority: 0.8, file: "app/about/page.tsx" },
    { path: "/contact", priority: 0.8, file: "app/contact/page.tsx" },
    { path: "/faq", priority: 0.7, file: "app/faq/page.tsx" },
    { path: "/insights", priority: 0.7, file: "app/insights/page.tsx" },
    { path: "/work", priority: 0.6, file: "app/work/page.tsx" },
    { path: "/legal", priority: 0.3, file: "app/legal/page.tsx" },
  ];

  const pages: MetadataRoute.Sitemap = routes.map(({ path, priority, file }) => ({
    url: `${site.url}${path}`,
    lastModified: lastModifiedFor(file),
    changeFrequency: "monthly",
    priority,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Case study detail pages. /work only lists them, so without this the
  // studies themselves were absent from the sitemap entirely.
  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    lastModified: lastModifiedFor("content/caseStudies.ts"),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pages, ...articlePages, ...caseStudyPages];
}
