import Link from "next/link";
import { launchOffer, launchRoute } from "@/content/websiteLaunch";

const ARROW = "↗︎";

/**
 * The Website Launch promotion, announced on the homepage.
 *
 * It sits directly under the hero because a promotion is meant to interrupt,
 * and it is the orange band so it reads as an offer rather than as another
 * section of the studio's story. The page's other orange moment (Reasons) is
 * five sections further down, so the two never share a screen.
 *
 * Every value comes from content/websiteLaunch.ts, the same source the landing
 * page and the enquiry route read. The price, the eligibility rule, the monthly
 * capacity and the included-fees period cannot drift between here and
 * /website-launch, because there is only one copy of each.
 *
 * Two things this deliberately does NOT do:
 *
 *  - It does not say "check availability". That is the landing page's CTA and
 *    it goes to the enquiry form. This link goes to the offer, so it says so.
 *  - It does not imply two spaces are free today. "Two promotional spaces each
 *    month" is monthly capacity, and it is rendered as the flat statement it is,
 *    with no counter and no countdown.
 *
 * Text on the orange is ink. White on this orange measures 3.86:1 and AGENTS.md
 * rules it out for text entirely.
 */
export function LaunchPromo() {
  return (
    <section
      className="launch-promo section-purple section-pad"
      aria-labelledby="launch-promo-title"
    >
      <div className="wrap">
        <div className="section-meta">
          <span className="eyebrow">{launchOffer.name}</span>
          <span className="eyebrow">{launchOffer.capacityLine}</span>
        </div>

        <div className="section-heading-row">
          <h2 className="display-heading reveal" id="launch-promo-title">
            {/* The accent points at the price, which is what the offer turns on.
                Orange on ink is 4.90:1. The rendered text is unchanged:
                "Launch your first website for R845 per month." */}
            Launch your first website for{" "}
            <span className="accent-text">{launchOffer.price}</span> {launchOffer.pricePeriod}
            <span className="accent-text">.</span>
          </h2>

          <div className="section-description reveal">
            <p className="launch-promo__flag">{launchOffer.eligibility}</p>
            <p>{launchOffer.includedFees}</p>
          </div>
        </div>

        <div className="launch-promo__foot reveal">
          <p className="launch-promo__detail">
            A custom one-page website, domain registration, business email, detailed SEO setup
            and submission to Google for indexing.
          </p>
          <Link className="button button-white" href={launchRoute.path}>
            <span>See the offer</span>
            <span className="button-arrow" aria-hidden="true">
              {ARROW}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
