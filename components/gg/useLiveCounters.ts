"use client";

import { useEffect, useState } from "react";

/**
 * The live counters for static pages: the New Business Offer spaces and the
 * free AI check budget. A page renders its typed values (lib/liveCounters.ts
 * typedOfferSpots / typedFreeCheck), then calls this after mount and swaps in
 * what GET /api/offer-spots says. The wording is the same length either way,
 * so nothing moves. It never throws: on any failure the page keeps the typed
 * values.
 */
export type LiveOffer = { total: number; taken: number; left: number; soldOut: boolean; month: string; nextMonth: string };
/** `nextRun` is "1 December": where a waitlisted free check is run. */
export type LiveFreeCheck = { monthlyBudget: number; used: number; left: number; full: boolean; nextRun: string };
export type LiveCounters = { offer: LiveOffer; freeCheck: LiveFreeCheck | null };

const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

function parse(data: unknown): LiveCounters | null {
  const o = data as Partial<LiveOffer> & { freeCheck?: Partial<LiveFreeCheck> } | null;
  if (!o || !isNumber(o.total) || !isNumber(o.taken) || !isNumber(o.left) || typeof o.soldOut !== "boolean") return null;
  if (typeof o.month !== "string" || typeof o.nextMonth !== "string") return null;
  const c = o.freeCheck;
  const freeCheck =
    c && isNumber(c.monthlyBudget) && isNumber(c.used) && isNumber(c.left) && typeof c.full === "boolean" && typeof c.nextRun === "string"
      ? { monthlyBudget: c.monthlyBudget, used: c.used, left: c.left, full: c.full, nextRun: c.nextRun }
      : null;
  return { offer: { total: o.total, taken: o.taken, left: o.left, soldOut: o.soldOut, month: o.month, nextMonth: o.nextMonth }, freeCheck };
}

// One request is shared by every component on the page, and an answer is reused for a few seconds.
const REUSE_MS = 10_000;
let cached: { at: number; value: LiveCounters } | null = null;
let inflight: Promise<LiveCounters | null> | null = null;

function load(): Promise<LiveCounters | null> {
  if (cached && Date.now() - cached.at < REUSE_MS) return Promise.resolve(cached.value);
  if (!inflight) {
    // "no-cache": the browser always asks (the CDN answers from its 30 second copy); without it a
    // stale-while-revalidate copy could be shown for a minute.
    inflight = fetch("/api/offer-spots", { headers: { Accept: "application/json" }, cache: "no-cache" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        const value = parse(data);
        if (value) cached = { at: Date.now(), value };
        return value;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/** `null` until the live answer arrives (and for good if it never does). */
export function useLiveCounters(): LiveCounters | null {
  const [live, setLive] = useState<LiveCounters | null>(null);
  useEffect(() => {
    let mounted = true;
    load().then((value) => {
      if (mounted && value) setLive(value);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return live;
}
