/**
 * Industries section, adapted from the same section on the Grow Brand
 * homepage. That version names real past clients per category ("like Trail
 * Tribe and TipTap") — GoodGround was founded 2026 and has none yet, so this
 * stays at the category level and makes no track-record claim. Update the
 * descriptions once real projects exist; do not add client names here until
 * they're real (CLAUDE.md §9).
 */

export type Industry = {
  title: string;
  description: string;
  icon: "trades" | "health" | "hospitality" | "retail" | "nonprofit" | "professional";
};

export const industries: Industry[] = [
  {
    title: "Trades & home services",
    description:
      "Electricians, builders, and tradespeople who need to be found locally and look credible before the quote.",
    icon: "trades",
  },
  {
    title: "Health & wellness",
    description: "Clinics and practices that need to feel trustworthy and make booking simple.",
    icon: "health",
  },
  {
    title: "Hospitality & food",
    description:
      "Cafés and small venues that need to look as good online as they do in person, with menus, hours, and an easy way to get in touch.",
    icon: "hospitality",
  },
  {
    title: "Retail & small brands",
    description: "Makers and local shops that need an online shopfront that does the product justice.",
    icon: "retail",
  },
  {
    title: "Professional & consulting services",
    description: "Accountants, consultants, and agencies whose site is often the first proof of credibility.",
    icon: "professional",
  },
  {
    title: "Non-profits & community",
    description: "Organisations doing real work that need to tell their story plainly and bring in support.",
    icon: "nonprofit",
  },
];
