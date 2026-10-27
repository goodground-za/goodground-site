import type { EnquiryResponse } from "@/app/api/enquiry/route";
import { site } from "@/content/site";

/**
 * The browser side of /api/enquiry. Posts JSON, keeps the "Sending…" state up
 * for at least 600ms so the button never flickers, and reports what the server
 * said. Never throws.
 */
export type SubmitResult =
  | { status: "success"; copy: boolean }
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
    if (response.ok && json.ok) result = { status: "success", copy: Boolean(json.copy) };
    else if (json.errors && Object.keys(json.errors).length) result = { status: "invalid", errors: json.errors };
  } catch {
    result = { status: "error" };
  }

  const left = 600 - (performance.now() - started);
  if (left > 0) await wait(left);
  return result;
}

/** "Email my answers instead": a mailto with the answers already in the body. */
export function mailtoFor(subject: string, lines: string[]) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
