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
      "We agree on one fixed price for your project up front. No hourly billing and no scope surprises. From there, you choose how to pay it: a 50% deposit to secure the project and the remaining 50% on completion, before handover, or 12 equal monthly instalments, where the first instalment secures your booking and the remaining 11 become payable once the project is completed. Either way, you always know exactly what you’re paying and when.",
  },
  {
    question: "Is there a deposit before you start?",
    answer:
      "It depends which option you choose. With the deposit option, yes: 50% upfront secures the project, with the balance due on completion. With the 12-month plan, your first instalment secures the booking instead, a smaller amount than a full deposit, and the remaining 11 instalments only start once the project is completed.",
  },
  {
    question: "What happens if the project scope changes partway through?",
    answer:
      "We’ll always let you know before any change affects the price. If you add scope beyond what was originally agreed, we’ll quote that separately rather than silently adjusting what you’ve already agreed to pay.",
  },
  {
    question: "What if I need to pause or cancel partway through the project?",
    answer:
      "The project price is fixed, however you choose to pay it. If you cancel partway through, the outstanding balance of that agreed price becomes payable, whichever payment option you chose. The full cancellation terms are set out in our Terms and Conditions and written into the contract you sign before we start, so nothing about it catches you out later.",
  },
  {
    question: "Do you only build websites, or do you handle design and SEO too?",
    answer:
      "Every website we build includes the design, UX, and SEO foundations as part of one process, so you don’t need to brief a separate designer or SEO specialist. One team, one project, one price.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most website projects take 1 to 6 weeks from start to launch, depending on the package. The exact time depends on the scope and what your project needs, and we’ll give you a firmer estimate once we’ve scoped it together.",
  },
  {
    question: "What happens after my website launches?",
    answer:
      "Launch is the start, not the finish line. If you're paying the build off over 12 months, basic maintenance, basic health checks, and site monitoring are included for that period. After that, or from launch if you settle the build in full, a monthly Care Plan takes over with round-the-clock checks on whether the site is up and fast, certificate tracking, software and content updates, and a monthly refresh of your Google reviews on the site. Prefer to have everything handled from the beginning instead? Our Full Service package bundles hosting, mailboxes, ongoing SEO work, and ongoing updates and maintenance into one monthly price.",
  },
  {
    question: "Do you work with businesses anywhere in South Africa?",
    answer:
      "Yes. We work with businesses right across South Africa. The whole process runs comfortably online, so where you’re based is never a barrier.",
  },
  // Copy deck: Google Ads & Meta Ads (Growth), §7.
  {
    question: "How much should I spend on ads?",
    answer:
      "It depends on your goals and margins, but we’ll always start with a budget you’re comfortable with and only recommend increases once the results justify it. You’re never locked into a number.",
  },
  {
    question: "Do I need a new website to start?",
    answer:
      "Not necessarily, but ads work far better when they point to a fast, well-structured site. If your foundation needs work first, we’ll tell you honestly.",
  },
  {
    question: "What’s the difference between Google Ads and Meta Ads?",
    answer:
      "Google captures people already searching for what you offer, high intent, ready to act. Meta (Facebook and Instagram) builds awareness and trust with the right people before they need you. Most businesses do best with a mix.",
  },
  {
    question: "Is there a long contract?",
    answer:
      "No. We work month to month with 30 days’ notice. We’d rather earn your business every month than trap you in it.",
  },
  {
    question: "Will I own my ad accounts?",
    answer:
      "Always. Your accounts, your data, your audiences, they belong to you, whatever happens down the line.",
  },
];

/* ------------------------------------------------------------------- v2 */

/**
 * Shared FAQ entries for the monthly plans and AI visibility (spec 15-faq.md v2
 * block). ONE source: Pricing, the AI visibility page and (later) Home, Industry
 * and /faq read these by `slug`, so an answer is only ever edited once. They are
 * deliberately NOT part of `faq` above, because /faq, Home and Services read that
 * list by position.
 *
 * Prices and counts come from content/pricing.ts and content/newBusinessOffer.ts
 * through formatRand; nothing here types a figure by hand.
 */
import { formatRand } from "@/components/gg/format";
import { newBusinessOffer } from "@/content/newBusinessOffer";
import { localPlans, localTerms } from "@/content/pricing";

export type SharedFaqSlug =
  | "monthly-or-custom"
  | "monthly-included"
  | "cancel-monthly"
  | "new-business-offer"
  | "ai-recommend"
  | "ai-guarantee"
  | "ai-report";

export type SharedFaqEntry = {
  slug: SharedFaqSlug;
  question: string;
  answer: string;
  /** The "See monthly plans →" style link the spec puts at the end of an answer. */
  link?: { label: string; href: string };
};

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six"];
const startPrice = `${formatRand(localPlans[0].monthly)}/mo`;

export const sharedFaq: SharedFaqEntry[] = [
  {
    slug: "monthly-or-custom",
    question: "Monthly plan or custom build: which should I choose?",
    answer:
      "If you mainly need to be found and look credible, a monthly plan gets you live in days with no upfront cost. If you need a unique design, custom features or a bigger site, a custom build is the better fit, and you can still pay it over 12 months.",
    link: { label: "See monthly plans →", href: "/pricing#monthly" },
  },
  {
    slug: "monthly-included",
    question: "What’s included in a monthly plan?",
    answer:
      "A website, hosting and a .co.za domain in your name, your Google Business Profile, and (on Local Plus and Pro) a monthly AI Visibility Report.",
    link: { label: "Compare plans →", href: "/pricing#monthly" },
  },
  {
    slug: "cancel-monthly",
    question: "Can I cancel a monthly plan?",
    answer: `Yes, at the end of any paid month, with no penalty. Your domain is always yours, and after six paid months the site files are yours too. Leaving earlier? You can buy the files for ${formatRand(localTerms.filesBuyout)} or simply keep the domain.`,
  },
  {
    slug: "new-business-offer",
    question: "How does the New Business Offer work?",
    answer: `For businesses going online for the first time: Local Start with your first month free and a business mailbox included for ${newBusinessOffer.terms.mailboxFreeMonths} months. Then ${startPrice}, cancel any month. ${NUMBER_WORDS[newBusinessOffer.spotsTotal] ?? newBusinessOffer.spotsTotal} businesses a month.`,
    link: { label: "Check availability →", href: "/website-launch#check-availability" },
  },
  {
    slug: "ai-recommend",
    question: "Does AI recommend my business?",
    answer:
      "Ask us. Our free check asks ChatGPT, Gemini and Google’s AI what your customers ask, several times each, and shows how often you’re named and who’s named instead.",
    link: { label: "Book a free check →", href: "/services/ai-visibility#book" },
  },
  {
    slug: "ai-guarantee",
    question: "Can you guarantee AI will recommend me?",
    answer: "No, and be wary of anyone who does. We improve the signals AI engines read and show you, honestly, whether it’s working.",
  },
  {
    // Wording from the pricing mockup (mockups/pricing.html); the spec's FAQ block names the question but not the answer.
    slug: "ai-report",
    question: "What is the AI Visibility Report?",
    answer:
      "Each month we ask ChatGPT, Gemini and Google’s AI the questions your customers ask, several times each, and show how often you’re named and who’s named instead.",
    link: { label: "See how it works →", href: "/services/ai-visibility#how" },
  },
];

export const sharedFaqBySlug = (slug: SharedFaqSlug) => sharedFaq.find((entry) => entry.slug === slug)!;
