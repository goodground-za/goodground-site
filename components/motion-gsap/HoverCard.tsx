"use client";

import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, type ElementType } from "react";

/**
 * Card hover treatment: lift + scale + shadow via CSS transitions (cheap,
 * robust, matches how the rest of this codebase already does button/card
 * hovers). Desktop hover only in effect (nothing fires without a
 * `:hover`-capable pointer); mobile substitutes the paired `active:` press
 * state instead.
 */
export function HoverCard({
  children,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as;
  return (
    <Tag
      data-hover-card
      className={`group relative cursor-pointer transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_24px_48px_-16px_rgba(46,24,72,0.35)] active:scale-[1.01] ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Sits inside a `HoverCard` and drifts a few px opposite the cursor,
 * independent of the card's own lift/scale — the "image moves independently
 * from the card" behaviour the brief asks for. Desktop-hover only, and
 * inert under reduced motion.
 */
export function HoverCardImage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    const card = el?.closest<HTMLElement>("[data-hover-card]");
    if (!el || !card || reduced) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * 12);
      yTo(relY * 12);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
