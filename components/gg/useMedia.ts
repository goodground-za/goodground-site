"use client";

import { useSyncExternalStore } from "react";

/**
 * A CSS media query as a boolean. False on the server and on the first client
 * render (so hydration matches), then the real value. Use it only to set
 * attributes that must be truthful (aria-expanded on a control that is only a
 * control at one width); layout stays in CSS.
 */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
