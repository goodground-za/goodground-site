import { googleReviewsUrl } from "./testimonials";

/**
 * The Home trust bar (Figma Home 01). A site setting: the redesign README
 * wants these four numbers editable without touching the layout.
 *
 * They are the figures drawn in the Figma file, which the owner signed off.
 * They are NOT checked against the older honesty rule in stats.ts ("no client
 * counts, no ratings" for a studio founded in 2026): "20+ years combined
 * experience", "10+ live, testable projects" and "100% satisfied clients" need
 * the owner to confirm they are true before this ships.
 */
export const trustBar = {
  rating: { score: "5.0", label: "on Google", caption: "From verified client reviews", href: googleReviewsUrl },
  stats: [
    { to: 20, suffix: "+", label: "years combined experience" },
    { to: 10, suffix: "+", label: "live, testable projects" },
    { to: 100, suffix: "%", label: "satisfied clients" },
    { to: 12, suffix: "", label: "month payment option" },
  ],
} as const;
