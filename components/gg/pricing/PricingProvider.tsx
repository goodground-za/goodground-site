"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { formatRand } from "../format";
import {
  buildItemById,
  buildLines,
  decodeBuild,
  encodeBuild,
  instalmentFor,
  MAX_QTY,
  totalOf,
  type Billing,
  type BuildLine,
  type Qty,
} from "./data";

/**
 * The page's one shared state: how the visitor wants to pay, what they have
 * built, and what is attached to the quote form.
 *
 * Persistence (Pricing note 54:225): the build lives in localStorage AND in the
 * URL as ?build=<code>, so a refresh, a shared link and "Edit" from the quote
 * form all restore it. The URL wins over storage when both are present. The
 * server render and first client render use the empty defaults; the saved
 * state is applied in an effect, so hydration always matches.
 */

export type Attached = { kind: "package"; slug: string } | { kind: "build" } | { kind: "full-service" } | null;

type Ctx = {
  billing: Billing;
  setBilling: (billing: Billing) => void;
  qty: Qty;
  setQty: (id: string, n: number) => void;
  /** Change a stepper by +1 / -1 (functional, so held-down repeats never read a stale count). */
  step: (id: string, delta: number) => void;
  toggle: (id: string) => void;
  reset: () => void;
  lines: BuildLine[];
  total: number;
  monthly: number;
  hasFrom: boolean;
  attached: Attached;
  /** Increments each time something is attached, so the card can pulse again. */
  attachPulse: number;
  attach: (attached: Attached, opts?: { scroll?: boolean }) => void;
  detach: () => void;
  /** "Compare" on the package hint: which package card to bring into view. */
  compare: { slug: string; n: number } | null;
  comparePackage: (slug: string) => void;
  /** Text for the polite live region, set only by the visitor's own changes. */
  announcement: string;
  ready: boolean;
};

const PricingContext = createContext<Ctx | null>(null);

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("usePricing must be used inside <PricingProvider>");
  return ctx;
}

const BILLING_KEY = "gg-pricing-billing";
const BUILD_KEY = "gg-pricing-build";

const safeGet = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key: string, value: string) => {
  try {
    if (value) window.localStorage.setItem(key, value);
    else window.localStorage.removeItem(key);
  } catch {
    /* storage can be blocked; the page works without it */
  }
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const off = document.documentElement.dataset.motion === "off" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: off ? "auto" : "smooth", block: "start" });
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [billing, setBillingState] = useState<Billing>("deposit");
  const [qty, setQtyState] = useState<Qty>({});
  const [attached, setAttached] = useState<Attached>(null);
  const [attachPulse, setAttachPulse] = useState(0);
  const [compare, setCompare] = useState<Ctx["compare"]>(null);
  const [announcement, setAnnouncement] = useState("");
  const [ready, setReady] = useState(false);
  const interacted = useRef(false);

  // Restore: URL first, then storage.
  useEffect(() => {
    const saved = safeGet(BILLING_KEY);
    // Restoring saved choices is one setState after mount, by design: the server
    // render and first client render use the defaults so hydration matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "deposit" || saved === "instalments") setBillingState(saved);
    const fromUrl = new URLSearchParams(window.location.search).get("build");
    const restored = decodeBuild(fromUrl ?? safeGet(BUILD_KEY));
    if (Object.keys(restored).length) setQtyState(restored);
    setReady(true);
  }, []);

  const lines = useMemo(() => buildLines(qty), [qty]);
  const total = useMemo(() => totalOf(lines), [lines]);
  const hasFrom = lines.some((line) => line.from);
  const monthly = instalmentFor(total);

  // Persist (after the restore, so an empty first render never wipes a saved build).
  useEffect(() => {
    if (!ready) return;
    const code = encodeBuild(qty);
    safeSet(BUILD_KEY, code);
    const url = new URL(window.location.href);
    if (code) url.searchParams.set("build", code);
    else url.searchParams.delete("build");
    window.history.replaceState(window.history.state, "", url);
  }, [qty, ready]);

  useEffect(() => {
    if (ready) safeSet(BILLING_KEY, billing);
  }, [billing, ready]);

  useEffect(() => {
    // The live region speaks only after the visitor has changed something.
    if (interacted.current) setAnnouncement(`Total now ${formatRand(total)}`);
  }, [total]);

  const setBilling = useCallback((next: Billing) => setBillingState(next), []);

  const setQty = useCallback((id: string, n: number) => {
    const item = buildItemById.get(id);
    if (!item) return;
    interacted.current = true;
    const clamped = Math.max(0, Math.min(item.quantifiable ? MAX_QTY : 1, Math.round(n)));
    setQtyState((prev) => {
      const next = { ...prev };
      if (clamped > 0) next[id] = clamped;
      else delete next[id];
      return next;
    });
  }, []);

  const step = useCallback((id: string, delta: number) => {
    const item = buildItemById.get(id);
    if (!item) return;
    interacted.current = true;
    setQtyState((prev) => {
      const next = { ...prev };
      const n = Math.max(0, Math.min(item.quantifiable ? MAX_QTY : 1, (prev[id] ?? 0) + delta));
      if (n > 0) next[id] = n;
      else delete next[id];
      return next;
    });
  }, []);

  const toggle = useCallback(
    (id: string) => {
      setQty(id, (qty[id] ?? 0) > 0 ? 0 : 1);
    },
    [qty, setQty],
  );

  const reset = useCallback(() => {
    interacted.current = true;
    setQtyState({});
  }, []);

  const attach = useCallback((next: Attached, opts?: { scroll?: boolean }) => {
    setAttached(next);
    setAttachPulse((n) => n + 1);
    if (opts?.scroll !== false) scrollToId("quote");
  }, []);

  const detach = useCallback(() => setAttached(null), []);

  const comparePackage = useCallback((slug: string) => {
    setCompare((prev) => ({ slug, n: (prev?.n ?? 0) + 1 }));
    scrollToId("packages");
  }, []);

  const value: Ctx = {
    billing,
    setBilling,
    qty,
    setQty,
    step,
    toggle,
    reset,
    lines,
    total,
    monthly,
    hasFrom,
    attached,
    attachPulse,
    attach,
    detach,
    compare,
    comparePackage,
    announcement,
    ready,
  };

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}
