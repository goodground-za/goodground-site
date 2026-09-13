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
 *  - The 12 months of included fees is NOT the payment contract length. The
 *    deposit, minimum commitment, schedule and total payable are still NOT
 *    specified anywhere on this page. Do not invent any of them, and do not
 *    add "cancel anytime" or "no deposit". What happens at the END of the term
 *    IS stated, in the "What happens after the first 12 months?" answer.
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

  /** Always "12 months". Never "a year's contract" — it is not one. */
  includedFees: "Domain, hosting and email fees included for the first 12 months.",

  pageCount: "Up to five custom website pages",

  cta: "Check availability",
  ctaTarget: "#check-availability",
  ctaSupport:
    "Starting a new business and need your first website? Tell us about your plans. We’ll confirm availability and whether this package fits your needs. No obligation to book.",
} as const;

/**
 * The availability banner that scrolls across the top of /website-launch.
 *
 * THIS IS A DATED CLAIM AND IT GOES STALE. "1 slot left for September" is true
 * until it is not, and a page still saying it in October is telling visitors
 * something false. Nothing here updates it: there is no counter, no date
 * arithmetic and no automatic month, precisely so it cannot quietly keep making
 * a claim nobody checked.
 *
 * To change it, edit `message`. To take it down, set `enabled` to false and the
 * banner stops rendering.
 *
 * Confirmed by Johandre 2026-09-13.
 */
export const launchMarquee = {
  enabled: true,
  message: "1 slot left for September",
} as const;

export const launchHero = {
  headline: "Launch your first website for R845 per month.",
  lead: "Give your new business a professional place online, with a website designed to help customers understand your services, trust your business and get in touch.",
  body: [
    "Your package includes up to five custom website pages, domain registration, business email setup, hosting, detailed SEO preparation and submission to Google for indexing.",
    "We handle the planning, design and launch. You focus on getting your business started.",
  ],
} as const;

export const launchValue = {
  heading: "Give people a clear next step when they hear about your business.",
  body: [
    "You introduce your business. Share your services. Hand someone your details.",
    "Now give them a website where they can learn more and contact you.",
    "A place that explains what you offer, who you help and how to make an enquiry.",
    "We plan your first website around those questions, so potential customers can understand your business and take the next step with confidence.",
  ],
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
    body: "We learn about your new business, your customers and the enquiries you want to receive. That shapes your pages, content structure and contact options.",
  },
  {
    icon: "pages",
    group: "Planning and design",
    title: "Up to five custom website pages",
    body: "A website designed around your brand and services. Your pages could include Home, About, Services, FAQs and Contact. We agree on the right combination before the build begins.",
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
    "Up to five custom website pages, designed around your new business.",
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
      body: "We confirm availability, your included pages and services, payment terms and project timeline. You review the details before deciding to proceed.",
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
    "Two promotional spaces each month. Exclusively for new businesses without a website.",
  ],
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
    "Launch your new business website for R845 per month. Up to five pages, SEO setup and 12 months of domain, hosting and email fees. Two spaces monthly.",
} as const;

/** Server-side limits, shared by the browser validation and the API route. */
export const launchFieldLimits = {
  name: 100,
  businessName: 120,
  email: 254,
  about: 1500,
  timeline: 120,
} as const;
