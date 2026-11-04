/**
 * Real, client-confirmed pricing. Feature lines are verbatim from the
 * "GoodGround Website Design Packages" document — do not invent or round
 * anything here; a wrong figure on this page is worse than a missing one.
 *
 * Package prices increased 2026-09-17 (Micro 8500 -> 12000, Launch 15000 ->
 * 21000, Grow 23000 -> 32000, Scale 32000 -> 45000) and at the same time
 * became *starting* prices rather than fixed totals: every card now reads
 * "From R...", and projectScopeNote below states plainly that the real
 * number comes from the quote. The price is still fixed once quoted and
 * accepted — that promise is unchanged, it just gets made in the quote
 * rather than on the card.
 *
 * Two payment options apply to every total on this page (confirmed
 * 2026-08-11, replacing the site's earlier single "12 equal monthly
 * payments" promise):
 *   - deposit: 50% to secure the project, 50% on completion, before handover.
 *   - instalments: 12 equal monthly instalments — the first is paid upfront
 *     to secure the booking, the remaining 11 become payable once the
 *     project is completed (not spread across the build).
 * Cancelling partway through either option follows the site's existing rule:
 * the outstanding balance of the agreed price becomes payable — this is not
 * a refund policy, it's the same "fixed price, just spread out" logic as
 * before.
 */

import { formatRand } from "@/components/gg/format";
import { newBusinessOffer as newBusiness } from "@/content/newBusinessOffer";

/**
 * When the figures on this page were last confirmed. Shown as "Prices correct as
 * of {date}" under the plan cards in Insights articles, which read the prices
 * from this file and so can never show an old number; this is the date to update
 * with them.
 */
export const pricesAsOf = "17 September 2026";

export const DEPOSIT_PERCENT = 0.5;
export const depositFor = (total: number) => Math.round(total * DEPOSIT_PERCENT);
export const balanceFor = (total: number) => total - depositFor(total);

export const INSTALMENT_MONTHS = 12;
export const monthlyInstalmentFor = (total: number) => Math.round(total / INSTALMENT_MONTHS);

export type Package = {
  slug: string;
  name: string;
  total: number;
  pitch: string;
  features: string[];
  bestFor: string;
  timeline: string;
};

export const packages: Package[] = [
  {
    slug: "micro",
    name: "Micro",
    total: 12000,
    pitch: "A sharp, single-page site for when you just need a strong first impression.",
    features: [
      "1 page (single-page/landing site with distinct scroll sections)",
      "Fully custom-coded, mobile-responsive design",
      "Custom micro-interactions (hover states, scroll-triggered reveals)",
      "Contact section with working form",
      "Basic on-page SEO",
      "1 round of revisions",
    ],
    bestFor: "Solo freelancers, personal brands, pop-ups, events, or a “coming soon”/holding page.",
    timeline: "~1 week",
  },
  {
    slug: "launch",
    name: "Launch",
    total: 21000,
    pitch: "A clean, professional website to get you online fast.",
    features: [
      "Up to 5 pages (e.g. Home, About, Services, Contact, one extra)",
      "Fully custom-coded, mobile-responsive design",
      "Contact form with email notifications",
      "Basic on-page SEO (titles, meta descriptions, headings)",
      "Social media links integration",
      "1 round of revisions",
    ],
    bestFor: "New businesses or solo founders who need a credible online presence without the extras.",
    timeline: "~2 weeks",
  },
  {
    slug: "grow",
    name: "Grow",
    total: 32000,
    pitch: "A fully custom-coded site with the interactive touches that make you stand out.",
    features: [
      "Up to 10 pages, including a Blog/News section",
      "Fully custom-coded design (unique to your brand, no templates)",
      "Custom interactive elements (animations, scroll effects, image galleries, etc.)",
      "Custom enquiry/contact forms with conditional logic",
      "Third-party integrations (e.g. Google Maps, calendar booking widgets, WhatsApp chat)",
      "SEO setup including Google Analytics & Search Console",
      "2 rounds of revisions",
    ],
    bestFor: "Small businesses ready to actively market online and stand out from template-built competitors.",
    timeline: "~3–4 weeks",
  },
  {
    slug: "scale",
    name: "Scale",
    total: 45000,
    pitch: "A fully custom platform built to be the hub of your business online.",
    features: [
      "Up to 15+ pages, fully custom-coded design and layout",
      "Advanced custom functionality (multi-step forms, dynamic content, custom calculators/tools, API integrations)",
      "Advanced interactive design (animations, micro-interactions, custom illustrations/graphics)",
      "Advanced SEO + site speed optimisation",
      "Copywriting guidance/support for key pages",
      "3 rounds of revisions",
      "1-hour training/handover session so you can manage content updates yourself",
    ],
    bestFor:
      "Startups and established small businesses that need their website to be a real sales/operations tool, not just a brochure.",
    timeline: "~4–6 weeks, priority scheduling",
  },
];

/**
 * Sits directly under the four package cards, so the "From R..." figures are
 * qualified in the same eyeful rather than three sections later. Deliberately
 * does not repeat the payment-options copy already above and below it — its
 * one job is: these numbers are a starting point, the quote is the real
 * number, and the quote is still fixed.
 */
export const projectScopeNote = {
  eyebrow: "Every project is different",
  heading: "These are starting prices, not quotes.",
  body: [
    "The four prices above are where each package starts. A five-page site for a plumber and a five-page site for a law firm rarely take the same amount of work, so we look at what your project actually involves before we put a number on it.",
    "Tell us what you need and we’ll come back with a price, usually within a day or two. Once you accept it, that’s the price. Nothing gets added to the invoice at the end.",
  ],
};

export const packagesFootnote =
  "All packages are one-time website builds, fully custom-coded (no e-commerce or member-portal builds), priced from the figure shown. " +
  "Hosting, domain, and ongoing maintenance are arranged separately, unless you choose the Full Service " +
  "monthly package below, which bundles all of that in. Need more than your package includes? " +
  "Any package can be extended with items from the Build Your Own menu below, for example adding extra pages to " +
  "Micro, or Advanced SEO to Launch.";

/**
 * Full Service: a monthly, all-inclusive alternative to the four fixed
 * one-time packages above (confirmed 2026-08-25). Covers the build itself,
 * so there is no separate upfront project fee on top of the monthly price.
 * Month-to-month, no minimum term. "From" because the final monthly figure
 * depends on the website's own requirements and is confirmed in the quote,
 * the same "starting at" logic already used for à la carte items below.
 */
export const fullServicePackage = {
  name: "Full Service",
  monthlyFrom: 1500,
  pitch: "Everything handled, for one monthly price. We build the site, host it, run the mailboxes, and keep it working.",
  billing: "Monthly. No minimum term, cancel any time.",
  includes: [
    "Website build, fully custom-coded",
    "Hosting, set up and managed for you",
    "Business email mailboxes, set up and managed for you",
    "Ongoing SEO work",
    "Ongoing updates and maintenance",
  ],
  note: "The exact monthly price depends on your website’s requirements and is confirmed in your quote.",
};

/* ---------------------------------------------------------------- v2: monthly */

/**
 * The monthly Local plans (v2 funnel, 2026-11-04). Prices include VAT; the
 * annual figure is 10 months for 12. Card copy is the spec's mockup copy
 * (mockups/pricing.html). `highlights` are the three lines the /start-project
 * plan cards show; `inclusions` is the full card list.
 *
 * No page types a price by hand: every Local plan price on the site reads this
 * collection (and `addOns`, `offers`) through formatRand.
 */
export type LocalPlanSlug = "local-start" | "local-plus" | "local-pro";

export type LocalPlan = {
  slug: LocalPlanSlug;
  name: string;
  /** Monthly price, rand, incl. VAT. */
  monthly: number;
  /** Pay-once price for 12 months (2 months free), rand. */
  annual: number;
  tagline: string;
  /** One line for the Home plan rows. */
  oneLine: string;
  /** Three lines for the /start-project plan card. */
  highlights: [string, string, string];
  inclusions: string[];
  /** The first inclusion is "Everything in {previous}, plus:" and is styled as a lead-in. */
  extendsPrevious?: boolean;
  bestFor: string;
  /** "Live in ~5 working days". */
  liveIn: string;
  /** Card badge, if any. */
  badge?: string;
};

export const localPlans: LocalPlan[] = [
  {
    slug: "local-start",
    name: "Local Start",
    monthly: 299,
    annual: 2990,
    tagline: "A proper website and Google profile, so customers can find you and trust you.",
    oneLine: "5 pages and your Google profile",
    highlights: ["Website up to 5 pages", ".co.za domain, hosting and backups", "Google Business Profile set up"],
    inclusions: [
      "Website up to 5 pages, built fast and polished by hand",
      ".co.za domain in your name, hosting and backups",
      "WhatsApp button, payment link and POPIA notices",
      "Google Business Profile set up and verified",
      "Quarterly AI visibility snapshot",
      "1 change request a month",
    ],
    bestFor: "Trades and solo businesses that need to look credible and be found",
    liveIn: "Live in ~5 working days",
    badge: "New business offer",
  },
  {
    slug: "local-plus",
    name: "Local Plus",
    monthly: 449,
    annual: 4490,
    tagline: "Your site, Google profile and AI visibility, looked after every month.",
    oneLine: "10 pages and a monthly AI report",
    highlights: ["Up to 10 pages, one per service in your town", "Monthly Google profile updates", "Monthly AI Visibility Report"],
    inclusions: [
      "Everything in Local Start, plus:",
      "Up to 10 pages, incl. a page per service in your town",
      "Monthly Google profile updates and 2 posts",
      "Review-request QR code and WhatsApp link",
      "Monthly AI Visibility Report",
      "3 change requests a month",
    ],
    extendsPrevious: true,
    bestFor: "Local businesses competing for “near me” searches and AI recommendations",
    liveIn: "Live in ~5 working days",
    badge: "Most popular",
  },
  {
    slug: "local-pro",
    name: "Local Pro",
    monthly: 799,
    annual: 7990,
    tagline: "Everything handled, with more pages, weekly posts and the Fix Pack included.",
    oneLine: "15 pages, weekly posts, Fix Pack",
    highlights: ["Up to 15 pages, a new page every quarter", "Weekly Google posts and review-reply drafts", "AI Visibility Fix Pack included"],
    inclusions: [
      "Everything in Local Plus, plus:",
      "Up to 15 pages, with a new page every quarter",
      "Weekly Google posts and review-reply drafts",
      "AI report from 3 locations, with a competitor table",
      "AI Visibility Fix Pack included",
      "6 change requests a month and a quarterly call",
    ],
    extendsPrevious: true,
    bestFor: "Busy or multi-location businesses in competitive trades",
    liveIn: "Live in ~7 working days",
  },
];

export const localPlanBySlug = (slug: string) => localPlans.find((p) => p.slug === slug);

/** Cheapest monthly plan: "Monthly plans from R299" everywhere reads this. */
export const localFromMonthly = localPlans[0].monthly;

/**
 * Terms that appear in FAQ answers and the cancel copy. The legal wording is the
 * attorney's (open item 15); these are only the figures the spec states.
 */
export const localTerms = {
  /** Site files become the client's after this many paid months. */
  filesYoursAfterMonths: 6,
  /** Buying the files earlier, rand. */
  filesBuyout: 1500,
} as const;

/** Promise row under the plan cards (spec 08, mockup). */
export const localPromises = [
  "Free preview before you pay anything",
  "Your domain is always yours",
  "Month to month, no lock-in",
  "Site files are yours after 6 months",
];

export type AddOn = {
  id: "fix-pack" | "visibility-watch" | "business-email";
  name: string;
  /** Rand. */
  price: number;
  /** "once-off", "/mo", "/mo per mailbox". */
  unit: string;
  /** Discounted price on Local Plus, where there is one. */
  priceOnPlus?: number;
  /** Included free in this plan. */
  includedIn?: LocalPlanSlug;
  description: string;
};

export const addOns: AddOn[] = [
  {
    id: "fix-pack",
    name: "AI Visibility Fix Pack",
    price: 2950,
    unit: "once-off",
    priceOnPlus: 1450,
    includedIn: "local-pro",
    description: `We fix the signals AI engines read: Google profile, service pages, structured data and listings. ${formatRand(1450)} on Local Plus, included in Local Pro.`,
  },
  {
    id: "visibility-watch",
    name: "Visibility Watch",
    price: 199,
    unit: "/mo",
    description: "The monthly AI Visibility Report on its own, for sites we’ve already built for you.",
  },
  {
    id: "business-email",
    name: "Business email",
    price: 49,
    unit: "/mo per mailbox",
    description: "Free forwarding to your existing inbox, or a proper mailbox. Google Workspace or Microsoft 365 on request.",
  },
];

/** The promotions. The data lives in content/newBusinessOffer.ts. */
export const offers = { newBusiness } as const;

export const baseBuildFee = {
  total: 6000,
  label: "Base Build Fee",
  includes:
    "Homepage, fully custom-coded & mobile-responsive, 1 contact form, basic on-page SEO, 1 round of revisions. Add pages and features below.",
};

export type AlaCarteItem = {
  id: string;
  label: string;
  price: number;
  /** Visitor picks a quantity (e.g. "how many extra pages") instead of a
   * single on/off toggle — price is per unit. */
  quantifiable?: boolean;
  /** Price is a starting point, not a fixed figure — final cost depends on
   * complexity and is confirmed in the quote. Rendered as "from RX". */
  startingAt?: boolean;
};
export type AlaCarteCategory = { name: string; items: AlaCarteItem[] };

export const alaCarteCategories: AlaCarteCategory[] = [
  {
    name: "Pages",
    items: [
      { id: "pages-standard", label: "Additional standard page (About, Services, Contact, etc.)", price: 2500, quantifiable: true },
      { id: "pages-complex", label: "Complex/custom-layout page (interactive landing page, pricing page, etc.)", price: 4000, quantifiable: true },
      { id: "pages-blog-setup", label: "Blog/News section setup (template + first post)", price: 4500 },
      { id: "pages-blog-post", label: "Additional blog post (written & uploaded)", price: 600, quantifiable: true },
    ],
  },
  {
    name: "Design",
    items: [
      { id: "design-logo", label: "Custom logo design", price: 7500, startingAt: true },
      { id: "design-style-guide", label: "Brand style guide (colours, fonts, usage)", price: 2000 },
      { id: "design-illustrations", label: "Custom illustrations/graphics (per page)", price: 2500, startingAt: true, quantifiable: true },
      { id: "design-icons", label: "Custom icon set (up to 10 icons)", price: 2500, startingAt: true },
    ],
  },
  {
    name: "Functionality & Interactivity",
    items: [
      { id: "func-conditional-form", label: "Custom form with conditional logic", price: 1500 },
      { id: "func-multistep-form", label: "Multi-step form / quote calculator", price: 4000 },
      { id: "func-animations", label: "Custom animations & scroll effects (per page)", price: 1800, quantifiable: true },
      { id: "func-gallery", label: "Interactive image gallery/portfolio", price: 2500 },
      { id: "func-map", label: "Interactive map (custom-styled, not just embed)", price: 1200 },
      { id: "func-filtering", label: "Custom filtering/search (e.g. filter services or portfolio items)", price: 3000 },
      { id: "func-sticky-nav", label: "Sticky/dynamic navigation elements", price: 900 },
    ],
  },
  {
    name: "Integrations",
    items: [
      { id: "int-google-maps", label: "Google Maps embed", price: 700 },
      { id: "int-whatsapp", label: "WhatsApp chat button", price: 900 },
      { id: "int-booking", label: "Third-party calendar/booking widget embed", price: 2000 },
      { id: "int-newsletter", label: "Newsletter signup (Mailchimp/similar)", price: 1200 },
      { id: "int-social-feed", label: "Social media feed embed", price: 1000 },
      { id: "int-live-chat", label: "Live chat widget integration", price: 1300 },
    ],
  },
  {
    name: "SEO & Performance",
    items: [
      { id: "seo-advanced", label: "Advanced SEO (keyword research, schema markup, meta strategy)", price: 3000 },
      { id: "seo-speed", label: "Site speed optimisation", price: 2500 },
      { id: "seo-analytics", label: "Google Analytics & Search Console setup", price: 1000 },
    ],
  },
  {
    name: "Content",
    items: [
      { id: "content-copywriting", label: "Copywriting (per page)", price: 1200, quantifiable: true },
      { id: "content-upload", label: "Content upload/data entry (per page, client-supplied content)", price: 500, quantifiable: true },
      { id: "content-stock-imagery", label: "Stock imagery sourcing & licensing", price: 800 },
    ],
  },
  {
    name: "Extras",
    items: [
      { id: "extra-revision", label: "Extra round of revisions", price: 1500 },
      { id: "extra-rush", label: "Rush delivery (cuts timeline by ~1 week)", price: 3500 },
      { id: "extra-training", label: "Training/handover session (1 hour)", price: 1200 },
      { id: "extra-language", label: "Additional language version (per language)", price: 5000, quantifiable: true },
      { id: "extra-favicon", label: "Favicon & social share image design", price: 700 },
    ],
  },
];

export const alaCarteFootnote =
  "All à la carte prices are per item unless stated otherwise. A free quote will confirm the final total before work begins.";

/**
 * Pricing-page Q&A. Every answer is derivable from figures already confirmed
 * elsewhere in this file (revision counts per package, the two payment
 * options above, the "free quote before work begins" line) or from the "1–2
 * business days" reply time already used in ContactForm/PricingEnquiryForm.
 * Nothing here states a policy that isn't backed by one of those.
 *
 * The two questions added 2026-09-23 ("Full Service or instalments", "Do I
 * own my website?") answer what the critique found buyers left guessing.
 * Ownership rests on what the site already publishes: a build that is paid
 * off is the client's outright (see the cost article), and the monthly Local plans'
 * end-of-term transfer. Full Service ownership on cancellation is not settled,
 * so it is described, not promised.
 */
export type PricingFaqItem = { question: string; answer: string };

export const pricingFaq: PricingFaqItem[] = [
  {
    question: "Do these prices include hosting and a domain?",
    answer:
      "Monthly plans do: hosting and a .co.za domain registered in your name are included. Full Service includes hosting, mailboxes, SEO and maintenance in its monthly price. Custom builds are priced separately from hosting, domain and upkeep, which we arrange with you when you enquire.",
  },
  {
    question: "How do I pay, and is there a deposit?",
    answer:
      "You choose: pay 50% upfront to secure the project and the remaining 50% on completion, before handover, or split the total into 12 equal monthly instalments. On the instalment plan the first payment secures your booking, and the remaining 11 become payable once the project is completed. Either way, the price is fixed and agreed before work begins.",
  },
  {
    question: "Why does every package say “from”?",
    answer:
      "Because no two projects need the same amount of work. The figure on each card is what that package starts at; what you actually pay depends on your content, your page count, and what the site has to do. We work that out from your brief and put it in writing before anything gets built.",
  },
  {
    question: "What if my scope grows partway through?",
    answer:
      "Any package can be extended with items from the à la carte menu at the listed price. We’ll always confirm additions and cost with you before building them.",
  },
  {
    question: "What looks after the site once it's live?",
    answer:
      "While you're paying the build off over 12 months, basic maintenance, basic health checks, and site monitoring are included. A monthly Care Plan picks up from there: the site is checked around the clock, the security certificate is tracked before it lapses, software and content updates are handled as agreed, and your latest Google reviews are added to the site once a month. If you settle the build in full instead, a Care Plan can start from launch. Care Plans are priced per project and run month to month, with 30 days' notice either way.",
  },
  {
    question: "Full Service or instalments: which should I choose?",
    answer:
      "Instalments pay off one fixed price. After 12 payments you’re done and the site is yours, but hosting, your domain and upkeep are yours to arrange. Full Service is an ongoing monthly service: the build, hosting, mailboxes, SEO and upkeep all sit in one price, and you can cancel any time. If you want to own the site outright, pay it off. If you’d rather not think about your website at all, Full Service is built for that.",
  },
  {
    question: "Do I own my website?",
    answer:
      "Yes, once it's paid for. On a package, paid by deposit or instalments, the site is yours outright once the last payment clears. On a monthly Local plan your domain is always yours and the site files are yours after 6 months. Full Service works differently. It's a monthly service, and we host and run the site for you while you're on it.",
  },
  {
    question: "How many rounds of revisions do I get?",
    answer:
      "It depends on the package. Micro and Launch include 1 round, Grow includes 2, and Scale includes 3. Need more? Extra rounds can be added from the à la carte menu.",
  },
  {
    question: "How soon will I hear back after I enquire?",
    answer: "Within 1–2 business days, with a firm quote and timeline based on what you’ve told us.",
  },
];
