"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/site";
import { ButtonLink } from "./Button";
import { LogoLockup } from "./Logo";

/**
 * The comp draws a dark pine bar with rounded bottom corners, inset from the page
 * edges and sitting on the cream field. It stays sticky so the CTA is always
 * reachable, which the comp can't show.
 */
export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock the scroll container (documentElement, since html is the scroller).
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-0 sm:px-5">
      <nav
        aria-label="Main"
        className="bg-pine mx-auto max-w-[1434px] rounded-b-[32px] px-5 sm:px-8"
      >
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="text-peach" aria-label="GoodGround — home">
            <LogoLockup />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-heading text-[15px] font-bold transition-colors duration-150 hover:text-peach ${
                      active ? "text-peach underline decoration-ember decoration-2 underline-offset-8" : "text-peach/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <ButtonLink href="/start-project">Start your project</ButtonLink>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="text-peach -mr-2 grid size-11 cursor-pointer place-items-center rounded-full lg:hidden"
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
        </div>

        <div id="mobile-menu" hidden={!menuOpen} className="border-t border-peach/15 lg:hidden">
          <ul className="py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-heading text-peach block py-3 text-lg font-bold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 pb-2">
              <ButtonLink href="/start-project" size="lg" className="w-full">
                Start your project
              </ButtonLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
