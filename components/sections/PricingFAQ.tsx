"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { pricingFaq, type PricingFaqItem } from "@/content/pricing";

/**
 * Same accordion mechanics as FAQAccordion (GSAP height-tween, matchMedia
 * reduced-motion gate) but with its own pricing-specific question set —
 * FAQAccordion is hard-wired to content/faq.ts and its own heading copy, so
 * this is a small sibling rather than a forced-generic prop on that one.
 */
export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-ht-pink overflow-hidden rounded-[40px] px-6 py-16 sm:rounded-[56px] sm:px-10 md:py-20">
      <RevealSection className="mx-auto max-w-[1000px]">
        <p className="font-ht-display text-ht-purple text-center text-[13px] font-bold tracking-[0.15em] uppercase">
          Common questions
        </p>
        <h2 className="font-ht-display text-ht-purple mt-6 text-center text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase">
          Before you send that enquiry.
        </h2>

        <RevealStagger className="mt-10 space-y-5" y={16}>
          {pricingFaq.map((item, i) => (
            <PricingFAQRow key={item.question} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </RevealStagger>
      </RevealSection>
    </section>
  );
}

function PricingFAQRow({ item, isOpen, onToggle }: { item: PricingFaqItem; isOpen: boolean; onToggle: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const panelId = `pricing-faq-panel-${item.question.slice(0, 12).replace(/\W/g, "")}`;

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
          <span className="font-ht-display flex-1 text-[15px] font-bold sm:text-[16px]">{item.question}</span>
          <span aria-hidden="true" className="text-ht-crimson border-ht-orange/40 grid size-7 shrink-0 place-items-center rounded-full border-2">
            <svg ref={iconRef} viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
        </button>
      </h3>

      <div ref={panelRef} id={panelId} className="h-0 overflow-hidden">
        <p className="font-ht-body text-ht-purple/70 max-w-[80ch] px-6 pb-6 text-[15px] leading-[1.7] sm:px-8">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
