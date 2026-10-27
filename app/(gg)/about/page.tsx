import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/gg/Button";
import { CountUp } from "@/components/gg/CountUp";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { Icon } from "@/components/gg/Icon";
import { Resp } from "@/components/gg/Resp";
import { SectionHeader } from "@/components/gg/SectionHeader";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { Grounds, ParableButton, ParallaxMedia } from "@/components/gg/about/AboutClient";
import { beliefs, problems, stats, statements } from "@/components/gg/about/data";
import { process as processSteps } from "@/content/process";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/about/about.css";

/**
 * `absolute` bypasses the layout's "%s | GoodGround" template, which would
 * otherwise append a second "GoodGround" to this title.
 */
const title = { absolute: "About GoodGround | Website Development Studio, South Africa" };
const description =
  "A website development studio working with businesses across South Africa, built on the idea that they grow best on strong foundations.";
const path = "/about";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/** AboutPage + Organization (name, foundingDate 2026, George, Western Cape, email, sameAs Instagram/Facebook). */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${site.url}/about`,
      name: "About GoodGround",
      url: `${site.url}/about`,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      foundingDate: site.foundingDate,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      sameAs: site.socials.map((s) => s.href),
    },
  ],
};

export default function AboutPage() {
  return (
    <GgShell crumbs={[{ label: "ABOUT" }]}>
      <div className="ab-page">
        <BreadcrumbSchema trail={[{ name: "About", path }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        {/* 01 · Hero ---------------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ab-hero" aria-labelledby="ab-title">
          <div className="gg-wrap">
            <div className="ab-hero__copy" data-reveal="header">
              <div className="ab-hero__tags" data-part="tag">
                <Tag tone="coral">ABOUT GOODGROUND</Tag>
                <Tag tone="neutral" className="ab-hero__founded">
                  FOUNDED 2026 · GEORGE, SOUTH AFRICA
                </Tag>
              </div>
              <SplitHeading
                as="h1"
                id="ab-title"
                className="gg-display-l ab-h1"
                text="WE BELIEVE EVERY BUSINESS DESERVES A STRONG FOUNDATION."
              />
              <p className="ab-hero__line" data-part="sub">
                Founded 2026 · George, South Africa
              </p>
            </div>

            <ParallaxMedia>
              <ul className="ab-stats" data-reveal="fade-up" data-delay={600}>
                {stats.map((stat) => (
                  <li key={stat.label}>
                    <strong className="gg-number">
                      {stat.countTo === null ? stat.value : <CountUp to={stat.countTo} suffix={stat.suffix} />}
                    </strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            </ParallaxMedia>
          </div>
        </section>

        {/* 02 · Why we started ------------------------------------------------------- */}
        <section id="our-story" className="hm-section hm-section--canvas ab-story" aria-labelledby="ab-story-title">
          <div className="gg-wrap ab-story__grid">
            <div className="ab-story__label">
              <p className="gg-kicker ab-story__n">01</p>
              <h2 id="ab-story-title" className="ab-story__title">
                Why we started
              </h2>
            </div>
            <div className="ab-story__body" data-reveal="group">
              <p className="ab-story__lead ab-fu">
                GoodGround was founded in 2026 by a web developer with more than 10 years’ experience across UX and UI design, website
                design and graphic design.
              </p>
              <p className="ab-story__sub ab-fu" style={{ "--i": 1 } as CSSProperties}>
                We kept seeing good businesses run into the same two problems:
              </p>
              <ul className="ab-problems">
                {problems.map((problem, i) => (
                  <li key={problem.title} className="ab-problem ab-fu" style={{ "--i": i + 2 } as CSSProperties}>
                    <span className="ab-problem__chip" aria-hidden="true">
                      <Icon name={problem.icon} size={22} stroke={2} />
                    </span>
                    <span className="ab-problem__text">
                      <strong>
                        <Resp long={problem.title} short={problem.short} />
                      </strong>
                      <span>
                        <Resp long={problem.body} short={problem.shortBody} />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="ab-banner ab-fu" style={{ "--i": 4 } as CSSProperties}>
                <span className="ab-banner__icon" aria-hidden="true">
                  <Icon name="sprout" size={20} stroke={2} />
                </span>
                <Resp
                  long="We started GoodGround to fix both at once: strategy-first websites, and a choice to pay 50/50 or over 12 months."
                  short="We started GoodGround to fix both at once."
                />
              </p>
            </div>
          </div>
        </section>

        {/* 03 · Why the name ---------------------------------------------------------- */}
        <section className="hm-section hm-section--lilac ab-name" aria-labelledby="ab-name-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="WHY THE NAME"
              tagTone="plum"
              heading="Good ground is where seeds take root and grow."
              layout="split"
              id="ab-name-title"
              sub={
                <>
                  <span className="gg-resp-long">
                    The name comes from the biblical Parable of the Sower. We didn’t pick it because it sounded nice. It’s how we think about building.
                  </span>
                  <span className="gg-resp-short">From the biblical Parable of the Sower. It’s how we think about building.</span>
                </>
              }
            />
            <Grounds />
            <ol className="ab-statements" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
              {statements.map((statement, i) => (
                <li key={statement} className={i === statements.length - 1 ? "is-last" : undefined}>
                  <span className="gg-kicker" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{statement}</span>
                </li>
              ))}
            </ol>
            <div className="ab-parable">
              <ParableButton label="Read the parable that inspired us" short="Read the parable" />
            </div>
          </div>
        </section>

        {/* 04 · What we believe -------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ab-beliefs" aria-labelledby="ab-beliefs-title">
          <div className="gg-wrap">
            <SectionHeader tag="WHAT WE BELIEVE" heading="Six things we don’t argue about." id="ab-beliefs-title" />
            <ol className="ab-belief-grid" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
              {beliefs.map((belief, i) => (
                <li key={belief} className="ab-belief-slot">
                  <div className={i === beliefs.length - 1 ? "ab-belief ab-belief--dark" : "ab-belief"}>
                    <span className="ab-belief__n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p>{belief}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 · How we work ----------------------------------------------------------- */}
        <section className="hm-section hm-section--surface ab-how" aria-labelledby="ab-how-title">
          <div className="gg-wrap">
            <SectionHeader
              tag="HOW WE WORK"
              heading="Every project follows the same process."
              layout="split"
              id="ab-how-title"
              sub="Research, direction, design, revisions, handoff, and a month of support after launch."
              subClassName="hm-hide-phone"
            />
            <ol className="ab-steps" data-reveal="group">
              {processSteps.map((step, i) => (
                <li key={step.number} className={i === processSteps.length - 1 ? "is-last" : undefined} style={{ "--i": i } as CSSProperties}>
                  <span className="ab-steps__dot">{step.number}</span>
                  <span className="ab-steps__name">{step.title === "Beyond Launch" ? "Beyond launch" : step.title}</span>
                </li>
              ))}
            </ol>
            <div className="ab-pay" data-reveal="fade-up" data-delay={300}>
              <div className="ab-pay__text">
                <h3>
                  <Resp long="And every project gives you a choice in how you pay." short="A choice in how you pay" />
                </h3>
                <p>
                  <Resp
                    long="A 50% deposit and the rest on completion, or 12 monthly instalments, so investing properly doesn’t disrupt your cash flow."
                    short="50% deposit and 50% on completion, or 12 monthly instalments."
                  />
                </p>
              </div>
              <div className="ab-pay__buttons">
                <ButtonLink href="/process" variant="light" className="hm-hide-phone">
                  See the full process
                </ButtonLink>
                <ButtonLink href="/pricing" variant="coral">
                  View pricing
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 06 · Invitation ------------------------------------------------------------- */}
      <GradientCta
        variant="home"
        split
        size="l"
        tag="AN INVITATION"
        headline={"IF YOU’RE BUILDING A BUSINESS YOU PLAN TO STICK WITH, WE’D LIKE TO HEAR ABOUT IT."}
        sub="Let’s talk about the ground you’re building on."
        primary={{ label: "Start your project", href: "/start-project?ref=about" }}
        secondary={{ label: "Get in touch", href: "/contact" }}
      />
    </GgShell>
  );
}
