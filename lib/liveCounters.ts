import { newBusinessOffer } from "@/content/newBusinessOffer";
import { freeCheck } from "@/content/site";
import { redisCommand, redisConfigured } from "@/lib/redis";

/**
 * Counters that change without a deploy. Server-side only.
 *
 * Each reads Upstash Redis when it is connected (lib/redis.ts) and the typed
 * value in content/ otherwise, so the site works the same with or without
 * storage. Keys carry the period they count, so a counter left over from last
 * month is simply ignored.
 */

/** "2026-11" in South African time (Vercel runs UTC; the cap is a SAST month). */
export function monthKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg", year: "numeric", month: "2-digit" }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}`;
}

export const freeCheckUsedKey = (month = monthKey()) => `gg:freecheck:used:${month}`;
export const offerTakenKey = () => `gg:offer:taken:${newBusinessOffer.year}-${newBusinessOffer.month}`;

const toCount = (value: unknown): number | null => {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number.parseInt(value, 10) : NaN;
  return Number.isFinite(n) && n >= 0 ? n : null;
};

export type FreeCheckCounters = {
  monthlyBudget: number;
  used: number;
  left: number;
  full: boolean;
  source: "redis" | "settings";
};

export async function getFreeCheckCounters(): Promise<FreeCheckCounters> {
  const live = redisConfigured() ? toCount(await redisCommand("GET", freeCheckUsedKey())) : null;
  // Connected but nothing counted yet this month: that is 0, not the typed fallback.
  const connected = redisConfigured();
  const used = live ?? (connected ? 0 : freeCheck.used);
  const left = Math.max(0, freeCheck.monthlyBudget - used);
  return { monthlyBudget: freeCheck.monthlyBudget, used, left, full: left === 0, source: connected ? "redis" : "settings" };
}

export type OfferSpots = {
  total: number;
  taken: number;
  left: number;
  soldOut: boolean;
  month: string;
  nextMonth: string;
  source: "redis" | "settings";
};

export async function getOfferSpots(): Promise<OfferSpots> {
  const live = redisConfigured() ? toCount(await redisCommand("GET", offerTakenKey())) : null;
  const taken = Math.min(newBusinessOffer.spotsTotal, live ?? newBusinessOffer.spotsTaken);
  const left = Math.max(0, newBusinessOffer.spotsTotal - taken);
  return {
    total: newBusinessOffer.spotsTotal,
    taken,
    left,
    soldOut: left === 0,
    month: newBusinessOffer.month,
    nextMonth: newBusinessOffer.nextMonth,
    source: live !== null ? "redis" : "settings",
  };
}
