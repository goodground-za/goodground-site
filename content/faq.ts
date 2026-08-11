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
    question: "How do the two payment options work?",
    answer:
      "We agree on one fixed price for your project up front. No hourly billing and no scope surprises. From there, you choose how to pay it: a 50% deposit to secure the project and the remaining 50% on completion, before handover, or 12 equal monthly instalments, where the first instalment secures your booking and the remaining 11 become payable once the project is completed. Either way, you always know exactly what you're paying and when.",
  },
  {
    question: "Is there a deposit before you start?",
    answer:
      "It depends which option you choose. With the deposit option, yes: 50% upfront secures the project, with the balance due on completion. With the 12-month plan, your first instalment secures the booking instead, a smaller amount than a full deposit, and the remaining 11 instalments only start once the project is completed.",
  },
  {
    question: "What happens if the project scope changes partway through?",
    answer:
      "We'll always let you know before any change affects the price. If you add scope beyond what was originally agreed, we'll quote that separately rather than silently adjusting what you've already agreed to pay.",
  },
  {
    question: "What if I need to pause or cancel partway through the project?",
    answer:
      "The project price is fixed, however you choose to pay it. If you cancel partway through, the outstanding balance of that agreed price becomes payable, whichever payment option you chose. The full cancellation terms are set out in our Terms and Conditions and written into the contract you sign before we start, so nothing about it catches you out later.",
  },
  {
    question: "Do you only build websites, or do you handle design and SEO too?",
    answer:
      "Every website we build includes the design, UX, and SEO foundations as part of one process, so you don't need to brief a separate designer or SEO specialist. One team, one project, one price.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most website projects take about 4 to 6 weeks from start to launch. The exact time depends on the scope and what your project needs, and we'll give you a firmer estimate once we've scoped it together.",
  },
  {
    question: "What happens after my website launches?",
    answer:
      "Launch is the start of Cultivate Growth, not the finish line. We offer ongoing Website Care Plans for updates, monitoring, and small changes, so your site keeps performing well after it's paid off.",
  },
  {
    question: "Do you work with businesses outside George?",
    answer:
      "Yes. We're based in George, on the Garden Route, but we work with businesses right across South Africa. The whole process runs comfortably online, so where you're based is never a barrier.",
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
