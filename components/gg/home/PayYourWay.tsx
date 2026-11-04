import type { CSSProperties } from "react";

import { localFromMonthly } from "@/content/pricing";
import { testimonials } from "@/content/testimonials";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { formatRand } from "../format";

const review = testimonials[0];

/**
 * Home 07 (v2): "Three ways to pay". HEADER REVEAL, then the three option cards
 * 120ms apart. Option 1 is the monthly plan: twelve equal dots, no deposit,
 * cancel any month. Option 2's deposit block wipes in, then "On completion"
 * draws its border; option 3's twelve bars grow with the first in coral. The
 * dots and bars are decorative: the legend carries the meaning. Instalment
 * tooltips are CSS, desktop hover only.
 */
export function PayYourWay() {
  return (
    <section id="pay" className="hm-section hm-section--surface" aria-labelledby="pay-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="pay-title"
          layout="split"
          tag="05 / CLEAR PRICING"
          tagTone="coral"
          heading="Three ways to pay."
          headingClass="gg-h2 hm-h2"
          sub={
            <Resp
              long="Start on a monthly plan with no deposit, or agree one fixed price for a custom build. No hourly billing and no scope surprises either way."
              short="A monthly plan with no deposit, or one fixed price for a custom build."
            />
          }
          cta={
            <div className="hm-pay__cta">
              <ButtonLink href="/start-project?intent=quote">Get a fixed quote</ButtonLink>
              <a className="gg-text-link hm-pay__link" href="/pricing#monthly">
                Compare monthly plans →
              </a>
            </div>
          }
          ctaClassName="hm-hide-phone"
        />

        <div className="hm-pay hm-pay--three" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
          <article className="hm-option hm-option--monthly">
            <div className="hm-option__head">
              <span className="gg-kicker hm-option__label">
                <Resp long="Option 1" short="OPTION 1" />
              </span>
              <Tag>NO DEPOSIT</Tag>
            </div>
            <div data-reveal="line-mask">
              <SplitHeading as="h3" className="hm-option__title" text={`From ${formatRand(localFromMonthly)}/mo`} />
            </div>
            <p className="hm-option__copy">
              <Resp
                long="Monthly plan: a website, your Google profile and an AI report. No deposit, and your first debit runs only once you’re live."
                short="Website, Google profile and AI report. No deposit; the first debit runs once you’re live."
              />
            </p>
            <div className="hm-months" data-reveal="fill" aria-hidden="true">
              <div className="hm-months__dots">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} className="hm-months__dot" style={{ "--gg-i": i } as CSSProperties} />
                ))}
              </div>
              <div className="hm-months__legend">
                <span>12 equal months</span>
                <span className="hm-months__cancel">cancel any month</span>
              </div>
            </div>
          </article>

          <article className="hm-option hm-option--split">
            <div className="hm-option__head">
              <span className="gg-kicker hm-option__label">
                <Resp long="Option 2" short="OPTION 2" />
              </span>
              <Tag>PAY ONCE</Tag>
            </div>
            <div data-reveal="line-mask">
              <SplitHeading as="h3" className="hm-option__title" text="50 / 50" />
            </div>
            <p className="hm-option__copy">
              <Resp
                long="A 50% deposit secures your project. The remaining 50% is paid on completion, before handover."
                short="50% deposit to start, 50% on completion before handover."
              />
            </p>
            <div className="hm-split" data-reveal="fill" aria-hidden="true">
              <div className="hm-split__deposit">
                <strong>50%</strong>
                <span>
                  <Resp long="Deposit · to start" short="To start" />
                </span>
              </div>
              <div className="hm-split__done">
                <strong>50%</strong>
                <span>On completion</span>
              </div>
            </div>
          </article>

          <article className="hm-option hm-option--plum">
            <div className="hm-option__head">
              <span className="gg-kicker hm-option__label">
                <Resp long="Option 3" short="OPTION 3" />
              </span>
              <Tag tone="coral">SPREAD THE COST</Tag>
            </div>
            <div data-reveal="line-mask">
              <SplitHeading as="h3" className="hm-option__title" text="12 × monthly" />
            </div>
            <p className="hm-option__copy">
              <Resp
                long="12 equal instalments. The first secures your booking; the remaining 11 only start once your project is complete, with support throughout."
                short="The first instalment secures your booking. The other 11 start once your project is complete."
              />
            </p>
            <div className="hm-instal" data-reveal="fill" aria-hidden="true">
              <div className="hm-instal__bars">
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    className={i === 0 ? "hm-instal__bar hm-instal__bar--first" : "hm-instal__bar"}
                    style={{ "--gg-i": i } as CSSProperties}
                    data-tip={i === 0 ? "Instalment 1 · secures your booking" : `Instalment ${i + 1} · after completion`}
                  />
                ))}
              </div>
              <div className="hm-instal__legend">
                <span className="hm-instal__first">
                  <Resp long="1st · secures your booking" short="1st · books your slot" />
                </span>
                <span>
                  <Resp long="2–12 · after completion" short="2–12 · after launch" />
                </span>
              </div>
            </div>
          </article>
        </div>

        <figure className="hm-quote" data-reveal="group">
          <span className="hm-quote__icon hm-fu" style={{ "--gg-i": 0 } as CSSProperties}>
            <Icon name="heart" size={18} stroke={2} />
          </span>
          <div className="hm-quote__body hm-fu" style={{ "--gg-i": 1 } as CSSProperties}>
            <blockquote>
              <p>“{review.pullQuote}”</p>
            </blockquote>
            <figcaption>
              <span className="gg-resp-long" aria-hidden="true">
                ·{" "}
              </span>
              {review.author},{" "}
              <a className="gg-text-link" href={review.sourceUrl} target="_blank" rel="noopener noreferrer">
                Google review<span className="gg-sr-only"> (opens in new tab)</span>
              </a>
            </figcaption>
          </div>
        </figure>

        <div className="hm-phone-only">
          <ButtonLink href="/start-project?intent=quote" full>
            Get a fixed quote
          </ButtonLink>
          <a className="gg-text-link hm-pay__link" href="/pricing#monthly">
            Compare monthly plans →
          </a>
        </div>
      </div>
    </section>
  );
}
