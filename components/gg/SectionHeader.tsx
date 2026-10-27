import type { ReactNode } from "react";

import { SplitHeading } from "./SplitHeading";
import { Tag, type TagTone } from "./Tag";

/**
 * Tag + heading (+ sub-copy, + CTA), with HEADER REVEAL.
 *
 * `split` puts the sub-copy/CTA in a right-hand column on desktop, aligned to
 * the bottom of the heading; it stacks below 1200px.
 *
 * The heading must be plain text (with `\n` for a forced break): the motion
 * helper re-splits it into rendered lines, and anything richer would be lost.
 */
export function SectionHeader({
  tag,
  tagTone = "neutral",
  heading,
  headingLevel = 2,
  headingClass = "gg-h2",
  sub,
  cta,
  layout = "stacked",
  onDark = false,
  id,
  className,
}: {
  tag?: string;
  tagTone?: TagTone;
  heading: string;
  headingLevel?: 2 | 3;
  headingClass?: string;
  sub?: ReactNode;
  cta?: ReactNode;
  layout?: "stacked" | "split";
  onDark?: boolean;
  id?: string;
  className?: string;
}) {
  const H = headingLevel === 3 ? "h3" : "h2";

  const subNode = sub ? (
    <p className="gg-section-header__sub gg-lead" data-part="sub">
      {sub}
    </p>
  ) : null;
  const ctaNode = cta ? <div data-part="cta">{cta}</div> : null;

  const cls = [
    "gg-section-header",
    layout === "split" && "gg-section-header--split",
    onDark && "gg-section-header--on-dark",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} data-reveal="header">
      <div className="gg-section-header__copy">
        {tag ? (
          <Tag tone={onDark && tagTone === "neutral" ? "on-dark" : tagTone} data-part="tag">
            {tag}
          </Tag>
        ) : null}
        <SplitHeading as={H} id={id} className={headingClass} text={heading} />
        {layout === "stacked" ? subNode : null}
        {layout === "stacked" ? ctaNode : null}
      </div>
      {layout === "split" && (subNode || ctaNode) ? (
        <div className="gg-section-header__aside">
          {subNode}
          {ctaNode}
        </div>
      ) : null}
    </div>
  );
}
