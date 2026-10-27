import type { IconName } from "../Icon";

/**
 * Template copy for the Industry pages (Figma 86:151 Trades, 90:198).
 *
 * Trades is written exactly as drawn. For the other five, titles, H1s, intros,
 * chips, problems and FAQs are the LIVE copy (content/industryPages.ts); every
 * other slot (journey, fixes, the phone/search illustrations, the included
 * bento wording, the area chips) is a DRAFT in the same voice, written for the
 * template, and is listed in tasks/figma-redesign-questions.md for approval.
 * Towns are examples and the illustrations are always labelled as such.
 */

export type Journey = { icon: IconName; title: string; body: string };
export type Fix = { icon: IconName; text: string; short: string };

export type IndustryView = {
  slug: string;
  name: string;
  /** Lower-case noun used in the honesty card: "We haven’t published a live {noun} project yet." */
  noun: string;
  phone: {
    business: string;
    badge: string;
    headline: string;
    rating: string;
    areas: string;
    formTitle: string;
    fields: [string, string, string];
    submit: string;
    pill1: { icon: IconName; label: string };
    pill2: { icon: IconName; label: string };
    alt: string;
  };
  moment: { heading: string; sub: string; journey: [Journey, Journey, Journey] };
  problems: { tag: string; heading: string; headingShort: string; icons: [IconName, IconName, IconName]; fixes: [Fix, Fix, Fix] };
  local: {
    heading: string;
    body: string;
    bodyShort: string;
    query: string;
    towns: string[];
    hit: { title: string; sub: string };
    dim: [{ t: string; s: string }, { t: string; s: string }];
    callLabel: string;
  };
  bento: {
    heading: string;
    headingShort: string;
    checklist: string[];
    dev: { text: string; short: string };
    seo: { title: string; body: string };
    full: { title: string; body: string };
    ads: { title: string; body: string; short: string };
  };
  faq: { tag: string; heading: string };
  ctaSub: string;
};

const FULL = { title: "We keep it running.", body: "Hosting, updates, backups and small content changes." };

export const INDUSTRY_VIEWS: Record<string, IndustryView> = {
  "trades-and-home-services": {
    slug: "trades-and-home-services",
    name: "Trades & home services",
    noun: "trades & home services",
    phone: {
      business: "Your Trade Co.",
      badge: "24/7 emergencies",
      headline: "Licensed plumbers in George & the Garden Route",
      rating: "4.9 · 180 Google reviews",
      areas: "George · Wilderness · Mossel Bay · Knysna",
      formTitle: "Request a callout",
      fields: ["Your name", "Phone number", "What’s the problem?"],
      submit: "Get my quote",
      pill1: { icon: "phone", label: "Call now" },
      pill2: { icon: "chat", label: "WhatsApp" },
      alt: "Illustration of a trades website on a phone",
    },
    moment: {
      heading: "They look you up before they call.",
      sub: "Most people check out a tradesperson on their phone, standing in the kitchen or the driveway. That moment decides who gets the call.",
      journey: [
        { icon: "quote", title: "Three quotes in hand", body: "A homeowner has a problem and a few names." },
        { icon: "search", title: "A quick search on their phone", body: "“Plumber near me”, your name, your reviews." },
        { icon: "phone", title: "They call the one that looks established", body: "Clear services, real reviews, a number they can tap." },
      ],
    },
    problems: {
      tag: "WHAT USUALLY GOES WRONG",
      heading: "Three ways trades lose jobs online, and how we fix each one.",
      headingShort: "Three ways trades lose jobs online.",
      icons: ["search", "mobile", "phone"],
      fixes: [
        {
          icon: "search",
          text: "Local SEO built around your services and every town you cover, so “plumber in George” has something real to find.",
          short: "Local SEO built around your services and every town you cover.",
        },
        {
          icon: "mobile",
          text: "Mobile-first pages designed for one thumb: fast, clear, and your number never more than a tap away.",
          short: "Mobile-first pages, with your number never more than a tap away.",
        },
        {
          icon: "phone",
          text: "Tap-to-call, a WhatsApp button and a callout or quote-request form on every page.",
          short: "Tap-to-call, WhatsApp and a quote form on every page.",
        },
      ],
    },
    local: {
      heading: "So “plumber in [your town]” has something real to find.",
      body: "We build for tradespeople across South Africa: city electricians, coastal builders, rural contractors. Every site is built around the towns you actually work in, not just the one on your invoice.",
      bodyShort: "Every site is built around the towns you actually work in, not just the one on your invoice.",
      query: "plumber in george",
      towns: ["George", "Wilderness", "Mossel Bay", "Knysna", "Oudtshoorn", "Plettenberg Bay"],
      hit: { title: "Your Trade Co. · Plumbers in George", sub: "4.9 · Website · Open 24 hours" },
      dim: [
        { t: "Another plumbing business", s: "Facebook page · Last post 9 months ago" },
        { t: "Garden Route plumbing directory", s: "Listing only · No website" },
      ],
      callLabel: "Call",
    },
    bento: {
      heading: "Everything a trades business needs to get found and called.",
      headingShort: "Everything a trades business needs.",
      checklist: [
        "Service pages for each job you do",
        "A page for every town you cover",
        "Google reviews pulled onto the site",
        "Callout and quote-request form",
        "Tap-to-call and WhatsApp on every page",
      ],
      dev: {
        text: "Mobile-first, fast, with your services, service area, reviews and a tap-to-call button on every page.",
        short: "Mobile-first, with your services, service area, reviews and tap-to-call on every page.",
      },
      seo: { title: "Found for the towns you work in.", body: "Service-area pages, Google Business Profile tune-up, local schema." },
      full: FULL,
      ads: {
        title: "Show up first when the geyser bursts.",
        body: "Call-focused campaigns for emergency and high-value jobs, with a clear monthly report.",
        short: "Call-focused campaigns for emergency and high-value jobs.",
      },
    },
    faq: { tag: "QUESTIONS FROM TRADES", heading: "Things tradespeople ask us." },
    ctaSub: "Tell us about your trade and the towns you cover. We reply within 1–2 business days.",
  },

  "health-and-wellness": {
    slug: "health-and-wellness",
    name: "Health & wellness",
    noun: "health & wellness",
    phone: {
      business: "Your Practice",
      badge: "Online booking",
      headline: "Caring physiotherapy in George & the Garden Route",
      rating: "4.9 · Google reviews",
      areas: "George · Wilderness · Mossel Bay",
      formTitle: "Book an appointment",
      fields: ["Your name", "Phone number", "How can we help?"],
      submit: "Request a booking",
      pill1: { icon: "phone", label: "Call us" },
      pill2: { icon: "chat", label: "WhatsApp" },
      alt: "Illustration of a health practice website on a phone",
    },
    moment: {
      heading: "They check you out before they book.",
      sub: "People choosing a practice look for reassurance first: who you are, what you treat and how easy it is to book.",
      journey: [
        { icon: "quote", title: "A need and a short list", body: "Someone needs help and has a few practices to choose from." },
        { icon: "search", title: "A look at each website", body: "Who is the practitioner, what do they treat, can I book?" },
        { icon: "check", title: "They book the one that feels trustworthy", body: "Clear services, a friendly face, a simple way to book." },
      ],
    },
    problems: {
      tag: "WHAT USUALLY GOES WRONG",
      heading: "Three ways practices lose bookings online, and how we fix each one.",
      headingShort: "Three ways practices lose bookings online.",
      icons: ["search", "cal", "shield"],
      fixes: [
        { icon: "search", text: "A page for each treatment and condition, written plainly, so patients can see you treat what they need.", short: "A page for each treatment, written plainly." },
        { icon: "cal", text: "A booking route that takes seconds: online booking, tap-to-call and WhatsApp wherever you want them.", short: "A booking route that takes seconds." },
        { icon: "shield", text: "Practitioner profiles, qualifications and real reviews placed up front, where trust is decided.", short: "Profiles, qualifications and reviews up front." },
      ],
    },
    local: {
      heading: "So “physiotherapist in [your town]” has something real to find.",
      body: "We build for clinics and practices across South Africa. Every site is built around the areas your patients come from, not just the one on your door.",
      bodyShort: "Every site is built around the areas your patients come from.",
      query: "physio in george",
      towns: ["George", "Wilderness", "Mossel Bay", "Knysna", "Oudtshoorn"],
      hit: { title: "Your Practice · Physiotherapists in George", sub: "4.9 · Website · Book online" },
      dim: [
        { t: "Another practice", s: "Facebook page · Last post 9 months ago" },
        { t: "Health directory", s: "Listing only · No website" },
      ],
      callLabel: "Book",
    },
    bento: {
      heading: "Everything a practice needs to be found and booked.",
      headingShort: "Everything a practice needs.",
      checklist: [
        "A page for each treatment you offer",
        "Practitioner profiles and qualifications",
        "Google reviews pulled onto the site",
        "Simple online booking or enquiry form",
        "Tap-to-call and WhatsApp on every page",
      ],
      dev: { text: "Mobile-first and fast, with your treatments, practitioners, reviews and a clear way to book.", short: "Mobile-first, with your treatments, practitioners, reviews and a clear way to book." },
      seo: { title: "Found for what you treat.", body: "Treatment pages, local SEO, Google Business Profile tune-up." },
      full: FULL,
      ads: { title: "Be there when someone needs you.", body: "Search campaigns for the treatments you want more of, with a clear monthly report.", short: "Search campaigns for the treatments you want more of." },
    },
    faq: { tag: "QUESTIONS FROM PRACTICES", heading: "Things practices ask us." },
    ctaSub: "Tell us about your practice and the areas you serve. We reply within 1–2 business days.",
  },

  "hospitality-and-food": {
    slug: "hospitality-and-food",
    name: "Hospitality & food",
    noun: "hospitality & food",
    phone: {
      business: "Your Guesthouse",
      badge: "Book direct",
      headline: "A quiet stay on the Garden Route",
      rating: "4.8 · Google reviews",
      areas: "Wilderness · George · Knysna",
      formTitle: "Check availability",
      fields: ["Your name", "Dates", "Number of guests"],
      submit: "Request a booking",
      pill1: { icon: "phone", label: "Call us" },
      pill2: { icon: "chat", label: "WhatsApp" },
      alt: "Illustration of a guesthouse website on a phone",
    },
    moment: {
      heading: "They decide before they ever see the place.",
      sub: "Guests choose between listings from their phone. The website is the first look at the experience you’ve built.",
      journey: [
        { icon: "quote", title: "A trip and a few listings", body: "A guest is planning a stay and comparing places." },
        { icon: "image", title: "A look at the photos and the menu", body: "Does it look as good as the reviews say?" },
        { icon: "check", title: "They book the one that feels right", body: "Honest photos, clear rates, an easy way to book direct." },
      ],
    },
    problems: {
      tag: "WHAT USUALLY GOES WRONG",
      heading: "Three ways venues lose bookings online, and how we fix each one.",
      headingShort: "Three ways venues lose bookings online.",
      icons: ["cal", "doc", "image"],
      fixes: [
        { icon: "cal", text: "A booking or enquiry route built into the site, so guests can ask or book direct without a detour.", short: "A booking or enquiry route built into the site." },
        { icon: "doc", text: "Menus, hours and rates as real, easy-to-update pages, always current on every device.", short: "Menus, hours and rates that are always current." },
        { icon: "image", text: "A photo-led layout that shows the place the way it feels in person.", short: "A photo-led layout that shows the real place." },
      ],
    },
    local: {
      heading: "So “guesthouse in [your town]” has something real to find.",
      body: "We build for guesthouses, restaurants and cafés across South Africa, from coastal tourist towns to city centres. Every site is built around where your guests come from and what they search for.",
      bodyShort: "Every site is built around where your guests come from and what they search for.",
      query: "guesthouse in wilderness",
      towns: ["Wilderness", "George", "Knysna", "Sedgefield", "Mossel Bay"],
      hit: { title: "Your Guesthouse · Wilderness", sub: "4.8 · Website · Book direct" },
      dim: [
        { t: "Another guesthouse", s: "Listing only · Booking site fees apply" },
        { t: "Accommodation directory", s: "Listing only · No website" },
      ],
      callLabel: "Book",
    },
    bento: {
      heading: "Everything a venue needs to be found and booked.",
      headingShort: "Everything a venue needs.",
      checklist: [
        "Rooms, menus and rates as real pages",
        "A photo-led layout built around the place",
        "Google reviews pulled onto the site",
        "A booking or enquiry form",
        "Tap-to-call and WhatsApp on every page",
      ],
      dev: { text: "Mobile-first and fast, with your rooms or menu, photos, reviews and a clear way to book.", short: "Mobile-first, with your rooms or menu, photos, reviews and a clear way to book." },
      seo: { title: "Found for where you are.", body: "Local pages, Google Business Profile tune-up, local schema." },
      full: FULL,
      ads: { title: "Fill the quiet weeks.", body: "Search and social campaigns timed to your seasons, with a clear monthly report.", short: "Campaigns timed to your seasons." },
    },
    faq: { tag: "QUESTIONS FROM VENUES", heading: "Things venues ask us." },
    ctaSub: "Tell us about your venue and where your guests come from. We reply within 1–2 business days.",
  },

  "retail-and-small-brands": {
    slug: "retail-and-small-brands",
    name: "Retail & small brands",
    noun: "retail & small brands",
    phone: {
      business: "Your Brand",
      badge: "Free delivery",
      headline: "Handmade goods, made in South Africa",
      rating: "4.9 · Google reviews",
      areas: "Ships nationwide · Pick-up in George",
      formTitle: "Ask about an order",
      fields: ["Your name", "Email", "What are you after?"],
      submit: "Send my enquiry",
      pill1: { icon: "tag", label: "Shop now" },
      pill2: { icon: "chat", label: "WhatsApp" },
      alt: "Illustration of a small brand website on a phone",
    },
    moment: {
      heading: "They judge the product by the shopfront.",
      sub: "Customers decide whether to trust a small brand within seconds of landing on its site.",
      journey: [
        { icon: "quote", title: "A product and a few shops", body: "A customer wants something and compares options." },
        { icon: "image", title: "A look at the shopfront", body: "Does the site do the product justice?" },
        { icon: "check", title: "They buy from the one that feels real", body: "Good photos, clear prices, an easy checkout." },
      ],
    },
    problems: {
      tag: "WHAT USUALLY GOES WRONG",
      heading: "Three ways small brands lose sales online, and how we fix each one.",
      headingShort: "Three ways small brands lose sales online.",
      icons: ["tag", "image", "search"],
      fixes: [
        { icon: "tag", text: "A clean, fast path from product to purchase, with no step that doesn’t need to be there.", short: "A clean, fast path from product to purchase." },
        { icon: "image", text: "A site designed around your brand and your photography, not a generic template.", short: "A site designed around your brand." },
        { icon: "search", text: "Search-ready product and category pages, so people find you beyond social media.", short: "Search-ready product pages." },
      ],
    },
    local: {
      heading: "So “handmade [your product]” has something real to find.",
      body: "We build for makers, shops and brands across South Africa. Every site is built around what your customers actually search for, not just your brand name.",
      bodyShort: "Every site is built around what your customers actually search for.",
      query: "handmade candles south africa",
      towns: ["Cape Town", "George", "Johannesburg", "Durban", "Pretoria"],
      hit: { title: "Your Brand · Handmade candles", sub: "4.9 · Website · Free delivery" },
      dim: [
        { t: "Another shop", s: "Marketplace listing · Fees apply" },
        { t: "Gift directory", s: "Listing only · No website" },
      ],
      callLabel: "Shop",
    },
    bento: {
      heading: "Everything a small brand needs to be found and bought from.",
      headingShort: "Everything a small brand needs.",
      checklist: [
        "Product and category pages built to rank",
        "A photo-led layout built around your brand",
        "Reviews and social proof where doubt shows up",
        "A fast, simple path to checkout or enquiry",
        "Tap-to-call and WhatsApp on every page",
      ],
      dev: { text: "Mobile-first and fast, with your products, photography, reviews and a clear way to buy.", short: "Mobile-first, with your products, photography, reviews and a clear way to buy." },
      seo: { title: "Found beyond social media.", body: "Product and category SEO, structured data, speed." },
      full: FULL,
      ads: { title: "Put the product in front of buyers.", body: "Shopping and search campaigns focused on what sells, with a clear monthly report.", short: "Campaigns focused on what sells." },
    },
    faq: { tag: "QUESTIONS FROM BRANDS", heading: "Things small brands ask us." },
    ctaSub: "Tell us about your brand and who you sell to. We reply within 1–2 business days.",
  },

  "professional-and-consulting": {
    slug: "professional-and-consulting",
    name: "Professional & consulting",
    noun: "professional & consulting",
    phone: {
      business: "Your Firm",
      badge: "Free first consultation",
      headline: "Accountants for growing Garden Route businesses",
      rating: "4.9 · Google reviews",
      areas: "George · Mossel Bay · Knysna",
      formTitle: "Request a consultation",
      fields: ["Your name", "Email", "How can we help?"],
      submit: "Get in touch",
      pill1: { icon: "phone", label: "Call us" },
      pill2: { icon: "mail", label: "Email" },
      alt: "Illustration of a professional firm website on a phone",
    },
    moment: {
      heading: "Your website is the first proof of credibility.",
      sub: "Clients choosing an advisor look for evidence of expertise before they reach out.",
      journey: [
        { icon: "quote", title: "A need and a shortlist", body: "A business owner needs an advisor and collects a few names." },
        { icon: "search", title: "A check of each website", body: "Who are they, what do they know, who do they work with?" },
        { icon: "check", title: "They contact the one that looks expert", body: "Clear services, visible credentials, an easy first step." },
      ],
    },
    problems: {
      tag: "WHAT USUALLY GOES WRONG",
      heading: "Three ways firms lose enquiries online, and how we fix each one.",
      headingShort: "Three ways firms lose enquiries online.",
      icons: ["layout", "mail", "shield"],
      fixes: [
        { icon: "layout", text: "A site that explains the expertise behind the work in plain language, not jargon.", short: "Expertise explained in plain language." },
        { icon: "mail", text: "A clear route to the right person, with the right contact for each kind of enquiry.", short: "A clear route to the right person." },
        { icon: "shield", text: "Credentials, memberships and client proof placed up front, where trust is decided.", short: "Credentials and proof placed up front." },
      ],
    },
    local: {
      heading: "So “accountant in [your town]” has something real to find.",
      body: "We build for accountants, consultants and agencies across South Africa. Every site is built around the clients and areas you actually serve.",
      bodyShort: "Every site is built around the clients and areas you serve.",
      query: "accountant in george",
      towns: ["George", "Mossel Bay", "Knysna", "Oudtshoorn", "Cape Town"],
      hit: { title: "Your Firm · Accountants in George", sub: "4.9 · Website · Free consultation" },
      dim: [
        { t: "Another firm", s: "Listing only · Last updated 2019" },
        { t: "Business directory", s: "Listing only · No website" },
      ],
      callLabel: "Call",
    },
    bento: {
      heading: "Everything a firm needs to be found and trusted.",
      headingShort: "Everything a firm needs.",
      checklist: [
        "A page for each service you offer",
        "Team profiles and credentials",
        "Client reviews or testimonials",
        "A clear enquiry and consultation form",
        "Tap-to-call and email on every page",
      ],
      dev: { text: "Mobile-first and fast, with your services, team, credentials and a clear first step.", short: "Mobile-first, with your services, team, credentials and a clear first step." },
      seo: { title: "Found by the clients you want.", body: "Service pages, local SEO, Google Business Profile tune-up." },
      full: FULL,
      ads: { title: "Be there when they search.", body: "Search campaigns for the services you want more of, with a clear monthly report.", short: "Search campaigns for the services you want more of." },
    },
    faq: { tag: "QUESTIONS FROM FIRMS", heading: "Things firms ask us." },
    ctaSub: "Tell us about your firm and who you serve. We reply within 1–2 business days.",
  },

  "non-profits-and-community": {
    slug: "non-profits-and-community",
    name: "Non-profits & community",
    noun: "non-profit & community",
    phone: {
      business: "Your Organisation",
      badge: "Donate today",
      headline: "Feeding families across the Garden Route",
      rating: "Registered NPO",
      areas: "George · Knysna · Mossel Bay",
      formTitle: "Get involved",
      fields: ["Your name", "Email", "How would you like to help?"],
      submit: "Send my details",
      pill1: { icon: "heart", label: "Donate" },
      pill2: { icon: "chat", label: "WhatsApp" },
      alt: "Illustration of a non-profit website on a phone",
    },
    moment: {
      heading: "Supporters decide whether to trust you in moments.",
      sub: "People who want to help look at the website first: is this real, and is the work being done?",
      journey: [
        { icon: "quote", title: "A cause and a few organisations", body: "A supporter wants to help and compares options." },
        { icon: "search", title: "A look at the website", body: "Who are you, what do you do, where does the money go?" },
        { icon: "heart", title: "They support the one that feels real", body: "A clear story, visible work, an easy way to give." },
      ],
    },
    problems: {
      tag: "WHAT USUALLY GOES WRONG",
      heading: "Three ways non-profits lose support online, and how we fix each one.",
      headingShort: "Three ways non-profits lose support online.",
      icons: ["heart", "layout", "tag"],
      fixes: [
        { icon: "heart", text: "A clear way to help: donate, volunteer or get in touch, on every page and in one step.", short: "A clear way to help, in one step." },
        { icon: "layout", text: "A site built around your story, so it reads like your organisation and not a template.", short: "A site built around your story." },
        { icon: "tag", text: "A fixed price and a payment plan that suits a limited budget, with nothing hidden.", short: "A fixed price and a plan for a limited budget." },
      ],
    },
    local: {
      heading: "So “[your cause] in [your town]” has something real to find.",
      body: "We build for non-profits and community organisations across South Africa. Every site is built around the people and places you serve.",
      bodyShort: "Every site is built around the people and places you serve.",
      query: "feeding scheme in george",
      towns: ["George", "Knysna", "Mossel Bay", "Oudtshoorn", "Plettenberg Bay"],
      hit: { title: "Your Organisation · Feeding scheme in George", sub: "Registered NPO · Website · Donate online" },
      dim: [
        { t: "Another organisation", s: "Facebook page · Last post 9 months ago" },
        { t: "Charity directory", s: "Listing only · No website" },
      ],
      callLabel: "Donate",
    },
    bento: {
      heading: "Everything an organisation needs to be found and supported.",
      headingShort: "Everything an organisation needs.",
      checklist: [
        "Your story and impact told plainly",
        "A simple way to donate or volunteer",
        "Photos and updates you can edit yourself",
        "A clear contact and enquiry form",
        "Tap-to-call and WhatsApp on every page",
      ],
      dev: { text: "Mobile-first and fast, with your story, your work and a clear way to give or get involved.", short: "Mobile-first, with your story, your work and a clear way to give." },
      seo: { title: "Found by the people who want to help.", body: "Local and cause-based SEO, Google for Nonprofits guidance." },
      full: FULL,
      ads: { title: "Reach the people who care.", body: "Campaigns for donors and volunteers on a budget you control, with a clear monthly report.", short: "Campaigns for donors and volunteers." },
    },
    faq: { tag: "QUESTIONS FROM ORGANISATIONS", heading: "Things organisations ask us." },
    ctaSub: "Tell us about your organisation and who you serve. We reply within 1–2 business days.",
  },
};
