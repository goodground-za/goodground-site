"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted autoplay loop that only starts fetching once it's actually near the
 * viewport. Case-study videos sit well below the fold (after the hero image
 * and meta row), but a plain `<video autoPlay>` still downloads eagerly on
 * page load with the browser's default `preload="auto"` — extra bytes fighting
 * the hero for bandwidth on first load for content the visitor hasn't
 * scrolled to yet. `preload="none"` plus mounting the `src` only once the
 * element enters the viewport (with margin, so it's ready by the time it's
 * actually visible) defers that cost until it's relevant.
 */
export function LazyLoopVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px 0px" });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={inView ? src : undefined}
      preload="none"
      autoPlay={inView}
      muted
      loop
      playsInline
      controls={false}
      className={className}
    />
  );
}
