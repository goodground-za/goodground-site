/**
 * The New Business Offer: every confirmed fact in one place. It replaces the
 * retired fixed-term Website Launch Offer.
 *
 * THE OFFER: Local Start (see content/pricing.ts localPlans) with the first
 * month free, plus a business mailbox free for 12 months, for businesses going
 * online for the first time. Two businesses a month. Like every monthly plan it is a
 * 12-month plan, and (owner decision 2026-11-04) the one-month deposit that starts the
 * build is still paid up front: it is credited against month 2, the first paid month.
 *
 * `spotsTaken` is a typed fallback. When Upstash Redis is connected the live
 * count wins (lib/liveCounters.ts), so the owner can move it without a deploy.
 * Nothing here updates itself, so the month is a dated claim: change `month`,
 * `nextMonth` and `year` when the intake rolls over.
 *
 * The URL stays /website-launch because it is indexed.
 */

export const newBusinessOffer = {
  name: "New Business Offer",
  /** Slug of the localPlans entry the offer applies to. */
  planSlug: "local-start",
  path: "/website-launch",
  eligibility: "Exclusively for new businesses going online for the first time.",
  spotsTotal: 2,
  // Johandre 2026-11-04: November has both of its 2 spaces open, so none are taken.
  spotsTaken: 0,
  year: 2026,
  month: "November",
  nextMonth: "December",
  terms: {
    /** The first month of the plan costs nothing. */
    firstMonthFree: true,
    /** A business mailbox is free for this many months. */
    mailboxFreeMonths: 12,
  },
  /** One-line summary used by banners, tags and emails. */
  summary: "First month free, plus a business mailbox free for 12 months.",
  /** The deposit rule, in the owner's words. Used wherever the offer is explained. */
  depositLine: "Pay a one-month deposit to start. Your first month is free, and your deposit then covers your second month.",
  /** SEO title and description for /website-launch. */
  seo: {
    title: "First Website for New Businesses | First Month Free | GoodGround",
    description:
      "Going online for the first time? Your first month of Local Start is free, plus a business mailbox free for 12 months. A one-month deposit starts your build.",
  },
} as const;

export type NewBusinessOffer = typeof newBusinessOffer;
