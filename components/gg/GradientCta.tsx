import type { CSSProperties } from "react";

import { ButtonLink } from "./Button";
import { CtaVideo } from "./CtaVideo";
import { CursorLight } from "./CursorLight";
import { Icon } from "./Icon";
import { SplitHeading } from "./SplitHeading";
import { Tag } from "./Tag";

const EMAIL = "hello@goodground.co.za";

type Action = { label: string; href: string };

/**
 * "GROWTH STARTS HERE." — the gradient CTA card at the end of most pages.
 *
 * Two versions of one component (README 4.7):
 *  - "home" (Home, About, Work, Insights, Article, Case study, Services):
 *    near full-bleed on canvas, the hero's gradient video behind it
 *    (CtaVideo), left-aligned, Light + Coral email buttons, desktop cursor
 *    light.
 *  - "inner" (Industry, Service detail): 1200 wide on white, full CTA
 *    gradient, centred, Light button + email pill.
 *
 * `refSource` is appended to /start-project as ?ref= (listed per page note).
 * `primary` / `secondary` replace the two buttons (Services: "Book a free
 * consultation"); `size="l"` is the 80px headline some pages use; `split`
 * puts the buttons in a column to the right of the copy on desktop.
 */
export function GradientCta({
  variant = "home",
  tag = "GET IN TOUCH",
  headline,
  sub,
  refSource,
  primary,
  secondary,
  size = "xl",
  split = false,
}: {
  variant?: "home" | "inner";
  tag?: string;
  headline?: string;
  sub?: string | null;
  refSource?: string;
  primary?: Action;
  secondary?: Action;
  size?: "xl" | "l";
  split?: boolean;
}) {
  const href = refSource ? `/start-project?ref=${encodeURIComponent(refSource)}` : "/start-project";
  const inner = variant === "inner";
  // The inner card sets the headline on one line and has no sub-copy by
  // default (Service detail 96:348); Home breaks it and adds the line below.
  headline ??= inner ? "GROWTH STARTS HERE." : "GROWTH\nSTARTS HERE.";
  if (sub === undefined && !inner) {
    sub = "Tell us about your business and we’ll come back with a fixed price and a clear plan.";
  }

  const cls = ["gg-cta", `gg-cta--${variant}`, split && "gg-cta--split"].filter(Boolean).join(" ");
  const headlineCls = ["gg-display-xl", "gg-cta__headline", size === "l" && "gg-cta__headline--l"]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={inner ? "gg-cta-section gg-cta-section--inner" : "gg-cta-section"}
      aria-labelledby="gg-cta-heading"
    >
      <div className={cls} data-reveal="header" data-loop="">
        <div className="gg-cta__bg" aria-hidden="true">
          {!inner ? <CtaVideo /> : null}
        </div>
        {!inner ? <CursorLight /> : null}
        <div className="gg-cta__copy">
          <Tag tone="on-dark" data-part="tag">
            {tag}
          </Tag>
          <SplitHeading
            id="gg-cta-heading"
            className={headlineCls}
            text={headline}
            style={{ "--gg-line-step": "120ms", "--gg-line-ms": "900ms" } as CSSProperties}
          />
          {split && sub ? (
            <p className="gg-cta__sub" data-part="sub">
              {sub}
            </p>
          ) : null}
        </div>
        <div className="gg-cta__row">
          {!split && sub ? (
            <p className="gg-cta__sub" data-part="sub">
              {sub}
            </p>
          ) : null}
          <div className="gg-cta__actions" data-part="cta">
            <ButtonLink href={primary?.href ?? href} variant="light" full>
              {primary?.label ?? "Start your project"}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="coral" full>
                {secondary.label}
              </ButtonLink>
            ) : inner ? (
              <a className="gg-pill" href={`mailto:${EMAIL}`}>
                <Icon name="mail" size={18} stroke={2} />
                {EMAIL}
              </a>
            ) : (
              <ButtonLink href={`mailto:${EMAIL}`} variant="coral" full>
                {EMAIL}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
