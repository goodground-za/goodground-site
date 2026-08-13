"use client";

import { useState } from "react";

/**
 * Explicit share icons rather than gating everything behind the Web Share
 * API — navigator.share isn't supported on desktop Safari/Firefox, and a
 * South African small-business audience shares by WhatsApp more than
 * anything else, so that needs to always be visible, not hidden behind
 * feature detection. Copy Link covers every other case (email, Slack, etc.).
 */
export function ShareButtons({
  url,
  title,
  className = "",
  dark = false,
}: {
  url: string;
  title: string;
  className?: string;
  /** Use light-on-dark styling when placed on the purple hero band. */
  dark?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const links = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: "M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.35 5.05L2 22l5.13-1.32C8.55 21.48 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.94 13.66c-.21.6-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.07-4.25-3.68-4.38-3.85-.13-.17-1.05-1.4-1.05-2.67 0-1.27.66-1.9.9-2.16.21-.23.46-.28.61-.28.15 0 .3 0 .43.01.14.01.32-.05.5.38.2.48.66 1.66.72 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.11.5.14.25.6 1 1.29 1.62.89.79 1.63 1.04 1.88 1.16.25.12.4.1.55-.06.15-.16.63-.73.8-.98.17-.25.33-.2.56-.12.23.08 1.44.68 1.68.8.24.12.4.18.46.28.06.1.06.58-.15 1.18z",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: "M18.9 2H22l-7.2 8.3L23 22h-6.6l-5.2-6.8L5 22H2l7.7-8.8L1 2h6.7l4.7 6.2L18.9 2zm-1.2 18h1.8L7.4 4H5.5l12.2 16z",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: "M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3zM6.5 7.7A1.7 1.7 0 1 1 6.5 4.3a1.7 1.7 0 0 1 0 3.4zM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V19h-3V9h2.9v1.3h.04c.4-.7 1.4-1.6 2.9-1.6 3.1 0 3.6 2 3.6 4.6V19z",
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (permissions, non-HTTPS); nothing to recover
      // to, the button simply won't show the "Copied" state.
    }
  }

  const buttonClass = dark
    ? "text-white/70 border-white/25 hover:border-white hover:text-white"
    : "text-ht-purple/70 border-ht-purple/20 hover:border-ht-orange hover:text-ht-crimson";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`text-[13px] font-medium ${dark ? "text-white/70" : "text-ht-purple/70"}`}>Share</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          className={`grid size-9 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150 ${buttonClass}`}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
            <path d={link.icon} />
          </svg>
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className={`grid size-9 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150 ${buttonClass}`}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 13 4 4L19 7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a4 4 0 0 0 5.66 0l2.34-2.34a4 4 0 0 0-5.66-5.66l-1 1" />
            <path d="M14 11a4 4 0 0 0-5.66 0L6 13.34a4 4 0 0 0 5.66 5.66l1-1" />
          </svg>
        )}
      </button>
    </div>
  );
}
