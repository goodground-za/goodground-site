"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Explains the Parable of the Sower, the source of the GoodGround name. Built as
 * a modal deliberately: this is optional enrichment most visitors skip, so it
 * belongs behind a trigger rather than inline in the brand story.
 *
 * Accessibility is the whole job here. The dialog traps focus, closes on Escape
 * or backdrop click, restores focus to the trigger on close, locks page scroll,
 * and is labelled for screen readers. Content faithful to the client's text,
 * in SA English to match the rest of the site.
 */

const soils = [
  {
    name: "The Path",
    heart: "Hard Heart",
    text: "Seed is snatched away by birds, representing those who hear the message but don't understand it, making them vulnerable to the devil.",
  },
  {
    name: "Rocky Ground",
    heart: "Shallow Heart",
    text: "Plants sprout quickly but wither in the sun because they have no deep root. This represents people who receive the word with joy but fall away as soon as trouble or persecution arises.",
  },
  {
    name: "Among Thorns",
    heart: "Crowded Heart",
    text: "The seed grows but is choked out by thorns. This symbolises those whose faith is suffocated by the worries of life, the deceitfulness of wealth, and worldly desires.",
  },
  {
    name: "Good Soil",
    heart: "Fruitful Heart",
    text: "The seed takes root and yields a massive harvest. This represents people who hear the word, understand it, and produce a fruitful life.",
    highlight: true,
  },
];

export function ParableLink({
  children = "the Parable of the Sower",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`text-ember decoration-ember/40 hover:decoration-ember cursor-pointer font-bold underline underline-offset-2 transition-colors ${className}`}
      >
        {children}
      </button>
      <ParableDialog open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  );
}

function ParableDialog({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // The dialog is portalled to document.body, so it never becomes a descendant
  // of the trigger's paragraph (which would nest block elements inside a <p> and
  // break hydration) and never gets clipped by an ancestor's overflow.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock page scroll while open (documentElement is the scroller).
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  // Move focus in on open, restore to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }, 20);
    return () => {
      window.clearTimeout(id);
      triggerRef.current?.focus();
    };
  }, [open, triggerRef]);

  // Escape to close; Tab kept inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-100 flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="bg-ink/60 absolute inset-0 cursor-default backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="rounded-block bg-surface text-bark shadow-lift relative z-1 max-h-[88vh] w-full max-w-[640px] overflow-y-auto p-6 sm:p-9"
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="bg-ember text-peach rounded-pill font-heading inline-block px-4 py-1.5 text-[13px] font-bold">
                Why &ldquo;GoodGround&rdquo;
              </p>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label="Close"
                className="text-bark hover:bg-bark/8 -mt-1 -mr-1 grid size-10 shrink-0 cursor-pointer place-items-center rounded-full transition-colors"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <h2
              id={titleId}
              className="font-heading mt-5 text-[clamp(1.5rem,3.4vw,2.25rem)] leading-tight font-bold tracking-[-0.02em]"
            >
              The Parable of the Sower
            </h2>

            <p id={descId} className="text-bark-muted mt-4 text-[15px] leading-[1.7]">
              The Parable of the Sower, recorded in Matthew 13, Mark 4 and Luke 8, features a farmer
              scattering seeds on four different types of soil. Jesus later explained that the seed
              represents the Word of God, and the soils represent four distinct ways people respond
              to it.
            </p>

            <ol className="mt-7 space-y-3">
              {soils.map((soil, i) => (
                <li
                  key={soil.name}
                  className={`rounded-card p-5 ${
                    soil.highlight ? "bg-ember text-peach" : "bg-cream text-bark"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-heading text-[13px] font-bold tabular-nums ${
                        soil.highlight ? "text-peach/70" : "text-ember"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-[16px] font-bold">
                      {soil.name}{" "}
                      <span className={soil.highlight ? "text-peach/75" : "text-bark-muted"}>
                        ({soil.heart})
                      </span>
                    </h3>
                  </div>
                  <p
                    className={`mt-2 text-[14px] leading-[1.6] ${
                      soil.highlight ? "text-peach/90" : "text-bark-muted"
                    }`}
                  >
                    {soil.text}
                  </p>
                  {soil.highlight ? (
                    <p className="text-peach mt-3 text-[13px] font-medium italic">
                      This is the ground GoodGround is named for.
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
