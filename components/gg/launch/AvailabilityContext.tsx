"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { useLiveCounters } from "../useLiveCounters";
import { buildAvailability, type Availability } from "./availability";

/**
 * The page is static: it builds the availability from the typed count
 * (content/newBusinessOffer.ts) and shares it with the client pieces (buttons,
 * checker, form, sticky bar), so the pill, the meter, the calendar, the bar and
 * the form can never disagree. After load, LiveAvailabilityProvider swaps in the
 * live count from GET /api/offer-spots, and every piece follows it together.
 */
const AvailabilityContext = createContext<Availability | null>(null);

export function AvailabilityProvider({ value, children }: { value: Availability; children: ReactNode }) {
  return <AvailabilityContext.Provider value={value}>{children}</AvailabilityContext.Provider>;
}

/** Provides `initial` (typed) until the live count arrives, then the live availability. */
export function LiveAvailabilityProvider({ initial, children }: { initial: Availability; children: ReactNode }) {
  const live = useLiveCounters();
  const value = useMemo(() => (live ? buildAvailability({ ...live.offer, source: "redis" }) : initial), [live, initial]);
  return <AvailabilityProvider value={value}>{children}</AvailabilityProvider>;
}

export function useAvailability(): Availability {
  const value = useContext(AvailabilityContext);
  if (!value) throw new Error("useAvailability must be used inside <AvailabilityProvider>");
  return value;
}
