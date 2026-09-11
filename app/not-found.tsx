import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/home2026/SiteShell";
import { navLinks } from "@/content/site";

/**
 * Without its own metadata this page inherited the root layout's default title,
 * so a 404 showed "Website Development in South Africa | GoodGround" in the tab
 * — identical to the homepage.
 *
 * No canonical (a page that doesn't exist has no canonical URL) and no robots
 * field: Next already emits noindex on not-found, and setting it here produced
 * two competing <meta name="robots"> tags.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Find GoodGround's website development services, work and contact details.",
};

/**
 * 404. Copy verbatim from the copy deck §5, given a branded treatment rather
 * than a cold error, with links out so it is actually useful.
 *
 * It renders SiteShell itself. app/not-found.tsx sits at the app root, outside
 * the (site) route group, so it gets the root layout and NO group layout —
 * which is how it quietly lost its header and footer when the route group was
 * introduced. Rendering the shell here is what keeps them.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Error 404"
        title="This page hasn't taken root"
        intro={
          <>
            The page you&rsquo;re looking for doesn&rsquo;t exist &mdash; but the rest of
            GoodGround does.
          </>
        }
      >
        {/* PageHero already renders its children inside .home-2026, so the
            homepage’s own .button classes resolve here. */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="button button-orange" href="/">
            <span>Back to home</span>
            <span className="button-arrow" aria-hidden="true">
              {"↗︎"}
            </span>
          </Link>
          <Link className="button button-white" href="/start-project">
            <span>Start your project</span>
            <span className="button-arrow" aria-hidden="true">
              {"↗︎"}
            </span>
          </Link>
        </div>

        <nav aria-label="Popular pages" className="mt-12 border-t border-white/15 pt-6">
          <p className="font-ht-body text-[13px] font-medium tracking-[0.12em] text-white/60 uppercase">
            Or head somewhere useful
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-ht-body rounded-pill inline-block border border-white/25 px-4 py-2 text-[14px] font-medium text-white/85 transition-colors duration-150 hover:border-white hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>
    </SiteShell>
  );
}
