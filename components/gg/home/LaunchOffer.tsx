import type { CSSProperties } from "react";

import { newBusinessOffer } from "@/content/newBusinessOffer";
import { localPlans } from "@/content/pricing";
import { launchOffer } from "@/content/websiteLaunch";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { formatRand } from "../format";

/** What the card promises: Local Start inclusions plus the offer (content/pricing.ts, content/newBusinessOffer.ts). */
const CHECKS = [
  { long: "A website up to 5 pages", short: "Website up to 5 pages" },
  { long: "Domain, hosting and Google profile", short: "Domain, hosting, Google profile" },
  { long: "First month free", short: "First month free" },
  { long: "Business mailbox free for 12 months", short: "Mailbox free for 12 months" },
];

/**
 * Home 03. Left: HEADER REVEAL of tag, heading, copy and buttons. Right: the
 * pricing card (FADE-UP + scale from 150ms in), "R0" as a LINE MASK (never a
 * count-up), check chips that pop, and the availability meter, which is data
 * (content/newBusinessOffer.ts) and has a sold-out state.
 */
export function LaunchOffer() {
  // INTERIM (Phase A): typed values, so Home stays static. Phase C decides how the live count reaches Home.
  const { month, nextMonth, spotsTotal: total, spotsTaken: taken } = newBusinessOffer;
  const monthly = formatRand(localPlans[0].monthly);
  const left = Math.max(0, total - taken);
  const soldOut = left === 0;
  const startHref = soldOut ? "/start-project?offer=new-business-waitlist&ref=home" : "/start-project?offer=new-business&ref=home";

  return (
    <section id="pay-offer" className="hm-section hm-section--plum hm-launch" aria-labelledby="launch-title" data-loop="">
      <div className="hm-launch__glow" aria-hidden="true" />
      <div className="gg-wrap hm-launch__grid">
        <div className="hm-launch__copy" data-reveal="header">
          <Tag tone="on-dark" data-part="tag">
            {soldOut ? <>NEXT OPENING · {nextMonth.toUpperCase()}</> : <Resp long="NEW BUSINESS OFFER" short="NEW BUSINESS OFFER" />}
          </Tag>
          <SplitHeading
            id="launch-title"
            className="gg-h2 hm-h2 hm-launch__title"
            text="Your first website. First month free."
          />
          <p className="gg-lead hm-launch__sub" data-part="sub">
            <Resp
              long={`${launchOffer.eligibility} Local Start is ${monthly} a month after that, month to month. We open two spaces each month.`}
              short={`For new businesses. Then Local Start at ${monthly} a month, month to month. Two spaces each month.`}
            />
          </p>
          <div className="hm-launch__buttons" data-part="cta">
            <ButtonLink href={newBusinessOffer.path} variant="coral">
              See the offer
            </ButtonLink>
            <ButtonLink href="#pay" variant="light">
              How it works
            </ButtonLink>
          </div>
        </div>

        <div className="hm-launch__card" data-reveal="fade-up" data-delay={150}>
          <div className="hm-launch__card-head">
            <p className="hm-launch__plan">Local Start</p>
            <Tag tone="coral">NEW BUSINESSES</Tag>
          </div>
          <div className="hm-launch__price" data-reveal="line-mask">
            <SplitHeading as="p" className="gg-number hm-launch__amount" text="R0" />
            <span className="hm-launch__period">first month · then {monthly}/mo</span>
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
                {soldOut ? `Fully booked for ${month}` : `${left} of ${total} spaces left`}
              </strong>
            </div>
            <div
              className={soldOut ? "hm-meter__track is-sold-out" : "hm-meter__track"}
              role="img"
              aria-label={`${taken} of ${total} spaces taken for ${month}`}
            >
              <span className="hm-meter__fill" style={{ "--fill": taken / total } as CSSProperties} />
            </div>
          </div>
          <ButtonLink href={startHref} variant="primary" full>
            {soldOut ? "Join the waitlist" : "Check availability"}
          </ButtonLink>
        </div>

        <div className="hm-launch__mobile-cta">
          <ButtonLink href={newBusinessOffer.path} variant="coral" full>
            See the offer
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
