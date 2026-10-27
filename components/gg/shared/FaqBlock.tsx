import type { CSSProperties } from "react";

import { FaqAccordion, type FaqItem } from "../FaqAccordion";
import { SectionHeader } from "../SectionHeader";

/**
 * Two-column FAQ section used on most pages: tag + heading on the left, the
 * accordion on the right (stacked on tablet and phones). One answer open at a
 * time, the first open on load. Pair with <FAQSchema> from components/Schema
 * where the page should emit FAQPage JSON-LD.
 */
export function FaqBlock({
  tag = "FAQ",
  heading,
  sub,
  items,
  tone = "plain",
  id = "faq",
  className,
}: {
  tag?: string;
  heading: string;
  sub?: string;
  items: FaqItem[];
  tone?: "lilac" | "home" | "plain";
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={className ? `hm-faq ${className}` : "hm-faq"}>
      <div className="hm-faq__intro">
        <SectionHeader tag={tag} heading={heading} headingClass="gg-h2-side hm-h2" sub={sub} />
      </div>
      <div className="hm-faq__list" data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as CSSProperties}>
        <FaqAccordion items={items} tone={tone} />
      </div>
    </div>
  );
}
