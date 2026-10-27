import type { IconName } from "../Icon";

/** The six industries every page lists (live URLs: /services/{slug}, README section 7). */
export type IndustryEntry = {
  slug: string;
  icon: IconName;
  title: string;
  examples: string;
  description: string;
};

export const INDUSTRY_LIST: IndustryEntry[] = [
  {
    slug: "trades-and-home-services",
    icon: "wrench",
    title: "Trades & home services",
    examples: "Plumbers, electricians, builders",
    description: "Electricians, builders and tradespeople who need to be found locally and look credible before the quote.",
  },
  {
    slug: "health-and-wellness",
    icon: "heart",
    title: "Health & wellness",
    examples: "Practices, clinics, studios",
    description: "Clinics and practices that need to feel trustworthy and make booking simple.",
  },
  {
    slug: "hospitality-and-food",
    icon: "cup",
    title: "Hospitality & food",
    examples: "Restaurants, B&Bs, venues",
    description: "Cafés and small venues that need to look as good online as in person, with menus, hours and an easy way to get in touch.",
  },
  {
    slug: "retail-and-small-brands",
    icon: "bag",
    title: "Retail & small brands",
    examples: "Shops and product brands",
    description: "Makers and local shops that need an online shopfront that does the product justice.",
  },
  {
    slug: "professional-and-consulting",
    icon: "brief",
    title: "Professional & consulting",
    examples: "Consultants, firms, advisors",
    description: "Accountants, consultants and agencies whose site is often the first proof of credibility.",
  },
  {
    slug: "non-profits-and-community",
    icon: "hand",
    title: "Non-profits & community",
    examples: "NPOs, churches, schools",
    description: "Organisations doing real work that need to tell their story plainly and bring in support.",
  },
];
