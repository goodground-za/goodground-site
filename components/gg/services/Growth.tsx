import type { CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { CountUp } from "../CountUp";
import { Icon } from "../Icon";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { GROWTH_STEPS, REASONS } from "./data";

/** Weekly leads: [Meta on top, Google at the bottom] heights in px, as drawn. */
const WEEKS: [number, number, number][] = [
  [1, 36, 60],
  [2, 48, 72],
  [3, 48, 96],
  [4, 60, 84],
];

/**
 * Services 06 (dark): "A great website nobody visits is a shop with the lights
 * off." With the illustrative monthly report mock (always labelled, never
 * client data), seven reasons and the four-step "how growth works" panel.
 * The mock is decorative (aria-hidden). Phones get the three numbers only, a
 * checklist for the reasons, and no steps, as in the 390 frame.
 */
export function Growth() {
  return (
    <section id="growth" className="hm-section hm-section--ink sv-growth" aria-labelledby="sv-growth-title">
      <div className="gg-wrap hm-stack">
        <div className="sv-growth__top">
          <div className="sv-growth__copy" data-reveal="header">
            <Tag tone="on-dark" data-part="tag">
              GROWTH SERVICES
            </Tag>
            <SplitHeading id="sv-growth-title" className="gg-h2 hm-h2 sv-growth__title" text="A great website nobody visits is a shop with the lights off." />
            <p className="gg-lead sv-growth__sub" data-part="sub">
              <span className="gg-resp-long">
                SEO grows visibility over time, but it won’t fill next week’s diary. Your customers are already searching on Google when they’re ready to buy, and scrolling Instagram and Facebook when they’re deciding who to trust. Paid ads close that gap with real, measurable demand, pointed at the site you’ve already built.
              </span>
              <span className="gg-resp-short">
                Paid ads close the gap with real, measurable demand, pointed at the site you’ve built.
              </span>
            </p>
            <div className="sv-growth__buttons" data-part="cta">
              <ButtonLink href="/start-project?ref=services" variant="coral">
                Start your project
              </ButtonLink>
              <ButtonLink href="#growth-how" variant="light" className="hm-hide-phone">
                See how it works
              </ButtonLink>
            </div>
          </div>

          <div className="sv-report" data-reveal="fade-up" aria-hidden="true">
            <div className="sv-report__head">
              <strong>
                <span className="gg-resp-long">Your monthly report</span>
                <span className="gg-resp-short">Monthly report</span>
              </strong>
              <Tag>ILLUSTRATIVE</Tag>
            </div>
            <div className="sv-report__kpis" data-reveal="fill">
              <div>
                <span>Spend</span>
                <CountUp to={4000} prefix="R" />
                <small>Budget you set</small>
              </div>
              <div>
                <span>Leads</span>
                <CountUp to={32} />
                <small>Calls + forms</small>
              </div>
              <div>
                <span>
                  <span className="gg-resp-long">Cost per lead</span>
                  <span className="gg-resp-short">Per lead</span>
                </span>
                <CountUp to={125} prefix="R" />
                <small>Plain-language</small>
              </div>
            </div>
            <div className="sv-report__chart" data-reveal="fill">
              <p className="gg-kicker sv-report__label">LEADS BY WEEK</p>
              <div className="sv-report__bars">
                {WEEKS.map(([n, meta, google]) => (
                  <div key={n} className="sv-week">
                    <div className="sv-week__stack" style={{ "--n": n } as CSSProperties}>
                      <span className="sv-week__meta" style={{ height: meta }} data-tip={`Week ${n} · Meta ${meta / 12}`} />
                      <span className="sv-week__google" style={{ height: google }} data-tip={`Week ${n} · Google ${google / 12}`} />
                    </div>
                    <span>Week {n}</span>
                  </div>
                ))}
              </div>
              <p className="sv-report__legend">
                <i className="is-google" /> Google Ads <i className="is-meta" /> Meta Ads
              </p>
            </div>
            <p className="sv-report__note">
              Example layout only, not client data. Real reports show your spend, leads and cost per result in plain language.
            </p>
          </div>
        </div>

        <div className="sv-why" data-reveal="stagger" style={{ "--gg-stagger-step": "60ms" } as CSSProperties}>
          <h3 className="sv-why__title">Why it works for small businesses</h3>
          <ul className="sv-why__grid">
            {REASONS.map((reason) => (
              <li key={reason.title} className="sv-why__card">
                <span className="sv-why__icon" aria-hidden="true">
                  <Icon name={reason.icon} size={20} stroke={2} />
                </span>
                <span className="sv-why__check" aria-hidden="true">
                  <Icon name="check" size={16} stroke={2.4} />
                </span>
                <h4>{reason.title}</h4>
                <p>{reason.line}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="growth-how" className="sv-how hm-hide-phone" data-reveal="group">
          <div className="sv-how__head">
            <h3>Growth you can actually budget for</h3>
            <Tag tone="coral">NO LOCK-IN · 30 DAYS’ NOTICE</Tag>
          </div>
          <ol className="sv-steps">
            {GROWTH_STEPS.map((step, i) => (
              <li key={step.title} className="sv-step sv-fu" style={{ "--i": i } as CSSProperties}>
                <div className="sv-step__rail" aria-hidden="true">
                  <span className={i === 3 ? "sv-step__dot is-last" : "sv-step__dot"}>{i + 1}</span>
                  <span className="sv-step__line" />
                </div>
                <h4>{step.title}</h4>
                <p>{step.line}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="sv-growth__note">Clear monthly fee. Budget you control. Cancel with 30 days’ notice.</p>
        <div className="hm-phone-only">
          <ButtonLink href="/start-project?ref=services" variant="coral" full>
            Start your project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
