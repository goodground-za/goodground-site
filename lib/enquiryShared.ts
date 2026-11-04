import { formatRand } from "@/components/gg/format";
import { localPlanBySlug, previewTime } from "@/content/pricing";

/**
 * What the redesigned forms (/start-project, /contact, the /pricing quote form,
 * and from v2 the New Business Offer and AI check forms) and /api/enquiry agree
 * on: every whitelisted value, its label, and the parameter cleaning. Imported
 * by the browser (to build the form and the summary) and by the server (to
 * re-check everything), so the two can never disagree about what is allowed.
 *
 * RULE (README 7): every value from a URL or a request is checked against this
 * list. Unknown values are ignored silently. Raw parameter text is never
 * written into the page or an email.
 */

export type FormKind = "start-project" | "contact" | "pricing-quote" | "local-preview" | "new-business-offer" | "ai-check";
export const FORM_KINDS: FormKind[] = ["start-project", "contact", "pricing-quote", "local-preview", "new-business-offer", "ai-check"];

/** Which of the three funnel tracks a form belongs to (analytics + team email). */
export type TrackKey = "local" | "custom" | "check";
export const trackOf = (kind: FormKind): TrackKey | null =>
  kind === "local-preview" || kind === "new-business-offer" ? "local" : kind === "ai-check" ? "check" : kind === "contact" ? null : "custom";

export const SERVICES = {
  "new-website": "New website",
  redesign: "Website redesign",
  "full-service": "Full Service",
  "not-sure": "Not sure yet",
} as const;
export const SIZES = {
  starter: "Starter",
  standard: "Standard",
  custom: "Custom",
  "not-sure": "Not sure",
} as const;
export const TIMELINES = {
  asap: "As soon as possible",
  "1-3-months": "In 1–3 months",
  "3-6-months": "In 3–6 months",
  exploring: "Just exploring",
} as const;
/** Track A plans. `local-help` is "Help me choose". */
export const PLANS = {
  "local-start": "Local Start",
  "local-plus": "Local Plus",
  "local-pro": "Local Pro",
  "local-help": "Help me choose",
} as const;
export const OFFERS = {
  "new-business": "New Business Offer",
  "new-business-waitlist": "New Business Offer waitlist",
} as const;
export const INTENTS = { quote: "Fixed quote", "seo-audit": "SEO audit", "ai-check": "Free AI check" } as const;
export const PACKAGES = { micro: "Micro", launch: "Launch", grow: "Grow", scale: "Scale" } as const;
export const GBP = { yes: "Yes", no: "No", "not-sure": "Not sure" } as const;
export const TOPICS = {
  general: "General question",
  project: "A new project",
  "ai-check": "Free AI visibility check",
  support: "Existing project or support",
  partnerships: "Partnerships",
  press: "Press",
  other: "Something else",
} as const;

export type ServiceKey = keyof typeof SERVICES;
export type SizeKey = keyof typeof SIZES;
export type TimelineKey = keyof typeof TIMELINES;
export type PlanKey = keyof typeof PLANS;
export type OfferKey = keyof typeof OFFERS;
export type IntentKey = keyof typeof INTENTS;
export type PackageKey = keyof typeof PACKAGES;
export type GbpKey = keyof typeof GBP;
export type TopicKey = keyof typeof TOPICS;

const has = <T extends object>(map: T, key: unknown): key is keyof T =>
  typeof key === "string" && Object.prototype.hasOwnProperty.call(map, key);

export const pick = {
  service: (v: unknown) => (has(SERVICES, v) ? v : undefined),
  size: (v: unknown) => (has(SIZES, v) ? v : undefined),
  timeline: (v: unknown) => (has(TIMELINES, v) ? v : undefined),
  plan: (v: unknown) => (has(PLANS, v) ? v : undefined),
  offer: (v: unknown) => (has(OFFERS, v) ? v : undefined),
  intent: (v: unknown) => (has(INTENTS, v) ? v : undefined),
  package: (v: unknown) => (has(PACKAGES, v) ? v : undefined),
  gbp: (v: unknown) => (has(GBP, v) ? v : undefined),
  topic: (v: unknown) => (has(TOPICS, v) ? v : undefined),
};

/**
 * `plan` and `offer` together:
 *  - `offer=new-business` (or its waitlist) forces plan = local-start;
 *  - the retired `plan=launch` means local-start + new-business, and
 *    `plan=launch-waitlist` means local-start + new-business-waitlist.
 * Anything else unknown is dropped.
 */
export function resolvePlanOffer(planRaw: unknown, offerRaw: unknown): { plan?: PlanKey; offer?: OfferKey } {
  let plan = pick.plan(planRaw);
  let offer = pick.offer(offerRaw);
  if (planRaw === "launch") offer ??= "new-business";
  else if (planRaw === "launch-waitlist") offer ??= "new-business-waitlist";
  if (offer) plan = "local-start";
  return { plan, offer };
}

/** "Local Plus · R1 750/mo" for a summary row. `local-help` has no price. */
export function planSummary(plan: PlanKey): string {
  const found = localPlanBySlug(plan);
  return found ? `${found.name} · ${formatRand(found.monthly)}/mo` : PLANS[plan];
}

/**
 * ref: the fixed sources, plus case-/service-/industry-/insights- with a slug,
 * and the v2 sources: ai-visibility, ai-report, pricing-monthly, offer,
 * index-{year}, partner-{code}, client-{id}. The slug shape is checked here;
 * whether the slug is a real project is looked up where a name is shown, and an
 * unknown slug simply shows nothing.
 */
const REF_FIXED = [
  "home", "work", "about", "insights", "pricing", "services", "services-consult", "404", "contact", "process", "faq",
  "industry-other", "ai-visibility", "ai-report", "pricing-monthly", "offer",
];
const REF_SLUG = /^(case|service|industry|insights|index|partner|client)-[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const cleanRef = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const ref = v.trim().toLowerCase();
  if (ref.length > 80) return undefined;
  return REF_FIXED.includes(ref) || REF_SLUG.test(ref) ? ref : undefined;
};

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
/** UTMs are free text from outside; keep a short, plain, single-line value. */
export const cleanUtm = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const value = v.replace(/[^\w .\-+%/:]/g, "").trim().slice(0, 100);
  return value || undefined;
};

export const LIMITS = {
  name: 100,
  business: 120,
  email: 254,
  phone: 40,
  message: 2000,
  selection: 2500,
  town: 80,
  services: 300,
  website: 200,
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A website address, with or without https:// ("mokoena.co.za" is fine). */
export const WEBSITE_RE = /^(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[/:?#][^\s]*)?$/i;

/** "Thandi Mokoena" -> "Thandi". */
export const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";

/** Reply time, one string site-wide. */
export const REPLY_TIME = "1–2 business days";
/** The Track A and Track C promises, one string each. */
export const PREVIEW_TIME = previewTime;
export const CHECK_REPORT_TIME = "2 business days";
