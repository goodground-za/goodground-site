"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * Fires the page-level CTA events for Service detail and Industry pages without
 * making every button a client component. It listens for clicks and reads
 * marker attributes the server-rendered links carry:
 *
 *   data-cta="hero|cta|sticky"   -> {event} { slug, position, track }
 *   data-ai-cta="industry-search" -> ai_cta_click { position }
 *   data-addon-cta                -> addon_cta_click { slug }
 *
 * `event` is service_cta_click or industry_cta_click; `track` is the page's
 * primaryTrack (local | custom | check). Values are fixed labels: no personal
 * data (lib/analytics.ts privacy note). Renders nothing.
 */
export function CtaTracker({ event, slug, track }: { event: "service_cta_click" | "industry_cta_click"; slug: string; track: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const cta = target?.closest<HTMLElement>("[data-cta]");
      if (cta) trackEvent(event, { slug, position: cta.dataset.cta ?? "", track });
      const ai = target?.closest<HTMLElement>("[data-ai-cta]");
      if (ai) trackEvent("ai_cta_click", { position: ai.dataset.aiCta ?? "" });
      if (target?.closest("[data-addon-cta]")) trackEvent("addon_cta_click", { slug });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [event, slug, track]);
  return null;
}
