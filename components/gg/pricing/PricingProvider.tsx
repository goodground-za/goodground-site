"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Billing } from "./data";

/**
 * The page's one shared state: which tab of the Plans section is showing, how
 * the visitor wants to pay a custom build, and what is attached to the quote
 * form.
 *
 * Tabs. #plans, #monthly, #custom and the old #packages are zero-size anchors
 * that are always visible, so the browser scrolls to them on its own; this
 * provider only has to put the right tab on show. Anything inside a panel
 * (#plan-local-plus, #package-grow, #full-service) is hidden while its tab is
 * off, so it switches the tab first and scrolls afterwards. In-page links that
 * Next handles without a hashchange (a Link to /pricing#custom) are caught on
 * click. Links from the retired build menu (a query string and a hash that no
 * longer exist) match nothing here and simply open the default tab.
 *
 * The billing choice is remembered in localStorage. The server render and first
 * client render use the defaults, so hydration always matches; the saved choice
 * is applied in an effect.
 */

export type PlansTab = "monthly" | "custom";

export type Attached = { kind: "package"; slug: string } | { kind: "full-service" } | null;

type Ctx = {
  tab: PlansTab;
  /** A visitor's own switch of the tab: also records it in the URL hash. */
  chooseTab: (tab: PlansTab) => void;
  billing: Billing;
  setBilling: (billing: Billing) => void;
  attached: Attached;
  /** Increments each time something is attached, so the card can pulse again. */
  attachPulse: number;
  attach: (attached: Attached, opts?: { scroll?: boolean }) => void;
  detach: () => void;
  /** Show a tab, then scroll to an element inside it once it is on screen. */
  goTo: (tab: PlansTab, id: string) => void;
};

const PricingContext = createContext<Ctx | null>(null);

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("usePricing must be used inside <PricingProvider>");
  return ctx;
}

const BILLING_KEY = "gg-pricing-billing";

const safeGet = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage can be blocked; the page works without it */
  }
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const off = document.documentElement.dataset.motion === "off" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: off ? "auto" : "smooth", block: "start" });
}

/** The always-visible anchors that mean a tab, and the id prefixes of things inside a panel. */
const ANCHOR_TAB: Record<string, PlansTab> = { plans: "monthly", monthly: "monthly", custom: "custom", packages: "custom", "full-service": "monthly" };
const INNER_PREFIX: [string, PlansTab][] = [
  ["plan-", "monthly"],
  ["package-", "custom"],
];
/** Ids that sit inside a panel and so need a scroll once the tab is on show. */
const isInner = (id: string) => id === "full-service" || INNER_PREFIX.some(([prefix]) => id.startsWith(prefix));

function tabForId(id: string): PlansTab | null {
  if (id in ANCHOR_TAB) return ANCHOR_TAB[id];
  return INNER_PREFIX.find(([prefix]) => id.startsWith(prefix))?.[1] ?? null;
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<PlansTab>("monthly");
  const [billing, setBillingState] = useState<Billing>("deposit");
  const [attached, setAttached] = useState<Attached>(null);
  const [attachPulse, setAttachPulse] = useState(0);
  const [pending, setPending] = useState<{ id: string; n: number } | null>(null);

  // Show the tab a hash (or an in-page link) points at; scroll afterwards if the target sits inside a panel.
  const follow = useCallback((rawId: string) => {
    const id = decodeURIComponent(rawId.replace(/^#/, ""));
    const next = tabForId(id);
    if (!next) return;
    setTab(next);
    if (isInner(id)) setPending((prev) => ({ id, n: (prev?.n ?? 0) + 1 }));
  }, []);

  useEffect(() => {
    const saved = safeGet(BILLING_KEY);
    // Restoring a saved choice is one setState after mount, by design: the server
    // render and first client render use the defaults so hydration matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "deposit" || saved === "instalments") setBillingState(saved);
    if (window.location.hash) follow(window.location.hash);

    const onHash = () => follow(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !link.hash) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "")) follow(url.hash);
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, [follow]);

  // Runs after the panel has been shown, so the target has a box to scroll to.
  useEffect(() => {
    if (pending) scrollToId(pending.id);
  }, [pending]);

  const chooseTab = useCallback((next: PlansTab) => {
    setTab(next);
    // Record the choice in the URL so a reload or a shared link opens the same tab. No scroll.
    window.history.replaceState(window.history.state, "", `#${next}`);
  }, []);

  const goTo = useCallback((next: PlansTab, id: string) => {
    setTab(next);
    setPending((prev) => ({ id, n: (prev?.n ?? 0) + 1 }));
  }, []);

  const setBilling = useCallback((next: Billing) => {
    setBillingState(next);
    safeSet(BILLING_KEY, next);
  }, []);

  const attach = useCallback((next: Attached, opts?: { scroll?: boolean }) => {
    setAttached(next);
    setAttachPulse((n) => n + 1);
    if (opts?.scroll !== false) scrollToId("quote");
  }, []);

  const detach = useCallback(() => setAttached(null), []);

  const value = useMemo<Ctx>(
    () => ({ tab, chooseTab, billing, setBilling, attached, attachPulse, attach, detach, goTo }),
    [tab, chooseTab, billing, setBilling, attached, attachPulse, attach, detach, goTo],
  );

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}
