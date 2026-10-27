import { faq } from "@/content/faq";

import type { IconName } from "../Icon";
import { termsLive } from "../legal/data";

/**
 * /faq (Figma 67:151 desktop, 68:167 mobile). The 13 questions and answers are the live ones in
 * content/faq.ts, by position and verbatim (open item: answer 07 is drawn lightly shortened, and
 * answer 06 still says 4 to 6 weeks while /pricing shows 1 to 2 weeks for the smaller packages).
 * What this file adds is the topic, the permanent anchor and the related link per question.
 */
export type TopicKey = "payments" | "projects" | "ads";

export type Topic = {
  key: TopicKey;
  title: string;
  /** Chip label on phones. */
  short: string;
  icon: IconName;
  tint: "blush" | "lilac" | "mint";
};

export const topics: Topic[] = [
  { key: "payments", title: "Payments & pricing", short: "Payments", icon: "wallet", tint: "blush" },
  { key: "projects", title: "Website projects", short: "Projects", icon: "code", tint: "lilac" },
  { key: "ads", title: "Ads & growth", short: "Ads", icon: "up", tint: "mint" },
];

export type FaqEntry = {
  /** Permanent anchor: /faq#deposit. */
  slug: string;
  topic: TopicKey;
  number: string;
  question: string;
  answer: string;
  related?: { label: string; href: string };
};

type Meta = { slug: string; topic: TopicKey; related?: FaqEntry["related"] };

// Same order as content/faq.ts.
const META: Meta[] = [
  { slug: "payment-options", topic: "payments", related: { label: "See pricing →", href: "/pricing#ways-to-pay" } },
  { slug: "deposit", topic: "payments", related: { label: "See pricing →", href: "/pricing#ways-to-pay" } },
  { slug: "scope-changes", topic: "payments", related: { label: "How we work →", href: "/process" } },
  // The Terms page does not exist yet (open item 3); until it ships the link is left off.
  { slug: "pause-or-cancel", topic: "payments", related: termsLive ? { label: "Terms & conditions →", href: "/legal#terms" } : undefined },
  { slug: "design-and-seo", topic: "projects", related: { label: "See our services →", href: "/services" } },
  { slug: "project-length", topic: "projects", related: { label: "See our process →", href: "/process" } },
  { slug: "after-launch", topic: "projects", related: { label: "See Full Service →", href: "/pricing#full-service" } },
  { slug: "service-area", topic: "projects" },
  { slug: "ad-budget", topic: "ads", related: { label: "Google & Meta Ads →", href: "/services/google-ads" } },
  { slug: "new-website", topic: "ads", related: { label: "See pricing →", href: "/pricing" } },
  { slug: "google-vs-meta", topic: "ads", related: { label: "Meta Ads →", href: "/services/meta-ads" } },
  { slug: "contract", topic: "ads" },
  { slug: "ad-accounts", topic: "ads" },
];

export const entries: FaqEntry[] = faq.map((item, i) => ({
  ...META[i],
  number: String(i + 1).padStart(2, "0"),
  question: item.question,
  answer: item.answer ?? "",
}));

export const topicCount = (key: TopicKey) => entries.filter((e) => e.topic === key).length;
