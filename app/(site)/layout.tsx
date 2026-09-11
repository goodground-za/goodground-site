import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/motion-gsap/LenisProvider";
import { Nav } from "@/components/Nav";

/**
 * Chrome for every page EXCEPT the homepage.
 *
 * It used to live in the root layout, which was fine while every page shared
 * it. The 2026-09 homepage redesign brings its own header, its own footer and
 * its own <main>, so it cannot sit inside this — it would render two of each.
 *
 * Route groups are transparent to routing, so nothing here changes a URL:
 * app/(site)/pricing/page.tsx still serves /pricing.
 *
 * Lenis lives here rather than in the root layout on purpose. It drives
 * GSAP's ScrollTrigger for the animated sections on these pages; the new
 * homepage uses native smooth scroll and its own IntersectionObserver, and
 * layering a virtual scroller over that would fight it.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="bg-ht-purple text-white sr-only rounded-full px-5 py-3 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
      >
        Skip to content
      </a>
      <LenisProvider>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </LenisProvider>
    </>
  );
}
