import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ArticleCover } from "@/components/gg/ArticleCover";
import { Button, ButtonLink } from "@/components/gg/Button";
import { CountUp } from "@/components/gg/CountUp";
import { FaqAccordion, type FaqItem } from "@/components/gg/FaqAccordion";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { Icon, ICON_NAMES } from "@/components/gg/Icon";
import { ArrowChip, LinkedCard } from "@/components/gg/LinkedCard";
import { SectionHeader } from "@/components/gg/SectionHeader";
import { Tag } from "@/components/gg/Tag";

import { SheetDemo } from "./SheetDemo";
import "./styleguide.css";

/**
 * /_styleguide — every redesign foundation component next to its Figma
 * reference (public/styleguide-ref/, exported from file PI4P3fF9RVIAiTI7ZMxohj).
 *
 * Private: noindex, disallowed in robots.ts, absent from the sitemap and
 * linked from nowhere. The folder is `%5Fstyleguide` because a plain
 * `_styleguide` folder is a private (non-routed) folder in the app router.
 */
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  ["canvas", "#F7F7F4"],
  ["surface", "#FFFFFF"],
  ["ink", "#111111"],
  ["muted", "#5F5B66"],
  ["line", "#E7E3DC"],
  ["plum", "#2E1848"],
  ["plum-deep", "#1C0F2E"],
  ["wine", "#712344"],
  ["coral", "#EF4A23"],
  ["coral-text", "#C2300E"],
  ["coral-fill", "#D0340F"],
  ["peach", "#F7B48F"],
  ["lilac", "#EEE8F6"],
  ["blush", "#FCEDE6"],
  ["mint", "#E3F1EA"],
  ["on-dark-muted", "#BDB3CB"],
] as const;

// Copy from the Service detail (SEO) frame, 96:266. Answers 02–05 are not
// written in Figma (open item 11); these stand-ins are for the styleguide only.
const SERVICE_FAQ: FaqItem[] = [
  {
    question: "Do you offer SEO as a standalone service, or only with a new website?",
    answer: [
      "SEO foundations come standard with every website we build. If you already have a site, Advanced SEO and site speed optimisation are available as standalone add-ons, from R3,000 and confirmed in a quote. We audit the existing site first so the quote reflects what it actually needs.",
    ],
    slug: "standalone-seo",
  },
  { question: "How long does SEO take to show results?", answer: ["Styleguide placeholder. Live copy goes here."] },
  { question: "Do you do local SEO for my town specifically?", answer: ["Styleguide placeholder. Live copy goes here."] },
  {
    question: "What’s the difference between SEO foundations and Advanced SEO?",
    answer: ["Styleguide placeholder. Live copy goes here."],
  },
  { question: "Can you fix SEO on a site you didn’t build?", answer: ["Styleguide placeholder. Live copy goes here."] },
];

// Home section 10 (7:141).
const HOME_FAQ: FaqItem[] = [
  {
    question: "How do the two payment options work?",
    answer: [
      "We agree one fixed price up front. Then choose: a 50% deposit and 50% on completion, or 12 equal monthly instalments where the first secures your booking and the other 11 start once the project is complete.",
    ],
  },
  { question: "Is there a deposit before you start?", answer: ["Styleguide placeholder. Live copy goes here."] },
  {
    question: "What happens if the scope changes partway through?",
    answer: ["Styleguide placeholder. Live copy goes here."],
  },
];

const SMALL_CARDS = [
  { kicker: "FLAGSHIP", title: "Website development", href: "/services#website-development", plum: true },
  { kicker: "EXISTING SITES", title: "Website redesign", href: "/services/website-redesign" },
  { kicker: "DESIGN", title: "UX & design", href: "/services/ux-design" },
  { kicker: "GROWTH", title: "Google Ads", href: "/services/google-ads" },
  { kicker: "GROWTH", title: "Meta Ads", href: "/services/meta-ads" },
];

function Block({ title, node, refs, children }: { title: string; node: string; refs?: string[]; children: ReactNode }) {
  return (
    <section className="sg-block" aria-label={title}>
      <div className="sg-row">
        <h2 className="gg-title-l">{title}</h2>
        <Tag tone="plum">{`Figma ${node}`}</Tag>
      </div>
      <div className="sg-pair">
        <div className="sg-stack">{children}</div>
        {refs?.length ? (
          <div className="sg-ref">
            <p className="gg-kicker gg-muted">FIGMA REFERENCE</p>
            {refs.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={`/styleguide-ref/${src}`} alt={`Figma reference: ${title}`} loading="lazy" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <GgShell crumbs={[{ label: "STYLEGUIDE", href: "/_styleguide" }, { label: "FOUNDATIONS" }]}>
      <div className="gg-wrap gg-section">
        <div className="sg-stack" style={{ gap: 20, paddingBottom: 24 }}>
          <Tag>00 / FOUNDATIONS</Tag>
          <h1 className="gg-display-m">Redesign styleguide</h1>
          <p className="gg-lead gg-muted" style={{ maxWidth: 640 }}>
            Build step 1: tokens, type, motion and the shared components, each beside its Figma frame. Private page
            (noindex).
          </p>
        </div>

        <Block title="Site header" node="95:160" refs={["header.png"]}>
          <p className="gg-body gg-muted">
            Rendered at the top of this page (light variant, breadcrumb pill). The breadcrumb pill hides below 768px.
            MENU opens the live menu dialog, restyled.
          </p>
        </Block>

        <Block title="Colour" node="GoodGround Color">
          <div className="sg-swatches" style={{ width: "100%" }}>
            {SWATCHES.map(([name, hex]) => (
              <div key={name} className="sg-swatch">
                <span style={{ background: `var(--gg-${name})` }} />
                <span>
                  <strong>{name}</strong> {hex}
                </span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Type" node="README 2.2">
          <p className="gg-display-xl">Growth</p>
          <p className="gg-display-l">Page title</p>
          <p className="gg-display-m">Display M</p>
          <p className="gg-h2">Section heading, sentence case.</p>
          <p className="gg-h2-side">Side heading for a column.</p>
          <p className="gg-title-l">Card title large</p>
          <p className="gg-title-m">Card title medium</p>
          <p className="gg-lead">Lead copy. Custom-coded business websites for South African businesses.</p>
          <p className="gg-body">Body copy. One fixed price; 50% deposit and 50% on completion, or 12 monthly instalments.</p>
          <p className="gg-small gg-muted">Small / meta · 248 KB · uploaded</p>
          <p className="gg-kicker">Kicker / label</p>
        </Block>

        <Block title="Button" node="2:38" refs={["buttons.png"]}>
          <div className="sg-stack" style={{ padding: 24, borderRadius: 20, background: "var(--gg-lilac)" }}>
            <ButtonLink href="/start-project">Start your project</ButtonLink>
            <ButtonLink href="/start-project" variant="light">
              Start your project
            </ButtonLink>
            <ButtonLink href="/start-project" variant="coral">
              Start your project
            </ButtonLink>
            <ButtonLink href="/start-project" variant="outline">
              Start your project
            </ButtonLink>
          </div>
          <div style={{ width: "100%", maxWidth: 350 }}>
            <Button full>Full width (mobile)</Button>
          </div>
          <ButtonLink href="mailto:hello@goodground.co.za" variant="coral">
            hello@goodground.co.za
          </ButtonLink>
        </Block>

        <Block title="Tag" node="2:49" refs={["tags.png"]}>
          <div className="sg-row">
            <Tag>Flagship</Tag>
            <Tag tone="dark">Flagship</Tag>
            <Tag tone="coral">Flagship</Tag>
            <Tag tone="plum">Flagship</Tag>
          </div>
          <div className="sg-row sg-on-dark">
            <Tag tone="on-dark">Flagship</Tag>
            <Tag tone="on-dark">01 / GoodGround</Tag>
          </div>
        </Block>

        <Block title="Icons" node="icon/*">
          <div className="sg-icons" style={{ width: "100%" }}>
            {ICON_NAMES.map((name) => (
              <figure key={name}>
                <Icon name={name} size={24} />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
        </Block>

        <Block title="Section header (split)" node="95:244" refs={["section-header.png"]}>
          <SectionHeader
            layout="split"
            tag="WHY IT MATTERS"
            heading="Most SEO problems aren’t exotic."
            sub="They’re ordinary things done wrong or skipped entirely. Fixing the ordinary things properly does more for most small businesses than any exotic tactic."
          />
        </Block>

        <Block title="Section header (stacked, with CTA)" node="96:226">
          {/* 420 wide, the Related reading column in 96:226. */}
          <div style={{ width: "100%", maxWidth: 420 }}>
          <SectionHeader
            tag="RELATED READING"
            heading="Before you spend a rand on SEO, read this."
            headingClass="gg-h2-side"
            cta={
              <ButtonLink href="/insights" variant="outline">
                All insights
              </ButtonLink>
            }
          />
          </div>
        </Block>

        <Block title="Linked card — article" node="96:235" refs={["linked-card-article.png"]}>
          <LinkedCard href="/insights" className="sg-article-card">
            <div className="gg-card__cover">
              <ArticleCover topic="websites" />
            </div>
            <div className="sg-article-card__body">
              <Tag tone="plum">Websites</Tag>
              <h3 className="gg-title-m">
                The biggest website mistakes South African SMEs make (and how to fix them)
              </h3>
              <p className="gg-body gg-muted">
                Most small business websites don’t fail because they look bad. They fail for duller reasons: nobody can
                find them, they’re slow on a phone, and they never ask anyone to do anything.
              </p>
              <span className="sg-article-card__more">
                Read the article <Icon name="arrow-up-right" size={16} stroke={2.2} />
              </span>
            </div>
          </LinkedCard>
        </Block>

        <Block title="Linked card — tinted row" node="96:311" refs={["linked-card-small.png"]}>
          <div className="sg-small-cards" style={{ width: "100%" }}>
            {SMALL_CARDS.map((card) => (
              <LinkedCard
                key={card.title}
                href={card.href}
                className={`sg-small-card ${card.plum ? "gg-card--plum" : "gg-card--tint"}`}
              >
                <span className="sg-small-card__top">
                  <span className="gg-kicker" style={{ fontSize: 11 }}>
                    {card.kicker}
                  </span>
                  <ArrowChip size={32} />
                </span>
                <span className="gg-title-m">{card.title}</span>
              </LinkedCard>
            ))}
          </div>
        </Block>

        <Block title="Article cover" node="41:177" refs={["covers.png"]}>
          <div className="sg-stack" style={{ width: "100%", maxWidth: 400 }}>
            <ArticleCover topic="websites" />
            <ArticleCover topic="growth" />
            <ArticleCover topic="pricing" />
          </div>
        </Block>

        <Block title="FAQ accordion — numbered (service / FAQ page)" node="96:266" refs={["faq-service.png"]}>
          {/* 700 wide, as the accordion column is in both frames. */}
          <div style={{ width: "100%", maxWidth: 700 }}>
            <FaqAccordion items={SERVICE_FAQ} numbered />
          </div>
        </Block>

        <Block title="FAQ accordion — Home tone, on white" node="7:141" refs={["faq-home.png"]}>
          <div className="sg-faq-home" style={{ width: "100%", maxWidth: 748 }}>
            <FaqAccordion items={HOME_FAQ} tone="home" />
          </div>
        </Block>

        <Block title="Count-up" node="12:150">
          <div className="sg-row" style={{ gap: 48 }}>
            <span className="gg-number sg-count">
              <CountUp to={20} suffix="+" />
            </span>
            <span className="gg-number sg-count">
              <CountUp to={12000} prefix="R" />
            </span>
            <span className="gg-number sg-count">
              <CountUp to={5} decimals={1} />
            </span>
          </div>
        </Block>

        <Block title="Bottom sheet" node="21:344">
          <SheetDemo />
        </Block>

        <Block title="Gradient CTA — inner (Industry / Service)" node="96:348" refs={["cta-inner.png"]}>
          <p className="gg-body gg-muted">Rendered full width below.</p>
        </Block>
      </div>

      <GradientCta variant="inner" refSource="styleguide" />

      <div className="gg-wrap">
        <Block title="Gradient CTA — Home + canonical footer" node="7:210" refs={["cta-home-footer.png"]}>
          <p className="gg-body gg-muted">Rendered full width below, followed by the site footer.</p>
        </Block>
      </div>

      <GradientCta refSource="styleguide" />
    </GgShell>
  );
}
