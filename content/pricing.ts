/**
 * PLACEHOLDER PRICING — the numbers below are deliberately fake.
 *
 * No tier pricing exists yet (CLAUDE.md §7, dev brief §11). `PLACEHOLDER_PRICING`
 * gates every surface that renders a rand figure: while it is true, the UI labels
 * the numbers as illustrative and refuses to present them as a quote. Set real
 * `total` values and flip the flag to false — do not flip it first.
 *
 * The calculator stays illustrative regardless until the payment gateway and
 * National Credit Act questions are settled (dev brief §6).
 */

export const PLACEHOLDER_PRICING = true;

export type Tier = {
  slug: string;
  name: string;
  positioning: string;
  /** Fixed project total in rand. Fake while PLACEHOLDER_PRICING is true. */
  total: number;
  includes: string[];
};

export const tiers: Tier[] = [
  {
    slug: "starter",
    name: "Starter Site",
    positioning: "A credible first website for a business that has never had one.",
    total: 30000,
    includes: [
      "Up to 5 pages",
      "Mobile-first design",
      "SEO foundations",
      "Contact form and enquiry routing",
    ],
  },
  {
    slug: "standard",
    name: "Standard Site",
    positioning: "For an established business that needs the site to actually sell.",
    total: 60000,
    includes: [
      "Up to 12 pages",
      "Custom design system",
      "Copywriting support",
      "SEO foundations and local search setup",
      "Analytics and conversion tracking",
    ],
  },
  {
    slug: "custom",
    name: "Custom Build",
    positioning: "Bespoke work: booking, e-commerce, integrations, or scale.",
    total: 120000,
    includes: [
      "Unlimited pages",
      "Custom functionality and integrations",
      "Full design and content production",
      "Ongoing performance budget",
    ],
  },
];

export const MONTHS = 12;

export const monthlyFor = (total: number) => Math.round(total / MONTHS);

/** Care Plans genuinely recur, unlike project work. Prices unconfirmed. */
export type CarePlan = {
  slug: string;
  name: string;
  monthly: number;
  includes: string[];
};

export const carePlans: CarePlan[] = [];
