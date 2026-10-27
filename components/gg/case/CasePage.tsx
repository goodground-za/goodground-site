import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";
import { site } from "@/content/site";

import { ButtonLink } from "../Button";
import { CountUp } from "../CountUp";
import { GgShell } from "../GgShell";
import { GradientCta } from "../GradientCta";
import { Icon, type IconName } from "../Icon";
import { ArrowChip, LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { CaseVideo } from "./CaseVideo";
import { ColourSwitcher, KeyboardDemo, PayloadBars, SpecBento } from "./CaseVisuals";
import "./case.css";

type Block = {
  kicker?: string;
  title: string;
  body: string[];
  points?: string[];
  visual: ReactNode;
};

/**
 * Template copy the data files do not carry: B3TTER's problem cards, feature
 * points and its four bespoke visuals (Figma 15:151). Other projects use their
 * own challenge and solution text from content/caseStudies.ts, with the image
 * that belongs to each block as its visual.
 */
const B3TTER = {
  summary: "A premium product page for a single-item brand, built to look expensive, work for every visitor and stay fast.",
  brief: [
    "B3TTER needed a product page that could carry a premium single-item brand on its own: no supporting range, no category page to lean on, just one bottle that had to look and feel expensive from the first scroll.",
    "The walkthrough above is recorded end to end rather than cut together, so what you see is exactly what a visitor gets.",
  ],
  challengeLead: "Most product pages for physical goods fail in the same two places.",
  cards: [
    { icon: "mobile" as IconName, title: "Photos stall the page on a phone", body: "Studio and lifestyle photography is so heavy the page freezes on mobile data." },
    { icon: "layout" as IconName, title: "Interactive parts assume a mouse", body: "Colour pickers, review sliders and galleries leave keyboard and screen-reader users stuck." },
  ],
  challengeClose:
    "Our self-imposed brief: dozens of photos, a live colour switcher, a scrolling review carousel, and a rule that none of it could cost a single point on accessibility.",
  solutionHeading: "Four problems, solved one at a time.",
  solutionSub:
    "Colour without clutter, a specifications section people actually read, photography that stays light, and accessibility that’s checked rather than assumed.",
  blocks: [
    {
      kicker: "COLOUR",
      title: "The product carries the colour, the interface stays silent",
      body: ["The entire interface is black and white. Every bit of colour comes from the bottle itself, so a six-colourway range feels like a range, not decoration."],
      points: ["Fades between six real photographs, not one tinted image", "Every photo preloaded, so no white flash", "Arrow keys flip through colours"],
      visual: <ColourSwitcher />,
    },
    {
      kicker: "SPECIFICATIONS",
      title: "A spec section that doesn’t feel like a spec sheet",
      body: ["Large and small tiles instead of a wall of identical boxes give the eye somewhere to land. Every layout was checked by hand at every width, with no odd gaps or leftover tiles."],
      points: ["Mixed tile sizes, not a flat grid", "No orphan tiles at any width"],
      visual: <SpecBento />,
    },
    {
      kicker: "PERFORMANCE",
      title: "56 MB of photography, shipped as 1.5 MB",
      body: [
        "Twenty-seven original photos came in at 56 MB. Each was compressed and resized to exactly the size it needed, and every cut-out stayed perfectly transparent. Nothing is fetched from anywhere else on the internet.",
      ],
      points: ["27 photos, 1.5 MB total", "Transparent cut-outs preserved", "Zero third-party requests"],
      visual: <PayloadBars />,
    },
    {
      kicker: "ACCESSIBILITY",
      title: "Accessible because it was checked, not assumed",
      body: [
        "The colour switcher, review carousel and mobile menu all work with a keyboard as well as a mouse. Screen readers only hear the review on screen, the carousel stops the moment anyone interacts, and reduced motion turns every animation off completely.",
      ],
      points: ["Full keyboard support", "Screen-reader friendly carousel", "Reduced motion respected"],
      visual: <KeyboardDemo />,
    },
  ] as Block[],
};

function blocksFor(study: CaseStudy): Block[] {
  if (study.slug === "b3tter-bottle") return B3TTER.blocks;
  return study.solution.map((s) => ({
    title: s.heading,
    body: s.body,
    visual:
      s.image && s.imageDimensions ? (
        <div className="cs-visual cs-visual--image">
          <Image src={s.image} alt={s.imageAlt ?? ""} width={s.imageDimensions.width} height={s.imageDimensions.height} sizes="(min-width: 1200px) 600px, 100vw" />
        </div>
      ) : null,
  }));
}

const numeric = (v: string) => /^\d+(\.\d+)?$/.test(v);

export function CasePage({ study }: { study: CaseStudy }) {
  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const isB3 = study.slug === "b3tter-bottle";
  const typeTag = study.kind === "concept" ? ("coral" as const) : study.kind === "studio" ? ("dark" as const) : ("neutral" as const);
  const typeLabel = study.kind === "concept" ? "CONCEPT BUILD" : study.kind === "studio" ? "OUR OWN SITE" : "CLIENT WORK";
  const summary = isB3 ? B3TTER.summary : study.title;
  const briefLead = isB3 ? B3TTER.brief[0] : (study.briefText?.[0] ?? study.standfirst);
  const briefSupport = isB3 ? B3TTER.brief[1] : study.briefText?.[1];
  const blocks = blocksFor(study);
  const results = study.results.slice(0, 6);
  const poster = study.heroImage
    ? { src: study.heroImage.src, alt: study.heroImage.alt, width: study.heroImage.width, height: study.heroImage.height }
    : { src: study.image, alt: study.imageAlt, width: 1440, height: 900 };
  const meta = [
    { label: "YEAR", value: study.year },
    { label: "SERVICE", value: study.service ?? study.tags.join(", ") },
    ...(study.details ? [{ label: "DETAILS", value: study.details }] : []),
  ];

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/work/${study.slug}`,
    name: `${study.client}: ${study.title}`,
    headline: `${study.client}: ${study.title}`,
    description: study.standfirst,
    creator: { "@id": `${site.url}/#organization` },
    datePublished: study.datePublished,
    dateCreated: study.year,
    genre: "Case study",
    keywords: study.tags.join(", "),
    url: study.liveUrl ?? `${site.url}/work/${study.slug}`,
    mainEntityOfPage: `${site.url}/work/${study.slug}`,
    isPartOf: { "@id": `${site.url}/#website` },
  };

  return (
    <GgShell crumbs={[{ label: "WORK", href: "/work" }, { label: study.client.toUpperCase() }]}>
      <BreadcrumbSchema trail={[{ name: "Work", path: "/work" }, { name: study.client, path: `/work/${study.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      <div className="cs-page">
        {/* 01 Hero */}
        <section className="hm-section hm-section--canvas cs-hero" aria-labelledby="cs-title">
          <div className="gg-wrap cs-hero__stack">
            <Link className="cs-back" href="/work">
              <Icon name="back" size={16} stroke={2} />
              All work
            </Link>
            <div className="cs-hero__top" data-reveal="header">
              <div className="cs-hero__copy">
                <div className="cs-hero__tags" data-part="tag">
                  <Tag tone={typeTag}>{typeLabel}</Tag>
                  <Tag>{study.year}</Tag>
                </div>
                <SplitHeading as="h1" id="cs-title" className={study.client.length > 10 ? "cs-h1 cs-h1--long" : "cs-h1"} text={study.client.toUpperCase()} />
                <p className="cs-hero__summary" data-part="sub">
                  {summary}
                </p>
              </div>
              <dl className="cs-meta" data-reveal="stagger" style={{ "--gg-stagger-step": "60ms" } as CSSProperties}>
                {meta.map((row) => (
                  <div key={row.label} className="cs-meta__row">
                    <dt className="gg-kicker">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <CaseVideo
              poster={poster}
              videoSrc={study.video?.src}
              liveUrl={study.liveUrl}
              label={study.video ? "Full walkthrough · recorded end to end, no cuts" : `${study.client} · live site screenshot`}
            />
            {study.liveUrl ? (
              <div className="cs-live-m hm-phone-only">
                <ButtonLink href={study.liveUrl} variant="primary" full>
                  Open the live site<span className="gg-sr-only"> (opens in new tab)</span>
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </section>

        {/* 02 Snapshot */}
        <section className="cs-snapshot" aria-label="Snapshot">
          <div className="gg-wrap">
            <dl className="cs-snap" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
              {study.snapshot.slice(0, 3).map((row) => (
                <div key={row.label} className="cs-snap__col">
                  <dt className="gg-kicker">{row.label.toUpperCase()}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            {/* Phones merge the snapshot into the same list as the hero meta. */}
          </div>
        </section>

        {/* 03 Brief & challenge */}
        <section className="hm-section hm-section--surface cs-brief" aria-label="The brief and the challenge">
          <div className="gg-wrap cs-rows">
            <div className="cs-row">
              <div className="cs-row__label" data-reveal="line-mask">
                <span className="gg-kicker">01</span>
                <SplitHeading as="h2" className="cs-row__title" text="The brief" />
              </div>
              <div className="cs-row__body" data-reveal="group">
                <p className="cs-lead cs-fu" style={{ "--i": 0 } as CSSProperties}>
                  {briefLead}
                </p>
                {briefSupport ? (
                  <p className="cs-support cs-fu" style={{ "--i": 1 } as CSSProperties}>
                    {briefSupport}
                  </p>
                ) : null}
              </div>
            </div>
            <hr className="cs-divider" />
            <div className="cs-row">
              <div className="cs-row__label" data-reveal="line-mask">
                <span className="gg-kicker">02</span>
                <SplitHeading as="h2" className="cs-row__title" text="The challenge" />
              </div>
              <div className="cs-row__body" data-reveal="group">
                <p className="cs-lead cs-fu" style={{ "--i": 0 } as CSSProperties}>
                  {isB3 ? B3TTER.challengeLead : study.challenge[0]}
                </p>
                {isB3 ? (
                  <div className="cs-probs" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
                    {B3TTER.cards.map((card) => (
                      <article key={card.title} className="cs-prob">
                        <span className="cs-prob__icon" aria-hidden="true">
                          <Icon name={card.icon} size={22} stroke={2} />
                        </span>
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
                {isB3 ? (
                  <p className="cs-support cs-fu" style={{ "--i": 2 } as CSSProperties}>
                    {B3TTER.challengeClose}
                  </p>
                ) : (
                  study.challenge.slice(1).map((p) => (
                    <p key={p} className="cs-support cs-fu" style={{ "--i": 1 } as CSSProperties}>
                      {p}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 04 The solution */}
        <section className="hm-section hm-section--canvas" aria-labelledby="cs-solution-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader
              id="cs-solution-title"
              layout="split"
              tag="03 / THE SOLUTION"
              heading={isB3 ? B3TTER.solutionHeading : "How it was built."}
              headingClass="gg-h2 hm-h2"
              sub={isB3 ? B3TTER.solutionSub : study.solutionIntro?.[0]}
              subClassName="hm-hide-phone"
            />
            <div className="cs-feats">
              {blocks.map((block, i) => (
                <article key={block.title} className={i % 2 === 1 ? "cs-feat cs-feat--flip" : "cs-feat"} data-reveal="group">
                  <div className="cs-feat__text cs-fu" style={{ "--i": 0 } as CSSProperties}>
                    <p className="gg-kicker cs-feat__kicker">
                      {String(i + 1).padStart(2, "0")}
                      {block.kicker ? `  ·  ${block.kicker}` : ""}
                    </p>
                    <h3>{block.title}</h3>
                    {block.body.map((p, k) => (
                      <p key={k} className={k > 0 ? "cs-feat__more" : undefined}>
                        {p}
                      </p>
                    ))}
                    {block.points ? (
                      <ul className="cs-points hm-hide-phone">
                        {block.points.map((point) => (
                          <li key={point}>
                            <span aria-hidden="true">
                              <Icon name="check" size={12} stroke={2.8} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  {block.visual ? <div className="cs-feat__visual cs-slide">{block.visual}</div> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Results */}
        <section className="hm-section hm-section--ink cs-results" aria-labelledby="cs-results-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader
              id="cs-results-title"
              layout="split"
              onDark
              tag="04 / THE RESULTS"
              heading="Measured on the live URL. Check them yourself."
              headingClass="gg-h2 hm-h2"
              sub="Every figure below tells you exactly how to verify it in your own browser, in under a minute."
              subClassName="hm-hide-phone"
            />
            <div className={`cs-stats cs-stats--${results.length}`} data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
              {results.map((r) => {
                const hi = r.value.includes("→");
                return (
                  <article key={r.label} className={hi ? "cs-stat cs-stat--hi" : "cs-stat"}>
                    <p className="cs-stat__value">{numeric(r.value) ? <CountUp to={Number(r.value)} /> : r.value}</p>
                    <h3>{r.label}</h3>
                    <p className="cs-stat__check">{r.verify}</p>
                  </article>
                );
              })}
            </div>
            <div className="cs-honest" data-reveal="fade-up">
              <Icon name="alert" size={22} stroke={2} />
              <p>
                <Resp long={study.resultsCaveat} />
              </p>
            </div>
            {study.liveUrl ? (
              <div>
                <ButtonLink href={study.liveUrl} variant="light" className="cs-results__btn">
                  Open the live site<span className="gg-sr-only"> (opens in new tab)</span>
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </section>

        {/* 06 Next case study */}
        <section className="hm-section hm-section--canvas cs-next" aria-label="Next case study">
          <div className="gg-wrap">
            <LinkedCard href={`/work/${next.slug}`} className="cs-nextcard">
              <span className="cs-nextcard__img gg-card__cover">
                <span className="cs-nextcard__imgin">
                  <Image src={next.image} alt={next.imageAlt} fill sizes="(min-width: 1200px) 420px, 100vw" />
                </span>
              </span>
              <span className="cs-nextcard__text">
                <span className="gg-kicker">NEXT CASE STUDY</span>
                <span className="cs-nextcard__title">{next.client}</span>
                <span className="cs-nextcard__meta hm-hide-phone">
                  {next.kind === "studio" ? "Our own site" : "Concept build"}  ·  {next.tags.join(" · ")}
                </span>
              </span>
              <ArrowChip size={64} className="cs-nextcard__chip" />
            </LinkedCard>
          </div>
        </section>
      </div>

      <GradientCta
        variant="home"
        split
        size="m"
        tag="YOUR PROJECT"
        headline={"WANT A WEBSITE\nLIKE THIS?"}
        sub="Tell us what you sell and who you sell it to. We’ll tell you honestly whether a new site is the thing that will move the needle."
        primary={{ label: "Start your project", href: `/start-project?ref=case-${study.slug}` }}
        secondary={{ label: "See all work", href: "/work" }}
      />
    </GgShell>
  );
}
