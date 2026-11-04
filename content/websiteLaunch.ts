/**
 * Copy for the /website-launch page and its enquiry route.
 *
 * THE OFFER ITSELF (spaces, month, terms, SEO) is in content/newBusinessOffer.ts
 * and the plan price in content/pricing.ts. The fixed-term Website Launch Offers
 * that came before it are RETIRED: no figure from
 * either lives in the repo any more.
 *
 * What is here is the page copy the /website-launch UI reads: the FAQ, the
 * form copy and the route metadata.
 *
 * Rules that still hold from the original promotion (confirmed 2026-09-13):
 *  - Exclusively for NEW businesses going online for the first time.
 *  - A social page or an already-registered domain does NOT disqualify an
 *    otherwise eligible new business. There is no business-age cutoff.
 *  - Redesigns and replacements are out of scope. So are ongoing SEO campaigns
 *    and extra features, which are quoted separately.
 *  - "Two spaces each month" describes monthly capacity; the live count comes
 *    from newBusinessOffer / lib/liveCounters.ts.
 */

import { newBusinessOffer } from "@/content/newBusinessOffer";

export const launchOffer = {
  name: newBusinessOffer.name,
  eligibility: newBusinessOffer.eligibility,
  capacityLine: "Two spaces each month.",
  /** Always "12 months". Never "a year's contract": the plans are month to month. */
  includedFees: "First month free, plus a business mailbox free for 12 months.",
} as const;

export const launchFaqs = {
  heading: "Your questions, answered.",
  items: [
    {
      question: "Who qualifies for this offer?",
      answer:
        "This offer is exclusively for new businesses going online for the first time. You can be preparing to launch or have recently started trading and need your first website. The offer does not cover website redesigns or replacements.",
    },
    {
      question: "I have a social media page. Can I still apply?",
      answer:
        "Yes. A social media page does not exclude you, provided your business is new and has no website. Your new website gives you a place to direct people who want more information or want to enquire.",
    },
    {
      question: "What if I’ve already registered a domain?",
      answer:
        "You can still enquire if your new business has no website. Share your domain details, and we’ll confirm how your existing domain can be used and what setup is required.",
    },
    {
      question: "What do I need to provide?",
      answer:
        "Your business name, contact details, service information and any logo, text or photographs you already have. We’ll explain what’s needed and agree on any additional content support before work starts.",
    },
    {
      question: "How long will my website take?",
      answer:
        "We build your free preview within 5 working days. You review it, ask for changes, and approve it to go live. We confirm the exact dates once we understand your content.",
    },
    {
      question: "Will my website appear on Google?",
      answer:
        "We prepare your website for search, submit your sitemap and request indexing. Google decides whether and when pages appear in search results. Indexing and specific rankings cannot be guaranteed.",
    },
    {
      question: "Does the package include ongoing SEO?",
      answer:
        "Local Start includes the Google Business Profile setup and a quarterly AI visibility snapshot. Ongoing SEO campaigns, new content and continued optimisation can be quoted separately.",
    },
    {
      question: "Is there a deposit?",
      answer:
        "No. You see a free preview first, and your first debit runs only when you approve the site to go live. The first month of Local Start is free.",
    },
    {
      question: "What happens after the free month?",
      answer:
        "You stay on Local Start, month to month, and you can cancel any month or upgrade any time. Your domain is always yours, and the site files are yours after 6 months. The business mailbox stays free for the full 12 months.",
    },
    {
      question: "Can I add more pages or extra features?",
      answer:
        "Yes. Additional pages, online payments, booking systems and other features are scoped and quoted separately. You approve any additional costs before that work begins.",
    },
  ],
} as const;

export const launchEnquiry = {
  /** The confirmation tick. The server checks the box was ticked (/api/enquiry, new-business-offer). */
  eligibilityLabel:
    "I confirm that this is a new business and the business does not have a website.",
  success: "We’ll review your business details and contact you about availability and next steps.",
  failure:
    "We couldn’t submit your enquiry. Please try again or contact us using the details below.",
} as const;

/** Route and search metadata, kept beside the offer they describe. */
export const launchRoute = {
  path: newBusinessOffer.path,
  title: newBusinessOffer.seo.title,
  description: newBusinessOffer.seo.description,
} as const;

/** Server-side limits, shared by the browser validation and the API route. */
export const launchFieldLimits = {
  name: 100,
  businessName: 120,
  email: 254,
  about: 1500,
  timeline: 120,
} as const;
