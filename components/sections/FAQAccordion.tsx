"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { faq, type FAQItem } from "@/content/faq";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";

/**
 * Promoted from the approved /home-test variant's FAQAccordion — now the
 * site's shared FAQ component. Defaults to the sitewide content/faq.ts list
 * (homepage's abbreviated `limit={4}` preview, /faq's full list), but also
 * accepts its own `items`/`heading`/`moreHref` so industry pages can reuse
 * the same accordion mechanics with segment-specific questions instead of a
 * near-duplicate component. The "All Questions"-style link only shows when
 * the list has actually been truncated, so a page never links to a shorter
 * version of itself.
 */
export function FAQAccordion({
  items,
  limit,
  heading = "Everything you need to know before you start.",
  moreHref = "/faq",
  moreLabel = "All Questions",
  className = "",
}: {
  items?: FAQItem[];
  limit?: number;
  heading?: string;
  moreHref?: string;
  moreLabel?: string;
  className?: string;
} = {}) {
  const [open, setOpen] = useState<number | null>(null);
  const source = items ?? faq;
  const visible = limit ? source.slice(0, limit) : source;
  const truncated = limit ? source.length > limit : false;

  return (
    <section className={`bg-ht-pink overflow-hidden rounded-[40px] px-6 py-20 sm:rounded-[56px] sm:px-10 md:py-28 ${className}`}>
      <RevealSection className="mx-auto max-w-[1600px]">
        <h2 className="font-ht-display text-ht-purple text-center text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase">
          {heading}
        </h2>

        <RevealStagger className="mx-auto mt-12 max-w-[1000px] space-y-5" y={16}>
          {visible.map((item, i) => (
            <FAQRow key={item.question} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </RevealStagger>

        {truncated ? (
          <div className="mt-10 flex justify-center">
            <Link
              href={moreHref}
              className="font-ht-display bg-white text-ht-purple rounded-pill inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03]"
            >
              {moreLabel}
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
          </div>
        ) : null}
      </RevealSection>
    </section>
  );
}

function FAQRow({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const panelId = `faq-panel-${item.question.slice(0, 12).replace(/\W/g, "")}`;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const icon = iconRef.current;
    if (!panel) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(panel, { height: isOpen ? "auto" : 0, duration: 0.4, ease: "circ.out" });
      if (icon) gsap.to(icon, { rotate: isOpen ? 45 : 0, duration: 0.3, ease: "power2.out" });
      return () => {};
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(panel, { height: isOpen ? "auto" : 0 });
      if (icon) gsap.set(icon, { rotate: isOpen ? 45 : 0 });
      return () => {};
    });

    return () => mm.revert();
  }, [isOpen]);

  return (
    <div className="rounded-card shadow-[0_14px_0_0_var(--color-ht-purple)] overflow-hidden bg-white">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="text-ht-purple flex w-full cursor-pointer items-center gap-6 px-6 py-5 text-left sm:px-8"
        >
          <span className="font-ht-display flex-1 text-[15px] font-bold sm:text-[16px]">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className="text-ht-orange border-ht-orange/40 grid size-7 shrink-0 place-items-center rounded-full border-2"
          >
            <svg ref={iconRef} viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
        </button>
      </h3>

      <div ref={panelRef} id={panelId} className="h-0 overflow-hidden">
        <p
          className={`font-ht-body text-ht-purple/70 max-w-[80ch] px-6 pb-6 text-[15px] leading-[1.7] sm:px-8 ${
            item.answer ? "" : "italic"
          }`}
        >
          {item.answer ?? "We're still working this one out. Ask us directly and we'll tell you straight."}
        </p>
      </div>
    </div>
  );
}
