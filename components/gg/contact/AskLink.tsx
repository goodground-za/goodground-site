"use client";

import type { ReactNode } from "react";

/**
 * "Ask a question": smooth-scrolls to the quick message form and, with a mouse,
 * focuses the name field once it is in view (on a phone it does not, so the
 * keyboard does not open over the form the visitor was sent to read).
 */
export function AskLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="#quick-message"
      className={className}
      onClick={() => {
        if (window.matchMedia("(pointer: fine)").matches) {
          window.setTimeout(() => document.getElementById("ct-fullName")?.focus({ preventScroll: true }), 700);
        }
      }}
    >
      {children}
    </a>
  );
}
