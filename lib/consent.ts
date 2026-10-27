"use client";

import { useSyncExternalStore } from "react";

/**
 * Analytics-cookie consent, shared by the banner (components/Analytics.tsx) and the
 * cookie switch on /legal.
 *
 * The choice lives in localStorage, so the server cannot know it. The server snapshot is
 * "unread" (not "undecided") so a banner is never baked into the HTML for visitors who
 * already answered. `fallback` holds the answer when storage is blocked (private mode), for
 * the life of the page.
 */
export const CONSENT_KEY = "gg-cookie-consent";
const CHANGE_EVENT = "gg-cookie-consent-change";
/** Fired by the footer's "Cookie settings" link; the banner listens and reopens. */
export const REOPEN_EVENT = "gg-cookie-reopen";

export type Consent = "granted" | "denied";
export type ConsentState = Consent | "unread" | "undecided";

let fallback: Consent | null = null;

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  // Keeps a second tab in sync if the visitor answers there.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): ConsentState {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(CONSENT_KEY);
  } catch {
    // Private mode / storage blocked: use the in-memory answer.
  }
  const value = stored ?? fallback;
  return value === "granted" || value === "denied" ? value : "undecided";
}

const getServerSnapshot = (): ConsentState => "unread";

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Removes the Google Analytics cookies GA4 wrote (_ga, _ga_XXXX, _gid, _gat) on this host and its parent domain. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n === "_gid" || n.startsWith("_ga_") || n.startsWith("_gat"));
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [host, `.${host}`];
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`, `.${parts.slice(-3).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

export function setConsent(value: Consent) {
  fallback = value;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: `fallback` carries the choice for this page view.
  }
  if (value === "denied") clearAnalyticsCookies();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function reopenCookieBanner() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}
