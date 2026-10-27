import type { CSSProperties } from "react";

import { ButtonFace, ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { ArrowChip, LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { FeaturedParallax } from "./FeaturedParallax";
import { WorkScroller } from "./WorkScroller";

/**
 * Gradients stand in for the project screenshots, as drawn (README: keep them
 * until real 16:10 screenshots are supplied, open item 6). Nothing here is a
 * stock photo or an invented client.
 */
const PROJECTS = [
  {
    slug: "point-break-surf",
    name: "Point Break Surf Academy",
    desktop: "Concept build  ·  Design · Development · Booking UX",
    phone: "Concept build",
    gradient: "linear-gradient(135deg, #0f3b4c 0%, #2c8c99 60%, #f2d8a7 100%)",
  },
  {
    slug: "goodground-site",
    name: "GoodGround",
    desktop: "Our own site  ·  Design · Development · SEO",
    phone: "Our own site",
    gradient: "linear-gradient(135deg, #2e1848 0%, #9a3348 60%, #ef8a5a 100%)",
  },
  {
    slug: "sunbird-early-learners",
    name: "Sunbird Early Learners",
    desktop: "Concept build  ·  Design · Development · Motion",
    phone: "Concept build",
    gradient: "linear-gradient(135deg, #f6c344 0%, #f28c38 60%, #e2574c 100%)",
  },
];

/**
 * Home 05. HEADER REVEAL (on dark), the featured B3TTER card (clip-path image
 * reveal, "B3TTER" as a LINE MASK, parallax on desktop), then the project
 * cards. Every card is one link to /work/{slug}; "Visit live site" lives on the
 * case study page. Below 768 the cards become a snap carousel with dots.
 */
export function WorkShowcase() {
  return (
    <section className="hm-section hm-section--ink" aria-labelledby="work-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="work-title"
          layout="split"
          onDark
          tag="03 / OUR CRAFT"
          heading="Real builds, not mockups."
          headingClass="gg-h2 hm-h2"
          sub={
            <Resp
              long="Every project is live at a public URL you can open, click through and test yourself. Each one says whether it’s client work or a concept build."
              short="Every project is live at a public URL you can open and test yourself."
            />
          }
          cta={<ButtonLink href="/work" variant="light">View all work</ButtonLink>}
          ctaClassName="hm-hide-phone"
        />

        <div className="hm-feature-wrap" data-reveal="group">
          <LinkedCard href="/work/b3tter-bottle" className="hm-proj hm-feature">
            <FeaturedParallax>
              <span className="hm-feature__img" style={{ background: "linear-gradient(135deg, #1e2b3a 0%, #4a6b7c 60%, #c9d6cf 100%)" }} />
            </FeaturedParallax>
            <div className="hm-feature__body">
              <div className="hm-feature__tags hm-fu" style={{ "--gg-i": 0 } as CSSProperties}>
                <Tag tone="coral">
                  <Resp long="LATEST PROJECT" short="LATEST" />
                </Tag>
                <Tag tone="on-dark">CONCEPT BUILD</Tag>
              </div>
              <SplitHeading as="h3" className="hm-feature__name" text="B3TTER" />
              <p className="hm-feature__desc hm-fu" style={{ "--gg-i": 1 } as CSSProperties}>
                <Resp
                  long="A complete product website for an insulated bottle, designed to look expensive, work for every visitor, and still load fast with dozens of high-resolution photos on the page."
                  short="A product website for an insulated bottle that looks expensive and still loads fast with dozens of high-res photos."
                />
              </p>
              <ul className="hm-feature__ticks hm-fu" style={{ "--gg-i": 2 } as CSSProperties}>
                {["Design", "Development", "Accessibility"].map((t) => (
                  <li key={t}>
                    <Icon name="check" size={14} stroke={2.4} />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="hm-fu" style={{ "--gg-i": 3 } as CSSProperties}>
                <ButtonFace variant="light">View case study</ButtonFace>
              </div>
            </div>
          </LinkedCard>
        </div>

        <WorkScroller>
          {PROJECTS.map((p) => (
            <li key={p.slug} className="hm-proj-item">
              <LinkedCard href={`/work/${p.slug}`} className="hm-proj">
                <span className="hm-proj__img gg-card__cover">
                  <span style={{ background: p.gradient }} />
                </span>
                <span className="hm-proj__row">
                  <span className="hm-proj__text">
                    <span className="hm-proj__name">{p.name}</span>
                    <span className="hm-proj__meta">
                      <Resp long={p.desktop} short={p.phone} />
                    </span>
                  </span>
                  <ArrowChip size={40} className="hm-proj__chip" />
                </span>
              </LinkedCard>
            </li>
          ))}
        </WorkScroller>

        <div className="hm-next" data-reveal="fade-up">
          <p>Your project could be next. We’d rather show you real, testable work than pad this out with stock mock-ups.</p>
          <ButtonLink href="/start-project" variant="coral">
            Start your project
          </ButtonLink>
        </div>

        <div className="hm-phone-only">
          <ButtonLink href="/work" variant="light" full>
            View all work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
