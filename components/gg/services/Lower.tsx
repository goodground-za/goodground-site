import type { CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { ArrowChip, LinkedCard } from "../LinkedCard";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { INDUSTRY_LIST } from "../shared/industries";
import { NotOnList } from "../shared/NotOnList";
import { Tag } from "../Tag";
import { WHY_GROW } from "./data";

/** Services 07: three cards, the last one plum, landing last with a small scale. Not links. */
export function WhyGrow() {
  return (
    <section className="hm-section hm-section--canvas hm-hide-phone" aria-labelledby="sv-why-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="sv-why-title"
          layout="split"
          tag="ONE TEAM, ONE CONNECTED PROCESS"
          heading="Why grow with GoodGround."
          headingClass="gg-h2 hm-h2"
          sub="The team that built your foundation is the team that brings people to it. Nothing gets handed to a third party halfway through."
          subClassName="hm-hide-phone"
        />
        <div className="sv-whygrow" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
          {WHY_GROW.map((card, i) => (
            <article key={card.title} className={i === 2 ? "sv-wg sv-wg--plum" : "sv-wg"}>
              <div className="sv-wg__top">
                <span className="sv-wg__icon" aria-hidden="true">
                  <Icon name={card.icon} size={24} stroke={2} />
                </span>
                <span className="sv-wg__n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Services 08: industries on a white section (cards fill canvas), then the dashed "Not on the list?" card. */
export function ServicesIndustries() {
  return (
    <section className="hm-section hm-section--surface" aria-labelledby="sv-ind-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader id="sv-ind-title" tag="WHO WE BUILD FOR" heading="Industries we build for." headingClass="gg-h2 hm-h2" />
        <div className="sv-ind" data-reveal="stagger" style={{ "--gg-stagger-step": "60ms" } as CSSProperties}>
          {INDUSTRY_LIST.map((industry) => (
            <LinkedCard key={industry.slug} href={`/services/${industry.slug}`} className="sv-ind__card">
              <span className="sv-ind__top">
                <span className="sv-ind__icon" aria-hidden="true">
                  <Icon name={industry.icon} size={22} stroke={2} />
                </span>
                <ArrowChip size={34} className="sv-ind__chip" />
                <Icon name="chev" size={18} stroke={2.2} className="sv-ind__chev" />
              </span>
              <span className="sv-ind__title">{industry.title}</span>
              <span className="sv-ind__desc">{industry.description}</span>
            </LinkedCard>
          ))}
        </div>
        <NotOnList onWhite />
      </div>
    </section>
  );
}

/** Services 09: the plum payment band and the blog link card. */
export function PaymentBand() {
  return (
    <section className="hm-section hm-section--canvas sv-payband-section" aria-labelledby="sv-payband-title">
      <div className="gg-wrap hm-stack">
        <div className="sv-payband" data-reveal="fade-up">
          <div className="sv-payband__copy">
            <Tag tone="on-dark">
              <span className="gg-resp-long">HOWEVER YOU BUILD WITH US</span>
              <span className="gg-resp-short">HOW YOU PAY</span>
            </Tag>
            <h2 id="sv-payband-title" className="sv-payband__title">
              You choose how you pay.
            </h2>
            <p>
              <span className="gg-resp-long">
                Every website project is quoted as one fixed price. Pay 50% upfront and the rest on completion, or split it into 12 monthly instalments. No surprise final invoice, either way.
              </span>
              <span className="gg-resp-short">One fixed price: 50% upfront and 50% on completion, or 12 monthly instalments.</span>
            </p>
            <ButtonLink href="/pricing" variant="coral" className="sv-payband__btn">
              See pricing
            </ButtonLink>
          </div>
          <div className="sv-payband__tiles" data-reveal="line-mask">
            <div className="sv-tile">
              <SplitHeading as="p" className="sv-tile__big" text="50 / 50" />
              <span>Deposit, then on completion</span>
            </div>
            <div className="sv-tile">
              <SplitHeading as="p" className="sv-tile__big" text="12 ×" />
              <span>Monthly instalments</span>
            </div>
          </div>
        </div>
        <LinkedCard href="/insights/why-small-businesses-in-south-africa-need-a-website" className="sv-blog">
          <span>Not sure a website is the right spend right now? Read why it matters for South African businesses.</span>
          <ArrowChip size={36} />
        </LinkedCard>
      </div>
    </section>
  );
}
