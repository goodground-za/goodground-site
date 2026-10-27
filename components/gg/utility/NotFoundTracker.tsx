"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * Fires page_not_found {path, referrer} so broken links can be found and
 * redirected. Path only (no query string) and the referrer's origin and path
 * only, so nothing personal rides along. Dropped silently without analytics
 * consent, like every event (lib/analytics.ts).
 */
export function NotFoundTracker() {
  const pathname = usePathname();
  useEffect(() => {
    let referrer = "";
    try {
      if (document.referrer) {
        const url = new URL(document.referrer);
        referrer = `${url.origin}${url.pathname}`;
      }
    } catch {
      /* no usable referrer */
    }
    trackEvent("page_not_found", { path: pathname.slice(0, 200), referrer: referrer.slice(0, 200) });
  }, [pathname]);
  return null;
}
