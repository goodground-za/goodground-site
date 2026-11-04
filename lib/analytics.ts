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

/**
 * The funnel events. Names and properties are fixed
 * here so a page cannot invent a variant. Properties are whitelisted values
 * only (plan key, offer key, ref, track): never a name, email, phone, business
 * name or free text.
 *
 *   plan_card_click         plan, ref
 *   ai_sample_view          ref
 *   preview_request_sent    plan, offer, ref     (Track A conversion)
 *   enquiry_sent            track, service, package, ref   (Track B / quote)
 *   ai_check_request_sent   ref, town, industry  (Track C; no business name)
 *   ai_check_waitlist_join  ref
 *   ai_cta_click            position
 *   offer_spot_view         month
 *   offer_waitlist_join     month
 */
export const funnelEvents = {
  planCardClick: (p: { plan: string; ref: string }) => trackEvent("plan_card_click", p),
  aiSampleView: (p: { ref: string }) => trackEvent("ai_sample_view", p),
  previewRequestSent: (p: { plan: string; offer: string; ref: string }) => trackEvent("preview_request_sent", p),
  enquirySent: (p: { track: "local" | "custom" | "check"; service?: string; package?: string; ref?: string; plan?: string; intent?: string }) =>
    trackEvent("enquiry_sent", {
      track: p.track,
      service: p.service ?? "none",
      package: p.package ?? "none",
      ref: p.ref ?? "none",
      plan: p.plan ?? "none",
      intent: p.intent ?? "none",
    }),
  aiCheckRequestSent: (p: { ref: string; town?: string; industry?: string }) =>
    trackEvent("ai_check_request_sent", { ref: p.ref, town: p.town ?? "none", industry: p.industry ?? "none" }),
  aiCheckWaitlistJoin: (p: { ref: string }) => trackEvent("ai_check_waitlist_join", p),
  aiCtaClick: (p: { position: "hero" | "included" | "faq" | "sticky" | "home" | "industry-search" | "service-seo" }) => trackEvent("ai_cta_click", p),
  offerSpotView: (p: { month: string }) => trackEvent("offer_spot_view", p),
  offerWaitlistJoin: (p: { month: string }) => trackEvent("offer_waitlist_join", p),
};
