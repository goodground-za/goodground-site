import type { FAQItem } from "@/content/faq";

/**
 * One dedicated landing page per service (dev brief follow-up: individual
 * services were sections on /services with real search demand but no URL of
 * their own). `serviceRef` points back to the matching content/services.ts
 * slug for the "see it in context" link into that page's accordion row;
 * left undefined for website-redesign, which has no accordion row of its
 * own (it's the website-development service applied to an existing site,
 * not a separate line item on /services).
 *
 * Scope note (confirmed): GoodGround only maintains sites it built. The
 * Care Plans page below deliberately does not claim to service WordPress
 * installs GoodGround didn't build, even though "WordPress maintenance
 * South Africa" is real search demand, to avoid promising something
 * GoodGround doesn't do.
 */

export type ServicePageData = {
  slug: string;
  serviceRef?: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  keywordChips: string[];
  painPoints: { title: string; body: string }[];
  included: string[];
  localProof: string;
  faq: FAQItem[];
  ctaHref: string;
  ctaLabel: string;
};

export const servicePages: ServicePageData[] = [
  {
    slug: "website-care-plans",
    serviceRef: "care-plans",
    title: "Website Care Plans",
    metaTitle: "Website Maintenance & Care Plans | South Africa",
    metaDescription:
      "Ongoing website maintenance and care plans for South African businesses: updates, security monitoring, performance checks, and small content changes, handled monthly.",
    h1: "Website maintenance and care plans for South African businesses.",
    heroIntro:
      "A website is a foundation, not a one-time job. Plugins fall out of date, content stops being accurate, and small issues turn into slow load times or security risks that nobody notices until they become a real problem. A care plan hands that watching over to us.",
    keywordChips: ["Website maintenance", "Care plan", "Security monitoring", "Performance checks"],
    painPoints: [
      {
        title: "Updates pile up until something breaks",
        body: "Software falls behind quietly. Nobody notices until an outdated dependency causes a real failure, usually at the worst possible time.",
      },
      {
        title: "Content goes stale",
        body: "Prices change, hours change, a service gets discontinued, and the website keeps saying the old version because updating it fell off everyone's list.",
      },
      {
        title: "Nobody's watching until it's a problem",
        body: "A slow page or a broken form can sit there for weeks costing you enquiries before anyone in the business even notices.",
      },
    ],
    included: [
      "Ongoing software and dependency updates, handled before they become a problem",
      "Security monitoring, so an issue gets caught early instead of found by a customer",
      "Regular performance checks to keep load times fast",
      "Small content changes handled monthly, no separate invoice for every text edit",
      "Direct line to the team that actually built your site, not a call centre reading from a script",
    ],
    localProof:
      "We're based in George on the Garden Route and run care plans for businesses across South Africa. If your current site runs on WordPress, you already know the drill: plugin updates, security patches, and a dashboard that won't stop nagging you about both. We build differently. Every GoodGround site is custom-coded, with no plugin ecosystem to patch and no third-party theme to break on an update, and our care plans keep it running exactly that way.",
    faq: [
      {
        question: "Do I need a care plan, or can I maintain the site myself?",
        answer:
          "You can maintain it yourself if you have the time and the technical know-how. Most business owners don't want that job on top of running the business, which is exactly what a care plan takes off your plate.",
      },
      {
        question: "What happens if I'm not on a care plan and something breaks?",
        answer:
          "We'll still help, quoted as a one-off fix. A care plan exists so that call happens far less often, because small issues get caught before they become a break.",
      },
      {
        question: "Can I start a care plan after launch, or only when the site is built?",
        answer:
          "Either. Most clients add one at launch, but you can start a care plan at any point once your GoodGround site is live.",
      },
      {
        question: "Does a care plan cover adding new pages, or only maintenance?",
        answer:
          "It covers small content changes. Bigger additions, like a new page or a new feature, are scoped and quoted separately, and we'll always tell you honestly which one your request is.",
      },
    ],
    ctaHref: "/contact",
    ctaLabel: "Talk to Us About a Care Plan",
  },
  {
    slug: "google-ads",
    serviceRef: "google-ads",
    title: "Google Ads",
    metaTitle: "Google Ads Management for Small Business | South Africa",
    metaDescription:
      "Google Ads management for South African small businesses: tight keywords, honest ad copy, real tracking, and a monthly report in plain language. No lock-in contracts.",
    h1: "Google Ads management for small businesses across South Africa.",
    heroIntro:
      "Most small businesses either skip Google Ads entirely or hand the budget to someone who burns it on broad keywords and vague clicks. Money goes out, enquiries don't come in. We build campaigns around what your customers actually type when they're ready to act.",
    keywordChips: ["Google Ads management", "PPC agency", "Search ads", "Google Ads for small business"],
    painPoints: [
      {
        title: "Broad keywords burn budget on the wrong clicks",
        body: "Bidding on \"electricity\" instead of \"emergency electrician near me\" spends your money on browsers, not buyers.",
      },
      {
        title: "No real tracking means no real answers",
        body: "Without proper conversion tracking, you can see the spend but not which of it actually turned into an enquiry.",
      },
      {
        title: "The landing page doesn't match the ad",
        body: "An ad that promises one thing and a page that delivers another loses the click the moment someone arrives.",
      },
    ],
    included: [
      "Tight keyword targeting built around what your customers actually search when they're ready to act",
      "Honest ad copy that matches what you actually offer",
      "Proper conversion tracking, so spend maps to real enquiries, not guesses",
      "Landing pages that match the ad's promise instead of sending traffic to a generic homepage",
      "A simple monthly report in plain language: spend, leads, and cost per result",
      "No lock-in contract. Cancel with 30 days' notice",
    ],
    localProof:
      "We're based in George on the Garden Route and manage Google Ads for businesses across South Africa, wherever your customers are searching from. Because we also build the websites those ads point to, your ads and your site tell one consistent story, which converts better than handing the two jobs to separate people who never talk to each other.",
    faq: [
      {
        question: "How much should I spend on Google Ads?",
        answer:
          "It depends on your goals and margins, but we'll always start with a budget you're comfortable with and only recommend increasing it once the results justify it. You're never locked into a number.",
      },
      {
        question: "Do I need a new website before I start running ads?",
        answer:
          "Not necessarily, but ads work far better when they point to a fast, well-structured site. If your current site needs work first, we'll tell you honestly before you spend a rand on clicks.",
      },
      {
        question: "Is there a long contract?",
        answer:
          "No. We work month to month with 30 days' notice. We'd rather earn your business every month than trap you in a contract.",
      },
      {
        question: "Will I own my Google Ads account?",
        answer:
          "Always. Your account, your data, your audiences, they belong to you, whatever happens down the line.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
  },
  {
    slug: "meta-ads",
    serviceRef: "meta-ads",
    title: "Meta Ads",
    metaTitle: "Facebook & Instagram Ads Management | South Africa",
    metaDescription:
      "Facebook and Instagram ads management for South African small businesses: real audiences, scroll-stopping creative, and remarketing that follows up automatically.",
    h1: "Facebook and Instagram ads management for South African businesses.",
    heroIntro:
      "Boosting a post feels like marketing, but it rarely builds anything. It reaches the wrong people, teaches you nothing, and stops working the moment you stop paying. We plan Meta campaigns around real audiences instead: your local area, your ideal customer, and the people who already visited your site.",
    keywordChips: ["Facebook ads management", "Instagram ads agency", "Social media advertising", "Meta Ads"],
    painPoints: [
      {
        title: "Boosted posts reach the wrong people",
        body: "A boosted post spends money showing your content to whoever Facebook decides, not necessarily anyone close to buying.",
      },
      {
        title: "Nothing gets built for next time",
        body: "Each boosted post starts from zero. There's no audience data carried forward, no remarketing list, nothing compounding.",
      },
      {
        title: "It stops the second you stop paying",
        body: "No ad spend, no reach, no follow-up with the people who almost enquired last week.",
      },
    ],
    included: [
      "Real audience targeting: your local area, your ideal customer, and people who already visited your site",
      "Scroll-stopping creative built for the platform, not a resized print ad",
      "A clear offer in every campaign, not just brand awareness with no next step",
      "Remarketing that quietly follows up with visitors who didn't enquire the first time",
      "A simple monthly report: spend, leads, and cost per result",
      "No lock-in contract. Cancel with 30 days' notice",
    ],
    localProof:
      "We're based in George on the Garden Route and run Meta Ads for businesses across South Africa, from local George campaigns to national reach. Because the same team builds your website, remarketing sends people who already know your brand to a site built to close the enquiry, not just a landing page bolted on for the campaign.",
    faq: [
      {
        question: "What's the difference between Google Ads and Meta Ads?",
        answer:
          "Google captures people already searching for what you offer, high intent, ready to act. Meta builds awareness and trust with the right people before they need you. Most businesses do best with a mix of both.",
      },
      {
        question: "How much should I spend on Meta Ads?",
        answer:
          "We'll start with a budget you're comfortable with and only recommend an increase once the results justify it. Nothing here locks you into a number.",
      },
      {
        question: "Is there a long contract?",
        answer:
          "No. We work month to month with 30 days' notice, the same as our Google Ads management.",
      },
      {
        question: "Will I own my ad accounts and audiences?",
        answer:
          "Always. Your accounts, your data, your audiences, they belong to you, whatever happens down the line.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    metaTitle: "Website Redesign & Revamp Services | South Africa",
    metaDescription:
      "Website redesign for South African businesses that have outgrown their current site. Same fixed-price model, existing content and rankings carried over deliberately.",
    h1: "Website redesign for South African businesses outgrowing their current site.",
    heroIntro:
      "Your business has changed since your website launched. If the site hasn't changed with it, it's quietly working against you every day it stays the same, describing services you've dropped, missing ones you've added, and looking dated next to competitors who redesigned more recently.",
    keywordChips: ["Website redesign", "Website revamp", "Rebuild my website", "Website relaunch"],
    painPoints: [
      {
        title: "The site describes a business you've outgrown",
        body: "Old pricing, discontinued services, a team photo from three staff ago. Visitors trust what they see, even when it's out of date.",
      },
      {
        title: "It looks dated next to competitors who redesigned recently",
        body: "Design ages. A site that looked current five years ago now quietly signals that the business behind it hasn't kept up either.",
      },
      {
        title: "Nobody in-house can safely change it",
        body: "Old code, a departed freelancer, or a platform nobody remembers logging into all mean a small update turns into a small crisis.",
      },
    ],
    included: [
      "A full audit of your current site before we touch anything, so nothing that's actually working gets thrown out by accident",
      "Content and structure carried over deliberately, not lost in the rebuild",
      "Existing URLs and redirects preserved where possible, so your search rankings aren't reset to zero on launch day",
      "The same fixed-price model as every GoodGround build: 50% deposit and the rest on completion, or 12 monthly instalments",
      "SEO foundations rebuilt properly, not just carried over broken",
    ],
    localProof:
      "We're based in George on the Garden Route and redesign websites for businesses across South Africa, whether the current site was built by a freelancer, an old agency, or a DIY builder you've since outgrown.",
    faq: [
      {
        question: "Will a redesign reset my Google rankings?",
        answer:
          "Rankings can dip briefly during any relaunch, but we plan around it: preserving your URLs, setting up the right redirects, and keeping your SEO foundations intact, so a redesign is a step forward, not a reset.",
      },
      {
        question: "Do you need my old site's files to start?",
        answer:
          "Access to your current site and its content helps, but we don't need the original files themselves. We build the new site fresh, custom-coded, and bring your existing content across deliberately.",
      },
      {
        question: "Is a redesign priced differently from a new build?",
        answer:
          "No. It's quoted the same way as any project: one fixed price based on scope, with the same two ways to pay.",
      },
      {
        question: "What if I only need a few pages fixed, not a full rebuild?",
        answer:
          "Then a full redesign is probably more than you need. Tell us what's not working and we'll recommend the smallest fix that actually solves it, not the biggest one that pads the invoice.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
  },
  {
    slug: "seo",
    serviceRef: "seo-foundations",
    title: "SEO",
    metaTitle: "SEO Services for Small Business | South Africa",
    metaDescription:
      "Local and technical SEO for South African small businesses: fast load times, proper page structure, and content built around how your customers actually search.",
    h1: "SEO services for small businesses across South Africa.",
    heroIntro:
      "A gorgeous website nobody can find on Google isn't an investment. It's a cost. Every GoodGround site is built on solid technical SEO from day one: fast load times, proper page structure, and content built around how your customers actually search.",
    keywordChips: ["Local SEO", "SEO George", "Technical SEO", "SEO for small business"],
    painPoints: [
      {
        title: "The site is invisible for the exact searches that matter",
        body: "A business with no local SEO can lose the customer to a competitor with a worse product and a better-structured website.",
      },
      {
        title: "Technical debt quietly caps how high you can rank",
        body: "Slow load times and messy page structure hold a site back in search results no matter how good the content is.",
      },
      {
        title: "SEO gets bolted on after launch, badly",
        body: "A site built first and optimised later usually needs a second project just to fix what should have been right from the start.",
      },
    ],
    included: [
      "Fast load times, built in from the first line of code rather than optimised in afterward",
      "Proper page structure and headings that search engines can actually read",
      "Local SEO for South African search, George included",
      "Content structured around how your customers actually search, not around how you'd describe the business internally",
      "Google Analytics and Search Console set up correctly from launch",
    ],
    localProof:
      "We're based in George on the Garden Route and build SEO foundations into every website for businesses across South Africa. SEO isn't sold as a bolt-on service from a developer who doesn't understand your site, it's built into every GoodGround project from day one. If you already have a site and just need the deeper work, Advanced SEO (keyword research, schema markup, meta strategy) and site speed optimisation are available as standalone add-ons, from R3,000, confirmed in a quote.",
    faq: [
      {
        question: "Do you offer SEO as a standalone service, or only with a new website?",
        answer:
          "SEO foundations come standard with every website we build. If you already have a site and just need the SEO work, Advanced SEO and site speed optimisation are available as standalone add-ons, priced from R3,000 and confirmed in a quote.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical improvements can help within weeks. Ranking for competitive terms takes longer, usually months, and no honest agency will promise you a page-one spot on a specific date.",
      },
      {
        question: "Do you do local SEO specifically for George?",
        answer:
          "Yes, and we build the same local SEO discipline into projects for businesses anywhere else in South Africa too.",
      },
      {
        question: "What's the difference between SEO foundations and Advanced SEO?",
        answer:
          "Foundations cover titles, meta descriptions, headings, and local structure, included in every build. Advanced SEO adds keyword research, schema markup, and a deeper meta strategy, priced separately as an add-on.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
  },
  {
    slug: "ux-design",
    serviceRef: "ux-design",
    title: "UX & Design",
    metaTitle: "UX & UI Design Services | South Africa",
    metaDescription:
      "UX and UI design for South African businesses, built around how customers actually decide. Mapped customer journeys, clear calls to action, mobile-first layouts.",
    h1: "UX and UI design services for South African businesses.",
    heroIntro:
      "A beautiful website that confuses visitors, buries your contact details, or takes six clicks to explain what you do will lose the customer before they act. We map the customer journey before we design a single screen: what a visitor needs to see, and in what order, before they trust you enough to act.",
    keywordChips: ["UX design", "UI design", "Website design services", "User experience design"],
    painPoints: [
      {
        title: "Visitors can't find what they need",
        body: "A confused visitor doesn't ask a question. They close the tab and try the next result on Google.",
      },
      {
        title: "Too many competing calls to action",
        body: "Three buttons fighting for attention convert worse than one obvious next step, because indecision is the easiest way to lose a click.",
      },
      {
        title: "Contact details buried three clicks deep",
        body: "If getting in touch takes effort, most visitors won't make it, no matter how good the rest of the page looks.",
      },
    ],
    included: [
      "Customer journey mapped before a single screen gets designed",
      "One clear next step per page, not several competing for attention",
      "Proof placed exactly where doubt shows up, not buried on a separate page nobody visits",
      "Mobile-first layouts, since most visitors decide from a phone",
      "Accessible design: readable contrast, visible focus states, and structure that works with a keyboard, not just a mouse",
    ],
    localProof:
      "We're based in George on the Garden Route and design for businesses across South Africa. UX and UI design isn't sold as a separate service, it's included in every GoodGround website build, mapped around your specific customers rather than applied from a generic template.",
    faq: [
      {
        question: "Is UX design sold separately, or only with a website build?",
        answer:
          "It's included in every GoodGround website, not sold as a standalone service. If you specifically need a UX audit or redesign without touching the code, tell us what you need and we'll scope it honestly.",
      },
      {
        question: "Do you design mobile-first?",
        answer:
          "Yes. Most visitors to a small business site arrive on a phone, so mobile is the starting point for layout decisions, not an afterthought fitted in at the end.",
      },
      {
        question: "Can you redesign just the UX of my existing site without a full rebuild?",
        answer:
          "Sometimes. If the underlying code can support new UX without a full rebuild, we'll say so. If it can't, a full website redesign is usually the more honest recommendation than patching around the problem.",
      },
      {
        question: "How many rounds of design revisions do I get?",
        answer:
          "It depends on the package: Micro and Launch include 1 round, Grow includes 2, and Scale includes 3. Extra rounds can be added from the à la carte menu on request.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
  },
];
