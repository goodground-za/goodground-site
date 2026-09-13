"use client";

import { useState } from "react";
import { launchMarquee } from "@/content/websiteLaunch";

/**
 * The availability banner across the top of /website-launch.
 *
 * ACCESSIBILITY. Content that moves on its own, runs for more than five seconds
 * and sits beside other content needs a way to stop it (WCAG 2.2.2). Hover is
 * not that mechanism, because a touch user has no hover, so there is a real
 * button. It also pauses on hover and on focus-within for anyone using a
 * pointer or the keyboard, and it renders completely static under
 * prefers-reduced-motion, where the button is not offered because there is
 * nothing to pause.
 *
 * The message is announced ONCE. The visible track repeats it to fill the width
 * and every repeat is aria-hidden, so a screen reader hears "1 slot left for
 * September" rather than it six times over.
 *
 * The text itself is a plain string from content/websiteLaunch.ts. There is no
 * counter, no date arithmetic and no automatic month: a dated availability
 * claim should only ever say what a person last confirmed it says.
 */
export function LaunchMarquee() {
  const [paused, setPaused] = useState(false);

  if (!launchMarquee.enabled) return null;

  // Enough repeats to cover a wide viewport twice over, which is what makes the
  // loop seamless: the track scrolls exactly half its own width.
  const repeats = Array.from({ length: 8 });

  return (
    <div className="gg-launch__marquee" data-paused={paused ? "true" : "false"}>
      <p className="gg-launch__hp">{launchMarquee.message}</p>

      <div className="gg-launch__marquee-viewport">
        <div className="gg-launch__marquee-track" aria-hidden="true">
          {repeats.map((_, i) => (
            <span className="gg-launch__marquee-item" key={i}>
              {launchMarquee.message}
              <span className="gg-launch__marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="gg-launch__marquee-toggle"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> the availability banner</span>
      </button>
    </div>
  );
}
