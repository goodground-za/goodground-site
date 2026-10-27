/**
 * What the redesigned forms (/start-project, /contact, the /pricing quote form)
 * and /api/enquiry agree on: every whitelisted value, its label, and the
 * parameter cleaning. Imported by the browser (to build the form and the
 * summary) and by the server (to re-check everything), so the two can never
 * disagree about what is allowed.
 *
 * RULE (README 7): every value from a URL or a request is checked against this
 * list. Unknown values are ignored silently. Raw parameter text is never
 * written into the page or an email.
 */

export type FormKind = "start-project" | "contact" | "pricing-quote";
export const FORM_KINDS: FormKind[] = ["start-project", "contact", "pricing-quote"];

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
export const PLANS = { launch: "Launch", "launch-waitlist": "Launch waitlist" } as const;
export const INTENTS = { quote: "Fixed quote", "seo-audit": "SEO audit" } as const;
export const PACKAGES = { micro: "Micro", launch: "Launch", grow: "Grow", scale: "Scale" } as const;
export const TOPICS = {
  general: "General question",
  project: "A new project",
  support: "Existing project or support",
  partnerships: "Partnerships",
  press: "Press",
  other: "Something else",
} as const;

export type ServiceKey = keyof typeof SERVICES;
export type SizeKey = keyof typeof SIZES;
export type TimelineKey = keyof typeof TIMELINES;
export type PlanKey = keyof typeof PLANS;
export type IntentKey = keyof typeof INTENTS;
export type PackageKey = keyof typeof PACKAGES;
export type TopicKey = keyof typeof TOPICS;

const has = <T extends object>(map: T, key: unknown): key is keyof T =>
  typeof key === "string" && Object.prototype.hasOwnProperty.call(map, key);

export const pick = {
  service: (v: unknown) => (has(SERVICES, v) ? v : undefined),
  size: (v: unknown) => (has(SIZES, v) ? v : undefined),
  timeline: (v: unknown) => (has(TIMELINES, v) ? v : undefined),
  plan: (v: unknown) => (has(PLANS, v) ? v : undefined),
  intent: (v: unknown) => (has(INTENTS, v) ? v : undefined),
  package: (v: unknown) => (has(PACKAGES, v) ? v : undefined),
  topic: (v: unknown) => (has(TOPICS, v) ? v : undefined),
};

/**
 * ref: the fixed sources, plus case-/service-/industry- with a slug. The slug
 * shape is checked here; whether the slug is a real project is looked up where
 * a name is shown, and an unknown slug simply shows nothing.
 */
const REF_FIXED = ["home", "work", "about", "insights", "pricing", "services", "services-consult", "404", "contact", "process", "industry-other"];
const REF_SLUG = /^(case|service|industry|insights)-[a-z0-9]+(?:-[a-z0-9]+)*$/;
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
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** "Thandi Mokoena" -> "Thandi". */
export const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";

/** Reply time, one string site-wide. */
export const REPLY_TIME = "1–2 business days";
