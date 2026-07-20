"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { motion, AnimatePresence } from "framer-motion";
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

      <AnimatePresence>
        {showBanner ? (
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            role="region"
            aria-label="Cookie consent"
            className="fixed inset-x-0 bottom-0 z-90 p-4 sm:p-6"
          >
            {/* rounded-block + grain matches every other bark surface on the
                site; the peach hairline lifts it off the dark hero bands, which
                otherwise read as one continuous shape on mobile.

                The global :focus-visible ring is ember, which is only 2.75:1
                against bark — under the 3:1 WCAG wants for focus indicators.
                Peach is 13.4:1 here, so override it inside this panel. */}
            <div className="bg-bark text-peach shadow-lift rounded-block grain border-peach/15 mx-auto flex max-w-4xl flex-col gap-5 border p-6 [&_:focus-visible]:outline-peach sm:flex-row sm:items-center sm:gap-8 sm:p-7">
              <p className="text-[14px] leading-relaxed sm:flex-1">
                We&rsquo;d like to use analytics cookies to see which pages people find useful.
                Nothing loads until you agree, and we never sell your data.{" "}
                <Link
                  href="/legal#sec-cookies"
                  className="text-peach underline underline-offset-4 hover:no-underline"
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
