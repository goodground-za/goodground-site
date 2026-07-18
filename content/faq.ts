/**
 * Copy verbatim from the copy deck §1 Section 8.
 *
 * `answer: null` means GoodGround has not confirmed the answer yet. The
 * accordion renders an honest "coming soon" state for those and they are
 * excluded from FAQPage schema — publishing a guessed cancellation policy or
 * project timeline would be worse than publishing nothing (copy deck Q4/Q6/Q8).
 */

export type FAQItem = {
  question: string;
  answer: string | null;
};

export const faq: FAQItem[] = [
  {
    question: "How does the 12-month payment plan actually work?",
    answer:
      "We agree on one fixed price for your project up front — no hourly billing, no scope surprises. That price is then split into 12 equal monthly payments, starting once your project begins. You always know exactly what you're paying and when.",
  },
  {
    question: "Is there a large deposit before you start?",
    answer:
      "No. There's no large lump-sum payment to get started. Your first monthly instalment begins the project, and the remaining 11 follow monthly until it's paid off.",
  },
  {
    question: "What happens if the project scope changes partway through?",
    answer:
      "We'll always let you know before any change affects the price. If you add scope beyond what was originally agreed, we'll quote that separately rather than silently adjusting your monthly payment.",
  },
  {
    // Copy deck: must not be published until the real cancellation policy is finalised.
    question: "What if I need to pause or cancel partway through the 12 months?",
    answer: null,
  },
  {
    question: "Do you only build websites, or do you handle design and SEO too?",
    answer:
      "Every website we build includes the design, UX, and SEO foundations as part of one process — you don't need to brief a separate designer or SEO specialist. It's one team, one project, one monthly payment.",
  },
  {
    // Copy deck: an inaccurate timeline promise is worse than none.
    question: "How long does a typical project take?",
    answer: null,
  },
  {
    question: "What happens after my website launches?",
    answer:
      "Launch isn't the finish line — it's the start of Cultivate Growth. We offer ongoing Website Care Plans for updates, monitoring, and small changes, so your site keeps performing after the 12 payments are complete.",
  },
  {
    // Copy deck: affects local SEO framing; confirm service area before publishing.
    question: "Do you work with businesses outside Cape Town?",
    answer: null,
  },
];
