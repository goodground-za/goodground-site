import {
  PACKAGES,
  SERVICES,
  SIZES,
  TIMELINES,
  UTM_KEYS,
  cleanRef,
  cleanUtm,
  pick,
  type IntentKey,
  type PackageKey,
  type PlanKey,
  type ServiceKey,
  type SizeKey,
  type TimelineKey,
} from "@/lib/enquiryShared";

import type { IconName } from "../Icon";
import { workProjects } from "../work/data";

/**
 * /start-project: the four steps, the option copy (the live form's labels), and
 * the URL parameter handling. The values are whitelisted in
 * lib/enquiryShared.ts, which the server re-checks.
 */

export type StepKey = "service" | "size" | "timeline";

type Option<K extends string> = { value: K; label: string; desc: string; icon: IconName };

export const STEPS: {
  key: StepKey;
  label: string;
  question: string;
  sub: string;
  options: Option<string>[];
}[] = [
  {
    key: "service",
    label: "Service",
    question: "What can we help you with?",
    sub: "Choose the area you need help in.",
    options: [
      { value: "new-website", label: SERVICES["new-website"], desc: "A brand-new site, built from scratch.", icon: "sprout" },
      { value: "redesign", label: SERVICES.redesign, desc: "Rebuild or refresh an existing site.", icon: "repeat" },
      { value: "full-service", label: SERVICES["full-service"], desc: "Build, hosting, mailboxes, SEO and maintenance, monthly.", icon: "shield" },
      { value: "not-sure", label: SERVICES["not-sure"], desc: "Help me work out what I need.", icon: "compass" },
    ],
  },
  {
    key: "size",
    label: "Size",
    question: "How big is the project?",
    sub: "A rough idea is fine, we’ll firm it up together.",
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
    options: [
      { value: "asap", label: TIMELINES.asap, desc: "We’re ready to go.", icon: "bolt" },
      { value: "1-3-months", label: TIMELINES["1-3-months"], desc: "Planning ahead.", icon: "cal" },
      { value: "3-6-months", label: TIMELINES["3-6-months"], desc: "On the horizon.", icon: "cal" },
      { value: "exploring", label: TIMELINES.exploring, desc: "Gathering information for now.", icon: "compass" },
    ],
  },
];

export const STEP_LABELS = ["Service", "Size", "Timeline", "Your details"];
export const TOTAL_STEPS = 4;

export type Answers = { service?: ServiceKey; size?: SizeKey; timeline?: TimelineKey };

/** The context a visitor arrived with. Only whitelisted values ever land here. */
export type Context = {
  plan?: PlanKey;
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
};

/**
 * Read the URL's parameters. `soldOut` turns ?plan=launch into the waitlist.
 * Unknown values are ignored silently; nothing here is ever written to the page
 * as raw text.
 */
export function parseArrival(search: URLSearchParams, soldOut: boolean): Arrival {
  const context: Context = { utm: {} };
  const answers: Answers = {};
  let step = 0;

  let plan = pick.plan(search.get("plan"));
  if (plan === "launch" && soldOut) plan = "launch-waitlist";
  const intent = pick.intent(search.get("intent"));
  const pkg = pick.package(search.get("package"));
  const service = pick.service(search.get("service"));

  if (plan) {
    context.plan = plan;
    answers.service = "new-website";
    answers.size = "starter";
    step = 2;
  } else if (pkg) {
    context.pkg = pkg;
    answers.service = "new-website";
    step = 1;
  } else if (service) {
    answers.service = service;
    step = 1;
  }
  if (intent) context.intent = intent;
  const ref = cleanRef(search.get("ref"));
  if (ref) context.ref = ref;
  for (const key of UTM_KEYS) {
    const value = cleanUtm(search.get(key));
    if (value) context.utm[key] = value;
  }
  return { context, answers, step };
}

/** "case-b3tter-bottle" -> "B3TTER". Unknown slug -> undefined (no chip). */
export function caseNameFromRef(ref?: string): string | undefined {
  if (!ref?.startsWith("case-")) return undefined;
  const slug = ref.slice("case-".length);
  return workProjects.find((p) => p.slug === slug)?.title;
}

export const packageName = (key: PackageKey) => PACKAGES[key];

/** What the summary shows for an answer. */
export function answerLabel(key: StepKey, answers: Answers): string | undefined {
  const value = answers[key];
  if (!value) return undefined;
  const map: Record<StepKey, Record<string, string>> = { service: SERVICES, size: SIZES, timeline: TIMELINES };
  return map[key][value];
}
