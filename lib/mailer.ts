import nodemailer, { type Transporter } from "nodemailer";

/**
 * Outbound mail for the two server-side form routes.
 *
 * WHY THIS EXISTS. Both routes originally handed their message to Web3Forms.
 * That silently never worked in production: Web3Forms refuses server-side calls
 * on the free plan — "Use our API in client side or contact support with server
 * IP address (Pro plan is required)" — so every submission from
 * /website-launch and /launch-offer-intake-form failed at the delivery step and
 * showed the visitor an error. The browser-side forms in lib/enquiry.ts were
 * never affected, which is why it went unnoticed.
 *
 * The fix is to send through GoodGround's own mail server rather than a relay
 * that will not accept us. mail.goodground.co.za is the studio's existing cPanel
 * SMTP host, so mail leaves from hello@goodground.co.za, under the domain's own
 * SPF record, with no third-party service and no monthly send limit.
 *
 * CREDENTIALS LIVE IN THE ENVIRONMENT, NEVER IN THE REPO. Nothing here has a
 * default password and nothing is hardcoded. With the environment unset this
 * module reports "unconfigured" and the caller fails honestly — it never
 * pretends a message was delivered.
 */

export type MailResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "rejected" | "threw" };

type MailInput = {
  subject: string;
  /** Plain text. The brief is Markdown, which reads fine as text. */
  text: string;
  /** The sender's address, so replying in the mail client reaches them. */
  replyTo?: string;
};

function readConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    host,
    port,
    // 465 is implicit TLS. 587 starts plain and upgrades via STARTTLS, which
    // nodemailer does when `secure` is false.
    secure: port === 465,
    auth: { user, pass },
    /** Where briefs and enquiries land. Defaults to the sending mailbox. */
    to: process.env.MAIL_TO || user,
    /**
     * The envelope sender. It must be a mailbox on this domain or the server
     * will refuse to relay it — which is also what keeps this from being
     * turned into an open relay by anything in a request.
     */
    from: process.env.MAIL_FROM || user,
  };
}

/**
 * One transport per warm serverless instance. Re-creating it per request would
 * pay the TLS handshake every time, which on a cold path is most of the cost.
 */
let cached: Transporter | null = null;

function getTransport(config: NonNullable<ReturnType<typeof readConfig>>) {
  if (!cached) {
    cached = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
      // A form submission should fail fast rather than hold the request open.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return cached;
}

/** Anything header-bound loses its line breaks. A newline is header injection. */
const headerSafe = (value: string) =>
  value.replace(/[\r\n\t\v\f\u0085\u2028\u2029]+/g, " ").trim();

export async function sendMail({ subject, text, replyTo }: MailInput): Promise<MailResult> {
  const config = readConfig();
  if (!config) {
    console.error("[mail] SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const info = await getTransport(config).sendMail({
      from: { name: "GoodGround website", address: config.from },
      to: config.to,
      // Only ever a validated address, and stripped of line breaks regardless.
      replyTo: replyTo ? headerSafe(replyTo) : undefined,
      subject: headerSafe(subject),
      text,
    });

    // A message the server did not accept for delivery is not a success, even
    // when sendMail resolves.
    const accepted = (info.accepted?.length ?? 0) > 0;
    if (!accepted) {
      console.error("[mail] Server accepted no recipients.");
      return { ok: false, reason: "rejected" };
    }
    return { ok: true };
  } catch (error) {
    // Name only. An SMTP error can carry the host, the mailbox and sometimes
    // the credential, and none of that belongs in a shared deployment log or
    // anywhere near a browser response.
    console.error("[mail] Send threw:", (error as Error).name);
    return { ok: false, reason: "threw" };
  }
}
