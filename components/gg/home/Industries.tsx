import type { CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { Icon, type IconName } from "../Icon";
import { LinkedCard } from "../LinkedCard";
import { SectionHeader } from "../SectionHeader";

/** Live URLs: /services/{slug} (README section 7). */
const INDUSTRIES: { icon: IconName; title: string; examples: string; slug: string }[] = [
  { icon: "wrench", title: "Trades & home services", examples: "Plumbers, electricians, builders", slug: "trades-and-home-services" },
  { icon: "heart", title: "Health & wellness", examples: "Practices, clinics, studios", slug: "health-and-wellness" },
  { icon: "cup", title: "Hospitality & food", examples: "Restaurants, B&Bs, venues", slug: "hospitality-and-food" },
  { icon: "bag", title: "Retail & small brands", examples: "Shops and product brands", slug: "retail-and-small-brands" },
  { icon: "brief", title: "Professional services", examples: "Consultants, firms, advisors", slug: "professional-and-consulting" },
  { icon: "hand", title: "Non-profits & community", examples: "NPOs, churches, schools", slug: "non-profits-and-community" },
];

/**
 * Home 09. HEADER REVEAL, then six linked cards as a STAGGER GRID (60ms), then
 * the dashed "Not on the list?" card, which says these are only some of the
 * industries. Its button goes to /start-project?ref=industry-other.
 */
export function Industries() {
  return (
    <section className="hm-section hm-section--canvas" aria-labelledby="industries-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="industries-title"
          layout="split"
          tag="07 / ACROSS SOUTH AFRICA"
          heading="Built for the businesses that keep South Africa running."
          headingClass="gg-h2 hm-h2"
          sub="Small and medium businesses where being easy to find and easy to trust decides whether someone gets in touch. Here are some of the industries we work with most."
          subClassName="hm-hide-phone"
        />

        <div className="hm-ind-grid" data-reveal="stagger" style={{ "--gg-stagger-step": "60ms" } as CSSProperties}>
          {INDUSTRIES.map((industry) => (
            <LinkedCard key={industry.slug} href={`/services/${industry.slug}`} className="hm-ind">
              <span className="hm-ind__icon">
                <Icon name={industry.icon} size={28} stroke={2} />
              </span>
              <span className="hm-ind__text">
                <span className="hm-ind__title">{industry.title}</span>
                <span className="hm-ind__examples">{industry.examples}</span>
              </span>
              <span className="hm-ind__go" aria-hidden="true">
                <Icon name="arrow-up-right" size={18} stroke={2.2} className="hm-ind__arrow" />
                <Icon name="chev" size={18} stroke={2.2} className="hm-ind__chev" />
              </span>
            </LinkedCard>
          ))}
        </div>

        <div className="hm-more" data-reveal="fade-up">
          <span className="hm-more__icon" aria-hidden="true">
            <Icon name="plus" size={22} stroke={2.2} />
          </span>
          <div className="hm-more__text">
            <p className="gg-kicker hm-more__kicker">NOT ON THE LIST?</p>
            <h3 className="hm-more__title">These are just some of the industries we work with.</h3>
            <p>If your business needs to be found and trusted online, we can build for it, whatever you do.</p>
          </div>
          <ButtonLink href="/start-project?ref=industry-other" full>
            Tell us about your business
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
