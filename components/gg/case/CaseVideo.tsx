"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

type Poster = { src: string; alt: string; width: number; height: number };

/**
 * The case hero's media card (Case study 01). With a walkthrough video it is a
 * poster (preload="none") with a play button; pressing play plays the full clip
 * inline with custom controls: play/pause, a scrub bar (a range input: arrow
 * keys seek 5s, buffered track under the progress), elapsed/total time, mute
 * and fullscreen. Controls fade after 2s without pointer movement and return on
 * move or focus. Without a video it is just the poster and the live-site link.
 *
 * The 8-second muted preview loop in the note needs a separate short clip that
 * does not exist yet, so there is no preview: poster until play.
 */
export function CaseVideo({
  poster,
  videoSrc,
  liveUrl,
  label,
  mobilePoster,
}: {
  poster: Poster;
  videoSrc?: string;
  liveUrl?: string;
  label: string;
  mobilePoster?: Poster;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [controls, setControls] = useState(true);

  const wake = useCallback(() => {
    setControls(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setControls(false), 2000);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const start = () => {
    setStarted(true);
    // The element is mounted by this state change; play once it exists.
    requestAnimationFrame(() => {
      const v = video.current;
      if (!v) return;
      v.currentTime = 0;
      void v.play();
    });
  };

  const fullscreen = () => {
    const el = wrap.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <div className="cs-media" ref={wrap} onPointerMove={started ? wake : undefined} onFocus={started ? wake : undefined}>
      <div className="cs-media__poster">
        <Image
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
          priority
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="cs-media__img"
        />
        {mobilePoster ? (
          <Image
            src={mobilePoster.src}
            alt={mobilePoster.alt}
            width={mobilePoster.width}
            height={mobilePoster.height}
            sizes="100vw"
            className="cs-media__img cs-media__img--m"
          />
        ) : null}
      </div>

      {videoSrc && started ? (
        <video
          ref={video}
          className="cs-media__video"
          src={videoSrc}
          preload="metadata"
          playsInline
          muted={muted}
          onPlay={() => {
            setPlaying(true);
            wake();
          }}
          onPause={() => {
            setPlaying(false);
            setControls(true);
          }}
          onTimeUpdate={(event) => {
            const v = event.currentTarget;
            setTime(v.currentTime);
            if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
          }}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onClick={toggle}
        />
      ) : null}

      <div className={started && !controls ? "cs-media__ui is-idle" : "cs-media__ui"}>
        <div className="cs-media__top">
          <span className="cs-media__label">
            <i aria-hidden="true" />
            {label}
          </span>
          {liveUrl ? (
            <ButtonLink href={liveUrl} variant="light" className="cs-media__live">
              Open the live site<span className="gg-sr-only"> (opens in new tab)</span>
            </ButtonLink>
          ) : null}
        </div>

        {videoSrc && started ? (
            <>
              <button type="button" className="cs-media__center" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
                {playing ? null : <Icon name="chev" size={36} stroke={2.2} />}
              </button>
              <div className="cs-media__bar">
                <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
                  <span className={playing ? "cs-glyph cs-glyph--pause" : "cs-glyph cs-glyph--play"} aria-hidden="true" />
                </button>
                <div className="cs-scrub">
                  <span className="cs-scrub__buf" style={{ width: duration ? `${(buffered / duration) * 100}%` : 0 }} aria-hidden="true" />
                  <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={time}
                    aria-label="Seek"
                    style={{ "--p": duration ? `${(time / duration) * 100}%` : "0%" } as React.CSSProperties}
                    onChange={(event) => {
                      const v = video.current;
                      if (v) v.currentTime = Number(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      const v = video.current;
                      if (!v) return;
                      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        v.currentTime = Math.max(0, Math.min(duration, v.currentTime + (event.key === "ArrowRight" ? 5 : -5)));
                      }
                    }}
                  />
                </div>
                <span className="cs-media__time">
                  {fmt(time)} / {fmt(duration)}
                </span>
                <button type="button" onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted}>
                  <Icon name={muted ? "x" : "bell"} size={18} stroke={2} />
                </button>
                <button type="button" onClick={fullscreen} aria-label="Fullscreen">
                  <Icon name="layout" size={18} stroke={2} />
                </button>
              </div>
            </>
        ) : null}
        {videoSrc && !started ? (
            <>
              <button type="button" className="cs-media__play" onClick={start} aria-label="Play the full walkthrough">
                <Icon name="chev" size={36} stroke={2.2} />
              </button>
              <p className="cs-media__cap">
                <span className="gg-resp-long">Full walkthrough · recorded end to end, no cuts</span>
                <span className="gg-resp-short">Full walkthrough · recorded end to end, no cuts.</span>
              </p>
            </>
        ) : null}
      </div>
    </div>
  );
}
