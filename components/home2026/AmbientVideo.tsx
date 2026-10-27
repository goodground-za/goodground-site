"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The ambient clip and its motion control, lifted out of Hero so inner pages
 * can run the same opening without a second copy of the logic.
 *
 * Three behaviours from the delivered script.js survive here, because each one
 * is easy to lose in a rewrite:
 *
 *  - A manual click on the toggle OVERRIDES the system preference from then on.
 *    Someone who turns motion back on has said what they want, and a later
 *    prefers-reduced-motion change must not silently undo it.
 *  - If autoplay is refused (common on metered or low-power devices), it does
 *    not retry or nag — it settles into the paused state and the poster stays.
 *  - A click on the toggle writes <html data-motion="off|on"> and stores it
 *    under `gg-motion` in localStorage. The redesign's motion system
 *    (components/gg) reads that flag on every page, and the head script in
 *    app/layout.tsx re-applies the stored value before paint.
 *
 * Only one of these may be live per page: they share that <html> flag. That
 * holds naturally — the homepage has the Hero, an inner page has PageHero.
 */
const MOTION_KEY = "gg-motion";

export function useAmbientMotion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Starts paused under reduced motion. Resolved in an effect rather than at
  // render so the server and the first client paint agree.
  const [paused, setPaused] = useState(false);
  const manualPreference = useRef(false);
  // Mirrors `paused` so the visibilitychange listener below reads the live
  // value without being torn down and rebuilt on every toggle.
  const pausedRef = useRef(paused);

  // Drives the video from whatever the current state is.
  const applyMotion = useCallback((next: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    if (next || document.hidden) {
      video.pause();
      return;
    }
    void video.play().catch(() => {
      // Autoplay refused. The poster is already showing, so there is nothing
      // to repair — just reflect reality in the control.
      setPaused(true);
    });
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // A choice made with the toggle on an earlier visit wins over the system
    // setting, exactly as a click in this visit does. The head script in
    // app/layout.tsx has already applied it to <html data-motion>.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(MOTION_KEY);
    } catch {}
    if (stored === "off" || stored === "on") manualPreference.current = true;
    setPaused(manualPreference.current ? stored === "off" : query.matches);

    const onPreferenceChange = () => {
      if (!manualPreference.current) setPaused(query.matches);
    };
    const onVisibility = () => applyMotion(pausedRef.current);

    query.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [applyMotion]);

  useEffect(() => {
    pausedRef.current = paused;
    applyMotion(paused);
  }, [paused, applyMotion]);

  // Only a deliberate click writes the site-wide flag. A refused autoplay or
  // the system setting pause the video but say nothing about the visitor's
  // wishes, so they must not switch off motion on every other page.
  const toggle = useCallback(() => {
    manualPreference.current = true;
    const next = !pausedRef.current;
    document.documentElement.dataset.motion = next ? "off" : "on";
    try {
      localStorage.setItem(MOTION_KEY, next ? "off" : "on");
    } catch {}
    setPaused(next);
  }, []);

  return { videoRef, paused, toggle };
}

/**
 * The clip plus its own toggle, for callers that want the whole thing.
 *
 * Hero does not use this — its toggle sits in the hero's bottom bar alongside
 * the scroll link and the social links — but it shares the hook above, so the
 * motion logic exists once.
 */
export function MotionToggle({
  paused,
  onToggle,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className ? `motion-toggle ${className}` : "motion-toggle"}
      /* No aria-label. The visible text already names this exactly, and an
         aria-label of "Pause background motion" would NOT contain the visible
         "Pause motion" — WCAG 2.5.3 Label in Name, and a real problem for
         anyone driving the page by voice. The icon beside it is aria-hidden,
         so the accessible name is the label text. */
      onClick={onToggle}
    >
      <span className="motion-icon" aria-hidden="true">
        {/* U+25B7 / U+2161, each with a U+FE0E text selector — without it the
            system emoji font claims the glyph on mobile and draws it in
            colour. Written as escapes so the invisible selector cannot be
            lost to an editor or a copy-paste. */}
        {paused ? "\u25B7\uFE0E" : "\u2161"}
      </span>
      <span className="motion-label">{paused ? "Play motion" : "Pause motion"}</span>
    </button>
  );
}

export function AmbientVideo() {
  const { videoRef, paused, toggle } = useAmbientMotion();

  return (
    <>
      <div className="hero-media">
        <video
          ref={videoRef}
          className="ambient-video"
          muted
          loop
          playsInline
          preload="auto"
          poster="/home2026/goodground-motion-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/home2026/goodground-motion.mp4" type="video/mp4" />
        </video>
      </div>
      <MotionToggle paused={paused} onToggle={toggle} className="page-hero__motion" />
    </>
  );
}
