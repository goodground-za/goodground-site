/**
 * Copy from the copy deck §1 Section 8, plus the Growth (ads) items.
 *
 * `answer: null` renders an honest "coming soon" state and excludes the item
 * from FAQPage schema, for questions GoodGround has not confirmed yet. As of
 * 2026-07-30 the three that were open (cancellation, timeline, service area)
 * are answered per the founder; keep the null mechanism for any future ones.
 */

export type FAQItem = {
  question: string;
  answer: string | null;
};

export const faq: FAQItem[] = [
  {
    question: "How does the 12-month payment plan actually work?",
    answer:
      "We agree on one fixed price for your project up front. No hourly billing and no scope surprises. That price is then split into 12 equal monthly payments, starting once your project begins. You always know exactly what you're paying and when.",
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
    question: "What if I need to pause or cancel partway through the 12 months?",
    answer:
      "The project price is fixed, and the 12 monthly payments are simply how it's spread out. If you cancel partway through, the outstanding balance of that agreed price becomes payable. The full cancellation terms are set out in our Terms and Conditions and written into the contract you sign before we start, so nothing about it catches you out later.",
  },
  {
    question: "Do you only build websites, or do you handle design and SEO too?",
    answer:
      "Every website we build includes the design, UX, and SEO foundations as part of one process, so you don't need to brief a separate designer or SEO specialist. One team, one project, one monthly payment.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most website projects take about 4 to 6 weeks from start to launch. The exact time depends on the scope and what your project needs, and we'll give you a firmer estimate once we've scoped it together.",
  },
  {
    question: "What happens after my website launches?",
    answer:
      "Launch is the start of Cultivate Growth, not the finish line. We offer ongoing Website Care Plans for updates, monitoring, and small changes, so your site keeps performing after the 12 payments are complete.",
  },
  {
    question: "Do you work with businesses outside Cape Town?",
    answer:
      "Yes. We're based in Cape Town's Northern Suburbs, but we work with businesses right across South Africa. The whole process runs comfortably online, so where you're based is never a barrier.",
  },
  // Copy deck: Google Ads & Meta Ads (Growth), §7.
  {
    question: "How much should I spend on ads?",
    answer:
      "It depends on your goals and margins, but we'll always start with a budget you're comfortable with and only recommend increases once the results justify it. You're never locked into a number.",
  },
  {
    question: "Do I need a new website to start?",
    answer:
      "Not necessarily, but ads work far better when they point to a fast, well-structured site. If your foundation needs work first, we'll tell you honestly.",
  },
  {
    question: "What's the difference between Google Ads and Meta Ads?",
    answer:
      "Google captures people already searching for what you offer, high intent, ready to act. Meta (Facebook and Instagram) builds awareness and trust with the right people before they need you. Most businesses do best with a mix.",
  },
  {
    question: "Is there a long contract?",
    answer:
      "No. We work month to month with 30 days' notice. We'd rather earn your business every month than trap you in it.",
  },
  {
    question: "Will I own my ad accounts?",
    answer:
      "Always. Your accounts, your data, your audiences, they belong to you, whatever happens down the line.",
  },
];
