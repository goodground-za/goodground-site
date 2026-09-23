/**
 * The Website Launch promotion — every confirmed fact in one place.
 *
 * THIS FILE IS THE OFFER. The landing page at /website-launch renders it and
 * the enquiry route validates against it, so the price, the eligibility rule
 * and the included-fees period are each written once. Change a value here and
 * the page, the schema, the metadata and the server-side checks all follow.
 *
 * Rules that govern this promotion, confirmed 2026-09-13. Do not soften them
 * from the general /pricing page, which describes a different set of packages:
 *
 *  - Exclusively for NEW businesses that do not have a website. The business
 *    must be launching its first one.
 *  - A social page or an already-registered domain does NOT disqualify an
 *    otherwise eligible new business.
 *  - There is no business-age cutoff.
 *  - Redesigns and replacements are out of scope. So are ongoing SEO campaigns
 *    and extra features, which are quoted separately.
 *  - "Two promotional spaces each month" describes monthly capacity. It is NOT
 *    a live count of what is free today, and must never be rendered as one.
 *  - Payment terms, confirmed by Johandre 2026-09-23: no deposit, R845 a
 *    month for 12 months, R10 140 in total. After that the site is theirs:
 *    the domain and site are transferred to them, or they move to a Care Plan.
 *    Still never write "cancel anytime". Nothing says the 12 months can be
 *    cut short, and the contract governs early cancellation.
 *  - It is a ONE-page site (confirmed 2026-09-23). The page said "up to five
 *    custom website pages" until then, which was wrong.
 */

export const launchOffer = {
  name: "The GoodGround Website Launch Offer",
  eligibility: "Exclusively for new businesses without a website.",
  capacityLine: "Two promotional spaces each month.",

  /** Rendered wherever the price appears. One string, so it cannot drift. */
  price: "R845",
  pricePeriod: "per month",
  priceInline: "R845 per month",
  /** The compact form used in the mobile bar, where space is tight. */
  priceShort: "R845/month",
  /** The numbers behind the strings above, for anything that has to do maths
   * with them (the /pricing comparison table). */
  monthlyAmount: 845,
  termMonths: 12,

  /** Always "12 months". Never "a year's contract" — it is not one. */
  includedFees: "Domain, hosting and email fees included for the first 12 months.",

  pageCount: "A custom one-page website",

  cta: "Check availability",
  ctaTarget: "#check-availability",
  ctaSupport:
    "Starting a new business and need your first website? Tell us about your plans. We’ll confirm availability and whether this package fits your needs. No obligation to book.",
} as const;

/**
 * Current availability. Confirmed by Johandre 2026-09-13, moved to October on
 * his instruction 2026-09-23.
 *
 * THIS IS A DATED CLAIM AND IT GOES STALE. "1 slot left for October" is true
 * until it is not, and a page still saying it in October is telling visitors
 * something false. Nothing updates it: no counter, no date arithmetic, no
 * automatic month, precisely so it cannot quietly keep making a claim nobody
 * checked.
 *
 * It now appears in FOUR places, all reading this one string: the marquee, the
 * hero flag, the offer block and above the enquiry form. That is deliberate.
 * Stated once at the top of a long page, it has been forgotten by the time
 * anyone reaches the price, which is the moment it matters.
 *
 * To change it, edit `message`. To take it down, set `enabled` to false: the
 * marquee stops rendering and every callout falls back to `launchOffer
 * .capacityLine`, which is the standing monthly-capacity statement and is true
 * whatever the current month looks like.
 */
export const launchAvailability = {
  enabled: true,
  message: "1 slot left for October",
  /**
   * What to do about the number, not why the number exists. The "why" is the
   * capacity section directly below the offer block, and having both say it
   * was simply repetition.
   */
  note: "Tell us about your business and we’ll confirm whether it is still open.",
} as const;

/**
 * The qualifier. A sales device and a screen in the same block: it tells the
 * right reader this is for them and the wrong one to stop reading.
 *
 * Every line restates a confirmed eligibility rule. Nothing here is new.
 */
export const launchQualifier = {
  heading: "Is this you?",
  yes: [
    "You are starting a new business, or you have recently started trading.",
    "You do not have a website yet. A social page or a domain you already own is fine.",
    "You want customers to find you, understand what you offer and get in touch.",
  ],
  no: "This offer does not cover website redesigns or replacing a website you already have.",
} as const;

export const launchHero = {
  headline: "Launch your first website for R845 per month.",
  lead: "Give your new business a professional place online, with a website designed to help customers understand your services, trust your business and get in touch.",
  body: [
    "Your package includes a custom one-page website, domain registration, business email setup, hosting, detailed SEO preparation and submission to Google for indexing.",
    "We handle the planning, design and launch. You focus on getting your business started.",
  ],
} as const;

/**
 * Four confirmed facts, for the strip under the hero.
 *
 * Every one restates something the page says in full further down. Nothing here
 * is a new claim: it exists so a visitor can see the shape of the offer in a
 * couple of seconds and decide whether to keep reading.
 */
export const launchFacts = [
  { icon: "pages", label: "One page", detail: "Custom, designed around your business" },
  { icon: "domain", label: "Domain and email", detail: "Registered and set up for you" },
  { icon: "search", label: "SEO and Google", detail: "Prepared, submitted for indexing" },
  { icon: "calendar", label: "12 months", detail: "Domain, hosting and email fees included" },
] as const;

/**
 * The value section, as three beats rather than one block of paragraphs.
 *
 * This is the SUPPLIED copy regrouped, not rewritten. The four original lines
 * map onto the lead, the three moments and the closing line. The brief allows
 * line breaks and grouping to suit the layout; it does not allow new claims,
 * and there are none here.
 */
export const launchValue = {
  heading: "Give people a clear next step when they hear about your business.",
  lead: "You introduce your business. Share your services. Hand someone your details.",
  moments: [
    {
      title: "Someone hears about you.",
      body: "You have shared what you do and handed over your details. That is where their interest starts.",
    },
    {
      title: "They want to know more.",
      body: "Now give them a website where they can learn more and contact you.",
    },
    {
      title: "They decide whether to ask.",
      body: "A place that explains what you offer, who you help and how to make an enquiry.",
    },
  ],
  close:
    "We plan your first website around those questions, so potential customers can understand your business and take the next step with confidence.",
} as const;

export const launchInclusionsIntro = {
  heading: "Your first website, with the setup handled.",
  body: [
    "Starting a business already comes with decisions to make. We take care of your website, domain and business email through one clear process.",
    "You get an agreed scope, a planned launch and a website designed around your business goals.",
  ],
  listHeading: "Here’s what your package includes.",
} as const;

/**
 * All ten inclusions, in the confirmed order. `group` drives the layout only.
 * Icons are drawn from the set in components/launch/LaunchIcon.tsx.
 */
export const launchInclusions = [
  {
    icon: "plan",
    group: "Planning and design",
    title: "Website planning around your goals",
    body: "We learn about your new business, your customers and the enquiries you want to receive. That shapes your page, its sections and your contact options.",
  },
  {
    icon: "pages",
    group: "Planning and design",
    title: "A custom one-page website",
    body: "A single page designed around your brand and services, with sections for what you do, who you help and how to get in touch. We agree on the sections before the build begins.",
  },
  {
    icon: "devices",
    group: "Planning and design",
    title: "Responsive design across devices",
    body: "Your pages, navigation and forms adapt to phones, tablets and desktops, so customers can browse your services and contact you from whichever device they use.",
  },
  {
    icon: "domain",
    group: "Domain, email and hosting",
    title: "Domain registration and setup",
    body: "We help you choose an available domain and connect your website and email. Your business gets a web address you can share on your social profiles, business cards and marketing material.",
  },
  {
    icon: "mail",
    group: "Domain, email and hosting",
    title: "Professional business email",
    body: "Email addresses that match your domain, such as hello@yourbusiness.co.za. We create the accounts included in your package and provide the details you need to connect them.",
  },
  {
    icon: "calendar",
    group: "Domain, email and hosting",
    title: "Domain and hosting fees for 12 months",
    body: "Your agreed domain, website hosting and email hosting fees are included for the first year. Your proposal confirms the allowances and continuation costs before you book.",
  },
  {
    icon: "search",
    group: "Search and launch",
    title: "Detailed SEO setup",
    body: "We research relevant search terms and prepare your pages around your services and locations. The work includes page titles, search descriptions, headings, internal links, descriptive URLs, image optimisation and appropriate structured data.",
  },
  {
    icon: "google",
    group: "Search and launch",
    title: "Google Search Console and indexing submission",
    body: "We connect your website to Google Search Console, submit your sitemap and request indexing for eligible pages. We also check for technical settings that could block indexing.",
  },
  {
    icon: "enquiry",
    group: "Search and launch",
    title: "A clear way for customers to enquire",
    body: "Prominent contact buttons and a working enquiry form give interested visitors a direct next step. We plan where those options appear so customers can find them when they’re ready.",
  },
  {
    icon: "gauge",
    group: "Search and launch",
    title: "Performance and launch checks",
    body: "We optimise images and loading performance, then check your pages, links, forms and mobile layouts before your website goes live.",
  },
] as const;

export const launchWork = {
  heading: "See how we approach website design.",
  body: "Explore GoodGround’s own website and published concept projects to see our approach to layout, mobile browsing and customer journeys.",
  prompt: "Open a project. Try the navigation. Follow the enquiry process.",
  linkLabel: "Explore our work",
  linkHref: "/work",
  /**
   * Slugs from content/caseStudies.ts. Real assets, real destinations, and the
   * labels come from caseStudyKindLabel so a concept build is never presented
   * as a paying client.
   */
  slugs: ["goodground-site", "b3tter-bottle", "sunbird-early-learners"],
} as const;

export const launchCapacity = {
  heading: "Two new businesses each month.",
  body: [
    "We open two spaces through this promotion each month so we can give each business time for planning, design, development and testing.",
    "Your first website follows an agreed scope, review process and launch plan.",
    "Once those spaces are booked, we’ll discuss the next available intake with you.",
  ],
} as const;

export const launchSummary = {
  heading: "Your complete website launch package.",
  points: [
    "A custom one-page website, designed around your new business.",
    "Domain registration and professional email setup.",
    "Detailed SEO preparation and Google indexing submission.",
    "An enquiry form, responsive design and launch checks.",
    "Domain, hosting and email fees included for the first 12 months.",
    "Available exclusively to new businesses that do not have a website.",
  ],
} as const;

export const launchProcess = {
  heading: "From your business idea to your first website.",
  steps: [
    {
      title: "Tell us about your business.",
      body: "Share what you offer, who you want to reach and when you’re hoping to launch your website.",
    },
    {
      title: "Review your proposal.",
      body: "We confirm availability, what your page includes, payment terms and project timeline. You review the details before deciding to proceed.",
    },
    {
      title: "Review your website.",
      body: "We design and build around your agreed brief. You see your website take shape and provide feedback within the included revision rounds.",
    },
    {
      title: "Approve and launch.",
      body: "Once the agreed launch requirements are complete, we run the final checks, publish your website and submit your pages to Google for indexing.",
    },
  ],
} as const;

export const launchFaqs = {
  heading: "Your questions, answered.",
  items: [
    {
      question: "Who qualifies for this offer?",
      answer:
        "This promotion is exclusively for new businesses that do not have a website. You can be preparing to launch or have recently started trading and need your first website. The offer does not cover website redesigns or replacements.",
    },
    {
      question: "I have a social media page. Can I still apply?",
      answer:
        "Yes. A social media page does not exclude you, provided your business is new and has no website. Your new website gives you a place to direct people who want more information or want to enquire.",
    },
    {
      question: "What if I’ve already registered a domain?",
      answer:
        "You can still enquire if your new business has no website. Share your domain details, and we’ll confirm how your existing domain can be used and what setup is required.",
    },
    {
      question: "What do I need to provide?",
      answer:
        "Your business name, contact details, service information and any logo, text or photographs you already have. We’ll explain what’s needed and agree on any additional content support before work starts.",
    },
    {
      question: "How long will my website take?",
      answer:
        "We confirm your timeline once we understand the scope and content requirements. You’ll know your expected start date, review stages and launch window before work begins.",
    },
    {
      question: "Will my website appear on Google?",
      answer:
        "We prepare your website for search, submit your sitemap and request indexing. Google decides whether and when pages appear in search results. Indexing and specific rankings cannot be guaranteed.",
    },
    {
      question: "Does the package include ongoing SEO?",
      answer:
        "This offer includes detailed SEO setup for your website launch. Ongoing SEO campaigns, new content and continued optimisation can be quoted separately.",
    },
    {
      question: "Is there a deposit?",
      answer:
        "No. You pay R845 a month for 12 months, which comes to R10 140 in total. That includes your domain, hosting and email fees for the 12 months.",
    },
    {
      question: "What happens after the first 12 months?",
      // Replaced 2026-09-13 on Johandre's instruction. This is now the page's
      // only statement about what happens at the end of the term, since the
      // proposal-terms paragraph came off the offer panel at the same time.
      answer:
        "When the contract comes to an end, we give you the option to have your domain and website transferred to you, or to move to our maintenance package, where we continue to handle the maintenance, hosting and domain fees.",
    },
    {
      question: "Can I add more pages or extra features?",
      answer:
        "Yes. Additional pages, online payments, booking systems and other features are scoped and quoted separately. You approve any additional costs before that work begins.",
    },
  ],
} as const;

export const launchEnquiry = {
  heading: "Get your first business website underway.",
  body: [
    "Launch with a website that explains your services, presents your business professionally and makes contacting you straightforward.",
    "R845 per month, with domain, hosting and email fees included for the first 12 months.",
    "Exclusively for new businesses without a website.",
  ],
  /**
   * Sits directly above the form. Deliberately does NOT reopen with "tell us
   * about your business": the availability callout immediately above it already
   * says that, and the two stacked read as a stutter. This adds the two things
   * that actually lower the barrier to sending it.
   */
  prompt: "It takes about a minute, and it commits you to nothing.",
  /** WCAG-relevant: this exact string is also asserted server-side. */
  eligibilityLabel:
    "I confirm that this is a new business and the business does not have a website.",
  submitSupport:
    "We’ll review your enquiry and get in touch about availability and next steps. Sending this form does not commit you to a purchase.",
  success:
    "Thanks for your enquiry. We’ll review your business details and contact you about availability and next steps.",
  failure:
    "We couldn’t submit your enquiry. Please try again or contact us using the details below.",
} as const;

/** Route and search metadata, kept beside the offer they describe. */
export const launchRoute = {
  path: "/website-launch",
  title: "First Website for New Businesses | R845/month | GoodGround",
  description:
    "Launch your new business website for R845 per month. A one-page site, SEO setup and 12 months of domain, hosting and email fees. Two spaces monthly.",
} as const;

/** Server-side limits, shared by the browser validation and the API route. */
export const launchFieldLimits = {
  name: 100,
  businessName: 120,
  email: 254,
  about: 1500,
  timeline: 120,
} as const;
