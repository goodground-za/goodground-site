/**
 * Content specific to the /home-test A/B variant. Isolated from the rest of
 * `content/` on purpose: everything else this page needs (services,
 * industries, process, FAQ, NAP) is read directly from the existing files so
 * there is exactly one source of truth for each — only genuinely new copy
 * for this variant lives here. Deletable along with the rest of the
 * experiment if it doesn't win the test.
 */

import { services } from "@/content/services";

export type Reason = { title: string; body: string };

/**
 * The mockup's own 4th card ("Creative Strategy") literally says "Need text"
 * — the client hadn't written it yet. This entry is a first-pass draft in
 * the voice of the other five, flagged for sign-off before treating this
 * variant as final. Do not treat it as approved client copy.
 */
export const sixReasons: Reason[] = [
  {
    title: "World Class Quality",
    body: "Every project is shaped with senior-level craft, clear thinking, and detail we'd proudly put in our portfolio.",
  },
  {
    title: "Personalised Design",
    body: "No recycled templates. Every interface, brand asset, and digital experience is shaped around your goals.",
  },
  {
    title: "Problem Solving",
    body: "We don't just make things look good. We clarify friction, improve journeys, and design with purpose.",
  },
  {
    // DRAFT — the mockup shipped this card with "Need text". Sign-off needed.
    title: "Creative Strategy",
    body: "We start with your business, not a blank page. Every idea is grounded in a clear strategy before a single pixel gets designed.",
  },
  {
    title: "Quick Turnaround",
    body: "AI-assisted and human-finished, so work moves faster without feeling rushed or generic.",
  },
  {
    title: "Clear Pricing",
    body: "Simple scope, transparent effort, and no surprise costs once the direction is agreed.",
  },
];

export type CarouselCard = {
  label: string;
  /** Short overview shown only while this card is centred. */
  description: string;
  image: { src: string; width: number; height: number };
};

/**
 * The mockup's image carousel is a visual showcase, not a 1:1 render of
 * `content/services.ts` — its card labels ("Website Design", "Web
 * Development") are a different, more casual cut of the same work than the
 * accordion further down the page (which does use the real service titles).
 * Kept as its own small local list rather than forcing an artificial mapping
 * onto services.ts.
 *
 * Three of the five descriptions are the real one-liners from
 * `content/services.ts` (Search Optimisation → seo-foundations, Web
 * Development → website-development, UX Design → ux-design). "Website
 * Design" and "Graphic Design" have no matching service entry — the mockup
 * itself only shipped "Text goes here" for the centre card, so these two are
 * first-pass drafts in the same voice, flagged for sign-off.
 */
export const carouselCards: CarouselCard[] = [
  {
    label: "Search Optimisation",
    description: services.find((s) => s.slug === "seo-foundations")!.description,
    image: { src: "/home-test/images/search-optimization.jpeg", width: 585, height: 784 },
  },
  {
    label: "Web Development",
    description: services.find((s) => s.slug === "website-development")!.description,
    image: { src: "/home-test/images/web-development.jpeg", width: 790, height: 1053 },
  },
  {
    // DRAFT — no matching services.ts entry. Sign-off needed.
    label: "Website Design",
    description: "Interfaces and visuals designed around how people actually use them.",
    image: { src: "/home-test/images/website-design-1.jpeg", width: 885, height: 1180 },
  },
  {
    // DRAFT — no matching services.ts entry. Sign-off needed.
    label: "Graphic Design",
    description: "Brand visuals and assets that look considered, not generic.",
    image: { src: "/home-test/images/graphic-design.jpeg", width: 791, height: 1055 },
  },
  {
    label: "UX Design",
    description: services.find((s) => s.slug === "ux-design")!.description,
    image: { src: "/home-test/images/ux-design.jpeg", width: 791, height: 1055 },
  },
];

export const heroImage = {
  src: "/home-test/images/hero-cover.png",
  width: 2008,
  height: 1136,
};

export const processBanner = {
  src: "/home-test/images/creative-process.png",
  width: 2160,
  height: 1350,
};
