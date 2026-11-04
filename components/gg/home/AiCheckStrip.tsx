"use client";

import Link from "next/link";

import { funnelEvents } from "@/lib/analytics";

import { ArrowChip } from "../LinkedCard";

/**
 * Home 03: the blush strip under the pricing card. One link to the free AI
 * visibility check; fires ai_cta_click {position: home}.
 */
export function AiCheckStrip() {
  return (
    <Link
      href="/services/ai-visibility?ref=home#book"
      className="hm-aistrip"
      onClick={() => funnelEvents.aiCtaClick({ position: "home" })}
      data-reveal="fade-up"
      data-delay={250}
    >
      <span className="hm-aistrip__text">
        <strong>Does ChatGPT recommend you?</strong>
        <span>Book a free AI visibility check</span>
      </span>
      <ArrowChip size={32} className="hm-aistrip__chip" />
    </Link>
  );
}
