"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/gg/Button";
import { Icon } from "@/components/gg/Icon";
import { REOPEN_EVENT, setConsent, useConsent, type Consent } from "@/lib/consent";

/**
 * Note on pageviews: <GoogleAnalytics> only injects the gtag snippet — it does
 * not subscribe to the router. Client-side navigations are counted by GA4's
 * Enhanced Measurement ("page changes based on browser history events"), which
 * is on by default. If that setting is ever disabled, pageviews after the first
 * hard load stop silently and this component needs an explicit page_view event.
 *
 * POPIA-shaped consent: GA4 sets cookies, so nothing loads until the visitor
 * says yes. We gate the <GoogleAnalytics> render rather than using Google's
 * Consent Mode — with the script never mounting, no cookie is written and no
 * request leaves the browser, which is a much easier promise to defend than
 * "we sent a request but flagged it as unconsented".
 *
 * The choice lives in localStorage, so the server can't know it. The server
 * snapshot is "unread" rather than "undecided" so the banner isn't baked into
 * the HTML and flashed at visitors who already answered.
 */
export function Analytics({ gaId }: { gaId?: string }) {
  const consent = useConsent();
  // The footer's "Cookie settings" link reopens the banner even after a choice was made.
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(REOPEN_EVENT, open);
    return () => window.removeEventListener(REOPEN_EVENT, open);
  }, []);

  // A script that is already on the page cannot be unloaded; GA's own switch stops it sending.
  useEffect(() => {
    if (!gaId) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = consent === "denied";
  }, [gaId, consent]);

  function choose(value: Consent) {
    setConsent(value);
    setReopened(false);
  }

  // No measurement ID means nothing can set a cookie, so asking for consent
  // would be theatre — and it would train visitors to dismiss a banner that
  // does nothing. Keeps dev and preview builds clean too.
  const showBanner = (consent === "undecided" || (reopened && consent !== "unread")) && Boolean(gaId);

  return (
    <>
      {gaId && consent === "granted" ? <GoogleAnalytics gaId={gaId} /> : null}

      {showBanner ? (
        // Redesign look: a plum card on the .gg scope (tokens, buttons and focus ring come from
        // gg.css, which the root layout loads). CSS-only mount animation, no framer-motion: this sits
        // in the root layout, so a library here would ship to every page. No exit animation (dismiss
        // just unmounts). On phones it clears the sticky bottom bars (Pricing, Industry, Website
        // launch) by sitting above them.
        <div role="region" aria-label="Cookie consent" className="gg gg-cookie">
          <div className="gg-cookie__card">
            <span className="gg-cookie__icon" aria-hidden="true">
              <Icon name="cookie" size={22} stroke={2} />
            </span>
            <p className="gg-cookie__text">
              We’d like to use analytics cookies to see which pages people find useful. Nothing loads until you agree, and we never sell your data.{" "}
              <Link href="/legal#sec-cookies">Read our cookie policy</Link>.
            </p>
            {/* Equal weight, equal width on phones, so neither choice is pushed. */}
            <div className="gg-cookie__actions">
              <Button variant="light" onClick={() => choose("denied")}>
                Decline
              </Button>
              <Button variant="coral" onClick={() => choose("granted")}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
