"use client";

import { promoEvents } from "@/lib/analytics";

import { ButtonLink, type ButtonStyle } from "../Button";
import { getAvailability } from "./data";

/**
 * Every "Check availability" on the page (it becomes "Join the {Next month}
 * waitlist" when the month is full). It is a plain in-page link, so it still
 * works if this never hydrates; on top of that it smooth-scrolls (the page's
 * own scroll-behavior) and, with a mouse, focuses the name field once the form
 * is in view. On a phone it does not focus, because that opens the keyboard
 * over the form the visitor was sent to read.
 */
export function AvailabilityButton({
  placement,
  variant = "coral",
  full = false,
  short = false,
  className,
}: {
  placement: string;
  variant?: ButtonStyle;
  full?: boolean;
  /** "Join waitlist" instead of "Join the {Month} waitlist" where space is tight. */
  short?: boolean;
  className?: string;
}) {
  const availability = getAvailability();
  const label = availability.soldOut && short ? "Join waitlist" : availability.cta;

  return (
    <ButtonLink
      href="#check-availability"
      variant={variant}
      full={full}
      className={className}
      onClick={() => {
        promoEvents.ctaClick(placement);
        if (window.matchMedia("(pointer: fine)").matches) {
          window.setTimeout(() => document.getElementById("ln-name")?.focus({ preventScroll: true }), 700);
        }
      }}
    >
      {label}
    </ButtonLink>
  );
}
