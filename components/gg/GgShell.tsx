import type { ReactNode } from "react";

import "./home/home.css";
import { GgMotion } from "./motion/GgMotion";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader, type Crumb } from "./SiteHeader";

/**
 * Page chrome for the redesign: skip link, header, <main>, footer, motion
 * helper, all inside the `.gg` scope. Rebuilt pages use this instead of the
 * home2026 SiteShell as they move over, one by one.
 *
 * The CTA card is NOT part of the shell: some pages don't have one, and the
 * footer's `ruled` option is for exactly those.
 */
export function GgShell({
  children,
  crumbs,
  dark = false,
  footer = {},
}: {
  children: ReactNode;
  crumbs?: Crumb[];
  dark?: boolean;
  footer?: { ruled?: boolean; stickyBar?: boolean };
}) {
  return (
    <div className="gg">
      <a className="gg-skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader crumbs={crumbs} dark={dark} />
      <main id="main">{children}</main>
      <SiteFooter {...footer} />
      <GgMotion />
    </div>
  );
}
