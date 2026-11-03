/**
 * Cloudflare Turnstile, server side.
 *
 * Active only when TURNSTILE_SECRET_KEY is set (and, in the browser,
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY). With no secret the check is skipped and the
 * honeypot and the 3-second rule still run, so a missing key never blocks a
 * form. With a secret, a missing or invalid token is a failure the route turns
 * into a 422.
 *
 * TURNSTILE_VERIFY_URL exists only so the check can be tested against a local
 * stand-in; leave it unset in production.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const turnstileRequired = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token || token.length > 2048) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const response = await fetch(process.env.TURNSTILE_VERIFY_URL || VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error("[turnstile] verification failed:", (error as Error).name);
    return false;
  }
}
