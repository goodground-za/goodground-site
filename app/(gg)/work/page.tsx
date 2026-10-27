import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { CountUp } from "@/components/gg/CountUp";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { Icon, type IconName } from "@/components/gg/Icon";
import { SectionHeader } from "@/components/gg/SectionHeader";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { workCounts, workProjects } from "@/components/gg/work/data";
import { WorkListing } from "@/components/gg/work/WorkListing";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/work/work.css";

const title = { absolute: "Our Work | GoodGround Website Development" };
const description =
  "Case studies from GoodGround, a website studio in South Africa. Every project ends in numbers measured on the live site, with instructions to check them.";
const path = "/work";

// Filtered views (?type=…&service=…) canonicalise to /work (see alternates).
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

const MEASURE: { n: string; icon: IconName; title: string; body: string; short: string }[] = [
  { n: "01", icon: "code", title: "Built", body: "Every site is custom-coded, then deployed to a public URL you can open.", short: "Custom-coded and deployed to a public URL." },
  {
    n: "02",
    icon: "chart",
    title: "Measured on the live URL",
    body: "Lighthouse, page weight, third-party requests and console errors, taken from the live site.",
    short: "Lighthouse, page weight, requests and errors.",
  },
  {
    n: "03",
    icon: "eye",
    title: "Checkable by you",
    body: "Each figure comes with instructions to verify it in your own browser in under a minute.",
    short: "Instructions to verify each figure in your browser.",
  },
];

/**
 * /work: every project the same size, in the order content/caseStudies.ts lists
 * them (no featured card), then how the numbers are measured. The
 * no-fabrication rule still governs it: a project only appears once it is
 * live, concept builds say so, and the only numbers quoted are checkable.
 */
export default function WorkPage() {
  const summary: { value: number; suffix?: string; label: string; short?: string }[] = [
    { value: workCounts.total, label: "case studies", short: "case studies" },
    { value: workCounts.concept, label: "concept builds", short: "concept" },
    { value: workCounts.studio, label: "our own site", short: "own site" },
    ...(workCounts.client ? [{ value: workCounts.client, label: "client projects", short: "client" }] : []),
    { value: 100, suffix: "%", label: "numbers you can check" },
  ];

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GoodGround case studies",
    numberOfItems: workProjects.length,
    itemListElement: workProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/work/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <GgShell crumbs={[{ label: "OUR WORK" }]}>
      <BreadcrumbSchema trail={[{ name: "Work", path: "/work" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div className="wk-page">
        <section className="hm-section hm-section--canvas wk-hero" aria-labelledby="wk-title">
          <div className="gg-wrap wk-hero__grid">
            <div className="wk-hero__copy" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                OUR WORK
              </Tag>
              <SplitHeading as="h1" id="wk-title" className="gg-display-l wk-h1" text={"BUILT,\nTHEN MEASURED."} />
              <p className="gg-lead wk-hero__lead" data-part="sub">
                <span className="gg-resp-long">
                  Every case study here ends in numbers taken from the live site, each with instructions for checking it yourself. Where a project was a concept build rather than client work, it says so at the top.
                </span>
                <span className="gg-resp-short">
                  Every case study ends in numbers taken from the live site, with instructions for checking them yourself. Concept builds are labelled as concept builds.
                </span>
              </p>
            </div>
            <dl className="wk-summary" data-reveal="stagger" style={{ "--gg-stagger-step": "70ms" } as CSSProperties}>
              {summary.map((row, i) => (
                <div key={row.label} className={i === summary.length - 1 ? "wk-summary__row wk-summary__row--last" : "wk-summary__row"}>
                  <dd>
                    <CountUp to={row.value} suffix={row.suffix} delay={i * 100} />
                  </dd>
                  <dt>
                    <span className="gg-resp-long">{row.label}</span>
                    <span className="gg-resp-short">{row.short ?? row.label}</span>
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <WorkListing projects={workProjects} />

        <section className="hm-section hm-section--surface" aria-labelledby="wk-measure-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader
              id="wk-measure-title"
              layout="split"
              tag="HOW WE MEASURE"
              tagTone="plum"
              heading={"No vanity metrics.\nOnly numbers you can check."}
              headingClass="gg-h2 hm-h2"
              sub="If a project has no customers yet, we say so and report build quality instead of inventing results."
              subClassName="hm-hide-phone"
            />
            <div className="wk-measure" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
              {MEASURE.map((card) => (
                <article key={card.n} className="wk-m">
                  <div className="wk-m__top">
                    <span className="wk-m__icon" aria-hidden="true">
                      <Icon name={card.icon} size={24} stroke={2} />
                    </span>
                    <span className="wk-m__n">{card.n}</span>
                  </div>
                  <div className="wk-m__text">
                    <h3>{card.title}</h3>
                    <p>
                      <span className="gg-resp-long">{card.body}</span>
                      <span className="gg-resp-short">{card.short}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <GradientCta variant="home" split size="m" refSource="work" />
    </GgShell>
  );
}
