import Link from "next/link";

const ARROW = "↗︎";

/**
 * The site's closing call to action.
 *
 * This is the homepage's own `.contact` block, not a lookalike — same markup,
 * same stylesheet, same drifting poster behind it. Before 2026-09-11 it was a
 * separate orange card with a hard offset shadow, which is the one thing a
 * visitor saw on an inner page that existed nowhere on the homepage.
 *
 * Full-bleed on purpose: it is the last thing before the footer on every page
 * that uses it, so it has no outer padding of its own and the page's final
 * content section ends immediately above it.
 */
export function CTABand({
  eyebrow = "Get in touch",
  lines = ["Growth", "starts here."],
}: {
  eyebrow?: string;
  /** Two lines. Kept as separate strings so the break is deliberate, not a wrap. */
  lines?: [string, string];
} = {}) {
  return (
    <div className="home-2026">
      <section className="contact" id="contact" aria-labelledby="cta-band-title">
        <div className="contact-media" aria-hidden="true" />
        <div className="wrap contact-content">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="cta-band-title" className="reveal">
            {lines[0]}
            <br />
            {lines[1]}
          </h2>
          <Link className="button button-white" href="/start-project">
            <span>Start your project</span>
            <span className="button-arrow" aria-hidden="true">
              {ARROW}
            </span>
          </Link>
          <a className="contact-email" href="mailto:hello@goodground.co.za">
            hello@goodground.co.za <span aria-hidden="true">{ARROW}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
