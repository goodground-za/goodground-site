import type { CSSProperties } from "react";

import { trustBar } from "@/content/trustBar";

import { CountUp } from "../CountUp";
import { Icon } from "../Icon";

/**
 * Home 01. The "5.0 on Google" group is one link to the reviews (new tab); the
 * stats are not interactive. Stars fill one by one, dividers draw after the
 * card lands, and the four numbers count up 100ms apart (gg.css, home.css).
 */
export function TrustBar() {
  const { rating, stats } = trustBar;

  return (
    <section id="trust" className="hm-section hm-section--canvas hm-trust-section" aria-label="Trust">
      <div className="gg-wrap">
        <div className="hm-trust" data-reveal="fade-up">
          <a className="hm-trust__rating" href={rating.href} target="_blank" rel="noopener noreferrer">
            <span className="hm-trust__stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="hm-trust__star" style={{ "--gg-i": i } as CSSProperties}>
                  <Icon name="star" size={18} stroke={1.5} />
                </span>
              ))}
            </span>
            <span className="hm-trust__score">
              <strong className="hm-trust__headline gg-text-link">
                {rating.score} {rating.label}
              </strong>
              <span className="hm-trust__caption">{rating.caption}</span>
              <span className="gg-sr-only"> (opens in new tab)</span>
            </span>
          </a>
          <span className="hm-trust__rule hm-trust__rule--lead" aria-hidden="true" />
          <div className="hm-trust__stats">
            {stats.map((stat, i) => (
              <div key={stat.label} className="hm-trust__item">
                {i > 0 ? <span className="hm-trust__rule hm-trust__rule--v" aria-hidden="true" /> : null}
                <div className="hm-trust__stat">
                  <CountUp to={stat.to} suffix={stat.suffix} delay={i * 100} className="hm-trust__num" />
                  <p className="hm-trust__label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
