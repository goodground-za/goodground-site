import type { CSSProperties } from "react";

import { launchOffer, launchRoute, launchSpots } from "@/content/websiteLaunch";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";

/**
 * What the card promises. "Up to five custom pages" is the live offer
 * (content/websiteLaunch.ts pageCount); the Figma sample says "one-page", which
 * would misstate it, so it is flagged in the tracker rather than copied.
 */
const CHECKS = [
  { long: "Up to five custom website pages", short: "Up to five custom pages" },
  { long: "Domain registration & business email", short: "Domain & business email" },
  { long: "Hosting included for 12 months", short: "Hosting for 12 months" },
  { long: "Detailed SEO setup" },
  { long: "Submitted to Google for indexing" },
];

/**
 * Home 03. Left: HEADER REVEAL of tag, heading, copy and buttons. Right: the
 * pricing card (FADE-UP + scale from 150ms in), "R845" as a LINE MASK (never a
 * count-up), check chips that pop, and the availability meter, which is data
 * (content/websiteLaunch.ts launchSpots) and has a sold-out state.
 */
export function LaunchOffer() {
  const { month, nextMonth, total, taken } = launchSpots;
  const left = Math.max(0, total - taken);
  const soldOut = left === 0;
  const startHref = soldOut ? "/start-project?plan=launch-waitlist" : "/start-project?plan=launch";

  return (
    <section id="pay-offer" className="hm-section hm-section--plum hm-launch" aria-labelledby="launch-title" data-loop="">
      <div className="hm-launch__glow" aria-hidden="true" />
      <div className="gg-wrap hm-launch__grid">
        <div className="hm-launch__copy" data-reveal="header">
          <Tag tone="on-dark" data-part="tag">
            {soldOut ? <>NEXT OPENING · {nextMonth.toUpperCase()}</> : <Resp long="THE GOODGROUND LAUNCH OFFER" short="LAUNCH OFFER" />}
          </Tag>
          <SplitHeading
            id="launch-title"
            className="gg-h2 hm-h2 hm-launch__title"
            text={`Launch your first website for ${launchOffer.price} a month.`}
          />
          <p className="gg-lead hm-launch__sub" data-part="sub">
            <Resp
              long={`${launchOffer.eligibility} We open two promotional spaces each month, and domain, hosting and email are included for the first 12 months.`}
              short="For new businesses without a website. Two promotional spaces each month, with domain, hosting and email included for 12 months."
            />
          </p>
          <div className="hm-launch__buttons" data-part="cta">
            <ButtonLink href={launchRoute.path} variant="coral">
              See the offer
            </ButtonLink>
            <ButtonLink href="#pay" variant="light">
              How it works
            </ButtonLink>
          </div>
        </div>

        <div className="hm-launch__card" data-reveal="fade-up" data-delay={150}>
          <div className="hm-launch__card-head">
            <p className="hm-launch__plan">Launch plan</p>
            <Tag tone="coral">NEW BUSINESSES</Tag>
          </div>
          <div className="hm-launch__price" data-reveal="line-mask">
            <SplitHeading as="p" className="gg-number hm-launch__amount" text={launchOffer.price} />
            <span className="hm-launch__period">/ month · 12 months</span>
          </div>
          <hr className="hm-launch__rule" />
          <ul className="hm-checks">
            {CHECKS.map((check, i) => (
              <li key={check.long} style={{ "--gg-i": i } as CSSProperties}>
                <span className="hm-checks__chip" aria-hidden="true">
                  <Icon name="check" size={13} stroke={2.6} />
                </span>
                <span className="hm-checks__text">
                  <Resp long={check.long} short={check.short} />
                </span>
              </li>
            ))}
          </ul>
          <div className="hm-meter" data-reveal="fill">
            <div className="hm-meter__row">
              <span>{month} availability</span>
              <strong className={soldOut ? "hm-meter__left is-sold-out" : "hm-meter__left"}>
                {soldOut ? `Fully booked for ${month}` : `${left} of ${total} spots left`}
              </strong>
            </div>
            <div
              className={soldOut ? "hm-meter__track is-sold-out" : "hm-meter__track"}
              role="img"
              aria-label={`${taken} of ${total} spots taken for ${month}`}
            >
              <span className="hm-meter__fill" style={{ "--fill": taken / total } as CSSProperties} />
            </div>
          </div>
          <ButtonLink href={startHref} variant="primary" full>
            {soldOut ? "Join the waitlist" : "Claim a launch spot"}
          </ButtonLink>
        </div>

        <div className="hm-launch__mobile-cta">
          <ButtonLink href={launchRoute.path} variant="coral" full>
            See the offer
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
