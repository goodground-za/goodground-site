"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget for the free AI check form (Phase B mounts it).
 *
 * Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so the form
 * works without a key (the honeypot and the 3-second rule still run). With a
 * key it loads Cloudflare's script, draws the challenge and reports the token
 * through `onToken`; the form sends it as `cf-turnstile-response`, which
 * /api/enquiry verifies server-side when TURNSTILE_SECRET_KEY is set. A token
 * is single-use, so `resetKey` lets the form ask for a fresh one after a failed
 * send. The CSP allows challenges.cloudflare.com only when the key is set
 * (next.config.ts).
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

export function Turnstile({ onToken, resetKey = 0 }: { onToken: (token: string) => void; resetKey?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const callback = useRef(onToken);
  useEffect(() => {
    callback.current = onToken;
  });

  useEffect(() => {
    if (!SITE_KEY || !box.current) return;
    const el = box.current;
    const draw = () => {
      if (!window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(el, {
        sitekey: SITE_KEY,
        callback: (token: string) => callback.current(token),
        "expired-callback": () => callback.current(""),
        "error-callback": () => callback.current(""),
      });
    };
    if (window.turnstile) draw();
    else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", draw);
    }
    return () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (resetKey && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  if (!SITE_KEY) return null;
  return <div ref={box} className="gg-turnstile" />;
}
