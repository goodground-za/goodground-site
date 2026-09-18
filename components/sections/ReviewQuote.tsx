import { testimonials } from "@/content/testimonials";

/**
 * A real review, in the site's own design language rather than the homepage's.
 *
 * Leads with the payment-plan sentence rather than the opening of the review,
 * because of where this sits: someone on the pricing page is weighing a
 * five-figure decision, and that sentence is a customer answering the exact
 * hesitation this page creates. The context sentences follow underneath so the
 * quote is not stripped of its meaning.
 *
 * No review structured data, deliberately. See content/testimonials.ts.
 */
export function ReviewQuote() {
  const review = testimonials[0];
  if (!review) return null;

  // The opening and the communication line. The payment sentence is the
  // headline above, so it is not repeated here.
  const supporting = review.excerpt.slice(0, 2);

  return (
    <section className="bg-ht-cream px-gutter pb-16 md:pb-24" aria-labelledby="review-title">
      <div className="mx-auto max-w-[1434px]">
        <div className="rounded-block ring-ht-purple/12 bg-white p-7 ring-1 sm:p-10 md:p-14">
          <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
            From a client
          </p>

          <h2 id="review-title" className="sr-only">
            A review from {review.author}
          </h2>

          {/* Two columns from md, matching the "These are starting prices"
              note on this same page, so the two cards read as siblings. */}
          <figure className="mt-6 md:flex md:items-start md:gap-12">
            <blockquote cite={review.sourceUrl} className="md:w-[46%] md:shrink-0">
              <p className="font-ht-display text-ht-purple text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.2] font-bold">
                &ldquo;{review.pullQuote}&rdquo;
              </p>
            </blockquote>

            <div className="md:flex-1">
              <div className="mt-6 space-y-4 md:mt-0">
                {supporting.map((paragraph) => (
                  <p key={paragraph} className="text-ht-purple/75 max-w-[62ch] text-[16px] leading-[1.65]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <figcaption className="border-ht-purple/10 mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t pt-6">
                <span className="font-ht-display text-ht-purple text-[15px] font-bold">
                  {review.author}
                </span>
                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ht-purple/70 hover:text-ht-purple text-[14px] underline underline-offset-4 transition-colors"
                >
                  Read the full review on Google
                </a>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
