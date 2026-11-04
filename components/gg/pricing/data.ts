import { fullServicePackage, packages } from "@/content/pricing";

/**
 * Everything the /pricing page computes or words, in one place. The prices
 * themselves are in content/pricing.ts (the one source the rest of the site
 * reads); this file adds the maths and the redesign's card copy on top.
 */

/* ----------------------------------------------------------------- maths */

/** 12-instalment amount: total ÷ 12 rounded UP to the rand (R19 400 → R1 617). */
export const INSTALMENTS = 12;
export const instalmentFor = (total: number) => Math.ceil(total / INSTALMENTS);
/** Deposit: half the total. The balance is the other half. */
export const depositOf = (total: number) => Math.ceil(total / 2);
export const balanceOf = (total: number) => total - depositOf(total);

export type Billing = "deposit" | "instalments";
export const BILLING_OPTIONS: { value: Billing; label: string }[] = [
  { value: "deposit", label: "50% deposit" },
  { value: "instalments", label: "12 monthly instalments" },
];
export const BILLING_OPTIONS_SHORT: { value: Billing; label: string }[] = [
  { value: "deposit", label: "50% deposit" },
  { value: "instalments", label: "12 instalments" },
];

/* -------------------------------------------------------------- packages */

export type PackageView = {
  slug: string;
  name: string;
  total: number;
  tagline: string;
  /** Card inclusions (the Figma wording; the verbatim list stays in content/pricing.ts for JSON-LD). */
  inclusions: string[];
  bestFor: string;
  timeline: string;
  recommended?: boolean;
};

const CARD_COPY: Record<string, Omit<PackageView, "slug" | "name" | "total" | "timeline">> = {
  micro: {
    tagline: "A sharp, single-page site for a strong first impression.",
    inclusions: [
      "1 page with distinct scroll sections",
      "Fully custom-coded, mobile-responsive",
      "Custom micro-interactions",
      "Contact section with working form",
      "Basic on-page SEO",
      "1 round of revisions",
    ],
    bestFor: "Solo freelancers, personal brands, pop-ups, events, holding pages",
  },
  launch: {
    tagline: "A clean, professional website to get you online fast.",
    inclusions: [
      "Up to 5 pages",
      "Fully custom-coded, mobile-responsive",
      "Contact form with email notifications",
      "Basic on-page SEO",
      "Social media links",
      "1 round of revisions",
    ],
    bestFor: "New businesses or solo founders who need a credible presence",
  },
  grow: {
    tagline: "Fully custom, with the interactive touches that make you stand out.",
    inclusions: [
      "Up to 10 pages, incl. Blog/News",
      "Unique design, no templates",
      "Custom interactive elements",
      "Forms with conditional logic",
      "Integrations: maps, booking, WhatsApp",
      "SEO + Analytics & Search Console",
      "2 rounds of revisions",
    ],
    bestFor: "Small businesses ready to market online and stand out",
    recommended: true,
  },
  scale: {
    tagline: "A fully custom platform built to be your business hub online.",
    inclusions: [
      "15+ pages, fully custom",
      "Advanced functionality: multi-step forms, calculators, APIs",
      "Advanced interactive design",
      "Advanced SEO + speed optimisation",
      "Copywriting guidance for key pages",
      "3 rounds of revisions",
      "1-hour training session",
    ],
    bestFor: "Businesses that need the site to be a real sales or operations tool",
  },
};

export const packageViews: PackageView[] = packages.map((p) => ({
  slug: p.slug,
  name: p.name,
  total: p.total,
  timeline: p.timeline,
  ...CARD_COPY[p.slug],
}));

export const packageBySlug = (slug: string) => packageViews.find((p) => p.slug === slug);

/* ------------------------------------------------------- full service */

export const fullService = {
  ...fullServicePackage,
  chips: [
    "Website build, custom-coded",
    "Hosting, managed",
    "Business mailboxes, managed",
    "Ongoing SEO",
    "Updates & maintenance",
  ],
};
