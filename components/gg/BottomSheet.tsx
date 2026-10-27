"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, type ReactNode } from "react";

import { Icon } from "./Icon";

/**
 * Bottom sheet — Work filter (21:344), Pricing build sheet (53:469),
 * Onboarding steps (60:1068), Article TOC.
 *
 * Built on <dialog>.showModal() like the live menu: the focus trap, Escape and
 * the inert page behind come from the platform. Added here: scrim tap closes,
 * body scroll locks, focus returns to the opener. The slide-up is CSS
 * (@starting-style), so it needs no JS timing.
 */
export type BottomSheetHandle = { open: () => void; close: () => void };

export const BottomSheet = forwardRef<
  BottomSheetHandle,
  { title: string; children: ReactNode; footer?: ReactNode; onClose?: () => void }
>(function BottomSheet({ title, children, footer, onClose }, ref) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  const open = useCallback(() => {
    opener.current = document.activeElement;
    dialog.current?.showModal();
    document.body.classList.add("gg-scroll-locked");
  }, []);

  const close = useCallback(() => dialog.current?.close(), []);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  useEffect(() => () => document.body.classList.remove("gg-scroll-locked"), []);

  const handleClose = () => {
    document.body.classList.remove("gg-scroll-locked");
    if (opener.current instanceof HTMLElement) opener.current.focus({ preventScroll: true });
    onClose?.();
  };

  return (
    <dialog
      ref={dialog}
      className="gg-sheet"
      aria-labelledby="gg-sheet-title"
      onClose={handleClose}
      // A click whose target is the <dialog> itself landed on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <span className="gg-sheet__handle" aria-hidden="true" />
      <div className="gg-sheet__head">
        <h2 id="gg-sheet-title" className="gg-sheet__title">
          {title}
        </h2>
        <button type="button" className="gg-sheet__close" onClick={close} aria-label="Close">
          <Icon name="x" size={18} />
        </button>
      </div>
      <div className="gg-sheet__body">{children}</div>
      {footer}
    </dialog>
  );
});
