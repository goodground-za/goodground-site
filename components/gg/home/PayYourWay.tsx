import type { CSSProperties } from "react";

import { testimonials } from "@/content/testimonials";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";

const review = testimonials[0];

/**
 * Home 07. HEADER REVEAL, then the two option cards 120ms apart. Option 1's
 * deposit block wipes in, then "On completion" draws its border; option 2's
 * twelve bars grow with the first in coral. The bars are decorative: the legend
 * carries the meaning. Instalment tooltips are CSS, desktop hover only.
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
          heading={"One fixed price.\nTwo ways to pay."}
          headingClass="gg-h2 hm-h2"
          sub={
            <Resp
              long="We agree one fixed price up front. No hourly billing and no scope surprises. Then you choose how to pay it."
              short="No hourly billing and no scope surprises. Agree the price, then choose how to pay it."
            />
          }
          cta={<ButtonLink href="/start-project?intent=quote">Get a fixed quote</ButtonLink>}
          ctaClassName="hm-hide-phone"
        />

        <div className="hm-pay" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
          <article className="hm-option hm-option--split">
            <div className="hm-option__head">
              <span className="gg-kicker hm-option__label">
                <Resp long="Option 1" short="OPTION 1" />
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
                <Resp long="Option 2" short="OPTION 2" />
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
              <span className="gg-resp-long">— </span>
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
        </div>
      </div>
    </section>
  );
}
