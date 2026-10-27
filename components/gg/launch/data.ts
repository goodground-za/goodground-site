import { launchFaqs, launchSpots, launchTerms } from "@/content/websiteLaunch";

import type { FaqItem } from "../FaqAccordion";
import type { IconName } from "../Icon";

/**
 * Availability (Website launch note 78:252): one source, read by the live pill,
 * the offer-card meter, the intake calendar, the sticky mobile bar and the form
 * banner. The numbers are content/websiteLaunch.ts launchSpots; month names are
 * generated from the setting, never typed twice.
 */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthAfter = (month: string, year: number, steps: number) => {
  const i = MONTHS.indexOf(month);
  const index = i + steps;
  return { month: MONTHS[index % 12], year: year + Math.floor(index / 12) };
};

export type Availability = {
  month: string;
  nextMonth: string;
  total: number;
  taken: number;
  left: number;
  soldOut: boolean;
  /** "plan" tag for submissions. */
  plan: "launch" | "launch-waitlist";
  /** What every "Check availability" button says. */
  cta: string;
  pill: string;
  intakes: { label: string; filled: number; open: number }[];
};

export function getAvailability(): Availability {
  const { month, total, taken } = launchSpots;
  const year = launchSpots.year;
  const left = Math.max(0, total - taken);
  const soldOut = left === 0;
  const next = monthAfter(month, year, 1);
  const third = monthAfter(month, year, 2);
  return {
    month,
    nextMonth: next.month,
    total,
    taken,
    left,
    soldOut,
    plan: soldOut ? "launch-waitlist" : "launch",
    cta: soldOut ? `Join the ${next.month} waitlist` : "Check availability",
    pill: soldOut ? `${month.toUpperCase()} IS FULLY BOOKED` : `${left} SLOT${left === 1 ? "" : "S"} LEFT FOR ${month.toUpperCase()}`,
    // Months further out show every spot open until bookings exist.
    intakes: [
      { label: `${month} ${year}`, filled: taken, open: left },
      { label: `${next.month} ${next.year}`, filled: 0, open: total },
      { label: `${third.month} ${third.year}`, filled: 0, open: total },
    ],
  };
}

/* -------------------------------------------------------------- content */

export const terms = launchTerms;

export const keyFacts: { icon: IconName; title: string; body: string }[] = [
  { icon: "file", title: "One page", body: "Custom, designed around your business" },
  { icon: "mail", title: "Domain and email", body: "Registered and set up for you" },
  { icon: "search", title: "SEO and Google", body: "Prepared, submitted for indexing" },
  { icon: "cal", title: "12 months", body: "Domain, hosting and email fees included" },
];

export const heroChecklist = [
  { long: "A custom one-page website", short: "Custom one-page website" },
  { long: "Domain registration & business email", short: "Domain & business email" },
  { long: "Hosting for 12 months", short: "Hosting for 12 months" },
  { long: "Detailed SEO setup + Google indexing", short: "SEO setup + Google indexing" },
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

/** The ten live inclusions, grouped as the live page groups them, with the Figma card wording. */
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
        body: "We learn about your business, customers and the enquiries you want. That shapes your page, its sections and your contact options.",
      },
      {
        title: "A custom one-page website",
        body: "One page with sections for what you do, who you help and how to get in touch, agreed before the build begins.",
      },
      { title: "Responsive across devices", body: "Pages, navigation and forms adapt to phones, tablets and desktops." },
    ],
  },
  {
    n: "02",
    title: "Domain, email and hosting",
    icon: "link",
    chip: "blush",
    items: [
      { title: "Domain registration and setup", body: "We help you choose an available domain and connect your website and email." },
      { title: "Professional business email", body: "Addresses on your domain, like hello@yourbusiness.co.za." },
      {
        title: "Fees for 12 months",
        body: "Domain, hosting and email fees included for the first year. Your proposal confirms allowances and continuation costs.",
      },
    ],
  },
  {
    n: "03",
    title: "Search and launch",
    icon: "search",
    chip: "mint",
    items: [
      {
        title: "Detailed SEO setup",
        body: "Keyword research, titles, descriptions, headings, internal links, clean URLs, image optimisation and structured data.",
      },
      { title: "Search Console and indexing", body: "We connect Google Search Console, submit your sitemap and request indexing." },
      { title: "A clear way to enquire", body: "Prominent contact buttons and a working enquiry form." },
      { title: "Performance and launch checks", body: "Images, speed, links, forms and mobile layouts checked before go-live." },
    ],
  },
];

export const afterTwelve: { icon: IconName; title: string; body: string }[] = [
  { icon: "repeat", title: "Take it with you", body: "We transfer your domain and website to you." },
  {
    icon: "shield",
    title: "Stay looked after",
    body: "Move to our maintenance plan; we keep handling hosting, domain fees and upkeep.",
  },
];

export const steps = [
  { n: "01", title: "Tell us about your business", body: "What you offer, who you want to reach and when you hope to launch." },
  { n: "02", title: "Review your proposal", body: "We confirm availability, what’s included, payment terms and the timeline. You decide." },
  {
    n: "03",
    title: "Review your website",
    body: "We design and build to the agreed brief; you give feedback within the included revision rounds.",
  },
  { n: "04", title: "Approve and launch", body: "Final checks, publish, and your page is submitted to Google for indexing." },
];

/** The live nine answers, plus the one the design adds ("Is there a deposit?"). */
const live = launchFaqs.items;
const answerOf = (question: string) => live.find((i) => i.question === question)?.answer ?? "";

export const launchFaqItems: FaqItem[] = [
  { question: "Who qualifies for this offer?", answer: [answerOf("Who qualifies for this offer?")] },
  { question: "I have a social media page. Can I still apply?", answer: [answerOf("I have a social media page. Can I still apply?")] },
  { question: "What if I’ve already registered a domain?", answer: [answerOf("What if I’ve already registered a domain?")] },
  { question: "What do I need to provide?", answer: [answerOf("What do I need to provide?")] },
  { question: "How long will my website take?", answer: [answerOf("How long will my website take?")] },
  { question: "Will my website appear on Google?", answer: [answerOf("Will my website appear on Google?")] },
  { question: "Does the package include ongoing SEO?", answer: [answerOf("Does the package include ongoing SEO?")] },
  {
    // New in the design, and the answer is DRAFT: it states only what the card says.
    question: "Is there a deposit?",
    answer: [
      `No. The offer is R${terms.monthly} a month for ${terms.months} months, with no deposit upfront. Domain, hosting and email fees are included for those first ${terms.months} months.`,
    ],
  },
  { question: "What happens after the first 12 months?", answer: [answerOf("What happens after the first 12 months?")] },
  { question: "Can I add more pages or extra features?", answer: [answerOf("Can I add more pages or extra features?")] },
];

export const launchWorkSlugs = ["goodground-site", "b3tter-bottle", "sunbird-early-learners"];
