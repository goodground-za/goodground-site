import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LaunchCta } from "@/components/launch/LaunchCta";
import { LaunchForm } from "@/components/launch/LaunchForm";
import { LaunchIcon, LaunchTick } from "@/components/launch/LaunchIcon";
import { LaunchMarquee } from "@/components/launch/LaunchMarquee";
import { LaunchMotion } from "@/components/launch/LaunchMotion";
import { LaunchOfferBar } from "@/components/launch/LaunchOfferBar";
import { caseStudies, caseStudyKindLabel } from "@/content/caseStudies";
import { site } from "@/content/site";
import {
  launchCapacity,
  launchEnquiry,
  launchFaqs,
  launchHero,
  launchInclusions,
  launchInclusionsIntro,
  launchOffer,
  launchProcess,
  launchRoute,
  launchSummary,
  launchValue,
  launchWork,
} from "@/content/websiteLaunch";
import { pageSocialMeta } from "@/lib/metadata";
import "./launch.css";

/**
 * The Website Launch promotion landing page.
 *
 * ROUTING. It sits outside app/(site)/ deliberately. The brief asks for a
 * compact header focused on this one offer, and the (site) layout renders the
 * full site chrome with its six-item menu. Same reason app/page.tsx and
 * app/not-found.tsx live out here. The URL is unaffected by that choice.
 *
 * STYLING. Everything is namespaced .gg-launch (app/website-launch/launch.css)
 * and reads the shared @theme tokens, so it inherits the brand without being
 * able to reach another route.
 *
 * CONTENT. Every offer value comes from content/websiteLaunch.ts. The price and
 * the eligibility rule are written once each and rendered from there, so there
 * is no second copy to fall out of step. Nothing here is client-rendered: the
 * offer, the inclusions and the FAQs are all in the HTML.
 *
 * ARROWS. U+2197 has an emoji presentation variant that the system emoji font
 * claims on mobile, so every one carries a U+FE0E text selector. Same fix as
 * the rest of the site.
 */

const ARROW = "↗︎";

export const metadata: Metadata = {
  title: { absolute: launchRoute.title },
  description: launchRoute.description,
  alternates: { canonical: launchRoute.path },
  ...pageSocialMeta({
    title: { absolute: launchRoute.title },
    description: launchRoute.description,
    path: launchRoute.path,
  }),
};

/**
 * A Service node, and deliberately no Offer node inside it.
 *
 * The monthly figure is confirmed, but the total payable, the commitment and
 * the schedule are not. A schema Offer carrying `price: 845` states a price for
 * the service as a whole, which would publish a number nobody has agreed to in
 * a format aggregators read literally. Name, description, provider and area are
 * all supported by confirmed facts; nothing else is asserted. No ratings, no
 * FAQPage node (the FAQs are marked up as real disclosure elements and rich
 * results are Google's call, not something to promise).
 */
function LaunchSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: launchOffer.name,
    serviceType: "Website design and development for new businesses",
    description: launchRoute.description,
    url: `${site.url}${launchRoute.path}`,
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    areaServed: { "@type": "Country", name: "South Africa" },
    audience: {
      "@type": "Audience",
      audienceType: "New businesses without an existing website",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const workCards = launchWork.slugs
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

/** Preserves the confirmed order while letting the layout show group headings. */
const groups = launchInclusions.reduce<{ title: string; items: typeof launchInclusions }[]>(
  (acc, item) => {
    const last = acc[acc.length - 1];
    if (last && last.title === item.group) {
      (last.items as unknown as (typeof launchInclusions)[number][]).push(item);
    } else {
      acc.push({ title: item.group, items: [item] as unknown as typeof launchInclusions });
    }
    return acc;
  },
  [],
);

export default function WebsiteLaunchPage() {
  return (
    <div className="gg-launch">
      <LaunchSchema />

      <a className="gg-launch__skip" href="#main">
        Skip to content
      </a>

      <header className="gg-launch__header">
        <div className="gg-launch__wrap gg-launch__header-inner">
          <Link className="gg-launch__brand" href="/" aria-label="GoodGround home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home2026/goodground-logo.svg" width={182} height={30} alt="GoodGround" />
          </Link>
          <nav className="gg-launch__header-nav" aria-label="This offer">
            <a className="gg-launch__header-link" href="#whats-included">
              What&rsquo;s included
            </a>
            <a className="gg-launch__header-link" href="#faqs">
              FAQs
            </a>
            <LaunchCta placement="header" />
          </nav>
        </div>
      </header>

      <LaunchMarquee />

      <main id="main">
        {/* ------------------------------------------------------------ hero */}
        {/* gg-launch__dark as well as __hero: the hero paints its own ink
            background, but the shared "this is a dark surface" rules key off
            that class. Without it the CTA support text picked up the
            light-ground muted grey and measured 2.58:1 on near-black. */}
        <section
          className="gg-launch__hero gg-launch__dark"
          id="gg-launch-hero"
          aria-labelledby="gl-hero-title"
        >
          <div className="gg-launch__wrap">
            <div className="gg-launch__hero-grid">
              <div>
                {/* No offer-name eyebrow: removed 2026-09-13. The name is still
                    the Service schema's `name` and still titles the no-JS
                    confirmation pages, it just no longer opens the hero.

                    The eligibility rule sits with the headline, not in a
                    footnote. It is the first thing that decides whether this
                    page is for the reader at all. */}
                <div className="gg-launch__hero-flag">
                  <span className="gg-launch__flag">{launchOffer.eligibility}</span>
                  <span className="gg-launch__flag gg-launch__flag--quiet">
                    {launchOffer.capacityLine}
                  </span>
                </div>

                <h1 id="gl-hero-title">{launchHero.headline}</h1>
                <p className="gg-launch__hero-lead">{launchHero.lead}</p>

                {/* Price and CTA sit directly under the lead so the first
                    screen answers all four questions the brief asks it to:
                    who it is for, what it is, what it costs and what to do
                    next. The supporting detail follows. This is a DOM reorder,
                    not a CSS one, so the reading order a screen reader gets is
                    the same order everyone sees. */}
                <p className="gg-launch__price">
                  <span className="gg-launch__price-amount">{launchOffer.price}</span>
                  <span className="gg-launch__price-period">{launchOffer.pricePeriod}</span>
                </p>
                <p className="gg-launch__price-fees">{launchOffer.includedFees}</p>

                <div className="gg-launch__hero-actions">
                  <LaunchCta placement="hero" className="gg-launch__btn gg-launch__btn--lg" />
                  <p className="gg-launch__note">{launchOffer.ctaSupport}</p>
                </div>

                <div className="gg-launch__hero-detail">
                  {launchHero.body.map((line) => (
                    <p className="gg-launch__hero-body" key={line}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* An honest preview: GoodGround's own live website, labelled as
                  such, at its real address. No invented client, no invented
                  dashboard, no fabricated numbers. */}
              <div>
                <figure className="gg-launch__preview" style={{ margin: 0 }}>
                  <div className="gg-launch__preview-bar" aria-hidden="true">
                    <span className="gg-launch__preview-dot" />
                    <span className="gg-launch__preview-dot" />
                    <span className="gg-launch__preview-dot" />
                    <span className="gg-launch__preview-url">www.goodground.co.za</span>
                  </div>
                  <Image
                    src="/images/case-goodground-hero.webp"
                    alt="The GoodGround website shown in a browser window, with its headline over a full-width photograph."
                    width={1440}
                    height={900}
                    priority
                    sizes="(max-width: 62rem) 100vw, 45vw"
                  />
                </figure>
                <p className="gg-launch__preview-caption">
                  GoodGround&rsquo;s own website. Built and checked the same way we build a
                  client&rsquo;s.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- value */}
        <section className="gg-launch__section" aria-labelledby="gl-value-title">
          <div className="gg-launch__wrap">
            <div className="gg-launch__value-grid">
              <div data-reveal>
                <p className="gg-launch__eyebrow" style={{ color: "var(--gl-accent-deep)" }}>
                  Why it matters
                </p>
                <h2 className="gg-launch__section-title" id="gl-value-title">
                  {launchValue.heading}
                </h2>
              </div>
              <div className="gg-launch__value-copy" data-reveal data-reveal-index="1">
                {launchValue.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ inclusions */}
        <section
          className="gg-launch__section"
          id="whats-included"
          aria-labelledby="gl-incl-title"
          style={{ paddingTop: 0 }}
        >
          <div className="gg-launch__wrap">
            <div data-reveal>
              <h2 className="gg-launch__section-title" id="gl-incl-title">
                {launchInclusionsIntro.heading}
              </h2>
              {launchInclusionsIntro.body.map((line) => (
                <p className="gg-launch__lede" key={line}>
                  {line}
                </p>
              ))}
              <p className="gg-launch__lede" style={{ fontWeight: 700 }}>
                {launchInclusionsIntro.listHeading}
              </p>
            </div>

            <div style={{ marginTop: "3rem" }}>
              {groups.map((group) => (
                <div className="gg-launch__group" key={group.title}>
                  <h3 className="gg-launch__group-title">{group.title}</h3>
                  <ul className="gg-launch__incl">
                    {group.items.map((item, i) => (
                      <li key={item.title} data-reveal data-reveal-index={i}>
                        <span className="gg-launch__incl-icon">
                          <LaunchIcon name={item.icon} />
                        </span>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2.75rem" }} data-reveal>
              <LaunchCta placement="inclusions" className="gg-launch__btn gg-launch__btn--lg" />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ work */}
        <section
          className="gg-launch__section gg-launch__dark"
          aria-labelledby="gl-work-title"
        >
          <div className="gg-launch__wrap">
            <div data-reveal>
              <p className="gg-launch__eyebrow">Our approach</p>
              <h2 className="gg-launch__section-title" id="gl-work-title">
                {launchWork.heading}
              </h2>
              <p className="gg-launch__lede">{launchWork.body}</p>
            </div>

            <div className="gg-launch__work-grid">
              {workCards.map((study, i) => (
                <Link
                  className="gg-launch__work-card"
                  href={`/work/${study.slug}`}
                  key={study.slug}
                  data-reveal
                  data-reveal-index={i}
                >
                  <span className="gg-launch__work-shot">
                    <Image
                      src={study.image}
                      alt={study.imageAlt}
                      width={1440}
                      height={900}
                      loading="lazy"
                      sizes="(max-width: 48rem) 100vw, 33vw"
                    />
                  </span>
                  <span className="gg-launch__work-meta">
                    <h3>{study.client}</h3>
                    {/* "Concept build" / "Our own site", from the case study
                        data. A concept is never presented as a paying client. */}
                    <span className="gg-launch__work-kind">
                      {caseStudyKindLabel(study.kind)}
                    </span>
                  </span>
                  <p>{study.summary}</p>
                </Link>
              ))}
            </div>

            <div className="gg-launch__work-foot" data-reveal>
              <p style={{ color: "var(--gl-muted-dark)" }}>{launchWork.prompt}</p>
              <Link className="gg-launch__textlink" href={launchWork.linkHref}>
                {launchWork.linkLabel} <span aria-hidden="true">{ARROW}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- capacity */}
        <section
          className="gg-launch__section gg-launch__purple"
          aria-labelledby="gl-capacity-title"
        >
          <div className="gg-launch__wrap">
            <div className="gg-launch__capacity-grid">
              <h2 id="gl-capacity-title" data-reveal>
                {launchCapacity.heading}
              </h2>
              <div data-reveal data-reveal-index="1">
                {launchCapacity.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- summary */}
        <section className="gg-launch__section" aria-labelledby="gl-summary-title">
          <div className="gg-launch__wrap">
            <div data-reveal>
              <p className="gg-launch__eyebrow" style={{ color: "var(--gl-accent-deep)" }}>
                The offer
              </p>
              <h2 className="gg-launch__section-title" id="gl-summary-title">
                {launchSummary.heading}
              </h2>
            </div>

            <div className="gg-launch__panel" data-reveal>
              <div className="gg-launch__panel-top">
                <p className="gg-launch__price" style={{ marginTop: 0 }}>
                  <span className="gg-launch__price-amount">{launchOffer.price}</span>
                  <span className="gg-launch__price-period">{launchOffer.pricePeriod}</span>
                </p>
                <p style={{ color: "#e8e8e6" }}>{launchOffer.includedFees}</p>
              </div>

              <ul className="gg-launch__panel-list">
                {launchSummary.points.map((point) => (
                  <li key={point}>
                    <LaunchTick />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="gg-launch__panel-actions">
                <LaunchCta placement="offer-summary" className="gg-launch__btn gg-launch__btn--lg" />
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- process */}
        <section className="gg-launch__section" aria-labelledby="gl-process-title" style={{ paddingTop: 0 }}>
          <div className="gg-launch__wrap">
            <div data-reveal>
              <p className="gg-launch__eyebrow" style={{ color: "var(--gl-accent-deep)" }}>
                How it works
              </p>
              <h2 className="gg-launch__section-title" id="gl-process-title">
                {launchProcess.heading}
              </h2>
            </div>
            <ol className="gg-launch__steps">
              {launchProcess.steps.map((step, i) => (
                <li key={step.title} data-reveal data-reveal-index={i}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ faqs */}
        <section className="gg-launch__section" id="faqs" aria-labelledby="gl-faq-title" style={{ paddingTop: 0 }}>
          <div className="gg-launch__wrap">
            <h2 className="gg-launch__section-title" id="gl-faq-title" data-reveal>
              {launchFaqs.heading}
            </h2>
            {/* Native disclosure elements: keyboard operable, findable by the
                browser's own in-page search, and working with no JavaScript. */}
            <div className="gg-launch__faqs">
              {launchFaqs.items.map((item) => (
                <details className="gg-launch__faq" key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <span className="gg-launch__faq-sign" aria-hidden="true" />
                  </summary>
                  <p className="gg-launch__faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- enquiry */}
        <section
          className="gg-launch__section gg-launch__dark"
          id="check-availability"
          aria-labelledby="gl-enquiry-title"
        >
          <div className="gg-launch__wrap">
            <div className="gg-launch__enquiry-grid">
              <div className="gg-launch__enquiry-copy">
                <h2 className="gg-launch__section-title" id="gl-enquiry-title">
                  {launchEnquiry.heading}
                </h2>
                {launchEnquiry.body.map((line) => (
                  <p key={line} style={{ marginTop: "1.25rem" }}>
                    {line}
                  </p>
                ))}
              </div>
              <LaunchForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="gg-launch__footer">
        <div className="gg-launch__wrap gg-launch__footer-inner">
          <Link className="gg-launch__brand" href="/" aria-label="GoodGround home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home2026/goodground-logo.svg" width={182} height={30} alt="GoodGround" />
          </Link>
          <div className="gg-launch__footer-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link href="/legal#privacy">Privacy Policy</Link>
            <Link href="/legal#terms">Terms</Link>
          </div>
          <p className="gg-launch__footer-legal">
            &copy; 2026 {site.legalName}. {site.address.locality}, {site.address.region}, South
            Africa.
          </p>
        </div>
      </footer>

      <LaunchOfferBar />
      <LaunchMotion />
    </div>
  );
}
