import type { CSSProperties } from "react";

import { testimonials } from "@/content/testimonials";

/**
 * Pricing 06. A real review (content/testimonials.ts, verbatim, linked to its
 * Google listing). The card FADES UP; the stars fill in sequence (60ms) and
 * the "12 × monthly" bars grow (30ms stagger). No review structured data, by
 * the rule in testimonials.ts.
 */
function Star() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ReviewCard() {
  const review = testimonials[0];
  if (!review) return null;
  const supporting = review.excerpt.slice(0, 2).join(" ");

  return (
    <figure className="pr-review" data-reveal="group">
      <div className="pr-review__main">
        <div className="pr-review__stars" role="img" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="pr-review__star" style={{ "--i": i } as CSSProperties}>
              <Star />
            </span>
          ))}
        </div>
        <blockquote cite={review.sourceUrl}>
          <p className="pr-review__quote">“{review.pullQuote}”</p>
        </blockquote>
        <p className="pr-review__body">{supporting}</p>
        <figcaption className="pr-review__by">
          <span className="pr-review__name">{review.author}</span>
          <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="pr-review__link">
            Read the full review on Google →<span className="gg-sr-only"> (opens in new tab)</span>
          </a>
        </figcaption>
      </div>
      <div className="pr-review__plan">
        <p className="gg-kicker pr-review__plan-label">HOW THEY PAID</p>
        <p className="pr-review__plan-title">12 × monthly</p>
        <div className="pr-review__bars" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={i === 0 ? "is-first" : undefined} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <p className="pr-review__plan-note">With ongoing support throughout.</p>
      </div>
    </figure>
  );
}
