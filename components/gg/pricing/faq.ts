import { sharedFaqBySlug, type SharedFaqSlug } from "@/content/faq";
import { pricingFaq } from "@/content/pricing";

import type { FaqItem } from "../FaqAccordion";

/**
 * The pricing FAQ. Reads content/pricing.ts `pricingFaq` BY POSITION (keep this
 * in step when that list changes) and the shared monthly-plan and AI entries
 * from content/faq.ts by slug, so the four v2 questions are written once for
 * Pricing, the AI page and (later) Home and /faq.
 *
 * Order (mockups/pricing.html): hosting and domain first (v2 wording), then the
 * monthly-plan questions, then the custom-build questions.
 */
const live = (index: number): FaqItem => ({ question: pricingFaq[index].question, answer: [pricingFaq[index].answer] });

const shared = (slug: SharedFaqSlug): FaqItem => {
  const entry = sharedFaqBySlug(slug);
  return { question: entry.question, answer: [entry.answer], slug: entry.slug, link: entry.link };
};

export const pricingFaqItems: FaqItem[] = [
  live(0),
  shared("monthly-or-custom"),
  shared("new-business-offer"),
  shared("cancel-monthly"),
  shared("ai-report"),
  live(1),
  live(2),
  live(3),
  live(4),
  live(5),
  live(6),
  live(7),
  live(8),
];
