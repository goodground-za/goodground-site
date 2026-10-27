"use client";

import { useEffect } from "react";

/** Moves focus to an element (the page's H1) on load, without scrolling. */
export function FocusOnLoad({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }, [targetId]);
  return null;
}
