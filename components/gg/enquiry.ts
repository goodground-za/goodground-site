import type { EnquiryResponse } from "@/app/api/enquiry/route";
import { site } from "@/content/site";

/**
 * The browser side of /api/enquiry. Posts JSON, keeps the "Sending…" state up
 * for at least 600ms so the button never flickers, and reports what the server
 * said. Never throws.
 */
export type SubmitResult =
  | {
      status: "success";
      copy: boolean;
      /** ai-check only: booked, put on the waitlist (budget used up) or a repeat of an earlier check. */
      result?: "booked" | "waitlist" | "repeat";
      /** ai-check repeat: the business and the date of the earlier check, and the server's one-line message. */
      business?: string;
      date?: string;
      message?: string;
    }
  | { status: "invalid"; errors: NonNullable<EnquiryResponse["errors"]> }
  | { status: "error" };

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function postEnquiry(payload: Record<string, string | undefined>): Promise<SubmitResult> {
  const started = performance.now();
  const body: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) if (value) body[key] = value;

  let result: SubmitResult = { status: "error" };
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await response.json().catch(() => ({}))) as EnquiryResponse;
    if (response.ok && json.ok) {
      result = { status: "success", copy: Boolean(json.copy), result: json.result, business: json.business, date: json.date, message: json.message };
    }
    else if (json.errors && Object.keys(json.errors).length) result = { status: "invalid", errors: json.errors };
  } catch {
    result = { status: "error" };
  }

  const left = 600 - (performance.now() - started);
  if (left > 0) await wait(left);
  return result;
}

/**
 * Where the visitor came from, for the forms that report it: `ref` (the page
 * or link that sent them, else `fallbackRef`) and any utm_* parameters in the
 * address bar. The server whitelists the ref and cleans the UTMs; a value is
 * never put into the page or an email unchecked.
 */
export function sourceParams(fallbackRef: string): Record<string, string> {
  const query = new URLSearchParams(window.location.search);
  const out: Record<string, string> = { ref: query.get("ref") || fallbackRef };
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = query.get(key);
    if (value) out[key] = value;
  }
  return out;
}

/** "Email my answers instead": a mailto with the answers already in the body. */
export function mailtoFor(subject: string, lines: string[]) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
