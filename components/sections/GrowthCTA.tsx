import Link from "next/link";

const ARROW = "↗︎";

/**
 * Ads copy deck §8 (closing call to action) for the Growth block. The page's
 * own CTABand still closes the page as a whole, further down.
 *
 * Ink on orange, not white on orange: white measured 3.86:1 on the heading and
 * 3.37:1 on the body here, and AGENTS.md rules white text off this orange
 * entirely. The homepage's own orange section (`Reasons`) is ink throughout,
 * so this is the same treatment rather than a compromise.
 */
export function GrowthCTA() {
  return (
    <div className="home-2026">
      <section className="section-orange section-pad growth-cta" aria-labelledby="growth-cta-title">
        <div className="wrap">
          <p className="eyebrow">Growth starts here</p>
          <h2 className="display-heading reveal" id="growth-cta-title">
            Ready to bring people to the ground you’ve built?
          </h2>
          <p className="growth-cta__lede reveal">
            Let’s turn your website into a source of steady, measurable growth, with a plan that
            makes it easy to start.
          </p>
          <div className="growth-cta__actions">
            <Link className="button button-white" href="/start-project">
              <span>Start your project</span>
              <span className="button-arrow" aria-hidden="true">
                {ARROW}
              </span>
            </Link>
            <Link className="text-link" href="/contact">
              Book a free consultation <span aria-hidden="true">{ARROW}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
