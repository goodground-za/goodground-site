/**
 * Real reviews, quoted verbatim. The single source for every place a review
 * appears, so no page can drift from what the person actually wrote.
 *
 * RULES, and they are not negotiable:
 *
 * 1. Nothing in here is written by us. `full` is the review exactly as the
 *    reviewer published it, punctuation and all. If it needs shortening for a
 *    layout, shorten it HERE, visibly, and keep `full` intact so the edit can
 *    always be checked against the original.
 * 2. Every entry carries `sourceUrl` pointing at the public listing, and every
 *    place a review is shown links to it. The proof is that a visitor can go
 *    and read it themselves.
 * 3. NO Review or AggregateRating structured data, anywhere. Google forbids a
 *    business marking up reviews about itself on its own site — including via
 *    embedded Google review widgets — and doing it makes the page ineligible
 *    for star results and breaks their guidelines. Display it, link it, do not
 *    mark it up.
 *    https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */

export type Testimonial = {
  /** The reviewer as they appear on the listing. */
  author: string;
  /** Where they are from, if it adds anything. */
  role?: string;
  /** Verbatim, complete, unedited. */
  full: string;
  /** The single sentence that carries the most weight, taken from `full`. */
  pullQuote: string;
  /** A trimmed version for tighter layouts. Sentences from `full`, in order. */
  excerpt: string[];
  source: "Google";
  sourceUrl: string;
  /** ISO date the review was left. */
  date: string;
};

/** The Google listing itself, for "read the reviews" links. */
export const googleReviewsUrl =
  "https://www.google.com/maps/place/GoodGround/@-34.6283864,27.2516951,5z/data=!3m1!4b1!4m6!3m5!1s0x1dcc511ad8ef23b1:0x8f4f0f7c68672d23!8m2!3d-34.6283864!4d27.2516952!16s%2Fg%2F11zdry8cp_";

export const testimonials: Testimonial[] = [
  {
    author: "Roam Local",
    date: "2026-09-17",
    source: "Google",
    sourceUrl: googleReviewsUrl,
    /**
     * The payment-plan sentence leads, because it is the one thing in the
     * review that no competitor's testimonial will say. It is also the exact
     * objection the pricing page exists to answer, from someone who took it.
     */
    pullQuote:
      "One of the biggest benefits for us was the option to pay the project off over 12 months, while still receiving ongoing support throughout that period.",
    excerpt: [
      "We partnered with GoodGround from the very early stages of Roam Local, helping us turn our initial idea into a clear plan and ultimately a fully developed website.",
      "Communication was excellent, everything was clearly explained, and we always knew where the project stood.",
      "One of the biggest benefits for us was the option to pay the project off over 12 months, while still receiving ongoing support throughout that period. For a growing business, this made a big project far more manageable without compromising on the quality of the end result.",
    ],
    full: `We partnered with GoodGround from the very early stages of Roam Local, helping us turn our initial idea into a clear plan and ultimately a fully developed website.

The team assisted us with the initial website planning, system integrations and the complete website development process. Working with them has been a great experience from start to finish. Communication was excellent, everything was clearly explained, and we always knew where the project stood.

One of the biggest benefits for us was the option to pay the project off over 12 months, while still receiving ongoing support throughout that period. For a growing business, this made a big project far more manageable without compromising on the quality of the end result.

Well done to the GoodGround team. We're incredibly happy with the experience and would highly recommend them to any business looking for a reliable web development partner.`,
  },
];
