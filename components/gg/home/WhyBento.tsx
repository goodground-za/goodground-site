import type { CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { CountUp } from "../CountUp";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { NotificationStack } from "./NotificationStack";
import { SearchMock } from "./SearchMock";

/** Bar widths as drawn (Performance 118, SEO 120, Accessibility 115 of 148; 147/150/144 of 170 on phones). */
const BARS = [
  { label: "Performance", value: 98, wide: 0.797, narrow: 0.865 },
  { label: "SEO", value: 100, wide: 0.811, narrow: 0.882 },
  { label: "Accessibility", value: 96, wide: 0.777, narrow: 0.847 },
];

/** Home 02. Three informational cards: no link, no hover lift. The mocks are decorative (aria-hidden). */
export function WhyBento() {
  return (
    <section className="hm-section hm-section--canvas" aria-labelledby="why-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="why-title"
          layout="split"
          tag="01 / GOODGROUND"
          heading="Growth doesn’t start with marketing. It starts with the ground underneath it."
          headingClass="gg-h2 hm-h2"
          sub={
            <Resp
              long="We build AI-accelerated, search-first websites and digital systems that help South African businesses get found, get trusted and get enquiries."
              short="We build AI-accelerated, search-first websites that help South African businesses get found, get trusted and get enquiries."
            />
          }
          cta={<ButtonLink href="/about" variant="outline">About us</ButtonLink>}
        />

        <div className="hm-bento" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
          <article className="hm-card hm-card--lilac">
            <SearchMock />
            <div className="hm-card__text">
              <h3 className="hm-card__title">Built to be found</h3>
              <p>
                <Resp
                  long="SEO foundations from day one: fast pages, proper structure and content written around how your customers actually search."
                  short="SEO foundations from day one: fast pages, proper structure and content written around how customers search."
                />
              </p>
            </div>
          </article>

          <article className="hm-card hm-card--ink">
            <NotificationStack />
            <div className="hm-card__text">
              <h3 className="hm-card__title">Designed around the decision</h3>
              <p>
                <Resp
                  long="Every page is laid out around what a visitor needs to see, in what order, before they trust you enough to get in touch."
                  short="Every page is laid out around what a visitor needs to see before they trust you enough to get in touch."
                />
              </p>
            </div>
          </article>

          <article className="hm-card hm-card--blush">
            <div className="hm-score" data-reveal="fill" aria-hidden="true">
              <div className="hm-ring">
                <svg viewBox="0 0 112 112" className="hm-ring__svg" focusable="false">
                  <circle className="hm-ring__track" cx="56" cy="56" r="50" />
                  <circle className="hm-ring__arc" cx="56" cy="56" r="50" pathLength="100" />
                </svg>
                <CountUp to={98} className="hm-ring__n" />
              </div>
              <div className="hm-bars">
                {BARS.map((bar, i) => (
                  <div key={bar.label} className="hm-bar">
                    <div className="hm-bar__row">
                      <span>{bar.label}</span>
                      <strong>{bar.value}</strong>
                    </div>
                    <div className="hm-bar__track">
                      <span
                        className="hm-bar__fill"
                        style={{ "--v": bar.wide, "--vm": bar.narrow, "--gg-i": i } as CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hm-card__text">
              <h3 className="hm-card__title">AI-accelerated, human-finished</h3>
              <p>
                <Resp
                  long="Custom-coded, not templated. Work moves faster without feeling rushed, and every site ships fast, accessible and easy to grow."
                  short="Custom-coded, not templated. Fast, accessible and easy to grow."
                />
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
