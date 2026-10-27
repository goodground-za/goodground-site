import { alaCarteCategories, baseBuildFee, fullServicePackage, packages, type AlaCarteItem } from "@/content/pricing";
import { launchTerms } from "@/content/websiteLaunch";

import { formatRand } from "../format";

/**
 * Everything the /pricing page computes or words, in one place. The prices
 * themselves are in content/pricing.ts (the one source the rest of the site
 * reads); this file adds the maths and the redesign's card copy on top.
 */

/* ----------------------------------------------------------------- maths */

/** 12-instalment amount: total ÷ 12 rounded UP to the rand (R19,400 → R1,617). */
export const INSTALMENTS = 12;
export const instalmentFor = (total: number) => Math.ceil(total / INSTALMENTS);
/** Deposit: half the total. The balance is the other half. */
export const depositOf = (total: number) => Math.ceil(total / 2);
export const balanceOf = (total: number) => total - depositOf(total);

export type Billing = "deposit" | "instalments";
export const BILLING_OPTIONS: { value: Billing; label: string }[] = [
  { value: "deposit", label: "50% deposit" },
  { value: "instalments", label: "12 monthly instalments" },
];
export const BILLING_OPTIONS_SHORT: { value: Billing; label: string }[] = [
  { value: "deposit", label: "50% deposit" },
  { value: "instalments", label: "12 instalments" },
];

/* -------------------------------------------------------------- packages */

export type PackageView = {
  slug: string;
  name: string;
  total: number;
  tagline: string;
  /** Card inclusions (the Figma wording; the verbatim list stays in content/pricing.ts for JSON-LD). */
  inclusions: string[];
  bestFor: string;
  timeline: string;
  recommended?: boolean;
  /** What the configurator's hint says this package covers, in a clause. */
  hint: string;
};

const CARD_COPY: Record<string, Omit<PackageView, "slug" | "name" | "total" | "timeline">> = {
  micro: {
    tagline: "A sharp, single-page site for a strong first impression.",
    inclusions: [
      "1 page with distinct scroll sections",
      "Fully custom-coded, mobile-responsive",
      "Custom micro-interactions",
      "Contact section with working form",
      "Basic on-page SEO",
      "1 round of revisions",
    ],
    bestFor: "Solo freelancers, personal brands, pop-ups, events, holding pages",
    hint: "a single page with a contact form and basic SEO",
  },
  launch: {
    tagline: "A clean, professional website to get you online fast.",
    inclusions: [
      "Up to 5 pages",
      "Fully custom-coded, mobile-responsive",
      "Contact form with email notifications",
      "Basic on-page SEO",
      "Social media links",
      "1 round of revisions",
    ],
    bestFor: "New businesses or solo founders who need a credible presence",
    hint: "up to 5 pages, contact form, basic SEO and social links",
  },
  grow: {
    tagline: "Fully custom, with the interactive touches that make you stand out.",
    inclusions: [
      "Up to 10 pages, incl. Blog/News",
      "Unique design, no templates",
      "Custom interactive elements",
      "Forms with conditional logic",
      "Integrations: maps, booking, WhatsApp",
      "SEO + Analytics & Search Console",
      "2 rounds of revisions",
    ],
    bestFor: "Small businesses ready to market online and stand out",
    recommended: true,
    hint: "up to 10 pages with a blog, interactive elements and SEO with analytics",
  },
  scale: {
    tagline: "A fully custom platform built to be your business hub online.",
    inclusions: [
      "15+ pages, fully custom",
      "Advanced functionality: multi-step forms, calculators, APIs",
      "Advanced interactive design",
      "Advanced SEO + speed optimisation",
      "Copywriting guidance for key pages",
      "3 rounds of revisions",
      "1-hour training session",
    ],
    bestFor: "Businesses that need the site to be a real sales or operations tool",
    hint: "15+ pages, advanced functionality and advanced SEO",
  },
};

export const packageViews: PackageView[] = packages.map((p) => ({
  slug: p.slug,
  name: p.name,
  total: p.total,
  timeline: p.timeline,
  ...CARD_COPY[p.slug],
}));

export const packageBySlug = (slug: string) => packageViews.find((p) => p.slug === slug);

/* -------------------------------------------------------- ways to pay */

export type WayValue = { text?: string; prefix?: string; money?: number; suffix?: string; coral?: boolean };
export type Way = {
  id: string;
  name: string;
  sub: string;
  tone: "surface" | "plum" | "blush";
  upfront: WayValue;
  monthly: WayValue;
  howLong: WayValue;
  total: WayValue;
  get: WayValue;
  end: WayValue;
  cta: { label: string; href: string; variant: "outline" | "coral" };
  /** Phone card: the two headline values. */
  card: { name: string; monthly: WayValue; total: WayValue };
};

const lowest = packageViews[0].total;

export const ways: Way[] = [
  {
    id: "deposit",
    name: "A package, paid by deposit",
    sub: "Micro, Launch, Grow or Scale",
    tone: "surface",
    upfront: { text: "Half the price, from ", money: depositOf(lowest) },
    monthly: { text: "Nothing" },
    howLong: { text: "Other half on completion, before handover" },
    total: { prefix: "From ", money: lowest },
    get: { text: "The build. Hosting, domain and upkeep arranged separately." },
    end: { text: "Paid off. The site is yours." },
    cta: { label: "See the packages", href: "#packages", variant: "outline" },
    card: { name: "Package, by deposit", monthly: { text: "Nothing monthly" }, total: { prefix: "From ", money: lowest } },
  },
  {
    id: "instalments",
    name: "A package, in 12 instalments",
    sub: "Micro, Launch, Grow or Scale",
    tone: "surface",
    upfront: { text: "First instalment, from ", money: instalmentFor(lowest) },
    monthly: { prefix: "From ", money: instalmentFor(lowest) },
    howLong: { text: "12 payments: the first books your slot, the other 11 start once your site is finished" },
    total: { prefix: "From ", money: lowest },
    get: { text: "The build, with basic maintenance and monitoring while you pay it off." },
    end: { text: "Paid off. The site is yours." },
    cta: { label: "See the packages", href: "#packages", variant: "outline" },
    card: {
      name: "Package, 12 instalments",
      monthly: { prefix: "From ", money: instalmentFor(lowest), suffix: "/mo" },
      total: { prefix: "From ", money: lowest },
    },
  },
  {
    id: "full-service",
    name: "Full Service",
    sub: "One monthly price, everything handled",
    tone: "plum",
    upfront: { text: "No separate build fee" },
    monthly: { prefix: "From ", money: fullServicePackage.monthlyFrom },
    howLong: { text: "Month to month. Cancel any time." },
    total: { prefix: "From ", money: fullServicePackage.monthlyFrom * 12 },
    get: { text: "Build, hosting, mailboxes, ongoing SEO, updates and maintenance." },
    end: { text: "No end date. It runs for as long as you stay on it." },
    cta: { label: "See Full Service", href: "#full-service", variant: "coral" },
    card: {
      name: "Full Service",
      monthly: { prefix: "From ", money: fullServicePackage.monthlyFrom, suffix: "/mo" },
      total: { prefix: "From ", money: fullServicePackage.monthlyFrom * 12 },
    },
  },
  {
    id: "launch-offer",
    name: "Website Launch Offer",
    sub: "New businesses without a website. Up to five pages.",
    tone: "blush",
    upfront: { text: "No deposit" },
    monthly: { money: launchTerms.monthly, coral: true },
    howLong: { text: `${launchTerms.months} months` },
    total: { money: launchTerms.total },
    get: { text: "Up to five pages, SEO setup, and domain, hosting and email for 12 months." },
    end: { text: "Yours: we transfer the domain and site, or you move to a Care Plan." },
    cta: { label: "See the Launch Offer", href: "/website-launch", variant: "outline" },
    card: {
      name: "Website Launch Offer",
      monthly: { money: launchTerms.monthly, suffix: "/mo" },
      total: { money: launchTerms.total },
    },
  },
];

export const WAY_ROWS: { key: "upfront" | "monthly" | "howLong" | "total" | "get" | "end"; label: string; money: boolean }[] = [
  { key: "upfront", label: "Upfront", money: false },
  { key: "monthly", label: "Monthly", money: true },
  { key: "howLong", label: "How long", money: false },
  { key: "total", label: "Total over 12 months", money: true },
  { key: "get", label: "What you get", money: false },
  { key: "end", label: "At the end", money: false },
];

/* --------------------------------------------------------- configurator */

/** Group names as designed (the content file capitalises differently). */
const GROUP_NAMES: Record<string, string> = {
  "Functionality & Interactivity": "Functionality & interactivity",
  "SEO & Performance": "SEO & performance",
};

export type BuildItem = AlaCarteItem & {
  /** Position in the flat list: the key used by the ?build= code. */
  order: number;
  group: string;
  /** Name without the bracketed examples, for line items and chips. */
  short: string;
};
export type BuildGroup = { name: string; items: BuildItem[] };

let counter = 0;
export const buildGroups: BuildGroup[] = alaCarteCategories.map((category) => {
  const name = GROUP_NAMES[category.name] ?? category.name;
  return {
    name,
    items: category.items.map((item) => ({
      ...item,
      order: counter++,
      group: name,
      short: item.label.replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim(),
    })),
  };
});

export const buildItems: BuildItem[] = buildGroups.flatMap((g) => g.items);
export const buildItemById = new Map(buildItems.map((i) => [i.id, i]));

export const BASE_FEE = baseBuildFee.total;
export const BASE_INCLUDES =
  "Homepage, fully custom-coded & mobile-responsive, 1 contact form, basic on-page SEO, 1 round of revisions.";
export const MAX_QTY = 20;

export type Qty = Record<string, number>;

export type BuildLine = { id: string; name: string; qty: number; amount: number; from: boolean; order: number; removable: boolean };

/** Base fee first, then each chosen item in menu order. */
export function buildLines(qty: Qty): BuildLine[] {
  const lines: BuildLine[] = [
    { id: "base", name: baseBuildFee.label, qty: 1, amount: BASE_FEE, from: false, order: -1, removable: false },
  ];
  for (const item of buildItems) {
    const n = qty[item.id] ?? 0;
    if (n <= 0) continue;
    lines.push({
      id: item.id,
      name: item.quantifiable && n > 1 ? `${item.short} × ${n}` : item.short,
      qty: n,
      amount: item.price * n,
      from: Boolean(item.startingAt),
      order: item.order,
      removable: true,
    });
  }
  return lines;
}

export const totalOf = (lines: BuildLine[]) => lines.reduce((sum, line) => sum + line.amount, 0);

/** The ?build= code: item positions, "x" and a count when above one, joined by "-". */
export function encodeBuild(qty: Qty): string {
  return buildItems
    .filter((item) => (qty[item.id] ?? 0) > 0)
    .map((item) => (qty[item.id] > 1 ? `${item.order.toString(36)}x${qty[item.id]}` : item.order.toString(36)))
    .join("-");
}

export function decodeBuild(code: string | null | undefined): Qty {
  const qty: Qty = {};
  if (!code) return qty;
  for (const part of code.split("-")) {
    const [position, count] = part.split("x");
    const item = buildItems[Number.parseInt(position, 36)];
    if (!item) continue;
    const n = count === undefined ? 1 : Number.parseInt(count, 10);
    if (!Number.isFinite(n) || n < 1) continue;
    qty[item.id] = item.quantifiable ? Math.min(MAX_QTY, n) : 1;
  }
  return qty;
}

/**
 * The package hint: the highest package whose from-price is within R3,000 of
 * the total (or already passed). `passed` flips the wording.
 */
export const HINT_RANGE = 3000;
export function packageHint(total: number): { pkg: PackageView; passed: boolean } | null {
  let found: PackageView | null = null;
  for (const pkg of packageViews) if (total >= pkg.total - HINT_RANGE) found = pkg;
  return found ? { pkg: found, passed: total >= found.total } : null;
}

export function hintText(hint: { pkg: PackageView; passed: boolean }) {
  const { pkg, passed } = hint;
  return `${passed ? "In the range of" : "Close to"} ${pkg.name} (from ${formatRand(pkg.total)}): ${pkg.hint}.`;
}

/** Price label for a menu row: "R2,500 each", "from R7,500", "from R2,500 each". */
export function itemPriceLabel(item: AlaCarteItem) {
  const base = `${item.startingAt ? "from " : ""}${formatRand(item.price)}`;
  return item.quantifiable ? `${base} each` : base;
}

/* ------------------------------------------------------- full service */

export const fullService = {
  ...fullServicePackage,
  chips: [
    "Website build, custom-coded",
    "Hosting, managed",
    "Business mailboxes, managed",
    "Ongoing SEO",
    "Updates & maintenance",
  ],
};
