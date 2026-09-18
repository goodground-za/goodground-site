import { testimonials } from "@/content/testimonials";

/**
 * Section 09 — the first piece of proof on this site that we did not write
 * ourselves.
 *
 * Sits last, immediately before the contact section, so it is the final thing
 * read before the enquiry form. Everything above it is the studio talking
 * about the studio; this is a customer, checkable on Google by anyone who
 * doubts it, which is why the link matters as much as the quote.
 *
 * Deliberately no star markup and no embedded Google widget: a business may
 * not put review structured data about itself on its own site. See the note in
 * content/testimonials.ts.
 */
export function Testimonial() {
  const review = testimonials[0];
  if (!review) return null;

  return (
    <section className="testimonial section-dark section-pad" aria-labelledby="testimonial-title">
      <div className="wrap">
        <div className="section-meta">
          <span className="eyebrow">09 / In their words</span>
          <img className="small-brand-mark" src="/home2026/goodground-mark.svg" width="48" height="48" alt="" />
        </div>

        <div className="section-heading-row">
          <h2 className="section-title reveal" id="testimonial-title">
            What it&rsquo;s like
            <br />
            to work with us.
          </h2>
          <p className="section-description reveal">
            Not our words. A client&rsquo;s, published on Google where anyone can read it.
          </p>
        </div>

        <figure className="testimonial-quote reveal">
          <blockquote cite={review.sourceUrl}>
            <p>&ldquo;{review.pullQuote}&rdquo;</p>
          </blockquote>
          <figcaption>
            <span className="testimonial-author">{review.author}</span>
            <a
              className="testimonial-source"
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the full review on Google
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
