"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

/**
 * FAQ accordion — one answer open at a time, everywhere. First item open by
 * default.
 *
 * Height animates with the grid-rows technique (gg.css). Closed answers stay
 * in the DOM so search engines read them, but are `inert` so keyboard and
 * screen-reader users only meet the open one. With JS off every answer shows.
 *
 * Keyboard (Home 10 note): Enter/Space toggle, Up/Down move between questions,
 * Home/End jump to the first/last. A `slug` lets /page#faq-{slug} open and
 * scroll to that item.
 *
 * Answers are plain-text paragraphs so the FAQPage JSON-LD can be generated
 * from exactly what renders (pair with <FAQSchema> from components/Schema).
 */
export type FaqItem = { question: string; answer: string[]; slug?: string };

export function FaqAccordion({
  items,
  tone = "lilac",
  onSurface = false,
  numbered = false,
  defaultOpen = 0,
  onOpen,
}: {
  items: FaqItem[];
  /** "lilac" = README default. "home" = Home section 10 (open item stays canvas). */
  tone?: "lilac" | "home";
  /** Closed items on a white section use canvas instead of white. */
  onSurface?: boolean;
  numbered?: boolean;
  defaultOpen?: number | null;
  /** Analytics hook (faq_open). */
  onOpen?: (item: FaqItem, index: number) => void;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // Deep link: #faq-{slug} opens that item.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith("faq-")) return;
    const index = items.findIndex((item) => item.slug && `faq-${item.slug}` === hash);
    if (index < 0) return;
    requestAnimationFrame(() => {
      setOpen(index);
      const el = buttons.current[index];
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120 });
      el.focus({ preventScroll: true });
    });
  }, [items]);

  const toggle = useCallback(
    (index: number) => {
      const opening = open !== index;
      setOpen(opening ? index : null);
      if (!opening) return;
      onOpen?.(items[index], index);

      // If the question would end up above the viewport once the item above
      // it collapses, bring it back into view (120px offset).
      window.setTimeout(() => {
        const el = buttons.current[index];
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < 0) {
          const reduce =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            document.documentElement.dataset.motion === "off";
          window.scrollTo({ top: top + window.scrollY - 120, behavior: reduce ? "auto" : "smooth" });
        }
      }, 420);
    },
    [open, items, onOpen],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const target =
      event.key === "ArrowDown"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowUp"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  const cls = ["gg-faq", tone === "home" && "gg-faq--home", onSurface && "gg-faq--on-surface"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div
            key={item.question}
            id={item.slug ? `faq-${item.slug}` : undefined}
            className={isOpen ? "gg-faq__item is-open" : "gg-faq__item"}
          >
            <h3 className="gg-faq__heading">
              <button
                ref={(el) => {
                  buttons.current[index] = el;
                }}
                type="button"
                id={buttonId}
                className="gg-faq__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {numbered ? (
                  <span className="gg-faq__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className="gg-faq__q">{item.question}</span>
                <span className="gg-faq__chip" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="gg-faq__panel" inert={!isOpen}>
              <div className="gg-faq__panel-inner">
                <div className="gg-faq__answer">
                  {item.answer.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
