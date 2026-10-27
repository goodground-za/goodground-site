"use client";

import { useEffect, useRef } from "react";

const SRC = "/home2026/goodground-motion.mp4";
const POSTER = "/home2026/goodground-motion-poster.jpg";

/**
 * The hero's animated gradient, behind the Home CTA card.
 *
 * The file is only fetched once the card is within 400px of the viewport (on
 * Home the hero has already cached it). It plays only while the card is on
 * screen, the tab is visible and motion is allowed, which follows the
 * hero's rule: a "Pause motion" click (html[data-motion]) wins, otherwise
 * prefers-reduced-motion decides. Paused or without JS, the poster shows.
 */
export function CtaVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const allowed = () => html.dataset.motion === "on" || (html.dataset.motion !== "off" && !reduce.matches);
    const sync = () => {
      if (onScreen && !document.hidden && allowed() && video.getAttribute("src")) {
        // Autoplay refused: the poster stays, nothing to repair.
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loader.disconnect();
        video.src = SRC;
        sync();
      },
      { rootMargin: "400px 0px" },
    );
    const viewer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    const motionFlag = new MutationObserver(sync);

    loader.observe(video);
    viewer.observe(video);
    motionFlag.observe(html, { attributes: true, attributeFilter: ["data-motion"] });
    reduce.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      loader.disconnect();
      viewer.disconnect();
      motionFlag.disconnect();
      reduce.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="gg-cta__video"
      muted
      loop
      playsInline
      preload="none"
      poster={POSTER}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
