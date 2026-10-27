"use client";

import { reopenCookieBanner } from "@/lib/consent";

/** Footer link that reopens the cookie banner (Legal 69:151 note). Looks like its sibling text links. */
export function CookieSettingsLink() {
  return (
    <button type="button" className="gg-text-link gg-footer__cookie" onClick={reopenCookieBanner}>
      Cookie settings
    </button>
  );
}
