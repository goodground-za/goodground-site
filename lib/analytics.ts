/**
 * Consent-safe analytics events.
 *
 * The site loads GA4 only after the visitor accepts cookies, and only when
 * NEXT_PUBLIC_GA_ID is set (components/Analytics.tsx gates the <GoogleAnalytics>
 * render rather than using Consent Mode, so with no consent the script never
 * mounts and `window.gtag` never exists).
 *
 * That makes the check below the consent check. If gtag is absent the event is
 * dropped silently, which is the correct behaviour for a declined visitor, a
 * preview deploy with no measurement ID, and a blocked script alike. No new
 * provider, no queue, no retry.
 *
 * PRIVACY. Never pass a name, an email address, a business name or free text
 * from the enquiry form into these payloads. The parameter type below only
 * accepts strings, numbers and booleans, and every call site in the promotion
 * passes fixed values such as a placement label.
 */

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: EventParams) => void;
  }
}

export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", name, params);
  } catch {
    // Analytics must never break a form submission.
  }
}

/**
 * The four events for the Website Launch promotion.
 *
 * `promoLeadSuccess` is the conversion, and it is fired ONLY after the server
 * has confirmed the enquiry was accepted and delivered. A CTA click is not a
 * lead. The caller guards it so it fires once per page view.
 */
export const promoEvents = {
  ctaClick: (placement: string) => trackEvent("promo_cta_click", { placement }),
  formStart: () => trackEvent("promo_form_start"),
  leadSuccess: () => trackEvent("promo_lead_success"),
  formError: (reason: "validation" | "network" | "server") =>
    trackEvent("promo_form_error", { reason }),
};
