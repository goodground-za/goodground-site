"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The featured project's image: a clip-path reveal on entry (CSS, home.css) and,
 * on desktop only, a linear parallax. The image layer is 96px taller than its
 * box and moves from -40px to +40px while the card crosses the viewport, so the
 * box always stays covered. Off for reduced motion, "Pause motion" and phones.
 */
export function FeaturedParallax({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const moving = layer.current;
    if (!el || !moving) return;
    const html = document.documentElement;
    const desktop = window.matchMedia("(min-width: 1200px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches || reduce.matches || html.dataset.motion === "off") {
        moving.style.transform = "";
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the card's top enters the viewport, 1 as its bottom leaves.
      const t = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      moving.style.transform = `translate3d(0, ${(-40 + 80 * t).toFixed(1)}px, 0)`;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    const flag = new MutationObserver(request);
    flag.observe(html, { attributes: true, attributeFilter: ["data-motion"] });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      flag.disconnect();
    };
  }, []);

  return (
    <div className="hm-feature__media" ref={box}>
      <div className="hm-feature__layer" ref={layer}>
        {children}
      </div>
    </div>
  );
}
