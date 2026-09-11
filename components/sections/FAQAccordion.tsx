import Link from "next/link";
import { faq, type FAQItem } from "@/content/faq";

const ARROW = "↗︎";

/**
 * The site's shared FAQ block, rebuilt 2026-09-11 onto the homepage's design.
 *
 * Same structure as the homepage's section 08: eyebrow and heading on the
 * left, a bordered list of native <details> on the right, numbered, with a
 * plus that becomes a minus. Native disclosure means no JavaScript, so this
 * went from a client component driving GSAP tweens to a server component.
 *
 * Defaults to the sitewide content/faq.ts list, and accepts its own
 * `items`/`heading`/`moreHref` so service and industry pages reuse the
 * mechanics with segment-specific questions rather than near-duplicating it.
 * The "all questions" link only appears when the list was actually truncated,
 * so a page never links to a shorter version of itself.
 */
export function FAQAccordion({
  items,
  limit,
  heading = "Everything you need to know",
  eyebrow = "FAQ",
  moreHref = "/faq",
  moreLabel = "Find all questions here",
  className = "",
}: {
  items?: FAQItem[];
  limit?: number;
  heading?: string;
  eyebrow?: string;
  moreHref?: string;
  moreLabel?: string;
  className?: string;
} = {}) {
  const source = items ?? faq;
  const visible = limit ? source.slice(0, limit) : source;
  const truncated = limit ? source.length > limit : false;
  // The design closes headings with an orange full stop, so a heading written
  // with its own trailing period gets it moved rather than doubled.
  const stem = heading.replace(/\.+$/, "");

  return (
    <div className={className ? `home-2026 ${className}` : "home-2026"}>
      <section className="faq section-light section-pad" aria-labelledby="faq-accordion-title">
        <div className="wrap faq-layout">
          <div className="faq-intro">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-heading" id="faq-accordion-title">
              {stem}
              <span className="accent-text">.</span>
            </h2>
            {truncated ? (
              <Link className="text-link" href={moreHref}>
                {moreLabel} <span aria-hidden="true">{ARROW}</span>
              </Link>
            ) : null}
          </div>

          <div className="faq-list">
            {visible.map((item, i) => (
              <details key={item.question}>
                <summary>
                  <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.question}</h3>
                  <span className="faq-symbol" aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p>
                    {item.answer ??
                      "We’re still working this one out. Ask us directly and we’ll tell you straight."}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
