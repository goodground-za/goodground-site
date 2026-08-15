/**
 * DEPRECATED — NOT RENDERED ANYWHERE (2026-08-15).
 *
 * /work now lists case studies from content/caseStudies.ts instead. The card
 * this file fed (the studio's own site, with a live Core Web Vitals readout in
 * place of a screenshot) was removed once real case studies existed to lead
 * with. Nothing imports this file.
 *
 * ADD NEW WORK TO content/caseStudies.ts, not here.
 *
 * Kept rather than deleted so the LiveMetrics idea and this entry's copy are
 * recoverable if the self-measuring card is ever wanted on another page. Safe
 * to delete along with components/LiveMetrics.tsx if not.
 *
 * The rule that has held since launch still holds: no fabricated clients,
 * results, or logos. Only add a project once it is genuinely live, and only
 * quote an outcome you can point at.
 */

export type Project = {
  slug: string;
  /** Client or project name. */
  name: string;
  /** One line, what it is. */
  tagline: string;
  /** Sector, matched to the segments on /services where it fits. */
  sector: string;
  year: string;
  /** What GoodGround actually did. Keep to what was really delivered. */
  disciplines: string[];
  /** Live URL, omitted while a build is still in progress. */
  url?: string;
  /**
   * "self" renders the live performance readout instead of a screenshot: this
   * site measuring itself in the visitor's own browser. There should only ever
   * be one of these. Everything else is "standard".
   */
  kind: "self" | "standard";
  /** Longer description for the feature card. */
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "goodground-co-za",
    name: "goodground.co.za",
    tagline: "This website, measuring itself while you read it.",
    sector: "Our own studio",
    year: "2026",
    disciplines: ["Design", "Development", "SEO", "Motion"],
    url: "https://www.goodground.co.za",
    kind: "self",
    summary:
      "We launched in 2026 and haven't handed over a client site yet, so we can't show you someone else's. This is the one site we have built. Rather than describe it, the panel below measures it live, in your browser, on your connection, using the same Core Web Vitals Google grades every website by. Open your developer tools and check the numbers if you like. We'd rather be tested than believed.",
  },
];

/** First entry gets the feature treatment on /work; the rest fill the grid. */
export const featuredProject = projects[0];
export const otherProjects = projects.slice(1);
