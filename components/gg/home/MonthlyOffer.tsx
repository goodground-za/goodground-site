import { newBusinessOffer } from "@/content/newBusinessOffer";
import { localFromMonthly } from "@/content/pricing";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { formatRand } from "../format";
import { AiCheckStrip } from "./AiCheckStrip";
import { OfferStrip, type OfferState } from "./OfferStrip";
import { PlanRows } from "./PlanRows";

const PREVIEW_HREF = "/start-project?plan=local-plus&ref=home";

/**
 * Home 03 (v2): "Get found online from R299 a month." Left: HEADER REVEAL of
 * tag, heading, copy and the Light button with a text link. Right: the pricing
 * card (FADE-UP + scale from 150ms in) with the three plan rows (prices are a
 * LINE MASK, never a count-up), the New Business Offer strip with the
 * availability meter, and under the card a blush AI-check strip. Every figure
 * is read from content/pricing.ts and content/newBusinessOffer.ts.
 *
 * Home stays static: the offer strip is rendered with the typed spaces-left
 * value and swaps in the live count from /api/offer-spots after load (see
 * OfferStrip.tsx), so there is no layout shift.
 */
export function MonthlyOffer() {
  const { month, nextMonth, spotsTotal: total, spotsTaken: taken } = newBusinessOffer;
  const initial: OfferState = { total, taken, left: Math.max(0, total - taken), soldOut: taken >= total, month, nextMonth };
  const from = formatRand(localFromMonthly);

  return (
    <section id="pay-offer" className="hm-section hm-section--plum hm-launch" aria-labelledby="launch-title" data-loop="">
      <div className="hm-launch__glow" aria-hidden="true" />
      <div className="gg-wrap hm-launch__grid">
        <div className="hm-launch__copy" data-reveal="header">
          <Tag tone="coral" data-part="tag">
            MONTHLY PLANS
          </Tag>
          <SplitHeading id="launch-title" className="gg-h2 hm-h2 hm-launch__title" text={`Get found online from ${from} a month.`} />
          <p className="gg-lead hm-launch__sub" data-part="sub">
            A website, your Google profile and an honest AI visibility report, looked after every month. No deposit, cancel any month.
          </p>
          <div className="hm-launch__buttons" data-part="cta">
            <ButtonLink href={PREVIEW_HREF} variant="light">
              Get my free preview
            </ButtonLink>
            <a className="gg-text-link hm-launch__link" href="/pricing#monthly">
              See monthly plans
            </a>
          </div>
        </div>

        <div className="hm-launch__side">
          <div className="hm-launch__card" data-reveal="fade-up" data-delay={150}>
            <div className="hm-launch__card-head">
              <p className="hm-launch__plan">Monthly plans</p>
              <Tag tone="coral">NO DEPOSIT</Tag>
            </div>
            <PlanRows />
            <OfferStrip initial={initial} />
          </div>

          <AiCheckStrip />
        </div>

        <div className="hm-launch__mobile-cta">
          <ButtonLink href={PREVIEW_HREF} variant="light" full>
            Get my free preview
          </ButtonLink>
          <a className="gg-text-link hm-launch__link" href="/pricing#monthly">
            See monthly plans
            <Icon name="arrow-up-right" size={16} stroke={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}
