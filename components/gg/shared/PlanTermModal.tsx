"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { funnelEvents } from "@/lib/analytics";

import { Icon } from "../Icon";

/**
 * "12-month plan": the small text-button that sits wherever the site names the
 * monthly plans' term, and the native <dialog> it opens. Owner decision
 * 2026-11-04: monthly plans run for 12 months, and cancelling during them is not
 * free, so the plain-language rule is one click away from every place a plan is
 * sold. The wording below is the owner's; add no other legal claims or numbers.
 *
 * Built like the About parable dialog: native <dialog> (showModal gives the
 * focus trap, Escape and the inert page), centred, blurred backdrop, backdrop
 * click closes, focus returns to the trigger, body scroll locked. The trigger often
 * sits inside a <p> or a card, where a <dialog> is not valid markup, so the dialog
 * is portalled into the page's `.gg` scope on first click (tokens and resets still
 * apply). The title id comes from useId so several triggers can share a page.
 *
 * `placement` names where the trigger sits (analytics `contract_modal_open`);
 * it is a fixed label, never personal data.
 */
export function PlanTermButton({
  placement,
  children = "12-month plan",
  className,
}: {
  placement: string;
  /** The visible trigger text. Keep it "12-month plan" so every page reads the same. */
  children?: ReactNode;
  className?: string;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const pending = useRef(false);
  const [host, setHost] = useState<Element | null>(null);
  const titleId = useId();

  const show = () => {
    dialog.current?.showModal();
    document.body.classList.add("gg-scroll-locked");
  };
  const open = () => {
    opener.current = document.activeElement;
    funnelEvents.contractModalOpen({ placement });
    if (host) {
      show();
    } else {
      // First click: mount the dialog, then show it once it exists (effect below).
      pending.current = true;
      setHost(trigger.current?.closest(".gg") ?? document.body);
    }
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    if (host && pending.current) {
      pending.current = false;
      show();
    }
  }, [host]);

  // Navigating away with the dialog open would otherwise leave the page locked.
  useEffect(() => () => document.body.classList.remove("gg-scroll-locked"), []);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={className ? `gg-term-btn ${className}` : "gg-term-btn"}
        aria-haspopup="dialog"
        onClick={open}
      >
        <span className="gg-term-btn__label">{children}</span>
        <Icon name="info" size={14} stroke={2.2} />
      </button>
      {host
        ? createPortal(
            <dialog
              ref={dialog}
              className="gg-dlg"
              aria-labelledby={titleId}
              onClose={() => {
                document.body.classList.remove("gg-scroll-locked");
                if (opener.current instanceof HTMLElement) opener.current.focus({ preventScroll: true });
              }}
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div className="gg-dlg__in">
                <div className="gg-dlg__head">
                  <h2 id={titleId}>Your 12-month plan</h2>
                  <button type="button" className="gg-dlg__close" onClick={close} aria-label="Close">
                    <Icon name="x" size={18} />
                  </button>
                </div>
                <p>A monthly plan runs for 12 months.</p>
                <p>
                  If you cancel the plan during the 12 months, you are liable to pay the outstanding amount of the
                  website’s full price. You then also take over ownership of your hosting, your domain and everything
                  that goes with it.
                </p>
                <p className="gg-dlg__fine">
                  The full wording is in our{" "}
                  <Link href="/legal#terms" onClick={close}>
                    Terms and conditions
                  </Link>
                  .
                </p>
                <button type="button" className="gg-dlg__done" onClick={close}>
                  Close
                </button>
              </div>
            </dialog>,
            host,
          )
        : null}
    </>
  );
}
