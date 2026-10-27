import type { CSSProperties } from "react";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { industryPages } from "@/content/industryPages";
import { site } from "@/content/site";

import { ButtonLink } from "../Button";
import { FaqAccordion, type FaqItem } from "../FaqAccordion";
import { GgShell } from "../GgShell";
import { GradientCta } from "../GradientCta";
import { Icon } from "../Icon";
import { LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { INDUSTRY_VIEWS } from "./data";
import { LocalSearchMock, PhoneTilt, StickyBar } from "./IndustryClient";
import "./industry.css";

function sentences(text: string) {
  return text.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((s) => s.trim()) ?? [text];
}

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="id-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={size} stroke={1.5} />
      ))}
    </span>
  );
}

/**
 * The Industry template (/services/{industry-slug}). Live titles, H1s, intros,
 * chips, problems and FAQs come from content/industryPages.ts; the rest is in
 * ./data.ts. State A (no published project in this industry) is the honesty
 * card; no case study is tagged by industry yet, so state B (project cards) has
 * nothing to show. Never a placeholder or fake project.
 */
export function IndustryPage({ slug }: { slug: string }) {
  const entry = industryPages.find((p) => p.slug === slug)!;
  const view = INDUSTRY_VIEWS[slug];
  const ref = `industry-${slug}`;
  const startHref = `/start-project?ref=${ref}`;
  const intro = sentences(entry.heroIntro);
  const introShort = intro.length > 2 ? `${intro[0]} ${intro[intro.length - 1]}` : entry.heroIntro;

  const faqItems: FaqItem[] = entry.faq.map((item) => ({ question: item.question, answer: [item.answer ?? ""] }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${entry.slug}#service`,
    name: entry.h1,
    serviceType: "Website design",
    description: entry.metaDescription,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "City", name: site.address.locality },
    ],
    url: `${site.url}/services/${entry.slug}`,
  };

  const { phone, moment, problems, local, bento } = view;

  return (
    <GgShell crumbs={[{ label: "SERVICES", href: "/services" }, { label: view.name.toUpperCase() }]} footer={{ stickyBar: true }}>
      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }, { name: entry.title, path: `/services/${entry.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <FAQSchema items={entry.faq} id={`${entry.slug}-faq`} />

      <div className="id-page">
        {/* 01 Hero + phone mock */}
        <section className="hm-section hm-section--canvas id-hero" aria-labelledby="id-title">
          <div className="gg-wrap id-hero__grid">
            <div className="id-hero__copy" data-reveal="header">
              <p className="id-crumbs">
                <a href="/services">Services /</a> <strong>{view.name}</strong>
              </p>
              <Tag tone="coral" data-part="tag">
                WHO WE BUILD FOR
              </Tag>
              <SplitHeading as="h1" id="id-title" className="gg-display-l id-h1" text={entry.h1.toUpperCase()} />
              <p className="gg-lead id-hero__lead" data-part="sub">
                <Resp long={entry.heroIntro} short={introShort} />
              </p>
              <ul className="id-chips" data-reveal="stagger" style={{ "--gg-stagger-step": "40ms" } as CSSProperties}>
                {entry.keywordChips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
              <div className="id-hero__buttons" data-part="cta">
                <ButtonLink href={startHref} variant="coral">
                  Start your project
                </ButtonLink>
                <ButtonLink href="/pricing" variant="outline">
                  See pricing
                </ButtonLink>
              </div>
            </div>

            <div className="id-phone-wrap" data-reveal="fade-up" data-delay={300}>
              <PhoneTilt>
                <div className="id-phone" role="img" aria-label={phone.alt}>
                  <div className="id-phone__screen">
                    <div className="id-phone__top">
                      <strong>{phone.business}</strong>
                      <span className="id-phone__badge">{phone.badge}</span>
                    </div>
                    <p className="id-phone__headline">{phone.headline}</p>
                    <p className="id-phone__rating">
                      <Stars size={14} />
                      {phone.rating}
                    </p>
                    <p className="id-phone__areas">
                      <Icon name="pin" size={14} stroke={2} />
                      {phone.areas}
                    </p>
                    <div className="id-phone__form">
                      <strong>{phone.formTitle}</strong>
                      {phone.fields.map((f) => (
                        <span key={f}>{f}</span>
                      ))}
                      <span className="id-phone__submit">{phone.submit}</span>
                    </div>
                    <div className="id-phone__bar">
                      <span className="id-phone__pill id-phone__pill--coral">
                        <Icon name={phone.pill1.icon} size={14} stroke={2} />
                        {phone.pill1.label}
                      </span>
                      <span className="id-phone__pill id-phone__pill--mint">
                        <Icon name={phone.pill2.icon} size={14} stroke={2} />
                        {phone.pill2.label}
                      </span>
                    </div>
                  </div>
                </div>
              </PhoneTilt>
            </div>
          </div>
        </section>

        {/* 02 The moment that decides the job */}
        <section className="hm-section hm-section--surface" aria-labelledby="id-moment-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader
              id="id-moment-title"
              layout="split"
              tag="THE MOMENT THAT DECIDES THE JOB"
              heading={moment.heading}
              headingClass="gg-h2 hm-h2"
              sub={moment.sub}
              subClassName="hm-hide-phone"
            />
            <ol className="id-journey" data-reveal="stagger" style={{ "--gg-stagger-step": "120ms" } as CSSProperties}>
              {moment.journey.map((step, i) => (
                <li key={step.title} className={i === 2 ? "id-step id-step--plum" : "id-step"}>
                  <span className="id-step__icon" aria-hidden="true">
                    <Icon name={step.icon} size={22} stroke={2} />
                  </span>
                  <div className="id-step__text">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                  {i < 2 ? (
                    <span className="id-step__arrow" aria-hidden="true">
                      <Icon name="arrow" size={18} stroke={2.2} />
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 03 Problems we fix */}
        <section className="hm-section hm-section--canvas" aria-labelledby="id-problems-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader
              id="id-problems-title"
              tag={problems.tag}
              heading={problems.heading}
              headingClass="gg-h2 hm-h2 id-problems__h"
            />
            <div className="id-rows">
              {entry.painPoints.map((point, i) => (
                <article key={point.title} className="id-row" data-reveal="group">
                  <div className="id-row__problem id-fu" style={{ "--i": 0 } as CSSProperties}>
                    <div className="id-row__head">
                      <span className="id-row__n">{String(i + 1).padStart(2, "0")}</span>
                      <Tag tone="coral" className="hm-hide-phone">
                        THE PROBLEM
                      </Tag>
                    </div>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </div>
                  <div className="id-row__fix">
                    <div className="id-row__fixhead">
                      <span className="id-row__icon" aria-hidden="true">
                        <Icon name={problems.fixes[i].icon} size={20} stroke={2} />
                      </span>
                      <span className="gg-kicker hm-hide-phone">WHAT WE BUILD</span>
                    </div>
                    <p>
                      <Resp long={problems.fixes[i].text} short={problems.fixes[i].short} />
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Built for local search */}
        <section className="hm-section id-local" aria-labelledby="id-local-title">
          <div className="gg-wrap id-local__grid">
            <div className="id-local__copy" data-reveal="header">
              <Tag tone="on-dark" data-part="tag">
                LOCAL SEARCH
              </Tag>
              <SplitHeading id="id-local-title" className="gg-h2 hm-h2 id-local__h" text={local.heading} />
              <p className="gg-lead id-local__lead" data-part="sub">
                <Resp long={local.body} short={local.bodyShort} />
              </p>
              <ul className="id-areas" data-reveal="stagger" style={{ "--gg-stagger-step": "40ms" } as CSSProperties}>
                {local.towns.map((town, i) => (
                  <li key={town} className={i >= 4 ? "hm-hide-phone" : undefined}>
                    <Icon name="pin" size={14} stroke={2} />
                    {town}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="fade-up" className="id-local__card">
              <LocalSearchMock query={local.query} hit={local.hit} dim={local.dim} callLabel={local.callLabel} />
            </div>
          </div>
        </section>

        {/* 05 Honest proof */}
        <section className="hm-section hm-section--canvas id-proof" aria-labelledby="id-proof-title">
          <div className="gg-wrap">
            <div className="id-honest" data-reveal="fade-up">
              <span className="id-honest__eye" aria-hidden="true">
                <Icon name="eye" size={36} stroke={2} />
              </span>
              <div className="id-honest__text">
                <Tag tone="coral">STRAIGHT ANSWER</Tag>
                <h2 id="id-proof-title">We haven’t published a live {view.noun} project yet.</h2>
                <p>
                  <Resp
                    long="Get in touch and we’ll tell you honestly what we’re currently working on, and show you sites we’ve built in other industries."
                    short="Get in touch and we’ll tell you honestly what we’re working on."
                  />
                </p>
              </div>
              <div className="id-honest__buttons">
                <ButtonLink href={`/contact?topic=work-in-progress&ref=${ref}`} variant="primary" full>
                  Ask what we’re working on
                </ButtonLink>
                <ButtonLink href="/work" variant="outline" full>
                  See all our work
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* 06 What's included (bento) */}
        <section className="hm-section hm-section--canvas id-incl" aria-labelledby="id-incl-title">
          <div className="gg-wrap hm-stack">
            <SectionHeader
              id="id-incl-title"
              layout="split"
              tag="WHAT’S INCLUDED"
              heading={bento.heading}
              headingClass="gg-h2 hm-h2"
              sub="Each card links to the full service page."
              subClassName="hm-hide-phone"
            />
            <div className="id-bento" data-reveal="stagger" style={{ "--gg-stagger-step": "90ms" } as CSSProperties}>
              <LinkedCard href="/services#website-development" className="id-card id-card--flagship">
                <span className="id-card__top">
                  <span className="id-card__chip id-card__chip--coral">
                    <Icon name="code" size={24} stroke={2} />
                  </span>
                  <Tag tone="on-dark">FLAGSHIP</Tag>
                </span>
                <span className="id-card__checks">
                  <span className="gg-kicker id-card__checks-label">INCLUDED IN EVERY {view.name.toUpperCase()} SITE</span>
                  {bento.checklist.map((item) => (
                    <span key={item} className="id-card__check">
                      <Icon name="check" size={18} stroke={2.4} />
                      {item}
                    </span>
                  ))}
                </span>
                <span className="gg-kicker id-card__kicker id-card__kicker--peach">01 · WEBSITE DEVELOPMENT</span>
                <span className="id-card__title">A website that works as hard as you do.</span>
                <span className="id-card__body">
                  <Resp long={bento.dev.text} short={bento.dev.short} />
                </span>
                <span className="id-card__link">
                  View service <Icon name="arrow-up-right" size={16} stroke={2.2} />
                </span>
              </LinkedCard>

              <div className="id-bento__right">
                <div className="id-bento__row">
                  <LinkedCard href="/services/seo" className="id-card id-card--mint">
                    <span className="id-card__top">
                      <span className="id-card__chip">
                        <Icon name="trend" size={24} stroke={2} />
                      </span>
                      <Tag>INCLUDED</Tag>
                    </span>
                    <span className="gg-kicker id-card__kicker">02 · SEO FOUNDATIONS</span>
                    <span className="id-card__title id-card__title--m">{bento.seo.title}</span>
                    <span className="id-card__body">{bento.seo.body}</span>
                    <span className="id-card__link">
                      View service <Icon name="arrow-up-right" size={16} stroke={2.2} />
                    </span>
                  </LinkedCard>
                  <LinkedCard href="/services#full-service" className="id-card id-card--lilac">
                    <span className="id-card__top">
                      <span className="id-card__chip">
                        <Icon name="shield" size={24} stroke={2} />
                      </span>
                      <Tag>MONTHLY</Tag>
                    </span>
                    <span className="gg-kicker id-card__kicker">03 · FULL SERVICE</span>
                    <span className="id-card__title id-card__title--m">{bento.full.title}</span>
                    <span className="id-card__body">{bento.full.body}</span>
                    <span className="id-card__link">
                      View service <Icon name="arrow-up-right" size={16} stroke={2.2} />
                    </span>
                  </LinkedCard>
                </div>
                <LinkedCard href="/services/google-ads" className="id-card id-card--white">
                  <span className="id-card__top">
                    <span className="id-card__chip">
                      <Icon name="ads" size={24} stroke={2} />
                    </span>
                    <Tag tone="coral">GROWTH</Tag>
                  </span>
                  <span className="gg-kicker id-card__kicker">04 · GOOGLE ADS</span>
                  <span className="id-card__title id-card__title--m">{bento.ads.title}</span>
                  <span className="id-card__body">
                    <Resp long={bento.ads.body} short={bento.ads.short} />
                  </span>
                  <span className="id-card__link">
                    View service <Icon name="arrow-up-right" size={16} stroke={2.2} />
                  </span>
                </LinkedCard>
              </div>
            </div>
          </div>
        </section>

        {/* 07 Payment band */}
        <section className="hm-section hm-section--canvas id-pay" aria-labelledby="id-pay-title">
          <div className="gg-wrap">
            <div className="id-payband" data-reveal="fade-up">
              <div className="id-payband__copy">
                <div className="id-payband__head">
                  <Tag tone="plum">PRICING</Tag>
                  <h2 id="id-pay-title">Every project is one fixed price.</h2>
                </div>
                <div className="id-payband__buttons">
                  <ButtonLink href="/pricing" variant="primary" className="id-payband__btn">
                    See pricing
                  </ButtonLink>
                  <ButtonLink href="/services" variant="outline" className="id-payband__btn">
                    View every service
                  </ButtonLink>
                </div>
              </div>
              <div className="id-payband__tiles" data-reveal="line-mask">
                <div className="id-tile id-tile--lilac">
                  <span className="gg-kicker">OPTION A</span>
                  <SplitHeading as="p" className="id-tile__big" text="50 / 50" />
                  <span className="id-tile__sub">
                    <Resp long="Deposit to start, the rest on completion." short="Deposit, then the rest on completion." />
                  </span>
                </div>
                <div className="id-tile id-tile--blush">
                  <span className="gg-kicker">OPTION B</span>
                  <SplitHeading as="p" className="id-tile__big" text="12×" />
                  <span className="id-tile__sub">
                    <Resp long="Spread it over 12 monthly instalments." short="12 monthly instalments." />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 08 FAQ */}
        <section className="hm-section hm-section--surface" aria-labelledby="id-faq-title">
          <div className="gg-wrap hm-faq">
            <div className="hm-faq__intro">
              <SectionHeader
                id="id-faq-title"
                tag={view.faq.tag}
                heading={view.faq.heading}
                headingClass="gg-h2-side hm-h2"
                sub="More answers on the FAQ page."
                subClassName="hm-hide-phone"
                cta={
                  <ButtonLink href="/faq" variant="outline">
                    All FAQs
                  </ButtonLink>
                }
              />
            </div>
            <div className="hm-faq__list" data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as CSSProperties}>
              <FaqAccordion items={faqItems} tone="lilac" onSurface />
            </div>
          </div>
        </section>
      </div>

      <GradientCta variant="inner" tag="READY WHEN YOU ARE" sub={view.ctaSub} refSource={ref} />
      <StickyBar startHref={startHref} email={site.email} />
    </GgShell>
  );
}
