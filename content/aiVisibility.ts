import { newBusinessOffer } from "@/content/newBusinessOffer";

/**
 * Copy and data for /services/ai-visibility.
 *
 * HONESTY RULES this file enforces:
 *  - THE SITE NEVER RUNS A SCAN. The sample below is fictional and every place
 *    it appears is labelled EXAMPLE DATA. The free check is a request the team
 *    runs by hand (app/api/enquiry, lib/freeCheck.ts).
 *  - No score, no ranking promise, no guarantee.
 *  - Every statistic carries a visible source line that links to where the
 *    figure was published. A claim with no source is not on the page.
 *
 * Plan prices, add-ons and the free-check budget are NOT here: the page reads
 * them from content/pricing.ts and content/site.ts.
 */

export const aiPage = {
  path: "/services/ai-visibility",
  title: "AI Visibility Check: Does AI Recommend You? | GoodGround",
  description:
    "Find out how often ChatGPT, Gemini and Google’s AI recommend your business when local customers ask. Free check for Garden Route businesses.",
  breadcrumb: "AI visibility",
  serviceName: "AI visibility check and monthly report",
} as const;

/* ----------------------------------------------------------- band rules */

/**
 * The band rules, shared with the scanner and the monthly report:
 * Usually: named in at least two thirds of checks. Sometimes: a third to two
 * thirds. Rarely: more than none, under a third. Not seen: none.
 * Integer maths, so 3 of 9 (exactly a third) is Sometimes.
 */
export type Band = "usually" | "sometimes" | "rarely" | "not-seen";

export const BAND_LABEL: Record<Band, string> = {
  usually: "Usually",
  sometimes: "Sometimes",
  rarely: "Rarely",
  "not-seen": "Not seen",
};

export function bandFor(named: number, checks: number): Band {
  if (named <= 0) return "not-seen";
  if (named * 3 >= checks * 2) return "usually";
  if (named * 3 >= checks) return "sometimes";
  return "rarely";
}

/**
 * "Likely true rate": the 95% Wilson interval for `named` of `checks`, in whole
 * percent. The scanner's stats.mjs uses the same formula, so this page, the
 * report and the monthly report agree.
 */
export function wilsonRange(named: number, checks: number): [number, number] {
  if (checks <= 0) return [0, 0];
  const z = 1.96;
  const p = named / checks;
  const denominator = 1 + (z * z) / checks;
  const centre = (p + (z * z) / (2 * checks)) / denominator;
  const margin = (z * Math.sqrt((p * (1 - p)) / checks + (z * z) / (4 * checks * checks))) / denominator;
  return [Math.max(0, Math.round((centre - margin) * 100)), Math.min(100, Math.round((centre + margin) * 100))];
}

/* ----------------------------------------------------------- the sample */

/** EXAMPLE DATA: a fictional George plumber. Names below are invented. */
export const SAMPLE_CHECKS_PER_ENGINE = 9;

export const sample = {
  business: "Outeniqua Plumbing",
  town: "George",
  /** "George" plumber, geyser repair: the question the hero example asks. */
  question: "Who should I call for geyser repair in George?",
  similarQuestions: 7,
  runsEach: 3,
  engines: [
    { name: "Google AI Overviews", named: 4 },
    { name: "Google AI Mode", named: 2 },
    { name: "ChatGPT", named: 0 },
    { name: "Gemini", named: 1 },
  ],
  namedInstead: [
    { business: "George Plumbing Services", answers: 19 },
    { business: "Southern Cape Geysers", answers: 14 },
    { business: "Knysna Plumbing & Repairs", answers: 9 },
  ],
  heroFoot: "Named instead most often: two George competitors and one Knysna firm.",
  fixFirst: [
    { title: "Complete your Google Business Profile", body: "Add services, service areas and photos, and post twice a month." },
    { title: "Ask for reviews that mention the service and George", body: "We give you simple wording to send customers." },
    { title: "Add a page for geyser repair in George", body: "It gives AI engines a direct answer to quote." },
  ],
  /** The period on the sample label follows the offer intake month. */
  period: `${newBusinessOffer.month} ${newBusinessOffer.year}`,
} as const;

export const sampleTotals = {
  named: sample.engines.reduce((sum, engine) => sum + engine.named, 0),
  answers: sample.engines.length * SAMPLE_CHECKS_PER_ENGINE,
};

/* ----------------------------------------------------------- page copy */

export const hero = {
  tag: "NEW · AI VISIBILITY",
  h1: "DOES AI RECOMMEND YOUR BUSINESS?",
  lede: "Your customers now ask ChatGPT, Gemini and Google’s AI who to call. We check how often you’re named, show you who’s named instead, and fix what those AI engines read about you.",
  ledeShort: "Customers now ask AI who to call. We check how often you’re named, and fix what AI reads about you.",
  exampleTag: "EXAMPLE · FICTIONAL PLUMBER",
} as const;

/** Three stat cards. The source is always visible under the figure. */
export const stats = [
  {
    value: "70%",
    label: "of South African adults have used an AI chatbot.",
    source: "Google / Ipsos, 2026 (Google-sponsored)",
    href: "https://www.bizcommunity.com/article/new-report-finds-strong-growth-in-ai-use-among-sa-adults-395368a",
  },
  {
    value: "Aug 2025",
    label: "Google’s AI Mode launched in South Africa, joining AI Overviews in search results.",
    source: "TechCentral",
    href: "https://techcentral.co.za/google-rolls-out-advanced-ai-mode-in-south-africa-nigeria-and-kenya/268933/",
  },
  {
    value: "~70%",
    label: "of what AI cites for local businesses comes from their own website and Google Business Profile.",
    source: "BrightLocal local AI study, 2026 (42% websites, ~28.5% Google profiles)",
    href: "https://www.brightlocal.com/research/local-ai-visibility-study/",
  },
] as const;

export const how = {
  tag: "HOW IT WORKS",
  heading: "We ask like a customer, count honestly, then fix what matters.",
  steps: [
    {
      title: "We ask like your customers do",
      body: "8 to 12 everyday questions about your services in your town, in English and Afrikaans: “best plumber in George”, “beste loodgieter in George”. Each one goes to four AI assistants, three times.",
      engines: ["Google AI Overviews", "Google AI Mode", "ChatGPT", "Gemini"],
    },
    {
      title: "We count how often you’re named",
      body: "You get “named in 3 of 9 checks” for each assistant, in plain bands from Usually to Not seen, plus the businesses AI recommends instead of you. We also check your website for the basics AI engines look for.",
    },
    {
      title: "We fix it and track the trend",
      body: "We improve the signals AI engines read: your Google Business Profile, reviews, a page per service in your town, and structured data. Your monthly report shows whether it’s working.",
    },
  ],
} as const;

export const sampleSection = {
  tag: "SAMPLE REPORT",
  heading: "What lands in your inbox every month.",
  side: "A shortened example for a fictional George plumber. Paying clients get the full version, question by question.",
} as const;

export const method = {
  tag: "HOW WE REPORT",
  h2: "NO FAKE SCORES. NO GUARANTEED RANKINGS.",
  lede: "AI answers change from one moment to the next. Anyone who gives you a single “AI rank” is guessing. Here’s what we do instead.",
  rows: [
    {
      title: "We ask every question three times",
      body: "Every question goes to each assistant three times, so we can count how often you’re named instead of relying on a single answer.",
    },
    {
      title: "We show a range, not a number",
      body: "“3 of 9 checks” could mean anywhere from 12% to 65% of the time. We say so.",
    },
    {
      title: "We track the trend over three months",
      body: "We only call a change when you’ve moved a full band, so a noisy week never looks like a drop.",
    },
    {
      title: "We tell you what we can’t see",
      body: "Meta AI in WhatsApp can’t be measured, and the apps can differ slightly from what we check. It’s in every report.",
    },
    {
      title: "We promise the work, not the result",
      body: "No one can guarantee an AI recommendation. We fix the signals AI engines read and show you honestly whether it’s working.",
    },
  ],
} as const;

export const included = {
  tag: "INCLUDED IN YOUR PLAN",
  heading: "The monthly report comes with Local Plus and Local Pro.",
  compare: { label: "Compare all plans →", href: "/pricing#monthly" },
} as const;

export const book = {
  tag: "FREE CHECK",
  h2: "BOOK YOUR FREE AI VISIBILITY CHECK.",
  lede: "Tell us about your business and we’ll run the check ourselves, then send you the report within two business days. No obligation, no automated sales emails.",
  ticks: ["One free check per business", "Run and checked by a person in George", "We only use public information about your business"],
  consent:
    "I agree that GoodGround may use these details to run my check and contact me about it, as set out in the privacy notice.",
  marketing: "Send me occasional tips on getting found online.",
  button: "Request my free check",
  waitlistButton: "Join the waitlist",
  note: "We review every request before running it. Report within 2 business days.",
} as const;

export const faqHeading = { tag: "COMMON QUESTIONS", heading: "About AI visibility." } as const;

/** The AI page's own questions. “Can you guarantee…” is the shared entry (content/faq.ts, slug ai-guarantee). */
export const aiFaqOwn = {
  instant: {
    question: "Why isn’t the check instant?",
    answer:
      "Every check asks four AI assistants dozens of questions, which costs real money each time. Running them by request keeps the free check free and lets a person look over your results before you see them.",
  },
  assistants: {
    question: "Which AI assistants do you check?",
    answer: "Google AI Overviews, Google AI Mode, ChatGPT and Gemini. Meta AI in WhatsApp can’t be measured, and we say so in every report.",
  },
  needGoodground: {
    question: "Do I need a GoodGround website?",
    answer:
      "Not for the free check. The monthly report comes with Local Plus and Local Pro, or as Visibility Watch for sites we’ve built.",
  },
  needFromMe: {
    question: "What do you need from me?",
    answer: "Your business name, town, main services and website if you have one. We only use public information about your business.",
  },
} as const;
