import { buildTime } from "@/content/pricing";
import { site } from "@/content/site";

import type { IconName } from "../Icon";

/**
 * /legal (Figma 69:151 Privacy, 71:163 Terms draft, 72:190 mobile).
 *
 * The Legal notice wording is the live text (app/(site)/legal, before this rebuild). The Privacy
 * policy wording is the Figma text, which is the live policy lightly shortened with the meaning
 * unchanged. The Terms view is plain-language summaries that restate what the site already
 * promises; sections 09, 13 and 15 only point to the signed contract because no wording for them
 * has been supplied. Nothing legal is invented here. The Terms went live on
 * 27 Oct 2026 (`termsLive`).
 */
export const termsLive = true;

/** "Last updated": changed only when the wording changes (README: from the CMS). */
export const lastUpdated = { notice: "27 OCT 2026", privacy: "4 NOV 2026", terms: "4 NOV 2026" } as const;
export const lastUpdatedShort = "4 NOV 2026";

export type DocKey = "notice" | "privacy" | "terms";

export const docs: { key: DocKey; label: string; short: string }[] = [
  { key: "notice", label: "Legal notice", short: "Notice" },
  { key: "privacy", label: "Privacy policy", short: "Privacy" },
  ...(termsLive ? [{ key: "terms" as const, label: "Terms & conditions", short: "Terms" }] : []),
];

export const company = {
  rows: [
    { label: "REGISTERED COMPANY NAME", value: site.legalName },
    { label: "TRADING AS", value: site.name },
    { label: "REGISTRATION NUMBER", value: site.registrationNumber, copy: true },
    { label: "FOUNDED", value: site.foundingDate },
    {
      label: "REGISTERED LOCATION",
      value: `${site.address.locality}, ${site.address.area}, ${site.address.region}, South Africa`,
    },
    {
      label: "VAT STATUS",
      value: site.vatRegistered ? "VAT registered" : "Not VAT registered, so no VAT is added to our prices",
    },
  ],
  /** POPIA expects the Information Officer's name and contact details. Shown in coral until supplied. */
  informationOfficer: { name: "Xander Saayman", email: "xander@goodground.co.za" } as null | { name: string; email: string },
};

export type Block =
  | { t: "p"; text: string }
  | { t: "note"; text: string }
  | { t: "banner"; text: string }
  | { t: "chips"; lead: string; items: string[] }
  | { t: "callout"; text: string }
  | { t: "providers" }
  | { t: "rights" }
  | { t: "cookies" };

export type Section = {
  /** Anchor id. Live ids (sec-collection, sec-rights, sec-cookies …) keep working. */
  id: string;
  n: string;
  title: string;
  /** Contents-list label when shorter than the title. */
  label?: string;
  blocks: Block[];
};

/* ---- Legal notice ------------------------------------------------------------------------ */
export const noticeSections: Section[] = [
  {
    id: "sec-notice",
    n: "01",
    title: "Legal notice",
    blocks: [
      {
        t: "p",
        text: `${site.legalName}, trading as ${site.name}, is a website design and development studio committed to transparency, data protection, and responsible use of information.`,
      },
      {
        t: "banner",
        text: "By accessing or using this website, you confirm that you have read, understood, and accepted this legal notice and privacy policy. If you do not agree with these terms, you must stop using the website immediately.",
      },
      {
        t: "p",
        text: "GoodGround reserves the right to update or modify this legal notice at any time without prior notice. Updates become effective immediately upon publication.",
      },
      { t: "p", text: "Continued use of the website after updates confirms your acceptance of the revised terms." },
    ],
  },
];

/* ---- Privacy policy ---------------------------------------------------------------------- */
export const shortVersion: { icon: IconName; title: string; copy: string }[] = [
  { icon: "ban", title: "We never sell your data", copy: "Not to anyone, ever." },
  { icon: "cookie", title: "Analytics only if you say yes", copy: "Nothing loads until you accept." },
  { icon: "spark", title: "AI helps; people decide", copy: "Every AI-assisted output is reviewed by our team." },
  { icon: "user", title: "Your data, your rights", copy: "Ask to see, fix or delete it any time." },
];

export const privacySections: Section[] = [
  {
    id: "sec-privacy",
    n: "02",
    title: "Privacy policy",
    blocks: [
      {
        t: "p",
        text: "We take your privacy seriously. This section explains how we collect, use, store and protect your personal information in line with applicable laws, including the Protection of Personal Information Act (POPIA).",
      },
    ],
  },
  {
    id: "sec-collection",
    n: "03",
    title: "Data collection",
    blocks: [
      { t: "p", text: "We only collect personal data that is necessary to deliver our services and improve your experience." },
      {
        t: "chips",
        lead: "You may provide information when you:",
        items: [
          "Submit a contact or project form",
          "Request a quote or proposal",
          "Request a free AI visibility check",
          "Subscribe to updates",
          "Apply for a job",
          "Communicate with us directly",
        ],
      },
      {
        t: "chips",
        lead: "Personal data collected may include:",
        items: [
          "Full name",
          "Email address",
          "Phone number",
          "Company or business name",
          "Project details and requirements",
          "Anything else you choose to share",
        ],
      },
      {
        t: "note",
        text: "Providing this information is voluntary. If required information is not provided, we may not be able to deliver certain services.",
      },
    ],
  },
  {
    id: "sec-use",
    n: "04",
    title: "How we use your data",
    blocks: [
      {
        t: "chips",
        lead: "We use your data to:",
        items: [
          "Respond to enquiries",
          "Deliver services and manage projects",
          "Improve our website and services",
          "Analyse site performance",
          "Send updates or marketing, with your consent",
        ],
      },
      {
        t: "note",
        text: "We process your data based on legitimate business interests, contractual necessity, or your explicit consent.",
      },
    ],
  },
  {
    id: "sec-ai",
    n: "05",
    title: "Artificial intelligence (AI)",
    label: "Artificial intelligence (AI)",
    blocks: [
      {
        t: "p",
        text: "GoodGround uses AI tools to support how we deliver our services. AI is a productivity tool, not a replacement for human expertise or decision-making.",
      },
      {
        t: "chips",
        lead: "AI may assist with:",
        items: [
          "Content and copywriting",
          "Design concepts",
          "Website development",
          "Research and brainstorming",
          "Workflow automation",
          "Administrative support",
        ],
      },
      {
        t: "callout",
        text: "All AI-assisted work is reviewed, edited and approved by a member of the GoodGround team before it’s delivered or published. We don’t intentionally use confidential client information to train public AI models.",
      },
      {
        t: "p",
        text: "Free AI visibility check: if you request one, we process the public details of your business together with the contact details you give us. The AI providers we use to run the check process the business details. We keep the results of a check for 30 days, so a repeat request within that time gets the same report.",
      },
    ],
  },
  {
    id: "sec-nonpersonal",
    n: "06",
    title: "Non-personal data collection",
    label: "Non-personal data",
    blocks: [
      {
        t: "p",
        text: "We may automatically collect non-identifiable data to improve performance and find technical issues. It does not personally identify you.",
      },
      {
        t: "chips",
        lead: "This may include:",
        items: ["IP address", "Browser type and device", "Pages visited and time spent", "Referral sources"],
      },
    ],
  },
  {
    id: "sec-recruitment",
    n: "07",
    title: "Recruitment and candidate data",
    label: "Recruitment",
    blocks: [
      {
        t: "p",
        text: "If you apply for a role, we use your data to review your application, assess your experience, manage hiring and consider you for future roles. We keep it for up to 24 months unless you ask us to delete it sooner, and you can request access, correction or deletion at any time.",
      },
    ],
  },
  {
    id: "sec-sharing",
    n: "08",
    title: "Data sharing and third parties",
    label: "Data sharing",
    blocks: [
      {
        t: "p",
        text: "We do not sell, rent or trade your personal information. We share data only with trusted providers we need to run the business, and where the law requires it or to prevent fraud or security threats.",
      },
      { t: "providers" },
    ],
  },
  {
    id: "sec-international",
    n: "09",
    title: "International data transfers",
    label: "International transfers",
    blocks: [
      {
        t: "p",
        text: "As we work with global tools, your data may be processed outside South Africa. When it is, we make sure appropriate safeguards are in place and that it’s handled in line with applicable data protection laws.",
      },
    ],
  },
  {
    id: "sec-rights",
    n: "10",
    title: "Your rights under POPIA",
    label: "Your rights (POPIA)",
    blocks: [
      {
        t: "p",
        text: "You can exercise any of these rights by emailing us. We’ll respond within a reasonable time, and you can also complain to the Information Regulator of South Africa.",
      },
      { t: "rights" },
    ],
  },
  {
    id: "sec-retention",
    n: "11",
    title: "Data retention",
    blocks: [
      {
        t: "p",
        text: "We keep personal data only as long as we need it, depending on why it was collected, legal and regulatory requirements, and business needs. When it’s no longer needed, it’s securely deleted or anonymised.",
      },
    ],
  },
  {
    id: "sec-security",
    n: "12",
    title: "Data security",
    blocks: [
      {
        t: "p",
        text: "We take reasonable technical and organisational steps to protect your data: secure hosting, restricted access, encrypted connections and regular monitoring. No online system is completely secure, so you share information at your own risk.",
      },
    ],
  },
  {
    id: "sec-cookies",
    n: "13",
    title: "Cookies and tracking technologies",
    label: "Cookies",
    blocks: [
      {
        t: "p",
        text: "We use Google Analytics 4 to understand which pages visitors find useful. Its cookies only load if you accept them. Decline, and the analytics script is never loaded. The rest of the site works exactly the same either way. We don’t use advertising or cross-site tracking cookies.",
      },
      { t: "cookies" },
    ],
  },
  {
    id: "sec-links",
    n: "14",
    title: "Third-party links",
    blocks: [
      {
        t: "p",
        text: "Our website may link to other websites. We don’t control them and aren’t responsible for their content or policies, so please read their privacy policies before sharing personal data.",
      },
    ],
  },
  {
    id: "sec-minors",
    n: "15",
    title: "Minors",
    blocks: [
      {
        t: "p",
        text: "Our services aren’t intended for anyone under 16. We don’t knowingly collect personal data from minors without a parent’s or guardian’s consent, and we remove it promptly if we find any.",
      },
    ],
  },
  {
    id: "sec-updates",
    n: "16",
    title: "Updates to this policy",
    label: "Updates",
    blocks: [
      {
        t: "p",
        text: "We may update this legal notice and privacy policy from time to time. Changes are published on this page with a new “Last updated” date.",
      },
    ],
  },
  {
    id: "sec-contact",
    n: "17",
    title: "Contact",
    blocks: [],
  },
];

export const providers: { name: string; purpose: string; when: string; todo?: boolean }[] = [
  { name: "Google (Analytics 4)", purpose: "Analytics and performance", when: "Only after you accept cookies" },
  { name: "Afrihost", purpose: "Our email server: receiving and replying to enquiries sent through the forms", when: "When you contact us" },
  { name: "Afrihost", purpose: "Hosting and running this website", when: "Every visit" },
  { name: "OpenAI (ChatGPT)", purpose: "Answering the questions we ask for the free AI check, using the public details of your business", when: "Only if you request a free check" },
  { name: "Google (Gemini and Google AI)", purpose: "Answering the questions we ask for the free AI check, using the public details of your business", when: "Only if you request a free check" },
  { name: "Anthropic (Claude)", purpose: "Answering the questions we ask for the free AI check, using the public details of your business", when: "Only if you request a free check" },
];

export const rights: { key: string; icon: IconName; title: string; copy: string }[] = [
  { key: "Access", icon: "eye", title: "Access", copy: "See the personal data we hold about you" },
  { key: "Correct", icon: "pen", title: "Correct", copy: "Fix or update inaccurate data" },
  { key: "Delete", icon: "trash", title: "Delete", copy: "Ask us to delete your data" },
  { key: "Object or restrict", icon: "pause", title: "Object or restrict", copy: "Limit how we process it" },
  { key: "Withdraw consent", icon: "undo", title: "Withdraw consent", copy: "At any time, for anything you consented to" },
  { key: "Transfer", icon: "download", title: "Transfer", copy: "Get your data in a usable format" },
];

/* ---- Terms & conditions (design draft; shown only when termsLive) ------------------------- */
export type TermsSection = {
  id: string;
  n: string;
  title: string;
  summary: string;
  /** Full legal wording, when a section carries more than its plain-language summary. */
  wording?: string[];
  /** The subjects the section deals with, shown as a plain list under the summary. */
  topics?: string[];
};

export const termsSections: TermsSection[] = [
  {
    id: "terms-about",
    n: "01",
    title: "About these terms",
    summary:
      "These terms apply to every project and monthly service we provide. Your signed quote and contract sit alongside them; if they ever disagree, your signed contract wins.",
  },
  {
    id: "terms-quotes",
    n: "02",
    title: "Quotes and fixed prices",
    summary:
      "Every website project gets one fixed price before work begins. Package prices are starting points; your quote confirms the real number, and it doesn’t change once you accept it.",
  },
  {
    id: "terms-payment",
    n: "03",
    title: "Payment options",
    summary:
      "Pay a 50% deposit and 50% on completion, before handover; or 12 equal monthly instalments, where the first secures your booking and the other 11 start once the project is completed. The total is the same either way. This section is about custom website projects; monthly plans are covered in Section 17.",
  },
  {
    id: "terms-scope",
    n: "04",
    title: "Scope changes",
    summary:
      "We tell you before any change affects the price. Extra scope is quoted separately; we never adjust what you’ve already agreed to pay.",
  },
  {
    id: "terms-cancel",
    n: "05",
    title: "Pausing and cancelling a project",
    summary:
      "The project price is fixed. If you cancel partway through, the outstanding balance of the agreed price becomes payable, whichever payment option you chose. If you are paying a custom build over 12 instalments, Section 18 sets out what applies when you end it early. For a monthly plan, Section 17 sets out what applies when you cancel.",
  },
  {
    id: "terms-responsibilities",
    n: "06",
    title: "Your responsibilities",
    summary:
      "Supplying content, feedback and approvals on time, giving us the access we need, and making sure you have the right to use what you give us.",
  },
  {
    id: "terms-revisions",
    n: "07",
    title: "Revisions",
    summary: "Each package includes set revision rounds (Micro and Launch: 1, Grow: 2, Scale: 3). Extra rounds are R1 500 each.",
  },
  {
    id: "terms-timelines",
    n: "08",
    title: "Timelines",
    summary: "Timelines are estimates agreed at kick-off. Delays in content, feedback or access move the timeline, not the price.",
  },
  {
    id: "terms-ownership",
    n: "09",
    title: "Ownership and intellectual property",
    summary:
      "Who owns the site, code, designs and content, and when ownership passes, is set out in your signed quote and contract.",
  },
  {
    id: "terms-hosting",
    n: "10",
    title: "Hosting, domains and third-party services",
    summary:
      "Hosting, domains and email are arranged separately unless you’re on Full Service or a monthly Local plan. Third-party tools are governed by their own terms.",
  },
  {
    id: "terms-monthly",
    n: "11",
    title: "Monthly services",
    summary:
      "Care Plan (starts once your website is paid off): month to month, 30 days’ written notice to cancel. Full Service: month to month, cancel any time. Ad management: 30 days’ notice. Ad budgets are paid to Google or Meta and your ad accounts always belong to you.",
  },
  {
    id: "terms-ai",
    n: "12",
    title: "AI-assisted work",
    summary: "We use AI tools to work faster; a person on our team reviews and approves everything before it reaches you.",
  },
  {
    id: "terms-liability",
    n: "13",
    title: "Warranties and liability",
    summary: "What we guarantee, and the limits of our liability, are set out in your signed contract.",
  },
  {
    id: "terms-confidentiality",
    n: "14",
    title: "Confidentiality and personal information",
    summary:
      "We keep your business information confidential and handle personal information as described in our Privacy policy.",
  },
  {
    id: "terms-disputes",
    n: "15",
    title: "Disputes and governing law",
    summary: "South African law applies. How disagreements are resolved is set out in your signed contract.",
  },
  {
    id: "terms-changes",
    n: "16",
    title: "Changes to these terms",
    summary: "We may update these terms; changes apply to new quotes, never to a contract you’ve already signed.",
  },
  // Added 4 Nov 2026. Sections 01 to 16 keep their numbers and anchors, so these two follow them.
  {
    id: "terms-local-plans",
    n: "17",
    title: "Monthly plans",
    summary:
      `A Local Start, Local Plus or Local Pro plan runs for 12 months. A deposit of one month’s fee starts the build. We build the site in ${buildTime} once the deposit is paid and your onboarding brief is in. If you cancel the plan during the 12 months, you are liable to pay the outstanding amount of the website’s full price, and you take over ownership of your hosting, your domain and everything that goes with it. The New Business Offer gives a new business its first month free and a business mailbox free for 12 months, for two new businesses a month. You still pay the one-month deposit to start, and it is credited against your second month, which is your first paid month. We work to improve the signals that search engines and AI assistants read, but we do not guarantee that any AI assistant will recommend your business or where it ranks.`,
  },
  {
    id: "terms-early-exit",
    n: "18",
    title: "Ending a 12-instalment build early",
    summary:
      "If you end a custom build that you are paying over 12 instalments before it is fully paid, any early-exit charge is limited to the value of the work done that has not yet been paid for. You never owe the remaining monthly instalments just because you stop early.",
  },
];

export const docOf = (id: string): DocKey | null => {
  if (noticeSections.some((s) => s.id === id)) return "notice";
  if (privacySections.some((s) => s.id === id)) return "privacy";
  if (termsLive && termsSections.some((s) => s.id === id)) return "terms";
  return null;
};
