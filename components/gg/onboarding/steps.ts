/**
 * Client onboarding brief: all 13 steps (docs/redesign/pages/17-onboarding.md, "Field inventory").
 * Plain data, no React, so the browser form and the server route read the same questions.
 *
 * Key: `req` required · `show` shown only when every condition holds · `span` is a column in a
 * 6-column row (6 full, 3 half, 2 third); fields with spans that add up to 6 share a row.
 */
import type { IconName } from "../Icon";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type Cond = { id: string; eq?: string; ne?: string; in?: string[]; includes?: string; includesAny?: string[]; filled?: boolean };
export type Opt = { v: string; title: string; desc?: string };

type Base = { id: string; label: string; req?: boolean; span?: 2 | 3 | 6; hint?: string; ph?: string; show?: Cond[] };

export type Field =
  | (Base & { kind: "text" | "email" | "tel" | "url" | "date" })
  | (Base & { kind: "textarea" })
  | (Base & { kind: "select"; options: string[] })
  | (Base & { kind: "radio"; options: Opt[]; cols?: 2 | 3 })
  | (Base & { kind: "checks"; options: string[]; preticked?: string[]; max?: number; helper?: string })
  | (Base & { kind: "files"; sub?: string; compact?: boolean; accept?: string })
  | {
      kind: "repeat";
      id: string;
      label: string;
      hint?: string;
      item: string;
      add: string;
      req?: boolean;
      max?: number;
      show?: Cond[];
      fields: DistributiveOmit<Field, "show">[];
    }
  | { kind: "colors"; id: string; label: string; hint?: string; show?: Cond[] }
  | { kind: "group"; id: string; label: string; hint?: string; show?: Cond[] }
  | { kind: "note"; id: string; tone: "mint" | "blush"; icon: IconName; text: string; show?: Cond[] }
  | { kind: "quote"; id: string };

export type Step = {
  n: number;
  key: string;
  name: string;
  title: string;
  intro: string;
  minutes: number;
  why: string;
  fields: Field[];
  /** Phone/desktop primary button on the last editable step reads "Save and review". */
  primary?: string;
  /** Step 4 leaves the "Need help?" card out. */
  noHelp?: boolean;
};

const o = (...titles: string[]): Opt[] => titles.map((title) => ({ v: title, title }));
const od = (...pairs: [string, string?][]): Opt[] => pairs.map(([title, desc]) => ({ v: title, title, desc }));

export const REVIEW_STEP = 13;
export const TOTAL_STEPS = 13;

const OTHER_ACTIONS = ["Call us", "WhatsApp us", "Fill in a contact form", "Request a quote", "Book online", "Buy online", "Visit our premises", "Sign up or subscribe"];

export const steps: Step[] = [
  {
    n: 1,
    key: "you",
    name: "You & your team",
    title: "You and your team",
    intro: "Who we’ll be working with, and who signs off the work.",
    minutes: 4,
    why: "Knowing who approves the work avoids delays at the end. Drafts go to everyone you list; sign-off comes from the final approver only.",
    fields: [
      { kind: "group", id: "g1-you", label: "About you" },
      { kind: "text", id: "fullName", label: "Your full name", req: true, span: 3, ph: "Your full name" },
      { kind: "text", id: "role", label: "Your role in the business", span: 3, ph: "e.g. Owner" },
      { kind: "email", id: "email", label: "Email address", req: true, span: 3, ph: "you@business.co.za" },
      { kind: "tel", id: "mobile", label: "Mobile number", req: true, span: 3, ph: "082 000 0000", hint: "We’ll only use this about your project." },
      {
        kind: "radio",
        id: "reach",
        label: "Best way to reach you",
        cols: 3,
        options: od(["WhatsApp", "Quick questions and updates"], ["Phone call", "For anything detailed"], ["Email", "Written updates"]),
      },
      { kind: "text", id: "reachTimes", label: "Best days and times to reach you", ph: "e.g. weekdays after 2pm" },
      { kind: "group", id: "g1-approval", label: "Final approval", hint: "The person who says “yes, go live”." },
      {
        kind: "radio",
        id: "approver",
        label: "Are you the person who gives final approval?",
        req: true,
        cols: 2,
        options: od(["Yes, that’s me", "I approve the final work"], ["No, someone else", "Add their details below"]),
      },
      { kind: "text", id: "approverName", label: "Final approver’s name", req: true, span: 3, show: [{ id: "approver", eq: "No, someone else" }] },
      { kind: "text", id: "approverRole", label: "Their role", span: 3, show: [{ id: "approver", eq: "No, someone else" }] },
      { kind: "email", id: "approverEmail", label: "Their email", req: true, show: [{ id: "approver", eq: "No, someone else" }] },
      {
        kind: "repeat",
        id: "feedback",
        label: "Who else will give feedback?",
        hint: "Optional. Add anyone who should see drafts.",
        item: "Person",
        add: "Add another person",
        fields: [
          { kind: "text", id: "name", label: "Name", span: 2, ph: "Name" },
          { kind: "text", id: "role", label: "Role", span: 2, ph: "Role" },
          { kind: "email", id: "email", label: "Email", span: 2, ph: "name@business.co.za" },
        ],
      },
      { kind: "textarea", id: "unavailable", label: "Any dates you or your approver will be unavailable during the project?", ph: "e.g. away 12–20 December" },
    ],
  },
  {
    n: 2,
    key: "business",
    name: "Business details",
    title: "Your business details",
    intro: "The official details we need for your contact page, footer and legal pages.",
    minutes: 6,
    why: "These details appear on your contact and legal pages, and help Google show the right business information in search and on Maps.",
    fields: [
      { kind: "group", id: "g2-reg", label: "Registered details" },
      { kind: "text", id: "businessName", label: "Registered business name", req: true, span: 3 },
      { kind: "text", id: "tradingName", label: "Trading name, if different", span: 3 },
      {
        kind: "select",
        id: "businessType",
        label: "Type of business",
        req: true,
        hint: "Choose from the list",
        options: ["Private company (Pty) Ltd", "Sole proprietor", "Close corporation (CC)", "Partnership", "Non-profit company (NPC) or NPO", "Trust", "Other"],
      },
      { kind: "text", id: "regNumber", label: "Registration number", span: 3, ph: "e.g. 2019/123456/07", show: [{ id: "businessType", ne: "Sole proprietor" }, { id: "businessType", ne: "Partnership" }, { id: "businessType", filled: true }] },
      { kind: "text", id: "vatNumber", label: "VAT number, if VAT registered", span: 3, ph: "e.g. 4123456789" },
      {
        kind: "textarea",
        id: "directors",
        label: "Directors or office bearers (full names)",
        show: [{ id: "businessType", in: ["Private company (Pty) Ltd", "Close corporation (CC)", "Non-profit company (NPC) or NPO", "Trust"] }],
      },
      { kind: "group", id: "g2-address", label: "Address" },
      { kind: "textarea", id: "physicalAddress", label: "Physical business address", req: true, span: 3 },
      { kind: "textarea", id: "postalAddress", label: "Postal address, if different", span: 3, ph: "PO Box…" },
      {
        kind: "radio",
        id: "addressDisplay",
        label: "Where should your address appear on the website?",
        cols: 3,
        options: od(["Contact page and footer", "Full address, everywhere"], ["Suburb and city only", "Full address on the legal page only"], ["Home-based or mobile", "Legal page only"]),
      },
      { kind: "group", id: "g2-contact", label: "Contact details for the website" },
      { kind: "tel", id: "bizPhone", label: "Business phone", span: 2, ph: "044 000 0000" },
      { kind: "tel", id: "bizWhatsApp", label: "WhatsApp number", span: 2, ph: "082 000 0000" },
      { kind: "email", id: "bizEmail", label: "Business email for the website", span: 2, ph: "info@business.co.za" },
      { kind: "textarea", id: "hours", label: "Trading hours", span: 3, ph: "e.g. Mon–Fri 8:00–17:00" },
      { kind: "textarea", id: "areas", label: "Areas you serve", span: 3, ph: "e.g. George, Wilderness, Mossel Bay" },
      { kind: "text", id: "yearStarted", label: "Year the business started", span: 3, ph: "e.g. 2019" },
      { kind: "text", id: "people", label: "How many people work in the business?", span: 3, ph: "e.g. 8" },
      { kind: "textarea", id: "accreditations", label: "Industry bodies, associations or accreditations", ph: "e.g. PIRB registered" },
      { kind: "group", id: "g2-profiles", label: "Online profiles", hint: "Paste the full link to each one you have." },
      { kind: "url", id: "pGoogle", label: "Google Business Profile", span: 3, ph: "https://g.page/…" },
      { kind: "url", id: "pFacebook", label: "Facebook page", span: 3, ph: "https://facebook.com/…" },
      { kind: "url", id: "pInstagram", label: "Instagram", span: 3, ph: "https://instagram.com/…" },
      { kind: "url", id: "pLinkedIn", label: "LinkedIn", span: 3, ph: "https://linkedin.com/company/…" },
      { kind: "url", id: "pTikTok", label: "TikTok", span: 3, ph: "https://tiktok.com/@…" },
      { kind: "url", id: "pYouTube", label: "YouTube", span: 3, ph: "https://youtube.com/@…" },
      { kind: "textarea", id: "pOther", label: "Other profiles or directory listings", ph: "e.g. Snupit, Yellow Pages" },
    ],
  },
  {
    n: 3,
    key: "offer",
    name: "What you do",
    title: "What you do",
    intro: "Your offer in your own words. This becomes the backbone of your homepage and services pages.",
    minutes: 10,
    why: "We write and structure your pages from these answers. The clearer the “what makes you different”, the stronger your homepage.",
    fields: [
      { kind: "textarea", id: "whatYouDo", label: "In one or two sentences, what do you do and for whom?", req: true },
      { kind: "textarea", id: "story", label: "Your story: how and why did the business start?", ph: "A few lines is plenty" },
      { kind: "textarea", id: "different", label: "What makes you different from the alternatives?", req: true },
      {
        kind: "repeat",
        id: "services",
        label: "Your services or products",
        hint: "Add each one you want on the website.",
        item: "Service",
        add: "Add another service",
        req: true,
        fields: [
          { kind: "text", id: "name", label: "Name", req: true, span: 3, ph: "Name" },
          { kind: "text", id: "price", label: "Price or “from” price", span: 3, ph: "e.g. from R8 500" },
          { kind: "textarea", id: "what", label: "What it is and what’s included", ph: "Describe it in a sentence or two" },
          { kind: "text", id: "who", label: "Who it’s for", span: 3 },
          { kind: "select", id: "importance", label: "How important is it to your business?", span: 3, options: ["Most important", "Important", "Less important"] },
        ],
      },
      { kind: "textarea", id: "threeThings", label: "If visitors remember only three things about you, what should they be?" },
      {
        kind: "repeat",
        id: "awards",
        label: "Awards, certifications and qualifications",
        item: "Award",
        add: "Add another award or certification",
        fields: [
          { kind: "text", id: "what", label: "What it is", span: 3 },
          { kind: "text", id: "year", label: "Year", span: 3 },
          { kind: "radio", id: "show", label: "OK to show it?", cols: 2, options: o("Show on the website", "Keep it private") },
        ],
      },
      { kind: "textarea", id: "numbers", label: "Numbers you’re proud of, that you can back up", hint: "Only numbers you could prove if asked." },
      { kind: "textarea", id: "guarantees", label: "Guarantees, warranties or promises", span: 3 },
      { kind: "textarea", id: "clients", label: "Well-known clients or partners we may name", span: 3, ph: "Only with their permission" },
    ],
  },
  {
    n: 4,
    key: "goals",
    name: "Goals",
    title: "Goals for the project",
    intro: "What success looks like, so every design decision can be measured against it.",
    minutes: 5,
    why: "Your answers here become the yardstick for the whole project. When we propose a layout or feature, we’ll show how it serves these goals.",
    noHelp: true,
    fields: [
      { kind: "quote", id: "quote" },
      {
        kind: "checks",
        id: "workingOn",
        label: "What are you working with us on?",
        req: true,
        helper: "Pre-ticked from your quote. Add anything else you’re considering.",
        options: ["A new website", "A redesign of our current website", "Full Service (monthly)", "A monthly Care Plan", "SEO and content", "Google Ads", "Meta Ads", "A new brand (logo and identity)", "A refresh of our existing brand", "Not sure yet"],
      },
      {
        kind: "checks",
        id: "achieve",
        label: "What must the website achieve?",
        req: true,
        helper: "Tick all that apply.",
        options: ["Get more enquiries", "Get bookings or appointments", "Sell products online", "Build credibility and trust", "Show our work", "Inform and educate", "Recruit staff", "Support existing customers"],
      },
      {
        kind: "radio",
        id: "oneAction",
        label: "The ONE action you most want a visitor to take",
        req: true,
        hint: "Everything on the site will lead here.",
        cols: 2,
        options: od(["Call us", "Tap-to-call on mobile"], ["WhatsApp us", "Start a chat"], ["Fill in a contact form", "Send an enquiry"], ["Request a quote", "Describe the job"], ["Book online", "Choose a time"], ["Buy online", "Checkout on the site"], ["Visit our premises", "Get directions"], ["Sign up or subscribe", "Join a list"]),
      },
      { kind: "checks", id: "otherActions", label: "Other actions that also matter", options: [...OTHER_ACTIONS, "Follow us on social media"] },
      { kind: "textarea", id: "success", label: "In 12 months, how will you know the website is working?" },
      { kind: "text", id: "currentLeads", label: "Roughly how many enquiries or sales come from the internet each month now?", ph: "A rough guess is fine", hint: "This becomes the starting point we measure against." },
      {
        kind: "checks",
        id: "findYou",
        label: "How do customers find you today?",
        options: ["Google search", "Google Maps", "Word of mouth and referrals", "Facebook", "Instagram", "TikTok", "LinkedIn", "Online directories", "Signage and walk-ins", "Advertising"],
      },
      { kind: "group", id: "g4-timing", label: "Timing" },
      { kind: "date", id: "launchDate", label: "Ideal launch date", span: 3 },
      { kind: "text", id: "launchWhy", label: "What’s happening on that date?", span: 3, show: [{ id: "launchFixed", eq: "Fixed" }] },
      {
        kind: "radio",
        id: "launchFixed",
        label: "How fixed is that date?",
        cols: 3,
        options: od(["Fixed", "There’s an event or launch"], ["Preferred", "A target we’d like to hit"], ["Flexible", "Whenever it’s ready"]),
      },
    ],
  },
  {
    n: 5,
    key: "customers",
    name: "Your customers",
    title: "Your customers",
    intro: "Who you serve, and what they need to hear before they choose you.",
    minutes: 6,
    why: "Pages that speak to a specific customer convert far better than pages written for everyone. Your FAQs also become a page Google can show in search.",
    fields: [
      {
        kind: "repeat",
        id: "customerTypes",
        label: "Your main types of customer",
        hint: "Add up to four. Think of the people who bring in most of your work.",
        item: "Customer type",
        add: "Add another customer type",
        req: true,
        max: 4,
        fields: [
          { kind: "text", id: "who", label: "Who are they?", req: true },
          { kind: "textarea", id: "needs", label: "What do they need from you?", span: 3 },
          { kind: "textarea", id: "worries", label: "What worries them or makes them hesitate?", span: 3 },
          { kind: "text", id: "decide", label: "What makes them decide to buy?", span: 3 },
          { kind: "text", id: "where", label: "Where are they? (area, age, online habits)", span: 3 },
        ],
      },
      { kind: "checks", id: "languages", label: "Languages your customers speak", options: ["English", "Afrikaans", "isiZulu", "isiXhosa", "Sesotho", "Setswana"] },
      {
        kind: "radio",
        id: "multilingual",
        label: "Should the website be in more than one language?",
        cols: 3,
        options: od(["English only"], ["English plus another language", "Extra languages are R5 000 each"], ["Not sure", "We’ll advise"]),
      },
      {
        kind: "repeat",
        id: "faqs",
        label: "Questions customers always ask, with your answers",
        hint: "These become your FAQ section.",
        item: "Question",
        add: "Add another question",
        fields: [
          { kind: "text", id: "q", label: "Question" },
          { kind: "textarea", id: "a", label: "Your answer" },
        ],
      },
    ],
  },
  {
    n: 6,
    key: "inspiration",
    name: "Competitors & inspiration",
    title: "Competitors and inspiration",
    intro: "Who you’re up against, and the kind of websites you like (and don’t).",
    minutes: 6,
    why: "Seeing what you like and dislike saves whole rounds of design revisions. Competitors show us where your site can stand out.",
    fields: [
      {
        kind: "repeat",
        id: "competitors",
        label: "Your main competitors",
        item: "Competitor",
        add: "Add another competitor",
        fields: [
          { kind: "text", id: "name", label: "Name", span: 3 },
          { kind: "url", id: "site", label: "Website", span: 3, ph: "https://…" },
          { kind: "textarea", id: "good", label: "What do they do well online?", span: 3 },
          { kind: "textarea", id: "weak", label: "Where are they weak?", span: 3 },
        ],
      },
      {
        kind: "repeat",
        id: "liked",
        label: "Websites you like",
        hint: "Any industry. Tell us what exactly you like.",
        item: "Website",
        add: "Add another website you like",
        fields: [
          { kind: "url", id: "site", label: "Website", ph: "https://…" },
          { kind: "textarea", id: "why", label: "What exactly do you like about it?" },
        ],
      },
      {
        kind: "repeat",
        id: "disliked",
        label: "Websites you don’t like",
        item: "Website",
        add: "Add another",
        fields: [
          { kind: "url", id: "site", label: "Website", ph: "https://…" },
          { kind: "textarea", id: "why", label: "What don’t you like?", ph: "e.g. too busy, pop-ups everywhere" },
        ],
      },
      {
        kind: "checks",
        id: "feel",
        label: "How should your website feel?",
        helper: "Pick up to five.",
        max: 5,
        options: ["Professional", "Friendly", "Bold", "Calm", "Premium", "Playful", "Modern", "Classic", "Warm", "Minimal", "Energetic", "Trustworthy", "Natural and earthy", "Technical and expert"],
      },
      { kind: "textarea", id: "notFeel", label: "How should it definitely NOT feel?" },
    ],
  },
  {
    n: 7,
    key: "brand",
    name: "Your brand",
    title: "Your brand",
    intro: "Logos, colours and fonts, so the site looks unmistakably like you.",
    minutes: 8,
    why: "We match your existing brand exactly. If anything is missing, we’ll pick colours and fonts that fit your logo and show you before we use them.",
    fields: [
      {
        kind: "radio",
        id: "brandState",
        label: "Where is your brand at?",
        req: true,
        cols: 2,
        options: od(["Complete brand", "Logo, colours, fonts and guidelines"], ["Logo only", "No full brand guide"], ["New brand", "It’s part of our project"], ["Brand refresh", "Refresh our existing brand"]),
      },
      { kind: "files", id: "logos", label: "Upload your logo files", req: true, hint: "SVG, AI, EPS or PDF are best. High-resolution PNG works too. Max 50 MB per file." },
      { kind: "files", id: "brandGuide", label: "Brand guide or style guide", compact: true, sub: "PDF or images", show: [{ id: "brandState", in: ["Complete brand", "Brand refresh"] }] },
      { kind: "colors", id: "colors", label: "Your brand colours", hint: "Paste a hex code, or pick a colour from your logo." },
      { kind: "text", id: "headingFont", label: "Font used for headings", span: 3, ph: "e.g. Montserrat", hint: "Not sure? Leave it; we’ll identify it from your logo." },
      { kind: "text", id: "bodyFont", label: "Font used for body text", span: 3, ph: "e.g. Open Sans" },
      { kind: "radio", id: "fontSource", label: "Where do your fonts come from?", cols: 2, options: o("Google Fonts (free)", "Adobe Fonts", "We bought a licence", "Don’t know") },
      { kind: "files", id: "fontFiles", label: "Font files", compact: true, sub: "OTF, TTF or WOFF", show: [{ id: "fontSource", eq: "We bought a licence" }] },
      { kind: "text", id: "tagline", label: "Tagline or slogan, if you have one" },
      { kind: "textarea", id: "brandRules", label: "Brand rules we must follow, or things never to do", ph: "e.g. never stretch the logo; never use red" },
      { kind: "radio", id: "nameFinal", label: "Is your business name final?", cols: 2, options: o("Yes", "No, we’d like help with naming"), show: [{ id: "brandState", eq: "New brand" }] },
      { kind: "textarea", id: "nameStory", label: "Story or meaning behind the name", span: 3, show: [{ id: "brandState", in: ["New brand", "Brand refresh"] }] },
      { kind: "textarea", id: "logoIdeas", label: "Ideas or symbols for the logo", span: 3, show: [{ id: "brandState", in: ["New brand", "Brand refresh"] }] },
      { kind: "text", id: "loveColours", label: "Colours you love", span: 3, show: [{ id: "brandState", in: ["New brand", "Brand refresh"] }] },
      { kind: "text", id: "avoidColours", label: "Colours to avoid", span: 3, show: [{ id: "brandState", in: ["New brand", "Brand refresh"] }] },
      {
        kind: "repeat",
        id: "admired",
        label: "Logos or brands you admire",
        item: "Brand",
        add: "Add another brand",
        show: [{ id: "brandState", in: ["New brand", "Brand refresh"] }],
        fields: [
          { kind: "text", id: "brand", label: "Brand name or link", span: 3 },
          { kind: "text", id: "like", label: "What you like", span: 3 },
        ],
      },
      {
        kind: "checks",
        id: "logoUses",
        label: "Where must your logo work?",
        options: ["Website", "Social profile picture", "Signage", "Vehicle branding", "Uniforms and embroidery", "Packaging and labels", "Business cards and stationery", "Merchandise"],
        show: [{ id: "brandState", in: ["New brand", "Brand refresh"] }],
      },
    ],
  },
  {
    n: 8,
    key: "content",
    name: "Pages & content",
    title: "Website pages and content",
    intro: "The pages, words, photos and proof that go on your site.",
    minutes: 12,
    why: "Content is the most common reason websites launch late. Telling us early what exists, and who writes the rest, keeps your timeline on track.",
    fields: [
      { kind: "url", id: "currentSite", label: "Your current website, if you have one", ph: "https://…" },
      { kind: "textarea", id: "keep", label: "What should we keep from your current website?", span: 3, show: [{ id: "currentSite", filled: true }] },
      { kind: "textarea", id: "change", label: "What should we change or remove?", span: 3, show: [{ id: "currentSite", filled: true }] },
      {
        kind: "checks",
        id: "pages",
        label: "Which pages do you think you need?",
        helper: "__PAGES__",
        options: ["Home", "About us", "Services (one page)", "Services (a page each)", "Products", "Portfolio or gallery", "Testimonials and reviews", "Team", "Pricing", "FAQ", "Blog or news", "Contact", "Bookings", "Careers", "Locations or branches"],
      },
      { kind: "textarea", id: "pageNotes", label: "Anything specific about any page?", ph: "e.g. the gallery should be sorted by job type" },
      {
        kind: "radio",
        id: "writer",
        label: "Who will write the website text?",
        req: true,
        cols: 3,
        options: od(["GoodGround writes it", "From this brief (copywriting add-on)"], ["I’ll supply the text", "We’ll edit it for the web"], ["A mix", "I’ll supply some, you write the rest"]),
      },
      { kind: "files", id: "existingText", label: "Existing text to reuse", compact: true, sub: "Word documents, PDFs, brochures, menus" },
      {
        kind: "radio",
        id: "photos",
        label: "Photos for the website",
        req: true,
        cols: 3,
        options: od(["Professional photos", "We have them"], ["Some photos", "Phone or amateur"], ["Stock photos", "We need them"], ["Book a photographer", "We’d like to"], ["Not sure", "We’ll advise"]),
      },
      { kind: "files", id: "photoFiles", label: "Upload photos of your team, premises, work and products", compact: true, sub: "Drag files here, or browse · max 50 MB each" },
      { kind: "url", id: "mediaLink", label: "A big photo or video collection? Paste a link", span: 3, ph: "Google Drive, Dropbox or WeTransfer" },
      { kind: "textarea", id: "videoLinks", label: "Video links to feature", span: 3, ph: "YouTube or Vimeo" },
      {
        kind: "repeat",
        id: "testimonials",
        label: "Testimonials",
        item: "Testimonial",
        add: "Add another testimonial",
        fields: [
          { kind: "textarea", id: "said", label: "What they said" },
          { kind: "text", id: "name", label: "Their name", span: 3 },
          { kind: "text", id: "role", label: "Role, company or town", span: 3 },
          { kind: "radio", id: "agreed", label: "Agreed to be quoted?", cols: 2, options: od(["Yes, they agreed to be quoted"], ["Not yet", "We’ll ask before launch"]) },
        ],
      },
      { kind: "url", id: "reviewsLink", label: "Link to your Google or other reviews", ph: "https://…" },
      {
        kind: "repeat",
        id: "projects",
        label: "Projects or case studies to feature",
        hint: "Optional. Great for the portfolio page.",
        item: "Project",
        add: "Add another project",
        fields: [
          { kind: "text", id: "name", label: "Project name", span: 3 },
          { kind: "text", id: "client", label: "Client (if they agreed to be named)", span: 3, ph: "Leave blank to keep private" },
          { kind: "textarea", id: "result", label: "What you did, and the result" },
          { kind: "url", id: "link", label: "Link", ph: "https://…" },
        ],
      },
      {
        kind: "repeat",
        id: "team",
        label: "Team members to show on the website",
        hint: "Optional.",
        item: "Team member",
        add: "Add another team member",
        fields: [
          { kind: "text", id: "name", label: "Name", span: 3 },
          { kind: "text", id: "role", label: "Role", span: 3 },
          { kind: "textarea", id: "bio", label: "Short bio", ph: "One or two sentences" },
        ],
      },
      { kind: "files", id: "downloads", label: "Files visitors should be able to download", compact: true, sub: "Price lists, menus, brochures · optional" },
    ],
  },
  {
    n: 9,
    key: "features",
    name: "Features & tools",
    title: "Features and tools",
    intro: "What the site needs to do, and the tools it should connect to.",
    minutes: 6,
    why: "Features shape both the build and your quote. If you tick something that isn’t in your quote, we’ll talk it through before we start.",
    fields: [
      { kind: "text", id: "enquiryEmails", label: "Which email address(es) should website enquiries go to?", req: true, hint: "Separate several addresses with commas." },
      {
        kind: "checks",
        id: "features",
        label: "Which of these do you need?",
        options: ["Contact form", "Click-to-call button", "WhatsApp button", "Online booking", "Quote request form", "Newsletter sign-up", "Google Map", "Show our Google reviews", "Instagram or social feed", "Blog", "Online payments", "Online shop", "Live chat", "Client login area", "Job applications", "Multiple languages"],
      },
      { kind: "note", id: "n9-quote", tone: "mint", icon: "info", text: "Anything you tick that isn’t included in your quote is flagged before we start (“may change your quote”)." },
      { kind: "text", id: "bookingSystem", label: "Which booking system do you use or prefer?", show: [{ id: "features", includes: "Online booking" }] },
      { kind: "text", id: "newsletterTool", label: "Which newsletter tool do you use?", show: [{ id: "features", includes: "Newsletter sign-up" }] },
      { kind: "text", id: "paymentProvider", label: "Which payment provider do you use or prefer?", show: [{ id: "features", includesAny: ["Online payments", "Online shop"] }] },
      { kind: "text", id: "crm", label: "Do you use a CRM or customer database?", ph: "e.g. HubSpot, a spreadsheet, none" },
      { kind: "checks", id: "setUp", label: "Do you already have any of these set up?", options: ["Google Analytics", "Google Search Console", "Google Tag Manager", "Google Business Profile", "Meta (Facebook) Pixel", "Don’t know"] },
      { kind: "textarea", id: "searchTerms", label: "What would you type into Google to find a business like yours?" },
      { kind: "textarea", id: "targetTowns", label: "Which towns, suburbs or regions should we target?", span: 3 },
      { kind: "textarea", id: "mustDo", label: "Anything else the website must do?", span: 3, ph: "Anything we haven’t asked" },
    ],
  },
  {
    n: 10,
    key: "access",
    name: "Domain, hosting & access",
    title: "Domain, hosting and access",
    intro: "Where your domain, website and email live today, and who can log in.",
    minutes: 5,
    why: "A smooth move to your new site depends on getting into the right accounts. We only ask who has access here; the actual access happens later, securely.",
    fields: [
      { kind: "note", id: "n10-passwords", tone: "blush", icon: "lock", text: "Never type passwords here. After you send the brief, we’ll email you a secure way to give us access to the accounts you tick below." },
      { kind: "text", id: "domains", label: "Your domain name(s)", req: true, hint: "Add every domain you own, separated by commas.", ph: "e.g. yourbusiness.co.za" },
      {
        kind: "select",
        id: "domainRegistrar",
        label: "Where is your domain registered?",
        span: 3,
        hint: "Choose from the list, or “Don’t know”.",
        options: ["Domains.co.za", "Afrihost", "Xneelo", "Hetzner", "GoDaddy", "Hostinger", "1-grid", "Register Domain SA", "Cloudflare", "Google or Squarespace Domains", "Other", "Don’t know"],
      },
      {
        kind: "select",
        id: "currentHost",
        label: "Where is your current website hosted?",
        span: 3,
        hint: "Choose from the list.",
        options: ["Xneelo", "Afrihost", "Hetzner", "Domains.co.za", "Hostinger", "GoDaddy", "SiteGround", "Wix/Squarespace/Shopify", "Other", "No website yet", "Don’t know"],
      },
      { kind: "radio", id: "domainLogin", label: "Who can log in to manage your domain?", req: true, cols: 2, options: od(["Me or someone in my business"], ["Our previous web developer"], ["Our IT company"], ["I don’t know", "We’ll help you find out"]) },
      { kind: "select", id: "builtWith", label: "What is your current website built with?", span: 3, options: ["WordPress", "Wix", "Squarespace", "Shopify", "Webflow", "Custom-built", "No website yet", "Don’t know"] },
      { kind: "select", id: "emailProvider", label: "Who provides your business email?", req: true, span: 3, options: ["Google Workspace (Gmail)", "Microsoft 365", "Email from our web host", "Personal Gmail/Outlook.com", "Other", "Don’t know"] },
      { kind: "textarea", id: "prevDeveloper", label: "Previous developer’s name and contact details, if we need a handover" },
      { kind: "radio", id: "updater", label: "Who will update the website after launch?", req: true, cols: 2, options: od(["Me"], ["Someone on my team"], ["GoodGround", "On a Care Plan or Full Service"], ["It will rarely need updating"]) },
      { kind: "radio", id: "comfort", label: "How comfortable is that person with editing websites?", cols: 3, options: o("Very comfortable", "Some experience", "Beginner"), show: [{ id: "updater", in: ["Me", "Someone on my team"] }] },
      {
        kind: "checks",
        id: "accessCan",
        label: "Which of these can you give us access to?",
        helper: "We’ll send step-by-step instructions for each.",
        options: ["Domain / DNS", "Hosting account", "Current website admin", "Google Business Profile", "Google Search Console", "Google Analytics", "Facebook and Instagram business accounts", "I’ll need help with all of this"],
      },
    ],
  },
  {
    n: 11,
    key: "legal",
    name: "Legal & privacy",
    title: "Legal and privacy",
    intro: "What your site needs to stay on the right side of POPIA and your industry’s rules.",
    minutes: 6,
    why: "South African law (POPIA) requires a named Information Officer and a privacy policy for any site that collects personal information, which every contact form does.",
    fields: [
      { kind: "text", id: "infoOfficer", label: "Your Information Officer under POPIA: name and email", req: true, ph: "e.g. Thandi Mokoena, thandi@business.co.za", hint: "Usually the owner or managing director." },
      { kind: "radio", id: "regulator", label: "Is your Information Officer registered with the Information Regulator?", cols: 3, options: od(["Yes"], ["No", "We can point you to how"], ["Don’t know"]) },
      { kind: "files", id: "policyFiles", label: "Existing privacy policy, terms or disclaimers", compact: true, sub: "PDF or Word · optional" },
      { kind: "url", id: "policyLink", label: "Or a link to them", ph: "https://…" },
      { kind: "textarea", id: "personalInfo", label: "What personal information will your website forms collect?" },
      { kind: "radio", id: "sellOnline", label: "Will you sell or take payment online?", cols: 3, options: o("Yes", "No", "Maybe later") },
      { kind: "note", id: "n11-sell", tone: "mint", icon: "info", text: "Returns, refunds and delivery questions appear only if you sell online.", show: [{ id: "sellOnline", ne: "Yes" }] },
      { kind: "textarea", id: "returns", label: "Your returns, refunds and cancellation policy", req: true, show: [{ id: "sellOnline", eq: "Yes" }] },
      { kind: "textarea", id: "delivery", label: "Delivery areas, time frames and costs", show: [{ id: "sellOnline", eq: "Yes" }] },
      { kind: "textarea", id: "bookingPolicy", label: "Your booking cancellation policy", hint: "Shown because you ticked Online booking in Features.", show: [{ id: "features", includes: "Online booking" }] },
      {
        kind: "checks",
        id: "regulated",
        label: "Is your industry regulated?",
        options: ["Financial services (FSCA / FAIS)", "Health (HPCSA or another council)", "Legal (LPC)", "Property (PPRA)", "Alcohol or gambling", "Education", "No, or not sure"],
      },
      { kind: "textarea", id: "disclaimers", label: "Disclaimers your regulator requires", show: [{ id: "regulated", includesAny: ["Financial services (FSCA / FAIS)", "Health (HPCSA or another council)", "Legal (LPC)", "Property (PPRA)", "Alcohol or gambling", "Education"] }] },
      { kind: "radio", id: "children", label: "Is the website aimed at children (under 18)?", cols: 2, options: o("No", "Yes") },
      { kind: "radio", id: "marketing", label: "Do you send marketing emails or SMSes?", cols: 3, options: o("Yes, only to people who opted in", "Yes", "Not yet") },
    ],
  },
  {
    n: 12,
    key: "else",
    name: "Anything else",
    title: "Anything else",
    intro: "The last few things that help the project run smoothly.",
    minutes: 4,
    why: "This is where the useful surprises come out: a busy season, a past bad experience, a file you forgot. Nothing is too small.",
    primary: "Save and review",
    fields: [
      { kind: "textarea", id: "dates", label: "Important dates during the project" },
      { kind: "textarea", id: "worries", label: "Anything you’re worried about with this project?" },
      { kind: "textarea", id: "past", label: "What went well or badly with past websites or agencies?" },
      { kind: "textarea", id: "anything", label: "Anything else we should know?", ph: "Anything at all" },
      { kind: "files", id: "otherFiles", label: "Any other files you’d like to share", compact: true, sub: "Optional · max 50 MB each" },
      { kind: "note", id: "n12-next", tone: "mint", icon: "info", text: "Next: review everything, see what’s missing, and send. You can still send with gaps." },
    ],
  },
];

/** Time to read the brief out loud, for the Welcome card. */
export const estimatedMinutes = steps.reduce((sum, s) => sum + s.minutes, 0);

export const STEP_COUNT = steps.length;
