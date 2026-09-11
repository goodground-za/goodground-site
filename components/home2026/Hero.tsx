"use client";

import Link from "next/link";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The opening screen: ambient video, headline, and a control to stop the motion.
 *
 * Ported from the delivered package’s script.js, keeping three behaviours that
 * are easy to lose in a rewrite:
 *
 *  - A manual click on the toggle OVERRIDES the system preference from then on.
 *    Someone who turns motion back on has said what they want, and a later
 *    prefers-reduced-motion change must not silently undo it.
 *  - If autoplay is refused (common on metered or low-power devices), it does
 *    not retry or nag — it settles into the paused state and the poster stays.
 *  - The motion state is written to <html data-motion> because the menu reads
 *    it to decide whether to scroll smoothly or jump.
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Starts paused under reduced motion. Resolved in an effect rather than at
  // render so the server and the first client paint agree.
  const [paused, setPaused] = useState(false);
  const manualPreference = useRef(false);
  // Mirrors `paused` so the visibilitychange listener below reads the live
  // value without being torn down and rebuilt on every toggle.
  const pausedRef = useRef(paused);

  // Drives the element and the <html> flag from whatever the current state is.
  const applyMotion = useCallback((next: boolean) => {
    document.documentElement.dataset.motion = next ? "paused" : "playing";
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
      document.documentElement.dataset.motion = "paused";
    });
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!manualPreference.current) setPaused(query.matches);

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

  return (
    <section className="hero" aria-labelledby="hero-title">
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

      <div className="hero-content wrap">
        <div className="hero-title-block">
          <p className="eyebrow hero-kicker">One team. One connected process.</p>
          <h1 id="hero-title">
            <span className="hero-line">We build websites</span>
            <span className="hero-line">that bring in</span>
            <span className="hero-line">business.</span>
          </h1>
        </div>
        <div className="hero-side">
          <p>
            Custom-coded business websites for South African businesses that need to be
            found, and need to convert.
          </p>
          <Link className="button button-white" href="/start-project">
            <span>Start your project</span>
            <span className="button-arrow" aria-hidden="true">
              ↗︎
            </span>
          </Link>
        </div>
      </div>

      <div className="hero-bottom wrap">
        <a className="scroll-link" href="#about">
          <span className="scroll-icon" aria-hidden="true">
            ↓︎
          </span>
          Scroll to explore
        </a>
        <div className="hero-social">
          <a
            href="https://www.instagram.com/goodground.company"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗︎
          </a>
          <span aria-hidden="true">/</span>
          <a
            href="https://www.facebook.com/share/14jTaX4tHhU/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook ↗︎
          </a>
        </div>
        <button
          type="button"
          className="motion-toggle"
          /* No aria-label. The visible text already names this exactly, and an
             aria-label of "Pause background motion" would NOT contain the
             visible "Pause motion" — WCAG 2.5.3 Label in Name, and a real
             problem for anyone driving the page by voice. The icon beside it
             is aria-hidden, so the accessible name is the label text. */
          onClick={() => {
            manualPreference.current = true;
            setPaused((p) => !p);
          }}
        >
          <span className="motion-icon" aria-hidden="true">
            {paused ? "▷︎" : "Ⅱ"}
          </span>
          <span className="motion-label">{paused ? "Play motion" : "Pause motion"}</span>
        </button>
      </div>
    </section>
  );
}
