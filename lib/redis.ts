/**
 * A tiny Upstash Redis REST client (plain fetch, no dependency).
 *
 * Connected when EITHER pair of variables is set:
 *  - UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash's own names), or
 *  - KV_REST_API_URL + KV_REST_API_TOKEN (what the Vercel Marketplace
 *    integration injects).
 * With neither set, `redisConfigured()` is false and callers fall back to the
 * typed values in content/. Nothing here throws into a caller: a failed call is
 * reported as `null` after being logged once, so a Redis outage can never break
 * a form.
 */

type Config = { url: string; token: string };

function readConfig(): Config | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ""), token };
}

export const redisConfigured = () => readConfig() !== null;

let warnedMissing = false;
let warnedFailed = false;

/** Log (once per warm instance) that the free-check storage is not connected. */
export function warnStorageNotConnected() {
  if (warnedMissing) return;
  warnedMissing = true;
  console.error(
    "[storage] Redis is not connected (set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or KV_REST_API_URL + KV_REST_API_TOKEN). Free checks are accepted without the 30-day rule or the monthly cap.",
  );
}

export type RedisCommand = (string | number)[];

/**
 * Run commands in order as one request. Returns each result (null for a Redis
 * nil), or null if Redis is not configured or the request failed.
 */
export async function redisPipeline(commands: RedisCommand[]): Promise<unknown[] | null> {
  const config = readConfig();
  if (!config) return null;
  try {
    const response = await fetch(`${config.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error(`status ${response.status}`);
    const rows = (await response.json()) as { result?: unknown; error?: string }[];
    if (!Array.isArray(rows) || rows.some((r) => r?.error)) throw new Error("command error");
    return rows.map((r) => r.result ?? null);
  } catch (error) {
    if (!warnedFailed) {
      warnedFailed = true;
      console.error("[storage] Redis request failed:", (error as Error).message);
    }
    return null;
  }
}

/** One command; null when unconfigured, failed, or nil. */
export async function redisCommand(...command: RedisCommand): Promise<unknown> {
  const rows = await redisPipeline([command]);
  return rows ? rows[0] : null;
}
