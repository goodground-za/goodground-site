import { pricingFaq } from "@/content/pricing";

import type { FaqItem } from "../FaqAccordion";

/**
 * The pricing FAQ as the Figma frame lists it. Five questions are the live
 * answers from content/pricing.ts (by position), unchanged. Question 1 uses the
 * shorter wording the frame writes out. "Full Service or instalments" and "Do I
 * own my website?" are new in the design: their answers are DRAFT, assembled
 * only from facts already on the page (see the tracker questions).
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
  {
    question: "Full Service or instalments: which should I choose?",
    answer: [
      "Choose Full Service if you would rather not look after hosting, mailboxes and upkeep yourself: one monthly price covers the build and everything after it, month to month with no end date. Choose a package in 12 instalments if you want to own a finished site and spread the cost: the first instalment books your slot, the other 11 start once the site is finished, and when it is paid off the site is yours.",
    ],
  },
  {
    question: "Do I own my website?",
    answer: [
      "Yes. Once a package is paid off, whichever way you pay, the site is yours. On the Website Launch Offer, at the end of the 12 months we transfer the domain and site to you, or you move to a Care Plan.",
    ],
  },
  { question: pricingFaq[5].question, answer: [live(5)] },
  { question: pricingFaq[6].question, answer: [live(6)] },
];
