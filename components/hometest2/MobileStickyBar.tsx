"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Mobile-only sticky conversion bar. Appears once the visitor has scrolled
 * past roughly one viewport height (i.e. the hero), matching the brief's
 * "after the hero leaves the viewport" spec without needing to coordinate
 * with the Hero component directly.
 */
export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`bg-ht-purple/95 motion-reduce:transition-none fixed inset-x-0 bottom-0 z-50 flex gap-2 p-3 backdrop-blur-sm transition-transform duration-300 ease-[var(--ease-out)] md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/start-project"
        className="font-ht-display bg-ht-orange text-ink rounded-pill flex-1 py-3 text-center text-[15px] font-bold"
      >
        Start your project
      </Link>
      <a
        href={site.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-ht-display border-ht-pink text-ht-cream rounded-pill flex items-center justify-center border-2 px-4 text-[13px] font-bold tracking-wide uppercase"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.8-.1-.3 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.6-1.5-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.5-.3z" />
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" />
        </svg>
      </a>
    </div>
  );
}
