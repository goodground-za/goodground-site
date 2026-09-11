import type { ReactNode } from "react";

import { HomeChrome } from "./HomeChrome";
import { HomeFooter } from "./HomeFooter";
import { RevealObserver } from "./RevealObserver";
import "./home2026.css";

/**
 * The site's chrome: skip link, header, <main>, footer, reveal observer.
 *
 * One component so the three entry points cannot drift — app/(site)/layout.tsx
 * for every normal page, app/page.tsx for the homepage, and app/not-found.tsx,
 * which is NOT inside the (site) route group and therefore gets no layout of
 * its own. (It silently lost its header and footer when the route group was
 * introduced; this is what stops that happening again.)
 *
 * IMPORTANT — why .home-2026 wraps the header and footer but NOT the body by
 * default. home2026.css styles bare elements (a, button, h1-h3, img). Those
 * selectors are (0,1,1) and beat a Tailwind utility like .text-white at
 * (0,1,0), so wrapping a page body in the scope silently overrides the
 * utilities that body was built with — an early attempt did exactly that and
 * turned the pricing page's hero chips ink-on-ink.
 *
 * `scopeBody` is for pages built entirely on the new classes with no Tailwind
 * left to override. The homepage is the only one today.
 */
export function SiteShell({
  children,
  scopeBody = false,
}: {
  children: ReactNode;
  scopeBody?: boolean;
}) {
  const main = <main id="main">{children}</main>;

  return (
    <>
      <div className="home-2026">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <HomeChrome />
      </div>
      {scopeBody ? <div className="home-2026">{main}</div> : main}
      <div className="home-2026">
        <HomeFooter />
      </div>
      <RevealObserver />
    </>
  );
}
