import { SiteShell } from "@/components/home2026/SiteShell";

/**
 * Chrome for every page except the homepage and the 404, both of which live
 * outside this route group and call SiteShell themselves.
 *
 * Since 2026-09-11 that chrome is the SAME header and footer the homepage
 * uses, not the old <Nav />/<Footer /> pair — one set of components for the
 * whole site, so the two cannot drift apart the way a duplicated nav always
 * eventually does. See SiteShell for why the scope wraps the chrome only.
 *
 * Lenis is gone from here. It drove GSAP's ScrollTrigger for the old animated
 * sections; the new design scrolls natively and uses its own
 * IntersectionObserver (RevealObserver), and layering a virtual scroller over
 * that fights it. Any page still relying on ScrollTrigger needs checking as it
 * is redesigned.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
