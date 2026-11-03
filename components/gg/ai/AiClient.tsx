"use client";

import { useEffect, useState } from "react";

import { funnelEvents } from "@/lib/analytics";

/**
 * Analytics for /services/ai-visibility (spec 19): one delegated click handler
 * and one observer, so the server-rendered page stays server-rendered.
 *
 *   ai_cta_click {position}        any [data-ai-cta="hero|included|faq|sticky"], and
 *                                  the "Book a free check" link inside the FAQ
 *   plan_card_click {plan, ref}    any [data-ai-plan] (ref: ai-visibility)
 *   ai_sample_view {ref}           the sample report is 50% visible, once
 *
 * No personal data is ever in an event.
 */
export function AiTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const plan = target.closest<HTMLElement>("[data-ai-plan]");
      if (plan?.dataset.aiPlan) funnelEvents.planCardClick({ plan: plan.dataset.aiPlan, ref: "ai-visibility" });
      const cta = target.closest<HTMLElement>("[data-ai-cta]");
      const position = cta?.dataset.aiCta;
      if (position === "hero" || position === "included" || position === "faq" || position === "sticky") {
        funnelEvents.aiCtaClick({ position });
      } else if (target.closest("#faq .gg-faq__link")) {
        funnelEvents.aiCtaClick({ position: "faq" });
      }
    };
    document.addEventListener("click", onClick);

    const sample = document.getElementById("ai-sample-report");
    let observer: IntersectionObserver | undefined;
    if (sample) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          funnelEvents.aiSampleView({ ref: "ai-visibility" });
        },
        { threshold: 0.5 },
      );
      observer.observe(sample);
    }
    return () => {
      document.removeEventListener("click", onClick);
      observer?.disconnect();
    };
  }, []);

  return null;
}

/**
 * Mobile sticky bar: "Book a free check". Slides up once the hero buttons have
 * scrolled out of view, and hides while the booking form is on screen or a
 * field has focus (so it never sits between the content and the keyboard).
 * Below 768px only. Measured on scroll, one frame at a time.
 */
export function AiStickyBar() {
  const [heroGone, setHeroGone] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>(".ai-hero__buttons");
      const form = document.getElementById("book");
      if (hero) setHeroGone(hero.getBoundingClientRect().bottom < 0);
      if (form) {
        const r = form.getBoundingClientRect();
        setFormVisible(r.top < window.innerHeight && r.bottom > 0);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const focusIn = (event: FocusEvent) => {
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select")) setTyping(true);
    };
    const focusOut = () => setTyping(false);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", focusIn);
    document.addEventListener("focusout", focusOut);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", focusIn);
      document.removeEventListener("focusout", focusOut);
    };
  }, []);

  const shown = heroGone && !formVisible && !typing;

  return (
    <div className={shown ? "ai-sticky is-on" : "ai-sticky"} inert={!shown} role="region" aria-label="Free AI visibility check">
      <a className="ai-sticky__cta" href="#book" data-ai-cta="sticky">
        Book a free check
      </a>
    </div>
  );
}
