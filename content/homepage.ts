/**
 * Content specific to the homepage's own section set (promoted from the
 * approved /home-test variant, formerly content/home-test.ts). Everything
 * else the homepage needs (services, industries, process, FAQ, NAP) is read
 * directly from the existing content files, so there's exactly one source
 * of truth for each — only genuinely new copy for these sections lives here.
 */

import { services } from "@/content/services";

export type Reason = { title: string; body: string };

/**
 * The client's mockup shipped its 4th card ("Creative Strategy") with literal
 * "Need text" placeholder copy. Written 2026-08-13 in the voice of the other
 * five and against facts already stated elsewhere on the site (strategy
 * before design, per content/process.ts and the About page's beliefs list).
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
    title: "Strategy First",
    body: "We start with your business and your customers, not a blank canvas. The plan gets agreed before anything gets designed.",
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
 * The image carousel is a visual showcase, not a 1:1 render of
 * `content/services.ts` — its card labels ("Website Design", "Web
 * Development") are a different, more casual cut of the same work than the
 * services accordion further down the page (which uses the real service
 * titles). Kept as its own small local list rather than forcing an
 * artificial mapping onto services.ts.
 *
 * Three of the five descriptions are the real one-liners from
 * `content/services.ts` (Search Optimisation → seo-foundations, Web
 * Development → website-development, UX Design → ux-design). "Website
 * Design" and "Graphic Design" have no matching service entry (the client's
 * mockup shipped "Text goes here" for the centre card), so those two were
 * written 2026-08-13 in the same voice, describing work GoodGround already
 * lists elsewhere on the site rather than claiming anything new.
 */
export const carouselCards: CarouselCard[] = [
  {
    label: "Search Optimisation",
    description: services.find((s) => s.slug === "seo-foundations")!.description,
    image: { src: "/images/search-optimization.jpeg", width: 585, height: 784 },
  },
  {
    label: "Web Development",
    description: services.find((s) => s.slug === "website-development")!.description,
    image: { src: "/images/web-development.jpeg", width: 790, height: 1053 },
  },
  {
    label: "Website Design",
    description: "Every page laid out around the decision your customer is actually making.",
    image: { src: "/images/website-design-1.jpeg", width: 885, height: 1180 },
  },
  {
    label: "Graphic Design",
    description: "Logos, brand assets and social graphics that match the site they sit next to.",
    image: { src: "/images/graphic-design.jpeg", width: 791, height: 1055 },
  },
  {
    label: "UX Design",
    description: services.find((s) => s.slug === "ux-design")!.description,
    image: { src: "/images/ux-design.jpeg", width: 791, height: 1055 },
  },
];

export const heroImage = {
  src: "/images/hero-cover.png",
  width: 2008,
  height: 1136,
};

/** Portrait crop of the same shoot, used only on mobile (see Hero.tsx) —
 * the landscape heroImage above crops too tight on narrow screens. */
export const heroImageMobile = {
  src: "/images/hero-cover-mobile.jpg",
  width: 1080,
  height: 1352,
};

export const processBanner = {
  src: "/images/creative-process.png",
  width: 2160,
  height: 1350,
};
