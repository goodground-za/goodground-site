import { newBusinessOffer } from "@/content/newBusinessOffer";
import { localPlans, packages, buildTime, PLAN_TERM_LABEL } from "@/content/pricing";
import { launchFaqs } from "@/content/websiteLaunch";

import type { FaqItem } from "../FaqAccordion";
import { formatRand } from "../format";
import type { IconName } from "../Icon";

export { buildAvailability, type Availability } from "./availability";

/* -------------------------------------------------------------- content */

const localStart = localPlans.find((plan) => plan.slug === newBusinessOffer.planSlug)!;
const monthly = formatRand(localStart.monthly);
const mailboxMonths = newBusinessOffer.terms.mailboxFreeMonths;

export const keyFacts: { icon: IconName; title: string; body: string }[] = [
  { icon: "file", title: "Up to 5 pages", body: "Custom, designed around your business" },
  { icon: "mail", title: "Domain and mailbox", body: `.co.za in your name, mailbox free for ${mailboxMonths} months` },
  { icon: "search", title: "Google profile", body: "Set up and verified for you" },
  { icon: "cal", title: PLAN_TERM_LABEL, body: `First month free, then ${monthly}. Your deposit covers month two` },
];

/** The offer card: the Local Start inclusions (content/pricing.ts) plus the free mailbox. */
const CHECK_SHORT = [
  "Website up to 5 pages",
  ".co.za domain, hosting, backups",
  "WhatsApp button, POPIA notices",
  "Google Business Profile set up",
  "Quarterly AI visibility snapshot",
  "1 change request a month",
];
export const heroChecklist = [
  ...localStart.inclusions.map((long, i) => ({ long, short: CHECK_SHORT[i] ?? long })),
  { long: `Business mailbox free for ${mailboxMonths} months`, short: `Mailbox free for ${mailboxMonths} months` },
];

export const moments: { n: string; icon: IconName; title: string; body: string; tone: "canvas" | "plum" }[] = [
  {
    n: "01",
    icon: "users",
    title: "Someone hears about you",
    body: "You’ve shared what you do and handed over your details. That’s where their interest starts.",
    tone: "canvas",
  },
  {
    n: "02",
    icon: "eye",
    title: "They want to know more",
    body: "Now they need a place to learn more about you and how to contact you.",
    tone: "canvas",
  },
  {
    n: "03",
    icon: "chat",
    title: "They decide whether to ask",
    body: "A page that explains what you offer, who you help and how to enquire.",
    tone: "plum",
  },
];

export const criteria = {
  yes: [
    "You’re starting a new business, or you’ve recently started trading.",
    "You don’t have a website yet. A social page or a domain you already own is fine.",
    "You want customers to find you, understand what you offer and get in touch.",
  ],
  yesShort: ["New, or recently started trading", "No website yet (a social page is fine)", "You want customers to find and contact you"],
  no: "Not for website redesigns or replacing a website you already have.",
  noShort: "Not for redesigns or replacements",
};

/**
 * What the offer includes, grouped as the page groups it: Local Start's
 * inclusions (content/pricing.ts localPlans) plus the free mailbox. Wording
 * for the card bodies is the page's own.
 */
export const includedGroups: {
  n: string;
  title: string;
  icon: IconName;
  chip: "lilac" | "blush" | "mint";
  items: { title: string; body: string }[];
}[] = [
  {
    n: "01",
    title: "Planning and design",
    icon: "pen",
    chip: "lilac",
    items: [
      {
        title: "Website planning around your goals",
        body: "We learn about your business, customers and the enquiries you want. That shapes your pages, their sections and your contact options.",
      },
      {
        title: "A website of up to 5 pages",
        body: "Built fast and polished by hand, with sections for what you do, who you help and how to get in touch, agreed before the build begins.",
      },
      { title: "Responsive across devices", body: "Pages, navigation and forms adapt to phones, tablets and desktops." },
    ],
  },
  {
    n: "02",
    title: "Domain, mailbox and hosting",
    icon: "link",
    chip: "blush",
    items: [
      { title: "A .co.za domain in your name", body: "We help you choose an available domain and connect your website and mailbox. The domain is always yours." },
      { title: `Business mailbox, free for ${mailboxMonths} months`, body: "An address on your domain, like hello@yourbusiness.co.za." },
      { title: "Hosting and backups", body: "Included in your monthly price, set up and looked after for you." },
    ],
  },
  {
    n: "03",
    title: "Google and launch",
    icon: "search",
    chip: "mint",
    items: [
      { title: "Google Business Profile", body: "Set up and verified, so customers can find you on Google and Maps." },
      { title: "Search Console and indexing", body: "We connect Google Search Console, submit your sitemap and request indexing." },
      { title: "A clear way to enquire", body: "A WhatsApp button and POPIA notices, so people can contact you and you stay compliant." },
      { title: "Launch checks and an AI snapshot", body: "Images, speed, links, forms and mobile layouts checked before go-live, then a quarterly AI visibility snapshot." },
    ],
  },
];

/**
 * "Your first 3 months". The one-month deposit is paid before month 1 to start the
 * build and is credited against month 2, the first paid month (owner decision 2026-11-04).
 */
export const firstMonths: { n: string; label: string; amount: string; body: string }[] = [
  { n: "M1", label: "Month 1", amount: formatRand(0), body: "Free. Your site is built and goes live." },
  { n: "M2", label: "Month 2", amount: monthly, body: "Your deposit covers it. Your Google profile is live." },
  { n: "M3", label: "Month 3", amount: monthly, body: "Your first payment after the deposit. Your first AI visibility snapshot." },
];

/** "Grow when you’re ready": each links to #monthly or #custom. */
export const growChoices: { icon: IconName; title: string; body: string; href: string }[] = [
  {
    icon: "shield",
    title: "Stay on Local Start",
    body: "Keep everything as it is for the rest of your 12-month plan.",
    href: "/pricing#monthly",
  },
  {
    icon: "trend",
    title: "Move to Local Plus",
    body: "Add the monthly AI Visibility Report, up to 10 pages and monthly Google profile updates.",
    href: "/pricing#monthly",
  },
  {
    icon: "code",
    title: "Go custom later",
    body: `Need a unique design or a bigger site? Custom builds start from ${formatRand(packages[0].total)}.`,
    href: "/pricing#custom",
  },
];

export const steps = [
  { n: "01", title: "Tell us about your business", body: "What you offer, who you want to reach and when you hope to launch." },
  { n: "02", title: "We confirm your space", body: "We confirm availability and what’s included, then email you a deposit invoice for one month’s fee." },
  {
    n: "03",
    title: "Pay the deposit, fill in your brief",
    body: "Once the deposit is paid we send your onboarding link. Your deposit is credited against your second month.",
  },
  {
    n: "04",
    title: `We build in ${buildTime}`,
    body: "The clock starts once the deposit and your onboarding brief are in. Then final checks, launch, and your pages are submitted to Google for indexing.",
  },
];

/** The ten answers (content/websiteLaunch.ts), in the order the page shows them. */
const live = launchFaqs.items;
const answerOf = (question: string) => live.find((i) => i.question === question)?.answer ?? "";

export const launchFaqItems: FaqItem[] = live.map((item) => ({ question: item.question, answer: [answerOf(item.question)] }));

export const launchWorkSlugs = ["goodground-site", "b3tter-bottle", "sunbird-early-learners"];
