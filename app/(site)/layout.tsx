import { HomeChrome } from "@/components/home2026/HomeChrome";
import { HomeFooter } from "@/components/home2026/HomeFooter";
import { RevealObserver } from "@/components/home2026/RevealObserver";
import "@/components/home2026/home2026.css";

/**
 * Chrome for every page except the homepage.
 *
 * Since 2026-09-11 that chrome is the SAME header and footer the homepage
 * uses, not the old <Nav />/<Footer /> pair — one set of components for the
 * whole site, so the two cannot drift apart the way a duplicated nav always
 * eventually does.
 *
 * IMPORTANT — why .home-2026 wraps the header and footer but NOT {children}.
 *
 * home2026.css styles bare elements (a, button, h1-h3, img). Those selectors
 * are (0,1,1) and beat a Tailwind utility like .text-white at (0,1,0), so
 * wrapping a page body in the scope silently overrides the utilities that body
 * was built with — the first attempt did exactly that and turned the pricing
 * page's hero chips into ink-on-ink.
 *
 * So the scope goes around the chrome only. Page bodies keep working on
 * Tailwind plus the repointed tokens in globals.css, which is what carries the
 * new type and colour to them. As each page is redesigned onto the new
 * classes, it opts into the scope itself.
 *
 * Lenis is gone from here. It drove GSAP's ScrollTrigger for the old animated
 * sections; the new design scrolls natively and uses its own
 * IntersectionObserver (RevealObserver), and layering a virtual scroller over
 * that fights it. Any page still relying on ScrollTrigger needs checking as it
 * is redesigned.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="home-2026">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <HomeChrome />
      </div>
      <main id="main">{children}</main>
      <div className="home-2026">
        <HomeFooter />
      </div>
      <RevealObserver />
    </>
  );
}
