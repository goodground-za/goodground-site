"use client";

import Link from "next/link";

import { useAmbientMotion, MotionToggle } from "./AmbientVideo";

/**
 * The opening screen: ambient video, headline, and a control to stop the motion.
 *
 * The motion logic lives in useAmbientMotion (AmbientVideo.tsx) so the inner
 * pages' PageHero can run the same clip without a second copy of it. The video
 * element and the toggle stay inline here rather than using <AmbientVideo />,
 * because this hero's toggle belongs in the bottom bar beside the scroll link
 * and the social links, not floated in a corner.
 */
export function Hero() {
  const { videoRef, paused, toggle } = useAmbientMotion();

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
        <MotionToggle paused={paused} onToggle={toggle} />
      </div>
    </section>
  );
}
