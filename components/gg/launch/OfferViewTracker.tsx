"use client";

import { useEffect } from "react";

import { funnelEvents } from "@/lib/analytics";

import { useAvailability } from "./AvailabilityContext";

/**
 * Fires offer_spot_view once, when the hero offer card (and its spaces-left meter)
 * is half visible. Renders nothing. The property is the month only.
 */
export function OfferViewTracker() {
  const { month } = useAvailability();

  useEffect(() => {
    const card = document.getElementById("ln-offer-card");
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        funnelEvents.offerSpotView({ month });
      },
      { threshold: 0.5 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [month]);

  return null;
}
