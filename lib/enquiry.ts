import { site } from "@/content/site";

/**
 * Single submission path for every form on the site, so all enquiries land at
 * hello@goodground.co.za identically.
 *
 * - With NEXT_PUBLIC_WEB3FORMS_KEY set, POSTs to Web3Forms (routed to the studio
 *   inbox) and returns "success" only on a real 200.
 * - With no key, opens a pre-filled mailto to hello@goodground.co.za and returns
 *   "mail". Honest: it never claims an enquiry was received, only that the mail
 *   app was opened. Adding the key later upgrades every form to a silent send.
 */

// GoodGround's Web3Forms access key. This is a public key by design (it ships in
// the client bundle and Web3Forms handles spam/routing), so the hardcoded
// fallback is safe and lets forms work on any deploy with zero env config. An
// env var still overrides it if set.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "beae6de4-74ed-4868-a4eb-e479e0f43e6c";

export type SendResult = "success" | "mail" | "error";

export async function sendEnquiry(subject: string, fields: Record<string, string>): Promise<SendResult> {
  if (!WEB3FORMS_KEY) {
    const body = Object.entries(fields)
      .map(([label, value]) => `${label}: ${value || "-"}`)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    return "mail";
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "GoodGround website",
        ...fields,
      }),
    });
    const json = await res.json();
    return json.success ? "success" : "error";
  } catch {
    return "error";
  }
}
