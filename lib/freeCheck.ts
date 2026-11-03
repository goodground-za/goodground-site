import { createHash } from "node:crypto";

import { freeCheck } from "@/content/site";
import { freeCheckUsedKey, getFreeCheckCounters } from "@/lib/liveCounters";
import { redisCommand, redisConfigured, redisPipeline, warnStorageNotConnected } from "@/lib/redis";

/**
 * Free AI visibility check: the guardrails (blueprint section 8, page 19).
 *
 * THE SITE NEVER RUNS A SCAN. This module only decides what to do with a
 * request: accept it, treat it as a repeat of one already done, or put it on
 * the waitlist because this month's free budget is used up. The team runs the
 * checks by hand with the internal scanner.
 *
 *  - One request per business per 30 days. Matched on the normalised business
 *    name + town + website domain (and on name + town alone, so adding a website
 *    to a second request does not slip past it).
 *  - A monthly budget (content/site.ts freeCheck.monthlyBudget). At the cap the
 *    request is a waitlist entry: it is kept for the 1st of next month and does
 *    not use this month's budget.
 *  - No Redis connected (or Redis failing): the request is accepted, the team is
 *    emailed, and there is no dedupe and no cap. This is logged once.
 */

const DAY = 24 * 60 * 60;
const strip = (value: string) => value.normalize("NFKD").replace(/[̀-ͯ]/g, "");

/** "Mokoena Plumbing (Pty) Ltd" -> "mokoena plumbing". */
export function normaliseName(value: string): string {
  return strip(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\b(pty|ltd|limited|cc|inc|\(pty\))\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** "https://www.Mokoena.co.za/about?x=1" -> "mokoena.co.za". */
export function normaliseDomain(value: string): string {
  const raw = value.trim().toLowerCase();
  if (!raw) return "";
  const host = raw.replace(/^[a-z]+:\/\//, "").split(/[/?#]/)[0].replace(/^www\./, "").replace(/:\d+$/, "");
  return /^[a-z0-9.-]+\.[a-z]{2,}$/.test(host) ? host : "";
}

const hash = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 32);

export function businessKeys(input: { business: string; town: string; website?: string }) {
  const name = normaliseName(input.business);
  const town = normaliseName(input.town);
  const domain = normaliseDomain(input.website ?? "");
  return {
    strict: `gg:freecheck:biz:${hash(`${name}|${town}|${domain}`)}`,
    loose: `gg:freecheck:biz:${hash(`${name}|${town}|`)}`,
    wait: `gg:freecheck:wait:${hash(`${name}|${town}`)}`,
  };
}

export type CheckGate =
  | { mode: "unconnected" }
  | { mode: "accepted"; used: number }
  | { mode: "repeat"; at: string }
  | { mode: "waitlist"; alreadyWaiting: boolean };

/** Decide what happens to one free-check request. Never throws. */
export async function gateFreeCheck(input: { business: string; town: string; website?: string }, now = new Date()): Promise<CheckGate> {
  if (!redisConfigured()) {
    warnStorageNotConnected();
    return { mode: "unconnected" };
  }
  const keys = businessKeys(input);
  const budget = freeCheck.monthlyBudget;
  const stamp = now.toISOString();

  // 1. Seen in the last 30 days?
  const seen = await redisPipeline([["GET", keys.strict], ["GET", keys.loose]]);
  if (!seen) {
    warnStorageNotConnected();
    return { mode: "unconnected" };
  }
  const earlier = (seen[0] ?? seen[1]) as string | null;
  if (earlier) return { mode: "repeat", at: earlier };

  // 2. Is this month's budget used up?
  const counters = await getFreeCheckCounters();
  if (counters.used >= budget) return waitlist(keys.wait);

  // 3. Claim the business for 30 days (NX: the first of two simultaneous requests wins).
  const claim = await redisPipeline([
    ["SET", keys.strict, stamp, "NX", "EX", freeCheck.repeatDays * DAY],
    ["SET", keys.loose, stamp, "NX", "EX", freeCheck.repeatDays * DAY],
  ]);
  if (!claim) return { mode: "unconnected" };
  if (claim[0] === null) {
    const at = (await redisCommand("GET", keys.strict)) as string | null;
    return { mode: "repeat", at: at ?? stamp };
  }

  // 4. Count it. Over the cap after counting (a race at the limit): give it back.
  const usedKey = freeCheckUsedKey();
  const counted = await redisPipeline([["INCR", usedKey], ["EXPIRE", usedKey, 40 * DAY]]);
  const used = typeof counted?.[0] === "number" ? counted[0] : counters.used + 1;
  if (used > budget) {
    await redisPipeline([["DECR", usedKey], ["DEL", keys.strict], ["DEL", keys.loose]]);
    return waitlist(keys.wait);
  }
  return { mode: "accepted", used };
}

async function waitlist(waitKey: string): Promise<CheckGate> {
  const added = await redisCommand("SET", waitKey, new Date().toISOString(), "NX", "EX", 35 * DAY);
  return { mode: "waitlist", alreadyWaiting: added === null };
}

/** "3 November 2026" in South African time. */
export const longDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", { timeZone: "Africa/Johannesburg", day: "numeric", month: "long", year: "numeric" })
    .format(new Date(iso))
    .replace(/,/g, "");

/** First of next month, in South African time: "1 December". Where a waitlisted request will be run. */
export function firstOfNextMonth(now: Date = new Date()): string {
  const sast = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const next = new Date(Date.UTC(sast.getUTCFullYear(), sast.getUTCMonth() + 1, 1));
  return `1 ${new Intl.DateTimeFormat("en-ZA", { timeZone: "UTC", month: "long" }).format(next)}`;
}
