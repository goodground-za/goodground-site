"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Availability } from "./data";

/**
 * The page reads the live count once on the server (lib/liveCounters.ts) and
 * shares it with the client pieces (buttons, checker, form, sticky bar), so the
 * pill, the meter, the calendar, the bar and the form can never disagree.
 */
const AvailabilityContext = createContext<Availability | null>(null);

export function AvailabilityProvider({ value, children }: { value: Availability; children: ReactNode }) {
  return <AvailabilityContext.Provider value={value}>{children}</AvailabilityContext.Provider>;
}

export function useAvailability(): Availability {
  const value = useContext(AvailabilityContext);
  if (!value) throw new Error("useAvailability must be used inside <AvailabilityProvider>");
  return value;
}
