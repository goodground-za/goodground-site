import type { CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { Icon, type IconName } from "../Icon";
import { ArrowChip, LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";
import { Tag } from "../Tag";

const FULL_SERVICE_ROWS = [
  "Website & updates",
  "Hosting & SSL",
  "Business mailboxes",
  "SEO monitoring",
  "Maintenance & backups",
];

const BENEFITS = ["Emergency call-outs", "Free quotes in 24h", "4.9 ★ on Google"];

type Small = {
  icon: IconName;
  title: string;
  href: string;
  tag: string;
  tone: "plum" | "neutral";
  long: string;
  short: string;
};

const SMALL: Small[] = [
  {
    icon: "layout",
    title: "UX & design",
    href: "/services/ux-design",
    tag: "INCLUDED",
    tone: "plum",
    long: "Every page designed around how your customers actually decide.",
    short: "Designed around how customers decide.",
  },
  {
    icon: "search",
    title: "SEO foundations",
    href: "/services/seo",
    tag: "INCLUDED",
    tone: "plum",
    long: "Built to be found, not just built to look nice.",
    short: "Built to be found, not just to look nice.",
  },
  {
    icon: "target",
    title: "Google Ads",
    href: "/services/google-ads",
    tag: "GROWTH",
    tone: "neutral",
    long: "Be there the moment someone searches for you.",
    short: "Be there the moment they search.",
  },
  {
    icon: "users",
    title: "Meta Ads",
    href: "/services/meta-ads",
    tag: "GROWTH",
    tone: "neutral",
    long: "Stay in front of the people deciding whether to trust you.",
    short: "Stay in front of people deciding to trust you.",
  },
];

/**
 * Home 04. HEADER REVEAL, then the flagship and Full service cards FADE-UP
 * 100ms apart, then the four small cards as a STAGGER GRID. Each card is one
 * link (LinkedCard); the reveal sits on a wrapper so the card's own hover
 * transform and transition stay untouched.
 */
export function ServicesBento() {
  return (
    <section className="hm-section hm-section--canvas" aria-labelledby="services-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="services-title"
          layout="split"
          tag="02 / WHAT WE BUILD"
          heading="Everything your website needs, from one connected team."
          headingClass="gg-h2 hm-h2"
          sub={
            <Resp
              long="Strategy, design, development and growth handled together, so nothing gets lost between suppliers."
              short="Strategy, design, development and growth handled together."
            />
          }
          cta={<ButtonLink href="/services" variant="outline">All services</ButtonLink>}
          ctaClassName="hm-hide-phone"
        />

        <div className="hm-svc-grid">
          <div className="hm-svc-top">
            <div className="hm-svc-wrap" data-reveal="group">
              <LinkedCard href="/services#website-development" className="hm-svc hm-svc--flagship">
                <div className="hm-svc__intro">
                  <Tag tone="coral">FLAGSHIP</Tag>
                  <ArrowChip size={44} className="hm-svc__chip" />
                  <div className="hm-svc__copy">
                    <h3 className="hm-svc__title">Website development</h3>
                    <p>Custom-built, fast, and made to grow with your business.</p>
                  </div>
                </div>
                <div className="hm-mock" aria-hidden="true">
                  <div className="hm-mock__bar">
                    <i />
                    <i />
                    <i />
                    <span>yourbusiness.co.za</span>
                  </div>
                  <div className="hm-mock__body">
                    <div className="hm-mock__main">
                      <p className="hm-mock__headline">
                        Your business,
                        <br />
                        found first.
                      </p>
                      <span className="hm-mock__skel" />
                      <span className="hm-mock__skel hm-mock__skel--short" />
                      <span className="hm-mock__cta">Get a quote</span>
                    </div>
                    <div className="hm-mock__chips">
                      {BENEFITS.map((text, i) => (
                        <span key={text} className={i === 1 ? "hm-mock__chip hm-mock__chip--wide" : "hm-mock__chip"} style={{ "--gg-i": i } as CSSProperties}>
                          <Icon name="check" size={14} stroke={2.4} />
                          {text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </LinkedCard>
            </div>

            <div className="hm-svc-wrap" data-reveal="group" data-delay={100}>
              <LinkedCard href="/services#full-service" className="hm-svc hm-svc--full">
                <div className="hm-svc__intro">
                  <Tag tone="coral">MONTHLY</Tag>
                  <ArrowChip size={36} className="hm-svc__chip hm-svc__chip--phone" />
                  <div className="hm-svc__copy">
                    <h3 className="hm-svc__title">Full service</h3>
                    <p>Build, hosting, mailboxes, SEO and maintenance, all for one monthly price.</p>
                  </div>
                </div>
                <div className="hm-statement" aria-hidden="true">
                  <div className="hm-statement__head">
                    <strong>This month</strong>
                    <span>All covered</span>
                  </div>
                  {FULL_SERVICE_ROWS.map((row, i) => (
                    <div key={row} className="hm-statement__row" style={{ "--gg-i": i } as CSSProperties}>
                      <svg className="hm-statement__tick" viewBox="0 0 24 24" width="14" height="14" focusable="false">
                        <path d="M20 6 9 17l-5-5" pathLength="1" />
                      </svg>
                      <span>{row}</span>
                    </div>
                  ))}
                </div>
              </LinkedCard>
            </div>
          </div>

          <div className="hm-svc-small" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
            {SMALL.map((card) => (
              <LinkedCard key={card.href} href={card.href} className="hm-svc hm-svc--small">
                <div className="hm-svc__top">
                  <span className="hm-svc__icon">
                    <Icon name={card.icon} size={24} stroke={2} />
                  </span>
                  <Tag tone={card.tone} className="hm-hide-phone">
                    {card.tag}
                  </Tag>
                </div>
                <div className="hm-svc__small-copy">
                  <h3 className="hm-svc__small-title">{card.title}</h3>
                  <p>
                    <Resp long={card.long} short={card.short} />
                  </p>
                </div>
              </LinkedCard>
            ))}
          </div>
        </div>

        <div className="hm-phone-only">
          <ButtonLink href="/services" variant="outline">
            All services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
