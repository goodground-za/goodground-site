"use client";

import { useEffect, useRef } from "react";

/**
 * Home CTA card, desktop only: a 480px peach light that follows the pointer
 * with smoothing (lerp 0.08 per frame) and fades out on leave.
 *
 * Only runs on fine pointers with motion allowed, and the rAF loop stops as
 * soon as the light has caught up, so it costs nothing while idle.
 */
export function CursorLight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const light = ref.current;
    const card = light?.parentElement;
    if (!light || !card) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const motionOff = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off";

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const step = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      light.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(step) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (motionOff()) return;
      const rect = card.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
      if (!light.classList.contains("is-on")) {
        // Start from the entry point, not from the corner.
        x = tx;
        y = ty;
        light.classList.add("is-on");
      }
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onLeave = () => light.classList.remove("is-on");

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} className="gg-cta__light" aria-hidden="true" />;
}
