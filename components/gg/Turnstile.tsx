"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget for the free AI check form.
 *
 * Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so the form
 * works without a key (the honeypot and the 3-second rule still run). With a
 * key it loads Cloudflare's script, draws the challenge and reports the token
 * through `onToken`; the form sends it as `cf-turnstile-response`, which
 * /api/enquiry verifies server-side when TURNSTILE_SECRET_KEY is set. A token
 * is single-use, so `resetKey` lets the form ask for a fresh one after a failed
 * send. The CSP allows challenges.cloudflare.com only when the key is set
 * (next.config.ts).
 *
 * The script can be blocked (an ad blocker, a strict network) or the challenge
 * can fail. `onStatus("blocked")` tells the form, so it can say so and offer a
 * retry and an email address instead of waiting for a token that cannot come;
 * remounting the component (a new `key`) tries again from scratch.
 */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const turnstileEnabled = Boolean(SITE_KEY);

/** How long to wait for Cloudflare's script before calling the check blocked. */
const LOAD_TIMEOUT_MS = 10_000;

export function Turnstile({
  onToken,
  onStatus,
  resetKey = 0,
  hidden = false,
}: {
  onToken: (token: string) => void;
  onStatus?: (status: "ready" | "blocked") => void;
  resetKey?: number;
  /** Hide the (empty) widget box, e.g. while the form shows that the check is blocked. */
  hidden?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const callback = useRef(onToken);
  const status = useRef(onStatus);
  useEffect(() => {
    callback.current = onToken;
    status.current = onStatus;
  });

  useEffect(() => {
    if (!SITE_KEY || !box.current) return;
    const el = box.current;
    let alive = true;
    let timer = 0;
    let script: HTMLScriptElement | null = null;
    const draw = () => {
      if (!alive || !window.turnstile || widget.current) return;
      window.clearTimeout(timer);
      widget.current = window.turnstile.render(el, {
        sitekey: SITE_KEY,
        callback: (token: string) => callback.current(token),
        "expired-callback": () => callback.current(""),
        "error-callback": () => {
          callback.current("");
          status.current?.("blocked");
        },
      });
      status.current?.("ready");
    };
    const blocked = () => {
      if (!alive || widget.current) return;
      // A script that failed stays in the document and never loads again: drop it so a retry fetches a fresh one.
      if (!window.turnstile) script?.remove();
      status.current?.("blocked");
    };
    if (window.turnstile) draw();
    else {
      script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", draw);
      script.addEventListener("error", blocked);
      timer = window.setTimeout(blocked, LOAD_TIMEOUT_MS);
    }
    return () => {
      alive = false;
      window.clearTimeout(timer);
      script?.removeEventListener("load", draw);
      script?.removeEventListener("error", blocked);
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (resetKey && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  if (!SITE_KEY) return null;
  return <div ref={box} className="gg-turnstile" hidden={hidden} />;
}
