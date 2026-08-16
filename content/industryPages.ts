import type { FAQItem } from "@/content/faq";
import type { Industry } from "@/content/industries";

/**
 * One page per audience segment named in content/industries.ts (dev brief
 * follow-up: those six segments were named on the homepage but never linked
 * anywhere). No client names or results are invented here — GoodGround was
 * founded 2026 and has no track record to cite yet (same rule as
 * content/industries.ts). Pain points and copy stay at the category level.
 */

export type IndustryPageData = {
  slug: string;
  icon: Industry["icon"];
  /** Breadcrumb + card label, kept short. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  /** The specific business types this page targets, shown as chips under the hero. */
  keywordChips: string[];
  painPoints: { title: string; body: string }[];
  /** Slugs from content/services.ts to surface via ServiceAccordion. */
  relevantServiceSlugs: string[];
  localProof: string;
  faq: FAQItem[];
};

export const industryPages: IndustryPageData[] = [
  {
    slug: "trades-and-home-services",
    icon: "trades",
    title: "Trades & Home Services",
    metaTitle: "Website Design for Electricians, Plumbers & Builders | South Africa",
    metaDescription:
      "Websites for electricians, plumbers, builders, and contractors across South Africa. Fast, mobile-friendly sites that make you look credible before the quote.",
    h1: "Website design for electricians, plumbers, and builders.",
    heroIntro:
      "A homeowner comparing three quotes will look you up before they call. If what they find is a Facebook page that hasn't posted since last winter, you've already lost ground to whoever showed up looking established. We build websites for tradespeople that make the case for you before the phone rings.",
    keywordChips: ["Electricians", "Plumbers", "Builders", "Contractors", "Handymen"],
    painPoints: [
      {
        title: "You're the best in the area and nobody can tell",
        body: "Word of mouth got you this far, but it doesn't show up in a Google search. If someone searches \"electrician near me\" and you're not there, a competitor with a worse callout rate and a better website gets the job.",
      },
      {
        title: "Your current site doesn't work on site",
        body: "Most people checking out a tradesperson do it from a phone, standing in their kitchen or driveway. A site that isn't built mobile-first loses them before they find your number.",
      },
      {
        title: "No easy way to actually get in touch",
        body: "A buried contact form or a phone number nobody bothered to make tappable costs you jobs you never even hear about.",
      },
    ],
    relevantServiceSlugs: ["website-development", "seo-foundations", "care-plans", "google-ads"],
    localProof:
      "We build for tradespeople across South Africa, city electricians, coastal builders, rural contractors. Every site is built with local search in mind, so \"plumber in [your town]\" has something real to find.",
    faq: [
      {
        question: "Can you show my service area instead of just one town?",
        answer:
          "Yes. If you cover several towns or a whole region, we build the site and its SEO around that area rather than pretending you're only local to one suburb.",
      },
      {
        question: "Can people request a callout or quote directly from the site?",
        answer:
          "Yes, every build includes a contact or quote-request form suited to how your business actually takes bookings, plus a tap-to-call number on mobile.",
      },
      {
        question: "I already have some good reviews. Can they go on the site?",
        answer:
          "Yes, real reviews from your existing customers are exactly the kind of proof that helps a first-time visitor decide to call you instead of the next name on the list.",
      },
      {
        question: "Do you only build for electricians and plumbers?",
        answer:
          "No. This page covers the trades we're asked about most, but the same approach applies to builders, roofers, painters, landscapers, and most other home-service businesses.",
      },
    ],
  },
  {
    slug: "hospitality-and-food",
    icon: "hospitality",
    title: "Hospitality & Food",
    metaTitle: "Website Design for Restaurants, Cafés & Guesthouses | Garden Route & SA",
    metaDescription:
      "Accommodation and hospitality websites for guesthouses, B&Bs, restaurants, and cafés across the Garden Route and South Africa. Menus, booking, and a site that matches the experience you offer in person.",
    h1: "Websites for restaurants, cafés, guesthouses, and B&Bs.",
    heroIntro:
      "Most guests decide whether to book before they ever see the place in person. If your accommodation or restaurant website looks like it hasn't been touched since it launched, that's the last impression before they close the tab and try the next listing. We build hospitality sites that look as good as the experience you've actually built.",
    keywordChips: ["Restaurants", "Cafés", "Guesthouses", "B&Bs", "Accommodation", "Small venues"],
    painPoints: [
      {
        title: "No booking website, just a phone number and a prayer",
        body: "Travellers browsing at 11pm want to book on the spot, not wait until office hours to phone. A site without a clear booking or enquiry path loses that guest to a listing that made it easy.",
      },
      {
        title: "Menus and hours buried or out of date",
        body: "An out-of-date menu or wrong opening hours is the fastest way to lose a walk-in before they walk in.",
      },
      {
        title: "Photos that undersell the place",
        body: "A beautiful guesthouse or plated dish deserves a site that shows it properly, not a cramped gallery squeezed into a generic template.",
      },
    ],
    relevantServiceSlugs: ["website-development", "seo-foundations", "care-plans", "meta-ads"],
    localProof:
      "We build for guesthouses, restaurants and cafés right across South Africa, from coastal tourist towns to city centres, wherever your guests are coming from.",
    faq: [
      {
        question: "Can you build a booking or enquiry system for my guesthouse?",
        answer:
          "Yes. We can connect your site to a booking platform you already use, or build a straightforward enquiry form if you'd rather handle bookings directly. We'll talk through what fits your setup.",
      },
      {
        question: "Can the site show live availability or pricing?",
        answer:
          "It depends on the booking system behind it. If you use a platform with a public availability calendar, we can usually surface it on your site rather than sending guests off to book elsewhere.",
      },
      {
        question: "I only need a simple menu and hours page for my café. Is that too small a project?",
        answer:
          "No. Our Micro and Starter packages are built for exactly that: a clean, fast site with your menu, hours, and location, without paying for features you don't need. See /pricing for the breakdown.",
      },
      {
        question: "Do you work with venues outside the Garden Route?",
        answer:
          "Yes, we build for restaurants, cafés, and accommodation businesses across South Africa. The whole process runs comfortably online, wherever you're based.",
      },
    ],
  },
  {
    slug: "health-and-wellness",
    icon: "health",
    title: "Health & Wellness",
    metaTitle: "Website Design for Clinics, Dentists & Physiotherapists | South Africa",
    metaDescription:
      "Websites for clinics, dentists, physiotherapists, and medical practices across South Africa. Clear, trustworthy sites that make booking an appointment simple.",
    h1: "Website design for clinics, dentists, and physiotherapists.",
    heroIntro:
      "Someone searching for a new dentist or physio is already a little anxious. A confusing website, or one that doesn't say plainly what you treat and how to book, adds friction at exactly the wrong moment. We build sites for health and wellness practices that read as calm and credible as the practice itself.",
    keywordChips: ["Clinics", "Dentists", "Physiotherapists", "Medical practices", "Wellness practitioners"],
    painPoints: [
      {
        title: "Patients can't tell what you actually treat",
        body: "A vague homepage forces a nervous patient to phone and ask, and most won't bother. Clear, specific service pages do that work for you.",
      },
      {
        title: "Booking is harder than it needs to be",
        body: "If requesting an appointment takes more than a couple of taps, some patients will simply pick the practice that made it easier.",
      },
      {
        title: "The site doesn't build trust before the first visit",
        body: "Practitioner bios, qualifications, and a professional look all do quiet work convincing a new patient you're the right choice, if they're actually on the site.",
      },
    ],
    relevantServiceSlugs: ["website-development", "seo-foundations", "care-plans"],
    localProof:
      "We build for health and wellness practices across South Africa, from single-practitioner clinics to multi-partner practices. Every site includes local SEO, so patients searching in your area can actually find you.",
    faq: [
      {
        question: "Can patients book or request an appointment directly on the site?",
        answer:
          "Yes. We can link to a booking system you already use, or build a request form that lands straight in your inbox, whichever suits how your practice actually books patients.",
      },
      {
        question: "Can you list multiple practitioners or services on one site?",
        answer:
          "Yes, multi-practitioner practices and clinics offering several services are a normal build for us. We'll structure the site around how patients actually search for what you offer.",
      },
      {
        question: "Do you handle POPIA-related concerns like contact forms?",
        answer:
          "We build forms and data handling in a straightforward, privacy-conscious way, but we're not lawyers. For anything specific to your practice's compliance obligations, we'd recommend checking with your own advisor.",
      },
      {
        question: "Is a website worth it for a small, single-practitioner practice?",
        answer:
          "Usually, yes. Even a simple site that clearly states what you treat, where you are, and how to book outperforms relying on referrals alone. Our smaller packages are built for exactly this case.",
      },
    ],
  },
  {
    slug: "professional-and-consulting",
    icon: "professional",
    title: "Professional & Consulting",
    metaTitle: "Website Design for Accountants, Law Firms & Consultants | South Africa",
    metaDescription:
      "Websites for accountants, law firms, consultants, and financial advisors across South Africa. A site that reads as credible as the advice you give.",
    h1: "Website design for accountants, law firms, and consultants.",
    heroIntro:
      "For a professional services firm, the website is often the first proof of competence a client sees, before any meeting happens. A dated or generic site undercuts the credibility you've spent years building. We build sites for accountants, consultants, and firms that carry that credibility online.",
    keywordChips: ["Accountants", "Law firms", "Consultants", "Financial advisors", "Agencies"],
    painPoints: [
      {
        title: "The site undersells the expertise behind it",
        body: "A firm with genuine experience deserves a site that reads that way, not a template that looks the same as every other local practice.",
      },
      {
        title: "It's not clear who to contact about what",
        body: "Firms with multiple partners or service lines often bury the one thing a visitor actually needs: who handles their specific problem.",
      },
      {
        title: "No credibility markers up front",
        body: "Qualifications, professional bodies, and years of practice all matter to a client vetting a firm, but only if the site actually shows them.",
      },
    ],
    relevantServiceSlugs: ["website-development", "ux-design", "seo-foundations", "care-plans"],
    localProof:
      "We build for professional and consulting firms across South Africa, from sole practitioners to multi-partner practices. Local SEO is built in from day one, so you show up for the searches that actually lead to enquiries.",
    faq: [
      {
        question: "Can the site list multiple partners or team members separately?",
        answer:
          "Yes. Firms with several partners, associates, or service lines are a normal build for us, and we'll structure the navigation around how a client actually looks for the right person.",
      },
      {
        question: "Can you include a secure enquiry or consultation-request form?",
        answer:
          "Yes, every build includes a contact or enquiry form suited to how your firm takes on new clients, whether that's a general enquiry or a specific consultation request.",
      },
      {
        question: "We're a small practice. Do we need something this involved?",
        answer:
          "Not necessarily. Our smaller fixed packages cover a clean, credible site for a sole practitioner or small firm without paying for features built for a larger practice. See /pricing for what's actually included.",
      },
      {
        question: "Do you work with firms anywhere in South Africa?",
        answer:
          "Yes, we build for professional and consulting firms across South Africa. The whole process runs comfortably online, wherever your firm is based.",
      },
    ],
  },
  {
    slug: "retail-and-small-brands",
    icon: "retail",
    title: "Retail & Small Brands",
    metaTitle: "Ecommerce & Retail Website Design for Small Brands | South Africa",
    metaDescription:
      "Ecommerce and retail website design for small brands and shops across South Africa. Online shops built to do the product justice and actually sell.",
    h1: "Ecommerce website design for small brands and shops.",
    heroIntro:
      "A product worth making deserves an online shop that doesn't get in its own way. Slow pages, a clunky checkout, or photos that undersell it all cost you sales you never see happen. We build ecommerce and retail websites for small brands that make buying the product as easy as it should be.",
    keywordChips: ["Ecommerce", "Online shops", "Retail brands", "Makers", "Small businesses"],
    painPoints: [
      {
        title: "Checkout friction loses the sale at the last step",
        body: "A slow or confusing checkout is where online shops lose customers who'd already decided to buy. Every extra step is a chance to abandon the cart.",
      },
      {
        title: "The shop doesn't reflect the brand",
        body: "A generic storefront template undersells a product that was made with care. The shop should look like it belongs to the brand, not a rented shelf.",
      },
      {
        title: "Nobody's finding the shop outside social media",
        body: "Relying on Instagram alone caps your reach to people already following you. A search-optimised shop brings in customers who didn't know you existed yet.",
      },
    ],
    relevantServiceSlugs: ["website-development", "ux-design", "seo-foundations", "meta-ads"],
    localProof:
      "We build ecommerce sites for makers, small shops, and retail brands across South Africa, shipping locally or nationwide. Every shop is built fast and structured for search, so it isn't reliant on social media alone.",
    faq: [
      {
        question: "What payment gateways can you set up for South African customers?",
        answer:
          "We work with the local payment providers South African shops typically use, and we'll confirm the right fit for your business and customer base during scoping.",
      },
      {
        question: "Can you handle stock and inventory, or just the storefront?",
        answer:
          "We build the storefront and connect it to inventory management where the platform supports it. For businesses with more complex stock needs, we'll talk through what's realistic before we start.",
      },
      {
        question: "How many products can the shop handle?",
        answer:
          "From a handful of products to a full catalogue, we'll scope the build and the platform underneath it to match how many products you actually carry, not a fixed limit.",
      },
      {
        question: "Do you build shops for makers who only sell a few products?",
        answer:
          "Yes. A small, focused catalogue often works better as a simpler, faster site than a full ecommerce platform built for hundreds of products, and we'll recommend whichever actually fits.",
      },
    ],
  },
  {
    slug: "non-profits-and-community",
    icon: "nonprofit",
    title: "Non-Profits & Community",
    metaTitle: "Website Design for Non-Profits & NPOs | South Africa",
    metaDescription:
      "Website design for non-profits, NPOs, and community organisations across South Africa. Sites that tell the story plainly and make it easy to donate, volunteer, or get in touch.",
    h1: "Website design for non-profits and community organisations.",
    heroIntro:
      "The work speaks for itself, but only if people can find it and understand it in the first thirty seconds. We build websites for non-profits and community organisations that tell the story plainly and make it simple for someone to donate, volunteer, or get involved.",
    keywordChips: ["Non-profits", "NPOs", "Community organisations", "Charities"],
    painPoints: [
      {
        title: "It's not clear how to help",
        body: "A visitor who's ready to donate or volunteer needs that path in front of them immediately. If it's buried three clicks deep, most won't go looking for it.",
      },
      {
        title: "The story gets lost in a generic template",
        body: "Every non-profit's site starts to look the same when it's built from the same stock template as a hundred others. The work an organisation does deserves a site built around it.",
      },
      {
        title: "Limited budget, real website needs",
        body: "Non-profits often need a genuinely working site, one that's credible to funders and easy to update, without a budget to match a commercial brand.",
      },
    ],
    relevantServiceSlugs: ["website-development", "seo-foundations", "care-plans"],
    localProof:
      "We build for non-profits and community organisations across South Africa. We understand that budgets are tighter here, and we'll always be upfront about what's realistic for yours.",
    faq: [
      {
        question: "Do you offer reduced pricing for non-profits?",
        answer:
          "We're happy to talk through what's realistic for your organisation's budget. Get in touch and we'll have an honest conversation before quoting anything.",
      },
      {
        question: "Can the site include a donation button or link to a donation platform?",
        answer:
          "Yes, we can connect your site to whichever donation platform you already use, or help you think through options if you haven't settled on one yet.",
      },
      {
        question: "We update our own content. Can the site be easy for a non-technical person to manage?",
        answer:
          "Yes, every site we build is editable without needing a developer for routine updates, and we'll show you exactly how before handover.",
      },
      {
        question: "Do you need us to have professional photography ready?",
        answer:
          "It helps, but it's not a requirement. We'll work with what you have and advise honestly if better photography would make a real difference to the site.",
      },
    ],
  },
];
