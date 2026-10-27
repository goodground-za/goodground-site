import { pricingFaq } from "@/content/pricing";

import type { FaqItem } from "../FaqAccordion";

/**
 * The pricing FAQ in the Figma order. Every answer is the live answer from
 * content/pricing.ts (by position, so keep this in step when that list changes),
 * except question 1, which uses the shorter wording the frame writes out.
 */
const live = (index: number) => pricingFaq[index].answer;

export const pricingFaqItems: FaqItem[] = [
  {
    question: "Do these prices include hosting and a domain?",
    answer: [
      "No. Hosting, domain and upkeep are arranged separately from the build price. Full Service and the Website Launch Offer are the exceptions: both include hosting in the monthly price.",
    ],
  },
  { question: pricingFaq[1].question, answer: [live(1)] },
  { question: pricingFaq[2].question, answer: [live(2)] },
  { question: pricingFaq[3].question, answer: [live(3)] },
  { question: pricingFaq[4].question, answer: [live(4)] },
  { question: pricingFaq[5].question, answer: [live(5)] },
  { question: pricingFaq[6].question, answer: [live(6)] },
  { question: pricingFaq[7].question, answer: [live(7)] },
  { question: pricingFaq[8].question, answer: [live(8)] },
];
