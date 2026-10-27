"use client";

import { useEffect, useState } from "react";

import { terms, getAvailability } from "./data";
import { AvailabilityButton } from "./AvailabilityButton";

/**
 * Launch mobile bar: price and spots left on the left, the CTA on the right.
 * It appears once the hero offer card has scrolled out of view, and hides while
 * the form is on screen or a field has focus (so it never sits between the
 * content and an open keyboard). Below 768px only.
 */
export function StickyBar() {
  const availability = getAvailability();
  const [cardGone, setCardGone] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Measured on scroll, one frame at a time: observers could leave the bar
    // stale after a long jump.
    let frame = 0;
    const update = () => {
      frame = 0;
      const card = document.getElementById("ln-offer-card");
      const form = document.getElementById("check-availability");
      if (card) setCardGone(card.getBoundingClientRect().bottom < 0);
      if (form) {
        const r = form.getBoundingClientRect();
        setFormVisible(r.top < window.innerHeight && r.bottom > 0);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const focusIn = (event: FocusEvent) => {
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select")) setTyping(true);
    };
    const focusOut = () => setTyping(false);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", focusIn);
    document.addEventListener("focusout", focusOut);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", focusIn);
      document.removeEventListener("focusout", focusOut);
    };
  }, []);

  const shown = cardGone && !formVisible && !typing;

  return (
    <div className={shown ? "ln-bar is-on" : "ln-bar"} inert={!shown} role="region" aria-label="This offer">
      <div className="ln-bar__text">
        <p className="ln-bar__price">
          R{terms.monthly} / month
        </p>
        <p className="ln-bar__spots">
          {availability.soldOut
            ? `${availability.month} is fully booked`
            : `${availability.left} of ${availability.total} ${availability.month} spot${availability.left === 1 ? "" : "s"} left`}
        </p>
      </div>
      <AvailabilityButton placement="sticky-bar" short className="ln-bar__cta" />
    </div>
  );
}
