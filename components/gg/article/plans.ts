import { packages } from "@/content/pricing";

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
};

const COPY: Record<string, Omit<PlanCardData, "slug" | "name" | "total" | "dark">> = {
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

export const PLAN_CARDS: PlanCardData[] = packages.map((p) => ({
  slug: p.slug,
  name: p.name,
  total: p.total,
  dark: p.slug === "grow",
  ...COPY[p.slug],
}));
