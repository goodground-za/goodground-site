import Link from "next/link";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/gg/Button";
import { GgShell } from "@/components/gg/GgShell";
import { Icon } from "@/components/gg/Icon";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { NotFoundTracker } from "@/components/gg/utility/NotFoundTracker";
import "@/components/gg/utility/utility.css";

/**
 * Without its own metadata this page inherited the root layout's default title.
 * No canonical (a page that doesn't exist has no canonical URL); Next already
 * returns a real HTTP 404 and emits noindex for not-found, so no robots field
 * here (setting one produced two competing robots tags).
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Find GoodGround's website development services, work and contact details.",
};

const POPULAR = [
  { label: "Services", href: "/services" },
  { label: "Our work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/**
 * 404 (Figma 100:290 / 100:338). A dark plumDeep page with the dark header
 * variant. It renders GgShell itself: app/not-found.tsx sits at the app root,
 * outside every route group, so it gets the root layout and no group layout.
 *
 * Old live URLs that changed 301 to their new home first (redirects in
 * next.config.ts), so visitors land here only for truly broken links; the
 * tracker below reports those (page_not_found) so they can be found.
 */
export default function NotFound() {
  return (
    <GgShell dark>
      <section className="nf" aria-labelledby="nf-title">
        <div className="gg-wrap nf__grid">
          <div className="nf__copy" data-reveal="header">
            <Tag tone="on-dark" data-part="tag">
              ERROR 404
            </Tag>
            <SplitHeading as="h1" id="nf-title" className="gg-display-l nf__h1" text="THIS ISN’T GOOD GROUND." />
            <p className="gg-lead nf__lead" data-part="sub">
              The page you’re looking for has moved, or never existed. Nothing to build on here, but the rest of the site is solid.
            </p>
            <div className="nf__buttons" data-part="cta">
              <ButtonLink href="/" variant="coral">
                Back to home
              </ButtonLink>
              <ButtonLink href="/start-project?ref=404" variant="light">
                Start your project
              </ButtonLink>
            </div>
          </div>

          <nav className="nf__card" aria-label="Popular pages" data-reveal="fade-up" data-delay={150}>
            <p className="nf__404" aria-hidden="true">
              404
            </p>
            <p className="gg-kicker nf__kicker">POPULAR PAGES</p>
            <ul data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as React.CSSProperties}>
              {POPULAR.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="nf__row">
                    {page.label}
                    <Icon name="chev" size={18} stroke={2.2} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <NotFoundTracker />
    </GgShell>
  );
}
