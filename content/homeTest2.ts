/**
 * Copy written specifically for the home-test-2 structural rebuild
 * (2026-08-19 brief). Everything else this page needs — services, process,
 * FAQ, stats, case studies, NAP — is read from the existing content files,
 * so there's exactly one source of truth for each; only genuinely new copy
 * for this page's own sections lives here.
 *
 * No fabricated testimonials, client counts or timelines — see CLAUDE.md §9
 * and the same rule already followed by content/stats.ts and
 * content/testimonials.ts. Where the brief wanted a figure that isn't
 * confirmed anywhere in the codebase, it's left out rather than invented.
 */

export type StrategyPillar = {
  title: string;
  body: string;
};

/**
 * Four pillars matching the "good ground" foundation idea already argued in
 * components/sections/About.tsx, restructured as a sequence rather than a
 * single block of prose. Same underlying claims as that section, not new
 * ones.
 */
export const strategyPillars: StrategyPillar[] = [
  {
    title: "Foundation first",
    body: "We start with your business and your customers, not a blank canvas. Strategy gets agreed before anything gets designed, because a website without purpose rarely performs, however good it looks.",
  },
  {
    title: "Built to be found",
    body: "Every site we build carries its SEO foundations from day one: fast load times, proper page structure, and content built around how your customers actually search. Not a second project six months later to fix it.",
  },
  {
    title: "Designed around the decision",
    body: "We map what a visitor needs to see, and in what order, before they trust you enough to act. Every page is laid out around the decision your customer is actually making, not a generic template.",
  },
  {
    title: "Support past launch",
    body: "Launch is the start, not the finish line. One month of support is included with every project, and our Full Service package can take hosting, mailboxes, SEO, and maintenance off your hands after that.",
  },
];

export const strategyIntro =
  "Every business wants the same thing: more enquiries, more customers, more opportunity. But growth doesn't start with marketing. It starts with the foundation underneath it.";

/** Portfolio section intro. Only real, testable work is featured — see
 * content/caseStudies.ts. Concept builds are labelled as concept builds,
 * same honesty rule as /work. */
export const portfolioIntro =
  "Real builds, not mockups. Every project below is live at a public URL you can open, click through, and test yourself.";

/* ---- 2026-08-20 layout rebuild ---- */

export const workIntro =
  "Real builds, not mockups. Every project below is live at a public URL you can open, click through, and test yourself. Some are client work and some are concept builds, and each one says which it is.";

export const industriesIntro =
  "We build for small and medium businesses across South Africa. These are the categories we know best, where being easy to find and easy to trust is usually what decides whether someone gets in touch.";

/**
 * Section intro headline, split so the first clause can carry the accent
 * colour and the rest sits back — one sentence, not two strings that could
 * drift apart.
 */
export const servicesLede = {
  lead: "We build AI-accelerated, search-first websites and digital",
  rest: "systems that help category leaders lead their industries.",
};

/**
 * Figures confirmed by Johandre on 2026-08-20 for publication. Everything
 * else on this page still follows the no-invented-numbers rule (CLAUDE.md
 * §9) — these are here because the business owner signed them off, not
 * because they were inferred from anything in the codebase.
 */
export const headlineStats: { value: string; label: string }[] = [
  { value: "01", label: "team, one connected process." },
  { value: "20+", label: "years combined experience" },
  { value: "10+", label: "projects completed" },
  { value: "100%", label: "satisfied clients" },
];

export type ServiceTile = {
  title: string;
  /** Shown on hover/focus. */
  blurb: string;
  image: string;
  href: string;
};

/**
 * The four headline offers, each pointing at the closest real service page.
 *
 * Blurbs are lifted from content/services.ts rather than written fresh, so
 * the tiles and the service pages describe the same thing. "Google & Meta
 * Ads" merges the two real ad-service lines because it covers both; "Graphic
 * Design" has no entry in services.ts, so its line stays descriptive and
 * makes no claim the rest of the site doesn't already make.
 */
export const serviceTiles: ServiceTile[] = [
  {
    title: "Web Development",
    blurb: "Custom-built, fast, and made to grow with your business.",
    image: "/images/ht2/svc-web-development.webp",
    href: "/services",
  },
  {
    title: "Google & Meta Ads",
    blurb: "Be there the moment someone searches for you, and stay in front of them while they decide.",
    image: "/images/ht2/svc-google-meta-ads.webp",
    href: "/services/google-ads",
  },
  {
    title: "Graphic Design",
    blurb: "Brand and design work that keeps everything looking like one company.",
    image: "/images/ht2/svc-graphic-design.webp",
    href: "/services/ux-design",
  },
  {
    title: "SEO & Display",
    blurb: "Built to be found, not just built to look nice.",
    image: "/images/ht2/svc-seo-display.webp",
    href: "/services/seo",
  },
];

/** Industry photography, keyed by the `icon` discriminator already on
 * content/industries.ts so the two lists cannot fall out of sync. */
export const industryImages: Record<string, string> = {
  trades: "/images/ht2/ind-trades.webp",
  health: "/images/ht2/ind-health.webp",
  hospitality: "/images/ht2/ind-hospitality.webp",
  retail: "/images/ht2/ind-retail.webp",
  professional: "/images/ht2/ind-professional.webp",
  nonprofit: "/images/ht2/ind-nonprofit.webp",
};

/** Case-study card artwork for the Work banner, keyed by case study slug. */
export const workImages: Record<string, string> = {
  "point-break-surf": "/images/ht2/work-point-break.webp",
  "sunbird-early-learners": "/images/ht2/work-sunbird.webp",
  "b3tter-bottle": "/images/ht2/work-better.webp",
};
