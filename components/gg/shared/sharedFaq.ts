import { sharedFaqBySlug, type SharedFaqSlug } from "@/content/faq";

import type { FaqItem } from "../FaqAccordion";

/** One shared v2 FAQ entry (content/faq.ts `sharedFaq`) as an accordion item, with its deep-link slug and trailing link. */
export function sharedFaqItem(slug: SharedFaqSlug): FaqItem {
  const entry = sharedFaqBySlug(slug);
  return { question: entry.question, answer: [entry.answer], slug: entry.slug, link: entry.link };
}
