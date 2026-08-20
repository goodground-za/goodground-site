"use client";

import { useState, type ReactNode } from "react";

/**
 * Native <details>/<summary> underneath, so every answer is present in the
 * server-rendered HTML and works with zero JavaScript (open/close still
 * functions natively — content is never gated behind a fetch or a client
 * mount). React's `open` state below only mirrors the DOM's own toggle to
 * drive the inner grid-rows height animation; the <details> element itself
 * stays uncontrolled, so a no-JS visitor gets the browser's native instant
 * toggle instead of a broken half-animated one.
 */
export function AccordionItem({
  summary,
  children,
  defaultOpen = false,
  className = "",
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      open={defaultOpen}
      className={`group border-ht-purple/15 border-b ${className}`}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
        {summary}
        <svg
          viewBox="0 0 24 24"
          className={`size-5 shrink-0 transition-transform duration-300 ease-[var(--ease-out)] ${open ? "rotate-45" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </summary>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pr-9 pb-6">{children}</div>
        </div>
      </div>
    </details>
  );
}
