import type { IconName } from "../Icon";
import type { TagTone } from "../Tag";

/** Copy from the Services frames (Figma 35:151 / 39:229), tightened from the live /services page. */

export type ServiceRow = { icon: IconName; name: string; meta: string; tag: string; tone: TagTone; anchor: string };

export type Group = {
  key: "build" | "run" | "grow";
  n: string;
  word: string;
  title: string;
  text: string;
  rows: ServiceRow[];
  note: string;
  theme: "surface" | "blush" | "plum";
};

export const GROUPS: Group[] = [
  {
    key: "build",
    n: "01",
    word: "BUILD",
    title: "A website that works as hard as you do",
    text: "Custom-built, designed around how customers decide, and found on Google from launch.",
    theme: "surface",
    rows: [
      { icon: "code", name: "Website Development", meta: "Fixed price · 50/50 or 12 months", tag: "FLAGSHIP", tone: "coral", anchor: "website-development" },
      { icon: "layout", name: "UX & Design", meta: "Included in every build", tag: "INCLUDED", tone: "neutral", anchor: "ux-design" },
      { icon: "search", name: "SEO Foundations", meta: "Included in every build", tag: "INCLUDED", tone: "neutral", anchor: "seo" },
    ],
    note: "UX and SEO are included, never extra line items",
  },
  {
    key: "run",
    n: "02",
    word: "RUN",
    title: "Everything handled after launch",
    text: "Hosting, mailboxes, updates, monitoring and SEO, so you never manage a technical detail.",
    theme: "blush",
    rows: [
      { icon: "repeat", name: "Full Service", meta: "From R1,500/month · cancel any time", tag: "MONTHLY", tone: "neutral", anchor: "full-service" },
      { icon: "shield", name: "Website Care Plans", meta: "Priced per site · 30 days’ notice", tag: "MONTHLY", tone: "neutral", anchor: "care-plans" },
    ],
    note: "Basic maintenance included while you pay off a 12-month build",
  },
  {
    key: "grow",
    n: "03",
    word: "GROW",
    title: "Bring the right people to it",
    text: "Google and Meta campaigns aimed at ready-to-buy customers, measured in leads, not likes.",
    theme: "plum",
    rows: [
      { icon: "target", name: "Google Ads", meta: "Monthly fee + a budget you control", tag: "GROWTH", tone: "on-dark", anchor: "google-ads" },
      { icon: "users", name: "Meta Ads", meta: "Facebook & Instagram", tag: "GROWTH", tone: "on-dark", anchor: "meta-ads" },
    ],
    note: "No lock-in. Cancel with 30 days’ notice",
  },
];

/** Sticky nav chips: desktop name, phone name. */
export const NAV = [
  { anchor: "website-development", name: "Website Development", short: "Development" },
  { anchor: "ux-design", name: "UX & Design", short: "UX & Design" },
  { anchor: "seo", name: "SEO Foundations", short: "SEO" },
  { anchor: "full-service", name: "Full Service", short: "Full Service" },
  { anchor: "care-plans", name: "Care Plans", short: "Care Plans" },
  { anchor: "google-ads", name: "Google Ads", short: "Google Ads" },
  { anchor: "meta-ads", name: "Meta Ads", short: "Meta Ads" },
];

export type Detail = {
  id: string;
  n: string;
  name: string;
  icon: IconName;
  chip: "ink" | "coral" | "plum";
  tag: string;
  tone: TagTone;
  headline: string;
  price: string;
  button?: { label: string; href: string; variant: "coral" | "primary" };
  link?: { label: string; href: string };
  tint: "mint" | "blush" | "lilac";
  problem: string;
  approach: string;
  outcome: string;
};

export const DETAILS: Detail[] = [
  {
    id: "website-development",
    n: "01",
    name: "Website Development",
    icon: "code",
    chip: "ink",
    tag: "FLAGSHIP",
    tone: "coral",
    headline: "A website that works as hard as you do.",
    price: "Fixed price · 50% deposit or 12 monthly instalments",
    button: { label: "Start your project", href: "/start-project?service=website-development&ref=services", variant: "coral" },
    link: { label: "Redesigning an existing site? See website redesign →", href: "/services/website-redesign" },
    tint: "mint",
    problem: "Most business websites are built fast and then left alone. They get slow and outdated, and quietly cost you customers every month.",
    approach: "We design and build custom websites from the ground up: fast, properly mobile, and structured around how your customers decide, not a generic template.",
    outcome: "A site that loads quickly, looks credible on any device, and gives your business a front door worth walking through.",
  },
  {
    id: "ux-design",
    n: "02",
    name: "UX & Design",
    icon: "layout",
    chip: "ink",
    tag: "INCLUDED",
    tone: "plum",
    headline: "Design that’s judged by results, not just looks.",
    price: "Included in every build",
    link: { label: "Full UX & Design details →", href: "/services/ux-design" },
    tint: "mint",
    problem: "A beautiful site that confuses visitors, buries your contact details or takes six clicks to explain what you do loses the customer before they act.",
    approach: "We map the customer journey before designing a single screen: what a visitor needs to see, and in what order, before they trust you enough to act.",
    outcome: "A site people can actually use. Visitors find what they need, and you get more enquiries as a result.",
  },
  {
    id: "seo",
    n: "03",
    name: "SEO Foundations",
    icon: "search",
    chip: "ink",
    tag: "INCLUDED",
    tone: "plum",
    headline: "Search visibility designed in from the start.",
    price: "Included in every build",
    link: { label: "Full SEO details →", href: "/services/seo" },
    tint: "mint",
    problem: "A gorgeous website nobody can find on Google isn’t an investment. It’s a cost.",
    approach: "Solid technical SEO from day one: fast load times, proper page structure, local SEO for South African search, and content built around how customers search.",
    outcome: "A site that works in search from launch, not a second project six months later to “fix the SEO”.",
  },
  {
    id: "full-service",
    n: "04",
    name: "Full Service",
    icon: "repeat",
    chip: "coral",
    tag: "MONTHLY",
    tone: "coral",
    headline: "Everything handled, for one monthly price.",
    price: "From R1,500/month · no minimum term, cancel any time",
    button: { label: "See Full Service pricing", href: "/pricing#full-service", variant: "primary" },
    tint: "blush",
    problem: "Someone still has to run hosting and mailboxes, keep software updated, watch security and stay on top of SEO. Most owners don’t have the time or background.",
    approach: "We build the site, then keep running it: hosting and mailboxes managed for you, ongoing SEO, updates and maintenance, all handled monthly.",
    outcome: "A site that stays fast, secure and found, without you managing a single technical detail.",
  },
  {
    id: "care-plans",
    n: "05",
    name: "Website Care Plans",
    icon: "shield",
    chip: "coral",
    tag: "MONTHLY",
    tone: "coral",
    headline: "Someone looking after the site every month.",
    price: "Priced per site · cancel on 30 days’ notice",
    button: { label: "Ask about a Care Plan", href: "/contact?topic=support", variant: "primary" },
    tint: "blush",
    problem: "Websites rarely fail loudly. A page slows, a certificate lapses, a server falls over on a Saturday night, and it costs enquiries before anyone notices.",
    approach: "Round-the-clock monitoring, certificate tracking, software updates, agreed content updates, and a monthly refresh of your latest Google reviews.",
    outcome: "A site still fast, up and saying the right thing a year after launch, with a short monthly note on what was checked and changed.",
  },
  {
    id: "google-ads",
    n: "06",
    name: "Google Ads",
    icon: "target",
    chip: "plum",
    tag: "GROWTH",
    tone: "dark",
    headline: "Be there the moment someone searches for you.",
    price: "Monthly management fee + an ad budget you control",
    button: { label: "Start your project", href: "/start-project?service=google-ads&ref=services", variant: "primary" },
    link: { label: "Full Google Ads details →", href: "/services/google-ads" },
    tint: "lilac",
    problem: "Most small businesses either don’t advertise on Google or hand it to someone who burns the budget on broad keywords and vague clicks.",
    approach: "Campaigns built around what customers type when they’re ready to act, with tight keywords, honest ad copy, proper tracking and matching landing pages.",
    outcome: "Qualified enquiries you can measure, a cost-per-lead you understand, and a tap you turn up when quiet and down when full.",
  },
  {
    id: "meta-ads",
    n: "07",
    name: "Meta Ads (Facebook & Instagram)",
    icon: "users",
    chip: "plum",
    tag: "GROWTH",
    tone: "dark",
    headline: "Stay in front of the people deciding whether to trust you.",
    price: "Monthly management fee + an ad budget you control",
    button: { label: "Start your project", href: "/start-project?service=meta-ads&ref=services", variant: "primary" },
    link: { label: "Full Meta Ads details →", href: "/services/meta-ads" },
    tint: "lilac",
    problem: "Boosting a post feels like marketing but rarely builds anything. It reaches the wrong people and stops working the second you stop paying.",
    approach: "Campaigns around real audiences: your area, your ideal customer, and past site visitors, with scroll-stopping creative and quiet remarketing.",
    outcome: "A brand people recognise before they need you, steady local interest, and warm leads that already know who you are.",
  },
];

export type Cell = "yes" | "no" | "ask" | string;
export type PlanKey = "build" | "care" | "full";
export const PLANS: { key: PlanKey; name: string; sub: string; badge?: string }[] = [
  { key: "build", name: "12-month build plan", sub: "Included while paying off" },
  { key: "care", name: "Website Care Plan", sub: "Priced per site" },
  { key: "full", name: "Full Service", sub: "From R1,500/month", badge: "MOST HANDS-OFF" },
];

/** "ask" cells are things the live copy does not state (open item 9). */
export const COMPARE_ROWS: { feature: string; short?: string; cells: [Cell, Cell, Cell] }[] = [
  { feature: "Basic maintenance", cells: ["yes", "yes", "yes"] },
  { feature: "Health checks & site monitoring", short: "Monitoring, certificates, reviews", cells: ["Basic", "Around the clock, alerts in minutes", "ask"] },
  { feature: "Security certificate tracking", cells: ["ask", "yes", "ask"] },
  { feature: "Software kept up to date", cells: ["ask", "yes", "yes"] },
  { feature: "Content updates", cells: ["no", "As agreed", "ask"] },
  { feature: "Latest Google reviews refreshed monthly", cells: ["no", "yes", "ask"] },
  { feature: "Monthly note on what changed", cells: ["no", "yes", "ask"] },
  { feature: "Hosting & mailboxes managed", cells: ["ask", "ask", "yes"] },
  { feature: "Ongoing SEO work", cells: ["no", "no", "yes"] },
  { feature: "Term", cells: ["While paying off", "30 days’ notice", "No minimum term"] },
];

export const PLAN_CTA: Record<PlanKey, { label: string; href: string; variant: "outline" | "coral" }> = {
  build: { label: "Start a 12-month build", href: "/start-project?ref=services", variant: "outline" },
  care: { label: "Ask about a Care Plan", href: "/contact?topic=support", variant: "outline" },
  full: { label: "See Full Service pricing", href: "/pricing#full-service", variant: "coral" },
};

export const REASONS = [
  { icon: "eye", title: "Results you can see", line: "Every rand tracked to a click, a call or an enquiry." },
  { icon: "up", title: "You’re found first", line: "At the top when customers search, above competitors relying on luck." },
  { icon: "scale", title: "Start small, scale sensibly", line: "Begin with a budget that suits you; grow it as results earn it." },
  { icon: "brain", title: "A better plan beats a bigger budget", line: "Smart targeting out-thinks the big players." },
  { icon: "tap", title: "Turn the tap up or down", line: "Busy season or quiet month, we adjust in days." },
  { icon: "link", title: "Ads that match your website", line: "One consistent story, so it converts better." },
  { icon: "users", title: "One team, one relationship", line: "The people who built your site run your ads." },
] as const satisfies readonly { icon: IconName; title: string; line: string }[];

export const GROWTH_STEPS = [
  { title: "We learn your business", line: "Goals, best customers, and what a good lead is worth to you." },
  { title: "We build the campaigns", line: "Accounts, tracking, audiences and creative, set up properly." },
  { title: "We launch and manage", line: "Cut what doesn’t work, put more behind what does." },
  { title: "You see the harvest", line: "A plain-language monthly report: spend, leads, cost per result." },
];

export const WHY_GROW = [
  {
    icon: "sprout",
    title: "Foundation first, then growth",
    body: "We don’t run ads to a weak website; that’s pouring water on dry ground. Because we build the foundation, the traffic we send converts.",
  },
  {
    icon: "wallet",
    title: "Your budget, treated like ours",
    body: "We’d rather spend less and get you more. No inflated budgets, no clicks for the sake of clicks.",
  },
  {
    icon: "hand",
    title: "A partner, not a vendor",
    body: "The same team behind your site runs your ads. We think in seasons and years, not one-off campaigns.",
  },
] as const satisfies readonly { icon: IconName; title: string; body: string }[];

/** The phone panels list a condensed set of rows (390 frame), not the whole table. */
export const MOBILE_ROWS: { feature: string; cells: [Cell, Cell, Cell] }[] = [
  { feature: "Basic maintenance", cells: ["yes", "yes", "yes"] },
  { feature: "Software kept up to date", cells: ["ask", "yes", "yes"] },
  { feature: "Hosting & mailboxes managed", cells: ["ask", "ask", "yes"] },
  { feature: "Ongoing SEO work", cells: ["no", "no", "yes"] },
  { feature: "Monitoring, certificates, reviews", cells: ["Basic", "Around the clock", "ask"] },
];
