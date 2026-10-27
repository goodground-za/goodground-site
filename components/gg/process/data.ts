import { faq } from "@/content/faq";
import { fullServicePackage, packages } from "@/content/pricing";

import type { FaqItem } from "../FaqAccordion";
import type { IconName } from "../Icon";
import { formatRand } from "../format";
import { buildItemById } from "../pricing/data";

/**
 * /process: a NEW page (Figma 80:151). What comes from the live site and the
 * shared pricing data is marked; everything else is the design's new copy and is
 * listed for the owner in tasks/figma-redesign-questions.md (the per-step "what
 * we do / what you do / what you get" lists, the 15/15/30/20/20 shares, the
 * 3-working-day feedback window, the named project lead, the weekly update, the
 * three calls, the two scope rules, and three of the six FAQ answers).
 */

/* ---- shared with /pricing: timelines, revision rounds, prices ------------ */
export const EXTRA_ROUND = buildItemById.get("extra-revision")?.price ?? 1500;
export const RUSH = buildItemById.get("extra-rush")?.price ?? 3500;
export const FULL_SERVICE_FROM = fullServicePackage.monthlyFrom;

export const ROUNDS: Record<string, number> = { micro: 1, launch: 1, grow: 2, scale: 3 };
export const rounds = packages.map((p) => ({ name: p.name, rounds: ROUNDS[p.slug] ?? 1 }));

/* ---- nav ----------------------------------------------------------------- */
export const NAV = [
  { anchor: "before-we-start", n: "00", name: "Before we start", short: "Before" },
  { anchor: "research", n: "01", name: "Research", short: "01 Research" },
  { anchor: "direction", n: "02", name: "Direction", short: "02 Direction" },
  { anchor: "design", n: "03", name: "Design", short: "03 Design" },
  { anchor: "revisions", n: "04", name: "Revisions", short: "04 Revisions" },
  { anchor: "handoff", n: "05", name: "Handoff", short: "05 Handoff" },
  { anchor: "beyond-launch", n: "06", name: "Beyond launch", short: "06 After" },
];

export const quickFacts = [
  { to: 6, value: "6", label: "steps", short: "steps" },
  { to: null as number | null, value: "1–6", label: "weeks, by package", short: "weeks" },
  { to: 1, value: "1", label: "fixed price", short: "fixed price" },
  { to: null as number | null, value: "1 month", label: "support included", short: "" },
];

export const tracker = {
  segments: ["done", "done", "current", "", "", ""] as ("done" | "current" | "")[],
  rows: [
    { title: "Research", sub: "Brief and goals agreed", done: true },
    { title: "Direction", sub: "Wireframes approved", done: true },
    { title: "Next: your feedback", sub: "Review link sent · round 1 of 2", done: false },
  ],
};

/* ---- 00 · before we start ------------------------------------------------- */
export const beforeSteps: { icon: IconName; title: string; body: string; note: string }[] = [
  {
    icon: "doc",
    title: "Accept your fixed quote",
    body: "One price, agreed before any work starts. Choose 50/50 or 12 instalments.",
    note: "You pay: the deposit, or your first instalment, to book your slot.",
  },
  {
    icon: "pen",
    title: "Complete your onboarding brief",
    body: "A private online form for everything we need: business, goals, brand, content and access.",
    note: "Saves as you go. Rough notes are fine.",
  },
  {
    icon: "cal",
    title: "Kick-off call",
    body: "We walk through your brief, confirm the plan and timeline, and agree how we’ll keep in touch.",
    note: "You leave with dates for every step.",
  },
];

/* ---- timelines (Gantt) ------------------------------------------------------ */
export const STEP_COLORS = ["#2e1848", "#5b3a7a", "#ef4a23", "#f7b48f", "#9a3348", "#e3f1ea"];
export const STEP_NAMES = ["Research", "Direction", "Design", "Revisions", "Handoff", "Beyond launch"];
/** Share of the timeline each step takes (new copy, indicative). */
export const STEP_SHARES = [15, 15, 30, 20, 20];
const TRACK = 936;

/** Segment [width, x] pairs in the 936px frame, converted to percentages of the track. */
const seg = (w: number, x: number) => ({ left: (x / TRACK) * 100, width: (w / TRACK) * 100 });

export const gantt: { name: string; duration: string; segments: { left: number; width: number }[]; mobile: number }[] = [
  {
    name: "Micro",
    duration: packages[0]?.timeline ?? "~1 week",
    segments: [seg(18, 0), seg(18, 21), seg(38, 41), seg(25, 83), seg(25, 110), seg(124, 144)],
    mobile: 16.6,
  },
  {
    name: "Launch",
    duration: packages[1]?.timeline ?? "~2 weeks",
    segments: [seg(38, 0), seg(38, 41), seg(80, 83), seg(52, 165), seg(52, 220), seg(124, 281)],
    mobile: 33.4,
  },
  {
    name: "Grow",
    duration: packages[2]?.timeline ?? "~3–4 weeks",
    segments: [seg(69, 0), seg(69, 72), seg(141, 144), seg(93, 289), seg(93, 385), seg(124, 487)],
    mobile: 58.3,
  },
  {
    name: "Scale",
    duration: (packages[3]?.timeline ?? "~4–6 weeks").split(",")[0],
    segments: [seg(100, 0), seg(100, 103), seg(203, 206), seg(135, 413), seg(135, 550), seg(124, 694)],
    mobile: 83.4,
  },
];
export const AXIS = ["Kick-off", "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];

/* ---- the six steps -------------------------------------------------------------- */
export type StepCard = {
  id: string;
  n: string;
  name: string;
  icon: IconName;
  pct?: number;
  timePill?: string;
  desc: string;
  payment?: string;
  revisions?: string[];
  we: string[];
  you: string[];
  get: string[];
  paidPill?: string;
  dark?: boolean;
};

export const steps: StepCard[] = [
  {
    id: "research",
    n: "01",
    name: "Research",
    icon: "search",
    pct: 15,
    desc: "We understand your goals, users and friction points before shaping the solution.",
    payment: "Deposit or first instalment paid at booking",
    paidPill: "Paid at booking",
    we: [
      "Review your onboarding brief and goals",
      "Study your customers and competitors",
      "Audit your current site and search presence, if you have one",
      "Research the search terms and areas to target",
    ],
    you: ["Complete your onboarding brief", "Join the kick-off call", "Approve access through our secure request"],
    get: ["A written project plan: goals, pages and how we’ll measure success", "A first sitemap", "Dates for every step"],
  },
  {
    id: "direction",
    n: "02",
    name: "Direction",
    icon: "compass",
    pct: 15,
    desc: "We turn insights into flows, wireframes and prototypes that make the direction clear.",
    we: [
      "Page structure and navigation",
      "Wireframes for your key pages",
      "The visitor journey to your ONE main action",
      "A content plan: who writes what, by when",
    ],
    you: ["Review the wireframes", "Approve the structure", "Start gathering any content you’re supplying"],
    get: ["Approved sitemap and wireframes", "A content checklist with due dates"],
  },
  {
    id: "design",
    n: "03",
    name: "Design",
    icon: "pen",
    pct: 30,
    desc: "We design the interface, system, content and assets with careful production detail.",
    we: [
      "Visual design for your homepage and key pages",
      "Mobile-first layouts",
      "Copywriting, if it’s part of your package",
      "Your site built on a private review link",
    ],
    you: ["Review designs on the review link", "Supply the remaining content and photos"],
    get: ["Your designed site, live on a private preview link"],
  },
  {
    id: "revisions",
    n: "04",
    name: "Revisions",
    icon: "repeat",
    pct: 20,
    desc: "We refine the work against your feedback, tightening details until everything holds up.",
    revisions: [
      ...rounds.map((r) => `${r.name}: ${r.rounds} round${r.rounds === 1 ? "" : "s"}`).reduce<string[]>((acc, line) => {
        // "Micro & Launch: 1 round" when two packages share a count, as drawn.
        const [, count] = line.split(": ");
        const last = acc[acc.length - 1];
        if (last && last.endsWith(`: ${count}`)) {
          acc[acc.length - 1] = `${last.split(": ")[0]} & ${line}`;
          return acc;
        }
        acc.push(line);
        return acc;
      }, []),
      `Extra rounds: ${formatRand(EXTRA_ROUND)} each`,
    ],
    we: ["Apply your feedback, round by round", "Test on phones, tablets and desktops", "Speed, accessibility and SEO checks"],
    you: ["Send one combined set of feedback per round", "Final approver signs off"],
    get: ["An approved, tested site, ready to launch"],
  },
  {
    id: "handoff",
    n: "05",
    name: "Handoff",
    icon: "bolt",
    pct: 20,
    desc: "We hand off files, guidelines and support so the work lands cleanly.",
    payment: "50/50: balance due before handover · 12-month plan: instalments 2–12 start once your site is completed",
    paidPill: "Paid before handover",
    we: [
      "Launch and connect your domain",
      "Submit your site to Google Search Console",
      "Set up analytics behind a consent banner",
      "Hand over logins, files and a short guide",
      "Scale: a 1-hour training session",
    ],
    you: ["Approve go-live", "Settle the balance (50/50 option)"],
    get: ["Your live website", "All files and access details", "A handover guide"],
  },
  {
    id: "beyond-launch",
    n: "06",
    name: "Beyond launch",
    icon: "heart",
    timePill: "1 month after launch",
    desc: "One month of support, included.",
    we: ["Fix anything that isn’t right", "Keep an eye on speed, uptime and forms", "Small tweaks as real visitors arrive"],
    you: ["Tell us if anything looks off"],
    get: ["A smooth first month, then a choice of ongoing care"],
    dark: true,
  },
];

/* ---- when you pay ------------------------------------------------------------------ */
export const PAY_COLUMNS = ["Book", "Research", "Direction", "Design", "Revisions", "Handoff", "After launch"];
export type PayCell = { amount: string; caption: string; due: boolean };
export const payPlans: { name: string; sub: string; cells: (PayCell | null)[] }[] = [
  {
    name: "50 / 50",
    sub: "Deposit + completion",
    cells: [
      { amount: "50%", caption: "to book your slot", due: true },
      null,
      null,
      null,
      null,
      { amount: "50%", caption: "before handover", due: true },
      null,
    ],
  },
  {
    name: "12 instalments",
    sub: "Same total, spread",
    cells: [
      { amount: "1 of 12", caption: "books your slot", due: true },
      null,
      null,
      null,
      null,
      { amount: "2 of 12", caption: "starts on completion", due: true },
      { amount: "3–12", caption: "monthly", due: false },
    ],
  },
  {
    name: "Website Launch Offer",
    sub: "R845 × 12",
    cells: [
      { amount: "R845", caption: "month 1", due: true },
      { amount: "R845", caption: "monthly", due: false },
      null,
      null,
      null,
      null,
      { amount: "…", caption: "to month 12", due: false },
    ],
  },
];
export const payPlansMobile = [
  { name: "50 / 50", a: "50% at booking", b: "50% before handover" },
  { name: "12 instalments", a: "1st at booking", b: "2–12 from completion" },
  { name: "Launch Offer", a: "R845 monthly", b: "for 12 months" },
];

/* ---- revisions ------------------------------------------------------------------------- */
export const countsAsRound = [
  "All your feedback on a design, sent together",
  "Comments from everyone, combined by your final approver",
  "Fixes for things we got wrong (these never use up a round)",
];
export const countsAsScope = ["A new page or feature that wasn’t in your quote", "Changing direction after the design is approved"];

/* ---- your part ----------------------------------------------------------------------------- */
export const needs: { icon: IconName; text: string; short: string; when: string; shortWhen: string }[] = [
  { icon: "doc", text: "Your onboarding brief", short: "Onboarding brief", when: "Before kick-off", shortWhen: "Before kick-off" },
  { icon: "lock", text: "Access to domain, hosting and email (via our secure request)", short: "Secure access", when: "Research", shortWhen: "Research" },
  { icon: "layers", text: "Approval of the sitemap and wireframes", short: "Wireframe approval", when: "End of Direction", shortWhen: "Direction" },
  { icon: "image", text: "Your logo, photos and any text you’re supplying", short: "Logo, photos, text", when: "Start of Design", shortWhen: "Design" },
  { icon: "chat", text: "One combined set of feedback per round", short: "Combined feedback", when: "Revisions", shortWhen: "Revisions" },
  { icon: "check", text: "Final sign-off from your approver", short: "Final sign-off", when: "End of Revisions", shortWhen: "Revisions" },
];

/* ---- working together ---------------------------------------------------------------------------- */
export const together: { icon: IconName; title: string; body: string }[] = [
  { icon: "users", title: "A named project lead", body: "One person who knows your project, from kick-off to launch." },
  { icon: "chat", title: "WhatsApp and email", body: "Quick questions on WhatsApp; decisions confirmed in writing by email." },
  { icon: "clock", title: "Replies within 1–2 business days", body: "Usually much sooner during your project." },
  { icon: "link", title: "Private review links", body: "See your real site as it’s built, on any device." },
  { icon: "mobile", title: "Calls when they help", body: "Kick-off, design walk-through and handover; more if you need them." },
  { icon: "layers", title: "Weekly progress update", body: "A short note: what’s done, what’s next, anything we need." },
];

/* ---- after launch ------------------------------------------------------------------------------------ */
export const afterSegments = [
  { label: "LAUNCH", text: "Your site goes live", tone: "coral" },
  { label: "MONTH 1", text: "Support included, every project", tone: "mint" },
  { label: "MONTHS 2–12", text: "On the 12-month plan: basic maintenance, health checks and monitoring included", tone: "lilac" },
  { label: "THEN", text: "Care Plan, Full Service, or look after it yourself", tone: "canvas" },
];

export const afterOptions: {
  icon: IconName;
  tone: "surface" | "blush" | "plum";
  title: string;
  body: string;
  price: string;
  button: { label: string; href: string; variant: "outline" | "coral" };
}[] = [
  {
    icon: "heart",
    tone: "surface",
    title: "Look after it yourself",
    body: "We hand over everything you need. You can always call on us later.",
    price: "Free",
    button: { label: "Read the handover guide", href: "/insights", variant: "outline" },
  },
  {
    icon: "shield",
    tone: "blush",
    title: "Website Care Plan",
    body: "Round-the-clock monitoring, certificate tracking, updates, content changes and a monthly note.",
    price: "Priced per site · 30 days’ notice",
    button: { label: "Ask about a Care Plan", href: "/contact?topic=support", variant: "outline" },
  },
  {
    icon: "repeat",
    tone: "plum",
    title: "Full Service",
    body: "Hosting, mailboxes, ongoing SEO, updates and maintenance in one monthly price.",
    price: `From ${formatRand(FULL_SERVICE_FROM)}/month · cancel any time`,
    button: { label: "See Full Service pricing", href: "/pricing#full-service", variant: "coral" },
  },
];

/* ---- FAQ -------------------------------------------------------------------------------------------------- */
const live = (question: string) => faq.find((item) => item.question === question)?.answer ?? "";

export const processFaq: FaqItem[] = [
  {
    question: "What happens if the project scope changes partway through?",
    answer: [live("What happens if the project scope changes partway through?")],
  },
  {
    question: "What if I need to pause or cancel partway through?",
    answer: [live("What if I need to pause or cancel partway through the project?")],
  },
  {
    // New in the design; DRAFT, from the "3 working days" and "dates move, not the price" lines.
    question: "What if I’m slow with content or feedback?",
    answer: [
      "It happens, and we plan for it. We ask for feedback within 3 working days of each review link. If content or feedback arrives late, the launch date moves, never the price.",
    ],
  },
  {
    question: "Can I see the site while it’s being built?",
    answer: [
      "Yes. From the Design step your site is built on a private review link, so you see the real thing, on any device, as it comes together.",
    ],
  },
  {
    // New in the design; DRAFT. Ownership needs the owner's decision (it also belongs in the Terms).
    question: "Who owns the website when it’s done?",
    answer: ["You do. Once your project is paid in full, the website, its files and its content are yours, and we hand them over at launch."],
  },
  { question: "What happens after my website launches?", answer: [live("What happens after my website launches?")] },
];
