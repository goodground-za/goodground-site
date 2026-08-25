/**
 * Real, client-confirmed pricing (2026-08-10). Every number and feature line
 * below is verbatim from the "GoodGround Website Design Packages" document —
 * do not invent or round anything here; a wrong figure on this page is worse
 * than a missing one.
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
    total: 8500,
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
    total: 15000,
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
    total: 23000,
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
    total: 32000,
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

export const packagesFootnote =
  "All packages are one-time website builds, fully custom-coded (no e-commerce or member-portal builds). " +
  "Hosting, domain, and ongoing maintenance are arranged separately, unless you choose the Full Service " +
  "monthly package below, which bundles all of that in. Need more than your package includes? " +
  "Any package can be extended with items from the Build Your Own menu below, for example adding extra pages to " +
  "Package 1, or add Advanced SEO to Package 2.";

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
  note: "The exact monthly price depends on your website's requirements and is confirmed in your quote.",
};

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
      { id: "pages-complex", label: "Complex/custom-layout page (interactive landing page, pricing page, etc.)", price: 4000 },
      { id: "pages-blog-setup", label: "Blog/News section setup (template + first post)", price: 4500 },
      { id: "pages-blog-post", label: "Additional blog post (written & uploaded)", price: 600, quantifiable: true },
    ],
  },
  {
    name: "Design",
    items: [
      { id: "design-logo", label: "Custom logo design", price: 7500, startingAt: true },
      { id: "design-style-guide", label: "Brand style guide (colours, fonts, usage)", price: 2000 },
      { id: "design-illustrations", label: "Custom illustrations/graphics (per page)", price: 2500, startingAt: true },
      { id: "design-icons", label: "Custom icon set (up to 10 icons)", price: 2500, startingAt: true },
    ],
  },
  {
    name: "Functionality & Interactivity",
    items: [
      { id: "func-conditional-form", label: "Custom form with conditional logic", price: 1500 },
      { id: "func-multistep-form", label: "Multi-step form / quote calculator", price: 4000 },
      { id: "func-animations", label: "Custom animations & scroll effects (per page)", price: 1800 },
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
      { id: "content-copywriting", label: "Copywriting (per page)", price: 1200 },
      { id: "content-upload", label: "Content upload/data entry (per page, client-supplied content)", price: 500 },
      { id: "content-stock-imagery", label: "Stock imagery sourcing & licensing", price: 800 },
    ],
  },
  {
    name: "Extras",
    items: [
      { id: "extra-revision", label: "Extra round of revisions", price: 1500 },
      { id: "extra-rush", label: "Rush delivery (cuts timeline by ~1 week)", price: 3500 },
      { id: "extra-training", label: "Training/handover session (1 hour)", price: 1200 },
      { id: "extra-language", label: "Additional language version (per language)", price: 5000 },
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
 */
export type PricingFaqItem = { question: string; answer: string };

export const pricingFaq: PricingFaqItem[] = [
  {
    question: "Do these prices include hosting and a domain?",
    answer:
      "Not on the four fixed packages above. Hosting, domain, and ongoing maintenance are arranged separately from the build price, and we're happy to point you in the right direction when you enquire. If you'd rather have all of that handled for you, the Full Service package below bundles hosting, mailboxes, the build, SEO, and maintenance into one monthly price.",
  },
  {
    question: "How do I pay, and is there a deposit?",
    answer:
      "You choose: pay 50% upfront to secure the project and the remaining 50% on completion, before handover, or split the total into 12 equal monthly instalments. On the instalment plan the first payment secures your booking, and the remaining 11 become payable once the project is completed. Either way, the price is fixed and agreed before work begins.",
  },
  {
    question: "What if my scope grows partway through?",
    answer:
      "Any package can be extended with items from the à la carte menu at the listed price. We'll always confirm additions and cost with you before building them.",
  },
  {
    question: "How many rounds of revisions do I get?",
    answer:
      "It depends on the package. Micro and Launch include 1 round, Grow includes 2, and Scale includes 3. Need more? Extra rounds can be added from the à la carte menu.",
  },
  {
    question: "How soon will I hear back after I enquire?",
    answer: "Within 1–2 business days, with a firm quote and timeline based on what you've told us.",
  },
];
