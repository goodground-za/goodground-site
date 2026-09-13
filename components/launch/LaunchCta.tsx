"use client";

import { promoEvents } from "@/lib/analytics";
import { launchOffer } from "@/content/websiteLaunch";

/**
 * A primary CTA.
 *
 * It stays an ordinary in-page anchor. The browser handles the scroll, the
 * target carries `scroll-margin-top` so the sticky header never covers it, and
 * the global `prefers-reduced-motion` rule in globals.css already turns smooth
 * scrolling off for anyone who asked for that. No scrollIntoView, no offset
 * maths, and no preventDefault, so the link still works if this component never
 * hydrates.
 *
 * It deliberately does NOT focus the first input. On a phone that opens the
 * keyboard and hides the very form the visitor was sent to look at.
 *
 * The only JavaScript is the analytics event, which carries a placement label
 * and nothing else.
 */
export function LaunchCta({
  placement,
  className = "gg-launch__btn",
  children,
}: {
  /** Where on the page this CTA sits. The only data sent with the event. */
  placement: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={launchOffer.ctaTarget}
      onClick={() => promoEvents.ctaClick(placement)}
    >
      {children ?? launchOffer.cta}
    </a>
  );
}
