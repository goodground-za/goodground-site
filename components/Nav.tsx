"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navLinks } from "@/content/site";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";

/**
 * Transparent over the dark hero band every page opens with; past 80px of
 * scroll it shrinks, blurs its background, and picks up a shadow. Entrance
 * (slide down + fade) plays once on mount, gated behind prefers-reduced-motion
 * like every other GSAP timeline on the site. Promoted from the approved
 * /home-test variant's HomeTestNav — now the site's only nav.
 */
export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  /**
   * Light variant for pages that open on a cream band instead of the dark
   * ht-purple one the rest of the site starts with. The default treatment
   * paints the logo white (brightness-0 invert) over a transparent bar, which
   * is invisible on cream, so this is a correctness requirement on those
   * pages rather than a style preference.
   *
   * Currently just the homepage, whose hero is the cream split layout.
   * Route-keyed rather than prop-driven because Nav is mounted once in the
   * root layout and individual pages cannot pass it props; make it a proper
   * per-page setting if a third page ever needs it.
   */
  const light = pathname === "/";

  // Close the mobile menu when the route changes. Adjusted during render
  // (React's documented pattern for "reset state when a prop changes")
  // rather than in an effect, which avoids an extra render pass.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { y: -32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.1 },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <header ref={navRef} className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1600px] items-center justify-between rounded-full px-5 py-3 transition-[background-color,backdrop-filter,box-shadow,padding] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          light
            ? `bg-white shadow-[0_10px_30px_-16px_rgba(46,24,72,0.45)] ${scrolled ? "py-2.5" : ""}`
            : scrolled
              ? "bg-ht-purple/85 py-2.5 shadow-[0_12px_32px_-12px_rgba(46,24,72,0.5)] backdrop-blur-md"
              : "bg-transparent"
        }`}
      >
        <Link href="/" aria-label="GoodGround — home" className="shrink-0">
          {/* brightness-0 invert: renders the mark white in both nav states
              (transparent-over-hero and scrolled-purple) on every page, since
              every page now opens on a dark ht-purple band. */}
          <Image
            src="/logos/gg-horizontal.svg"
            alt="GoodGround"
            width={140}
            height={26}
            className={`h-6 w-auto sm:h-7 ${light ? "" : "brightness-0 invert"}`}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    light
                      ? `font-ht-display rounded-pill inline-block px-4 py-2 text-[15px] font-bold transition-colors duration-200 ${
                          active ? "text-ht-orange" : "text-ht-crimson hover:text-ht-orange"
                        }`
                      : `font-ht-display rounded-pill inline-block px-4 py-2 text-[12px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03] ${
                          active ? "bg-ht-orange text-ink" : "text-ht-crimson bg-white"
                        }`
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <MagneticButton>
              {/* text-ink, not white: white on this orange measures 3.48:1,
                  under the 4.5:1 AA bar at 12px bold. ink clears it at
                  5.86:1 without touching the client's orange. */}
              <Link
                href="/start-project"
                className={
                  light
                    ? "font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-6 py-3 text-[15px] font-bold transition-transform duration-200 hover:scale-[1.03]"
                    : "bg-ht-orange text-ink rounded-pill inline-block px-5 py-2 text-[12px] font-bold tracking-wide uppercase shadow-[0_8px_20px_-6px_rgba(254,67,26,0.6)] transition-transform duration-200 hover:scale-[1.03]"
                }
              >
                {light ? "Start your project" : "Start Your Project"}
              </Link>
            </MagneticButton>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={`-mr-1 grid size-11 cursor-pointer place-items-center rounded-full lg:hidden ${
            light ? "text-ht-purple" : "text-white"
          }`}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!menuOpen} className="bg-ht-purple mx-auto mt-2 max-w-[1600px] rounded-3xl px-6 py-4 lg:hidden">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              // Active link stays ht-orange, not crimson: this menu sits on the
              // dark ht-purple panel, where orange is 4.50:1 (passes) and
              // crimson would drop to 2.41:1.
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-ht-display block py-3 text-lg font-bold uppercase ${
                    active ? "text-ht-orange" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 pb-1">
            <Link
              href="/start-project"
              className="bg-ht-orange text-ink rounded-pill block px-5 py-3 text-center text-[13px] font-bold tracking-wide uppercase"
            >
              Start Your Project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
