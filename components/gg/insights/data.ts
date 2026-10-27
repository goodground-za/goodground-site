import { articles, type Article } from "@/content/articles";

import type { CoverTopic } from "../ArticleCover";

/**
 * The listing's view of content/articles.ts. Only what the cards render crosses
 * to the client (not the article bodies). Titles, topics, dates and read times
 * are the live ones; the card excerpts are the lightly shortened wording the
 * Figma frames use (max ~180 characters). The hero summary is calculated.
 */
export type Topic = CoverTopic;
export const TOPIC_LABEL: Record<Topic, string> = { websites: "Websites", growth: "Growth", pricing: "Pricing" };
/** Tag tones per topic: Growth coral, Websites plum, Pricing neutral. */
export const TOPIC_TONE: Record<Topic, "coral" | "plum" | "neutral"> = { growth: "coral", websites: "plum", pricing: "neutral" };

export type ArticleCard = {
  slug: string;
  title: string;
  excerpt: string;
  /** Mobile featured card wording. */
  shortExcerpt?: string;
  topic: Topic;
  /** ISO date. */
  date: string;
  minutes: number;
  featured: boolean;
};

const CARD_EXCERPT: Record<string, { excerpt: string; short?: string }> = {
  "how-much-does-a-website-cost-in-south-africa": {
    excerpt:
      "Most website pricing pages hide the number behind a quote form. This one doesn’t. Real 2026 prices for DIY builders, freelancers, agencies, and GoodGround’s own fixed packages.",
    short: "Real 2026 prices for DIY builders, freelancers, agencies and GoodGround’s fixed packages.",
  },
  "website-vs-facebook-page": {
    excerpt:
      "A Facebook page took an afternoon to build. That speed is exactly the problem. What a website does that a Facebook page structurally cannot.",
  },
  "website-that-converts-and-grows-with-your-business": {
    excerpt: "Build conversion and growth into the same site from day one, and neither costs you customers later.",
  },
  "hand-coded-websites-vs-drag-and-drop-builders": {
    excerpt: "Builders win the first afternoon. Hand-coded sites win every day after that. What you’re trading for the convenience.",
  },
  "biggest-website-mistakes-south-african-smes-make": {
    excerpt: "Nobody can find them, they’re slow on a phone, and they never ask anyone to do anything.",
  },
  "why-small-businesses-in-south-africa-need-a-website": {
    excerpt: "Word of mouth has a ceiling. Why a solid website is the difference between being found and being forgotten.",
  },
};

const topicOf = (article: Article): Topic => {
  const key = article.category.toLowerCase();
  return key === "growth" || key === "pricing" ? key : "websites";
};

const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const articleCards: ArticleCard[] = sorted.map((a, i) => {
  const copy = CARD_EXCERPT[a.slug];
  const flagged = articles.some((x) => x.featured);
  return {
    slug: a.slug,
    title: a.title,
    excerpt: copy?.excerpt ?? a.excerpt,
    shortExcerpt: copy?.short,
    topic: topicOf(a),
    date: a.date,
    minutes: a.readingMinutes,
    // Exactly one is featured; with none flagged, the newest one is.
    featured: flagged ? Boolean(a.featured) : i === 0,
  };
});

export const topicsPresent = (Object.keys(TOPIC_LABEL) as Topic[]).filter((t) => articleCards.some((a) => a.topic === t));
export const latestDate = sorted[0]?.date ?? "";

const long = new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Johannesburg" });
const short = new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Johannesburg" });
export const formatLong = (iso: string) => long.format(new Date(iso));
export const formatShort = (iso: string) => short.format(new Date(iso)).replace(/\./g, "");
