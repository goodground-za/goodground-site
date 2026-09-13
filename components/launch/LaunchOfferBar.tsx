"use client";

import { useEffect, useRef, useState } from "react";
import { launchOffer } from "@/content/websiteLaunch";
import { promoEvents } from "@/lib/analytics";

/**
 * The compact mobile bar: price on the left, CTA on the right.
 *
 * Rules it follows, all from the brief and all worth keeping:
 *  - It appears only once the hero has left view, so it never competes with the
 *    hero's own CTA.
 *  - It hides while the enquiry form is on screen. Offering "Check availability"
 *    on top of the form the visitor is already filling in is noise, and the bar
 *    would sit over the submit button and any error message.
 *  - It hides while any field has focus, so it cannot be trapped between the
 *    content and an open keyboard.
 *  - The page reserves its height in CSS at every width below the bar's
 *    breakpoint, so it never covers the footer or a control even mid-transition.
 *
 * Hidden with a transform rather than display:none so the transition can run;
 * `inert` keeps it out of the tab order and the accessibility tree while it is
 * off screen, which display:none would otherwise have handled.
 */
export function LaunchOfferBar() {
  const [shown, setShown] = useState(false);
  const heroGone = useRef(false);
  const formVisible = useRef(false);
  const fieldFocused = useRef(false);

  useEffect(() => {
    const apply = () =>
      setShown(heroGone.current && !formVisible.current && !fieldFocused.current);

    const hero = document.getElementById("gg-launch-hero");
    const form = document.getElementById("check-availability");

    const observers: IntersectionObserver[] = [];

    if (typeof IntersectionObserver !== "undefined" && hero) {
      const io = new IntersectionObserver(
        ([entry]) => {
          heroGone.current = !entry.isIntersecting;
          apply();
        },
        { threshold: 0 },
      );
      io.observe(hero);
      observers.push(io);
    }

    if (typeof IntersectionObserver !== "undefined" && form) {
      const io = new IntersectionObserver(
        ([entry]) => {
          formVisible.current = entry.isIntersecting;
          apply();
        },
        { threshold: 0 },
      );
      io.observe(form);
      observers.push(io);
    }

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select")) {
        fieldFocused.current = true;
        apply();
      }
    };
    const onFocusOut = () => {
      fieldFocused.current = false;
      apply();
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      observers.forEach((io) => io.disconnect());
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <div
      className="gg-launch__bar"
      data-shown={shown ? "true" : "false"}
      inert={!shown}
      aria-hidden={!shown}
    >
      <span className="gg-launch__bar-price">{launchOffer.priceShort}</span>
      <a
        className="gg-launch__btn"
        href={launchOffer.ctaTarget}
        onClick={() => promoEvents.ctaClick("mobile-bar")}
      >
        {launchOffer.cta}
      </a>
    </div>
  );
}
