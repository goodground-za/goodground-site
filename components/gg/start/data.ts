import { localPlans } from "@/content/pricing";
import {
  GBP,
  PACKAGES,
  PLANS,
  SERVICES,
  SIZES,
  TIMELINES,
  UTM_KEYS,
  cleanRef,
  cleanUtm,
  pick,
  planSummary,
  resolvePlanOffer,
  type GbpKey,
  type IntentKey,
  type OfferKey,
  type PackageKey,
  type PlanKey,
  type ServiceKey,
  type SizeKey,
  type TimelineKey,
} from "@/lib/enquiryShared";

import { formatRand } from "../format";
import type { IconName } from "../Icon";
import { workProjects } from "../work/data";

/**
 * /start-project: the steps for each track, the option copy, and the URL
 * parameter handling. The values are whitelisted in lib/enquiryShared.ts, which
 * the server re-checks.
 *
 * Two tracks share one form:
 *  - local  (Track A, a monthly plan): What you need > Which plan? > Your
 *    business > Your details. Posts formType local-preview.
 *  - custom (Track B, the existing form): Service > Size > Timeline > Your
 *    details. Posts formType start-project.
 * Both are four steps, so the progress bar always reads "Step n of 4". Track C
 * (the free AI check) is not in this form: ?intent=ai-check goes to
 * /services/ai-visibility#book.
 */

export type StartService = ServiceKey | "local";
export type TrackId = "local" | "custom";

export type StepKey = "service" | "size" | "timeline" | "plan" | "business" | "details";

export type StepOption = {
  value: string;
  label: string;
  desc: string;
  icon: IconName;
  /** The monthly-plan card on step 1: plum-highlighted. */
  highlight?: boolean;
  /** Plan cards only. */
  price?: string;
  badge?: string;
  highlights?: string[];
};

export type StepDef = {
  key: StepKey;
  label: string;
  question: string;
  sub: string;
  kind: "options" | "plans" | "business" | "details";
  options: StepOption[];
};

const localFrom = formatRand(localPlans[0].monthly);

const SERVICE_STEP: StepDef = {
  key: "service",
  label: "Service",
  question: "What can we help you with?",
  sub: "Choose the area you need help in.",
  kind: "options",
  options: [
    {
      value: "local",
      label: "Get found online on a monthly plan",
      desc: `Website, Google profile and AI visibility from ${localFrom}/mo. No deposit.`,
      icon: "pin",
      highlight: true,
    },
    { value: "new-website", label: "A new custom website", desc: "A brand-new site, built from scratch.", icon: "sprout" },
    { value: "redesign", label: SERVICES.redesign, desc: "Rebuild or refresh an existing site.", icon: "repeat" },
    { value: "full-service", label: SERVICES["full-service"], desc: "Build, hosting, mailboxes, SEO and maintenance, monthly.", icon: "shield" },
    { value: "not-sure", label: SERVICES["not-sure"], desc: "Help me work out what I need.", icon: "compass" },
  ],
};

const DETAILS_STEP: Pick<StepDef, "key" | "kind" | "options" | "sub"> = { key: "details", kind: "details", options: [], sub: "" };

export const STEPS_CUSTOM: StepDef[] = [
  SERVICE_STEP,
  {
    key: "size",
    label: "Size",
    question: "How big is the project?",
    sub: "A rough idea is fine, we’ll firm it up together.",
    kind: "options",
    options: [
      { value: "starter", label: SIZES.starter, desc: "A few pages, a credible first website.", icon: "file" },
      { value: "standard", label: SIZES.standard, desc: "An established business that needs to sell.", icon: "layers" },
      { value: "custom", label: SIZES.custom, desc: "Booking, e-commerce, integrations, scale.", icon: "code" },
      { value: "not-sure", label: SIZES["not-sure"], desc: "Let’s scope it on a call.", icon: "compass" },
    ],
  },
  {
    key: "timeline",
    label: "Timeline",
    question: "When would you like to start?",
    sub: "No pressure, it just helps us plan ahead.",
    kind: "options",
    options: [
      { value: "asap", label: TIMELINES.asap, desc: "We’re ready to go.", icon: "bolt" },
      { value: "1-3-months", label: TIMELINES["1-3-months"], desc: "Planning ahead.", icon: "cal" },
      { value: "3-6-months", label: TIMELINES["3-6-months"], desc: "On the horizon.", icon: "cal" },
      { value: "exploring", label: TIMELINES.exploring, desc: "Gathering information for now.", icon: "compass" },
    ],
  },
  { ...DETAILS_STEP, label: "Your details", question: "How can we reach you?" },
];

export const STEPS_LOCAL: StepDef[] = [
  { ...SERVICE_STEP, label: "What you need" },
  {
    key: "plan",
    label: "Plan",
    question: "Which plan?",
    sub: "You see a free preview before you pay anything. Change plan any month.",
    kind: "plans",
    options: [
      ...localPlans.map((plan) => ({
        value: plan.slug,
        label: plan.name,
        desc: plan.tagline,
        icon: "pin" as IconName,
        price: `${formatRand(plan.monthly)}/mo`,
        badge: plan.badge === "Most popular" ? plan.badge : undefined,
        highlights: plan.highlights,
      })),
      {
        value: "local-help",
        label: PLANS["local-help"],
        desc: "We’ll recommend one after a quick look at your business.",
        icon: "compass" as IconName,
      },
    ],
  },
  {
    key: "business",
    label: "Your business",
    question: "Tell us about your business.",
    sub: "So we can start your preview. A rough answer is fine.",
    kind: "business",
    options: [],
  },
  { ...DETAILS_STEP, label: "Your details", question: "How can we reach you?" },
];

export const stepsFor = (track: TrackId): StepDef[] => (track === "local" ? STEPS_LOCAL : STEPS_CUSTOM);
export const TOTAL_STEPS = 4;

export type Answers = { service?: StartService; size?: SizeKey; timeline?: TimelineKey; plan?: PlanKey };

/** What step 3 (Your business) collects. Lives beside the contact details, so a Back keeps it. */
export type BusinessFields = { town: string; mainServices: string; websiteUrl: string; gbp: GbpKey | "" };
export const EMPTY_BUSINESS: BusinessFields = { town: "", mainServices: "", websiteUrl: "", gbp: "" };

export const trackOfAnswers = (answers: Answers): TrackId => (answers.service === "local" ? "local" : "custom");

/** The context a visitor arrived with. Only whitelisted values ever land here. */
export type Context = {
  offer?: OfferKey;
  intent?: IntentKey;
  pkg?: PackageKey;
  ref?: string;
  utm: Record<string, string>;
};

export type Arrival = {
  context: Context;
  answers: Answers;
  /** The step to open at (0-based). */
  step: number;
  /** ?intent=ai-check: this form hands off to the AI visibility page (keeping ref). */
  handoff?: string;
};

/**
 * Read the URL's parameters:
 *  - ?plan=local-start|local-plus|local-pro|local-help pre-answers steps 1-2 and opens at step 3;
 *  - ?offer=new-business forces Local Start, same arrival, plus the offer banner;
 *  - legacy ?plan=launch means local-start + new-business, ?plan=launch-waitlist the waitlist;
 *  - ?intent=ai-check hands off to /services/ai-visibility#book, keeping ref.
 * `soldOut` turns new-business into its waitlist. Unknown values are ignored
 * silently; nothing here is ever written to the page as raw text.
 */
export function parseArrival(search: URLSearchParams, soldOut: boolean): Arrival {
  const context: Context = { utm: {} };
  const answers: Answers = {};
  let step = 0;

  const resolved = resolvePlanOffer(search.get("plan"), search.get("offer"));
  const { plan } = resolved;
  let { offer } = resolved;
  if (offer === "new-business" && soldOut) offer = "new-business-waitlist";
  const intent = pick.intent(search.get("intent"));
  const pkg = pick.package(search.get("package"));
  const service = pick.service(search.get("service"));

  if (plan) {
    answers.service = "local";
    answers.plan = plan;
    step = 2;
  } else if (pkg) {
    context.pkg = pkg;
    answers.service = "new-website";
    step = 1;
  } else if (service) {
    answers.service = service;
    step = 1;
  }
  if (offer) context.offer = offer;
  if (intent) context.intent = intent;
  const ref = cleanRef(search.get("ref"));
  if (ref) context.ref = ref;
  for (const key of UTM_KEYS) {
    const value = cleanUtm(search.get(key));
    if (value) context.utm[key] = value;
  }
  const handoff = intent === "ai-check" ? `/services/ai-visibility${ref ? `?ref=${encodeURIComponent(ref)}` : ""}#book` : undefined;
  return { context, answers, step, handoff };
}

/** "case-b3tter-bottle" -> "B3TTER". Unknown slug -> undefined (no chip). */
export function caseNameFromRef(ref?: string): string | undefined {
  if (!ref?.startsWith("case-")) return undefined;
  const slug = ref.slice("case-".length);
  return workProjects.find((p) => p.slug === slug)?.title;
}

export const packageName = (key: PackageKey) => PACKAGES[key];

/** The first-step label for a service answer ("Monthly plan" for local). */
export const serviceLabel = (service: StartService): string =>
  service === "local" ? "Monthly plan" : SERVICES[service];

/** What the summary shows for an answer. */
export function answerLabel(key: StepKey, answers: Answers, business?: { name: string; town: string }): string | undefined {
  switch (key) {
    case "service":
      return answers.service ? serviceLabel(answers.service) : undefined;
    case "size":
      return answers.size ? SIZES[answers.size] : undefined;
    case "timeline":
      return answers.timeline ? TIMELINES[answers.timeline] : undefined;
    case "plan":
      return answers.plan ? planSummary(answers.plan) : undefined;
    case "business":
      return business?.name.trim() ? [business.name.trim(), business.town.trim()].filter(Boolean).join(" · ") : undefined;
    default:
      return undefined;
  }
}

export { GBP };
