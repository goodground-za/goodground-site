"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/Button";

const STORAGE_KEY = "gg-cookie-consent";
/** Fired on ourselves after a write, since `storage` only fires in *other* tabs. */
const CHANGE_EVENT = "gg-cookie-consent-change";

type Consent = "granted" | "denied";
/** "unread" = server render / pre-hydration, where localStorage isn't readable. */
type State = Consent | "unread" | "undecided";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  // Keeps a second tab in sync if the visitor answers there.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Holds the answer when localStorage is unavailable (private mode, blocked
 * storage). Without it the banner would never dismiss for those visitors,
 * because the write silently fails and the next read finds nothing.
 * Page-lifetime only — they get asked again on the next load.
 */
let fallback: Consent | null = null;

function getSnapshot(): State {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private mode / storage blocked — fall back to the in-memory answer.
  }
  const value = stored ?? fallback;
  return value === "granted" || value === "denied" ? value : "undecided";
}

// Snapshots are plain strings, so React's identity check is a value check —
// no caching needed to keep this stable between renders.
const getServerSnapshot = (): State => "unread";

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
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function choose(value: Consent) {
    fallback = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage blocked — `fallback` carries the choice for this page view.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  // No measurement ID means nothing can set a cookie, so asking for consent
  // would be theatre — and it would train visitors to dismiss a banner that
  // does nothing. Keeps dev and preview builds clean too.
  const showBanner = consent === "undecided" && Boolean(gaId);

  return (
    <>
      {gaId && consent === "granted" ? <GoogleAnalytics gaId={gaId} /> : null}

      {showBanner ? (
        // CSS-only mount animation (step-in, globals.css) rather than framer-motion:
        // this component sits in the root layout, so pulling in framer-motion here
        // shipped it to every page on the site just for one banner, not only the
        // two pages (/about, /pricing) that actually need it. No exit animation
        // (dismiss just unmounts) — an imperceptible trade for a lighter bundle
        // sitewide.
        // bottom-[78px] on mobile clears MobileStickyBar (70.5px tall,
        // md:hidden), which otherwise sits underneath this banner at the
        // same bottom-0 edge and gets fully hidden by it (higher z-index,
        // taller). Reverts to bottom-0 at md, where that bar doesn't
        // render — safe-area inset applies only there, so the banner
        // still clears the home-indicator gesture bar when it's the
        // bottommost fixed element.
        <div
          role="region"
          aria-label="Cookie consent"
          className="motion-safe:animate-[step-in_0.28s_var(--ease-out)] fixed inset-x-0 bottom-[78px] z-90 p-4 sm:p-6 md:bottom-0 md:pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          {/* rounded-block matches every other dark purple surface on the
              site; the white hairline lifts it off the dark hero bands, which
              otherwise read as one continuous shape on mobile. Focus rings are
              handled globally now (two-tone purple+cream ring in globals.css),
              so no per-panel override is needed here. */}
          <div className="bg-ht-purple shadow-lift rounded-block border-white/15 mx-auto flex max-w-4xl flex-col gap-5 border p-6 text-white sm:flex-row sm:items-center sm:gap-8 sm:p-7">
            <p className="text-[14px] leading-relaxed sm:flex-1">
              We&rsquo;d like to use analytics cookies to see which pages people find useful.
              Nothing loads until you agree, and we never sell your data.{" "}
              <Link
                href="/legal#sec-cookies"
                className="underline underline-offset-4 hover:no-underline"
              >
                Read our cookie policy
              </Link>
              .
            </p>
            {/* Equal-width on mobile so neither choice is visually weighted;
                natural width once they sit beside the copy. */}
            <div className="flex shrink-0 gap-3 *:flex-1 sm:*:flex-none">
              <Button variant="outline" onClick={() => choose("denied")}>
                Decline
              </Button>
              <Button variant="ember" onClick={() => choose("granted")}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
