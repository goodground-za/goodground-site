import type { IconName } from "../Icon";

/**
 * Structured copy for the Service detail template (Figma 95:159 SEO, 98:201).
 *
 * SEO is written exactly as drawn. The other four use their live copy
 * (content/servicePages.ts) wherever the template has a slot for it; the slots
 * the live copy has no equivalent for (short problem lines, short "included"
 * titles, the "bolted on vs built in" lists and the hero-visual wording) are
 * DRAFTS written from the live paragraphs and are listed in
 * tasks/figma-redesign-questions.md for the owner to approve.
 */

export type Problem = { title: string; body: string; short: string; icon: IconName };
export type Included = { title: string; body: string; icon: IconName; tint: "mint" | "lilac" | "blush" };
export type AddOn = { kicker: string; title: string; shortTitle: string; body: string; from: string; note: string; cta: string; href: string };

export type ServiceView = {
  slug: "seo" | "website-redesign" | "ux-design" | "google-ads" | "meta-ads";
  /** Breadcrumb pill + "Pairs well with" name. */
  name: string;
  visual: "seo" | "redesign" | "ux" | "google" | "meta";
  /** Number words for the included heading ("Nine things every GoodGround site gets right."). */
  problemsHeading: string;
  problemsSub: string;
  includedHeading: string;
  includedLinkRef: string;
  problems: Problem[];
  included: Included[];
  approach: {
    heading: string;
    badLabel: string;
    goodLabel: string;
    bad: string[];
    good: string[];
    goodShort: string[];
  };
  addOn?: AddOn;
  faqHeading: string;
  /** First-answer wording used on the page (Figma), if it differs from the live copy. */
  faqFirstAnswer?: { long: string; short: string };
  relatedHeading: string;
};

const TINTS = ["mint", "lilac", "blush"] as const;
const tint = (i: number) => TINTS[i % 3];

export const SERVICE_VIEWS: Record<ServiceView["slug"], ServiceView> = {
  seo: {
    slug: "seo",
    name: "SEO",
    visual: "seo",
    problemsHeading: "Most SEO problems aren’t exotic.",
    problemsSub:
      "They’re ordinary things done wrong or skipped entirely. Fixing the ordinary things properly does more for most small businesses than any exotic tactic.",
    includedHeading: "Nine things every GoodGround site gets right.",
    includedLinkRef: "/services#seo",
    problems: [
      {
        title: "The site is invisible for the exact searches that matter",
        body: "A business with no local SEO can lose the customer to a competitor with a worse product and a better-structured website, simply because Google could read one site and not the other.",
        short: "A competitor with a worse product and a better-structured site gets the customer.",
        icon: "search",
      },
      {
        title: "Technical debt quietly caps how high you can rank",
        body: "Slow load times and messy page structure hold a site back no matter how good the content is. No amount of extra content fixes a technical ceiling.",
        short: "No amount of extra content fixes a technical ceiling.",
        icon: "bolt",
      },
      {
        title: "SEO gets bolted on after launch, badly",
        body: "A site built first and optimised later usually needs a second project just to fix what should have been right from the start.",
        short: "Usually a second project just to fix what should have been right.",
        icon: "layers",
      },
    ],
    included: [
      { title: "Fast load times", body: "Built in from the first line of code, not optimised in afterward.", icon: "bolt", tint: "mint" },
      { title: "Readable page structure", body: "Proper headings search engines can actually read.", icon: "layers", tint: "lilac" },
      { title: "Local SEO", body: "For South African search, town by town.", icon: "pin", tint: "blush" },
      { title: "Content around real searches", body: "How your customers search, not how you’d describe the business internally.", icon: "users", tint: "lilac" },
      { title: "Analytics + Search Console", body: "Set up correctly from launch.", icon: "chart", tint: "blush" },
      { title: "Clean URLs + XML sitemap", body: "So Google can find and understand every page.", icon: "link", tint: "mint" },
      { title: "Structured data", body: "Schema that describes your business correctly to search engines.", icon: "code", tint: "blush" },
      { title: "Alt text + compression", body: "Pages stay fast and accessible without losing useful context.", icon: "image", tint: "mint" },
      { title: "Internal linking", body: "Authority and relevance flow through the site.", icon: "share", tint: "lilac" },
    ],
    approach: {
      heading: "The same people who build the site think about how it ranks.",
      badLabel: "BOLTED ON AFTER LAUNCH",
      goodLabel: "BUILT IN FROM DAY ONE",
      bad: [
        "A developer who doesn’t understand your site applies a generic checklist",
        "Structure gets fixed after Google has already indexed it",
        "Changing it means starting the ranking clock over",
      ],
      good: [
        "SEO decisions get made during the build, when they’re cheapest",
        "Every recommendation is grounded in how the site is actually built",
        "No second project needed to fix what should have been right",
      ],
      goodShort: [
        "Decisions made during the build, when they’re cheapest",
        "Grounded in how the site is actually built",
        "No second project to fix it later",
      ],
    },
    addOn: {
      kicker: "ALREADY HAVE A SITE?",
      title: "Advanced SEO and site speed optimisation, as standalone add-ons.",
      shortTitle: "Advanced SEO + site speed add-ons",
      body: "Keyword research, schema markup and meta strategy. We audit the site first, so the quote reflects what it actually needs.",
      from: "R3 000",
      note: "confirmed in a quote",
      cta: "Ask for an SEO audit",
      href: "/start-project?intent=seo-audit&ref=service-seo",
    },
    faqHeading: "Questions about SEO.",
    faqFirstAnswer: {
      long: "SEO foundations come standard with every website we build. If you already have a site, Advanced SEO and site speed optimisation are available as standalone add-ons, from R3 000 and confirmed in a quote. We audit the existing site first so the quote reflects what it actually needs.",
      short: "SEO foundations come standard with every build. For existing sites, Advanced SEO and speed optimisation are add-ons from R3 000, confirmed in a quote.",
    },
    relatedHeading: "Before you spend a rand on SEO, read this.",
  },

  "website-redesign": {
    slug: "website-redesign",
    name: "Website redesign",
    visual: "redesign",
    problemsHeading: "A site can outgrow the business behind it.",
    problemsSub: "Most redesigns start the same way: the business moved on and the website didn’t.",
    includedHeading: "Seven things every redesign gets right.",
    includedLinkRef: "/services#website-development",
    problems: [
      {
        title: "The site describes a business you’ve outgrown",
        body: "Old pricing, discontinued services, a team photo from three staff ago. Visitors trust what they see, even when it’s out of date, and an out-of-date site quietly erodes that trust before a customer even reaches out.",
        short: "Visitors trust what they see, even when it’s out of date.",
        icon: "alert",
      },
      {
        title: "It looks dated next to competitors who redesigned recently",
        body: "Design ages. A site that looked current five years ago now quietly signals that the business behind it hasn’t kept up either, whether or not that’s actually true of the business itself.",
        short: "A dated site signals a business that hasn’t kept up.",
        icon: "layout",
      },
      {
        title: "Nobody in-house can safely change it",
        body: "Old code, a departed freelancer, or a platform nobody remembers logging into all mean a small update turns into a small crisis, so the site just stays frozen instead.",
        short: "A small update turns into a small crisis, so the site stays frozen.",
        icon: "lock",
      },
    ],
    included: [
      { title: "A full audit first", body: "A full audit of your current site before we touch anything, so nothing that’s actually working gets thrown out by accident.", icon: "search", tint: "mint" },
      { title: "Content carried over", body: "Content and structure carried over deliberately, not lost in the rebuild.", icon: "doc", tint: "lilac" },
      { title: "URLs and redirects kept", body: "Existing URLs and redirects preserved where possible, so your search rankings aren’t reset to zero on launch day.", icon: "link", tint: "blush" },
      { title: "The same fixed price", body: "The same fixed-price model as every GoodGround build: 50% deposit and the rest on completion, or 12 monthly instalments.", icon: "tag", tint: "mint" },
      { title: "SEO foundations rebuilt", body: "SEO foundations rebuilt properly, not just carried over broken.", icon: "chart", tint: "lilac" },
      { title: "A clean handover", body: "A clean handover from whatever platform or codebase you’re currently on, however messy it’s become over the years.", icon: "share", tint: "blush" },
      { title: "A care plan at launch", body: "The same care plan option available at launch as any new build, so the new site doesn’t quietly age the same way the old one did.", icon: "shield", tint: "mint" },
    ],
    approach: {
      heading: "A redesign carries forward what’s working.",
      badLabel: "THROWN OUT AND RESTARTED",
      goodLabel: "AUDITED, THEN REBUILT",
      bad: [
        "Everything is rebuilt from scratch and the rankings reset to zero",
        "Old tracking codes and indexed clutter come along for the ride",
        "Nobody decides what carries forward and what gets retired",
      ],
      good: [
        "An audit finds what’s working before anything is touched",
        "URLs, redirects and content carry over on purpose",
        "The clutter is found and retired deliberately",
      ],
      goodShort: ["Audit first, then touch anything", "URLs and content carried over on purpose", "Clutter retired deliberately"],
    },
    faqHeading: "Questions about redesigns.",
    relatedHeading: "Redesigning? Read this first.",
  },

  "ux-design": {
    slug: "ux-design",
    name: "UX & design",
    visual: "ux",
    problemsHeading: "Bad UX announces itself.",
    problemsSub: "Good UX rarely does. It just quietly lets visitors do the thing they came to do.",
    includedHeading: "Nine things every GoodGround design gets right.",
    includedLinkRef: "/services#ux-design",
    problems: [
      {
        title: "Visitors can’t find what they need",
        body: "A confused visitor doesn’t ask a question. They close the tab and try the next result on Google, and you never find out what they were actually looking for.",
        short: "They close the tab, and you never learn what they wanted.",
        icon: "search",
      },
      {
        title: "Too many competing calls to action",
        body: "Three buttons fighting for attention convert worse than one obvious next step, because indecision is the easiest way to lose a click, and every extra option is a chance to hesitate.",
        short: "One obvious next step converts better than three buttons.",
        icon: "target",
      },
      {
        title: "Contact details buried three clicks deep",
        body: "If getting in touch takes effort, most visitors won’t make it, no matter how good the rest of the page looks, because the effort itself reads as a small reason to give up.",
        short: "If getting in touch takes effort, most visitors won’t.",
        icon: "mail",
      },
    ],
    included: [
      { title: "Journey mapped first", body: "Customer journey mapped before a single screen gets designed.", icon: "compass", tint: "mint" },
      { title: "One clear next step", body: "One clear next step per page, not several competing for attention.", icon: "target", tint: "lilac" },
      { title: "Proof where doubt shows up", body: "Proof placed exactly where doubt shows up, not buried on a separate page nobody visits.", icon: "shield", tint: "blush" },
      { title: "Mobile-first layouts", body: "Mobile-first layouts, since most visitors decide from a phone.", icon: "mobile", tint: "mint" },
      { title: "Accessible design", body: "Readable contrast, visible focus states, and structure that works with a keyboard, not just a mouse.", icon: "eye", tint: "lilac" },
      { title: "One visual language", body: "Consistent visual language across every page, so the site feels like one product.", icon: "layout", tint: "blush" },
      { title: "Every state designed", body: "Loading, empty, and error states designed on purpose, not left as whatever the framework does by default.", icon: "alert", tint: "mint" },
      { title: "A deliberate type scale", body: "Typography and spacing built on a deliberate scale, not eyeballed pixel values that drift across the site.", icon: "pen", tint: "lilac" },
      { title: "Forms with less friction", body: "Clear labels, sensible field order, and validation that explains what to fix rather than just flagging that something’s wrong.", icon: "doc", tint: "blush" },
    ],
    approach: {
      heading: "Designed around your customer, not a template.",
      badLabel: "A GENERIC TEMPLATE",
      goodLabel: "DESIGNED AROUND YOUR CUSTOMERS",
      bad: [
        "Optimised for looking good in a portfolio",
        "The same proof and tone for every kind of business",
        "A layout that looks considered but hides the next step",
      ],
      good: [
        "Decisions made with your actual customer in mind",
        "The proof and tone that earn trust for your kind of business",
        "Every layout tested against: is the next step obvious?",
      ],
      goodShort: ["Made with your actual customer in mind", "The proof and tone that earn trust", "Every layout tested for an obvious next step"],
    },
    faqHeading: "Questions about UX and design.",
    relatedHeading: "Design that converts, explained.",
  },

  "google-ads": {
    slug: "google-ads",
    name: "Google Ads",
    visual: "google",
    problemsHeading: "Most Google Ads accounts leak budget.",
    problemsSub: "Usually in three ordinary places that are easy to miss and cheap to fix.",
    includedHeading: "Ten things every campaign gets right.",
    includedLinkRef: "/services#google-ads",
    problems: [
      {
        title: "Broad keywords burn budget on the wrong clicks",
        body: "Bidding on “electricity” instead of “emergency electrician near me” spends your money on browsers, not buyers, and it’s the single most common way a small business account bleeds budget without anyone noticing why.",
        short: "Broad keywords spend your money on browsers, not buyers.",
        icon: "target",
      },
      {
        title: "No real tracking means no real answers",
        body: "Without proper conversion tracking, you can see the spend but not which of it actually turned into an enquiry, so every decision about what to change next is a guess dressed up as a strategy.",
        short: "You can see the spend but not what it turned into.",
        icon: "chart",
      },
      {
        title: "The landing page doesn’t match the ad",
        body: "An ad that promises one thing and a page that delivers another loses the click the moment someone arrives, and you’ve already paid for that click whether it converts or not.",
        short: "You’ve paid for the click whether it converts or not.",
        icon: "link",
      },
    ],
    included: [
      { title: "Tight keyword targeting", body: "Built around what your customers actually search when they’re ready to act.", icon: "target", tint: "mint" },
      { title: "Honest ad copy", body: "Ad copy that matches what you actually offer.", icon: "doc", tint: "lilac" },
      { title: "Real conversion tracking", body: "So spend maps to real enquiries, not guesses.", icon: "chart", tint: "blush" },
      { title: "Matching landing pages", body: "Landing pages that match the ad’s promise instead of sending traffic to a generic homepage.", icon: "link", tint: "mint" },
      { title: "A plain-language report", body: "A simple monthly report: spend, leads, and cost per result.", icon: "trend", tint: "lilac" },
      { title: "No lock-in", body: "No lock-in contract. Cancel with 30 days’ notice.", icon: "check", tint: "blush" },
      { title: "Negative keyword upkeep", body: "Lists maintained over time, so budget stops leaking to searches that were never going to convert.", icon: "x", tint: "mint" },
      { title: "Regular bid and budget reviews", body: "Not a campaign set up once and left to run unattended.", icon: "clock", tint: "lilac" },
      { title: "Ad extensions done properly", body: "Call, location and sitelinks, so an ad takes up more space and gives searchers more reasons to click.", icon: "layers", tint: "blush" },
      { title: "Built around your services", body: "Campaign structure built around your actual services, not one catch-all ad group.", icon: "layout", tint: "mint" },
    ],
    approach: {
      heading: "Ads and landing page, managed by one team.",
      badLabel: "TWO SUPPLIERS, ONE FUNNEL",
      goodLabel: "ONE TEAM, BOTH SIDES",
      bad: [
        "The ads are optimised by someone with no say over the landing page",
        "Fixes wait on a handoff between suppliers with different incentives",
        "Budget sits spread evenly across everything",
      ],
      good: [
        "We adjust both sides: the keywords and the page",
        "Search terms reviewed regularly, weak keywords paused",
        "Budget moves toward whatever is actually converting",
      ],
      goodShort: ["We adjust the keywords and the page", "Weak keywords paused, regularly", "Budget moves to what converts"],
    },
    faqHeading: "Questions about Google Ads.",
    relatedHeading: "",
  },

  "meta-ads": {
    slug: "meta-ads",
    name: "Meta Ads",
    visual: "meta",
    problemsHeading: "Boosting a post isn’t a strategy.",
    problemsSub: "It feels like marketing, but it rarely builds anything.",
    includedHeading: "Ten things every campaign gets right.",
    includedLinkRef: "/services#meta-ads",
    problems: [
      {
        title: "Boosted posts reach the wrong people",
        body: "A boosted post spends money showing your content to whoever Facebook decides, not necessarily anyone close to buying, because the boost button optimises for reach, not for the outcome you actually want.",
        short: "The boost button optimises for reach, not for buyers.",
        icon: "users",
      },
      {
        title: "Nothing gets built for next time",
        body: "Each boosted post starts from zero. There’s no audience data carried forward, no remarketing list, nothing compounding, so month twelve of boosting posts looks exactly like month one.",
        short: "Month twelve looks exactly like month one.",
        icon: "layers",
      },
      {
        title: "It stops the second you stop paying",
        body: "No ad spend, no reach, no follow-up with the people who almost enquired last week, which means every pause in spend also pauses the relationship you were building with them.",
        short: "Every pause in spend pauses the relationship too.",
        icon: "clock",
      },
    ],
    included: [
      { title: "Real audience targeting", body: "Your local area, your ideal customer, and people who already visited your site.", icon: "users", tint: "mint" },
      { title: "Scroll-stopping creative", body: "Built for the platform, not a resized print ad.", icon: "image", tint: "lilac" },
      { title: "A clear offer", body: "A clear offer in every campaign, not just brand awareness with no next step.", icon: "tag", tint: "blush" },
      { title: "Remarketing", body: "Quietly follows up with visitors who didn’t enquire the first time.", icon: "repeat", tint: "mint" },
      { title: "A plain-language report", body: "A simple monthly report: spend, leads, and cost per result.", icon: "trend", tint: "lilac" },
      { title: "No lock-in", body: "No lock-in contract. Cancel with 30 days’ notice.", icon: "check", tint: "blush" },
      { title: "Creative testing", body: "Across feed, stories and reels, so budget shifts toward whatever’s actually performing.", icon: "layout", tint: "mint" },
      { title: "Pixel and conversion setup", body: "Handled properly from day one, not bolted on after the first campaign already ran blind.", icon: "chart", tint: "lilac" },
      { title: "Lookalike audiences", body: "Built from your existing customers or site visitors, once there’s enough data to build them properly.", icon: "share", tint: "blush" },
      { title: "Cold and warm kept apart", body: "Campaign structure that separates cold audiences from warm remarketing, instead of one broad audience doing both jobs badly.", icon: "layers", tint: "mint" },
    ],
    approach: {
      heading: "A site built to close what the ad starts.",
      badLabel: "A BOOSTED POST",
      goodLabel: "A STRUCTURED CAMPAIGN",
      bad: [
        "Reaches whoever the platform decides, then stops",
        "Teaches you nothing and builds nothing for next time",
        "Sends people to a page that doesn’t match the ad",
      ],
      good: [
        "Real audiences: your area, your ideal customer, past visitors",
        "Clean conversion data, so the platform finds the right people",
        "Remarketing sends people who know you to a site built to close",
      ],
      goodShort: ["Real audiences, not whoever the platform picks", "Clean conversion data from day one", "Remarketing to a site built to close"],
    },
    faqHeading: "Questions about Meta Ads.",
    relatedHeading: "",
  },
};

/** "Pairs well with" cards. SEO's tag on other pages: INCLUDED. */
export const PAIRS = [
  { key: "website-development", name: "Website development", tag: "FLAGSHIP", href: "/services#website-development", plum: true },
  { key: "website-redesign", name: "Website redesign", tag: "EXISTING SITES", href: "/services/website-redesign" },
  { key: "ux-design", name: "UX & design", tag: "DESIGN", href: "/services/ux-design" },
  { key: "seo", name: "SEO", tag: "INCLUDED", href: "/services/seo" },
  { key: "google-ads", name: "Google Ads", tag: "GROWTH", href: "/services/google-ads" },
  { key: "meta-ads", name: "Meta Ads", tag: "GROWTH", href: "/services/meta-ads" },
];

export const tintOf = tint;
