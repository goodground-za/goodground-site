import type { CSSProperties } from "react";
import Image from "next/image";

import { ButtonFace, ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { ArrowChip, LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { workProjects } from "../work/data";
import { FeaturedParallax } from "./FeaturedParallax";
import { WorkScroller } from "./WorkScroller";

/** The real screenshots, read from the case studies so this section cannot drift from /work. */
const projectOf = (slug: string) => {
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown case study: ${slug}`);
  return project;
};

const PROJECTS = [
  {
    slug: "point-break-surf",
    name: "Point Break Surf Academy",
    desktop: "Concept build  ·  Design · Development · Booking UX",
    phone: "Concept build",
  },
  {
    slug: "goodground-site",
    name: "GoodGround",
    desktop: "Our own site  ·  Design · Development · SEO",
    phone: "Our own site",
  },
  {
    slug: "sunbird-early-learners",
    name: "Sunbird Early Learners",
    desktop: "Concept build  ·  Design · Development · Motion",
    phone: "Concept build",
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
          tag="03 / PROJECTS"
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
              <span className="hm-feature__img">
                <Image
                  src={projectOf("b3tter-bottle").image}
                  alt={projectOf("b3tter-bottle").imageAlt}
                  fill
                  sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw"
                  priority={false}
                />
              </span>
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
                  <span>
                    <Image src={projectOf(p.slug).image} alt={projectOf(p.slug).imageAlt} fill sizes="(min-width: 1200px) 384px, (min-width: 768px) 33vw, 300px" />
                  </span>
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
