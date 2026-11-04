import { localPlans, packages } from "@/content/pricing";

/**
 * The plan cards inside an article. The PRICE comes from content/pricing.ts, so an article can
 * never show an old number; the chips, ticks and "Suits" lines are the Figma wording
 * (Article 02, block 14), condensed from each package's own feature list.
 */
export type PlanCardData = {
  slug: string;
  name: string;
  total: number;
  chips: string[];
  /** The phone card's single meta line. */
  meta: string;
  ticks: string[];
  suits: string;
  dark?: boolean;
  /** Where the card goes: a custom package's card on /pricing, or the monthly plans. */
  href: string;
  /** "/mo" for monthly plans. Custom packages show "from" before the price instead. */
  unit?: string;
};

const COPY: Record<string, Omit<PlanCardData, "slug" | "name" | "total" | "dark" | "href" | "unit">> = {
  micro: {
    chips: ["1 page", "~1 week"],
    meta: "1 page · ~1 week",
    ticks: ["Fully custom-coded", "Micro-interactions", "Working contact form"],
    suits: "Freelancers, pop-ups and holding pages",
  },
  launch: {
    chips: ["Up to 5 pages", "~2 weeks"],
    meta: "Up to 5 pages · ~2 weeks",
    ticks: ["Custom-coded", "Contact form", "Basic on-page SEO"],
    suits: "A new business that needs a credible presence",
  },
  grow: {
    chips: ["Up to 10 pages", "3–4 weeks"],
    meta: "Up to 10 pages · 3–4 weeks",
    ticks: ["Blog included", "Custom interactive elements", "SEO, Analytics & Search Console"],
    suits: "A business ready to market itself properly",
  },
  scale: {
    chips: ["15+ pages", "4–6 weeks"],
    meta: "15+ pages · 4–6 weeks",
    ticks: ["Advanced custom functionality", "Advanced SEO & speed", "Training session"],
    suits: "A site that needs to be a real sales tool",
  },
};

const CUSTOM_CARDS: PlanCardData[] = packages.map((p) => ({
  slug: p.slug,
  name: p.name,
  total: p.total,
  dark: p.slug === "grow",
  href: `/pricing#package-${p.slug}`,
  ...COPY[p.slug],
}));

/** Monthly plans (v2): price, ticks and "Suits" come from the plan itself; only the page count chip is added here. */
const LOCAL_PAGES: Record<string, string> = { "local-start": "Up to 5 pages", "local-plus": "Up to 10 pages", "local-pro": "Up to 15 pages" };
const LOCAL_CARDS: PlanCardData[] = localPlans.map((p) => ({
  slug: p.slug,
  name: p.name,
  total: p.monthly,
  unit: "/mo",
  dark: p.slug === "local-plus",
  href: "/pricing#monthly",
  chips: [LOCAL_PAGES[p.slug], p.liveIn],
  meta: `${LOCAL_PAGES[p.slug]} · ${p.liveIn}`,
  ticks: [...p.highlights],
  suits: p.bestFor,
}));

export const PLAN_CARDS: PlanCardData[] = CUSTOM_CARDS;

/** The cards an article's `plans` block asks for, in its order. Unknown ids are dropped; no ids means the four custom packages. */
export function planCardsFor(ids?: string[]): PlanCardData[] {
  if (!ids?.length) return CUSTOM_CARDS;
  const all = [...CUSTOM_CARDS, ...LOCAL_CARDS];
  const found = ids.flatMap((id) => all.filter((c) => c.slug === id));
  return found.length ? found : CUSTOM_CARDS;
}
