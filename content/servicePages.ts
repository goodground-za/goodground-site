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
  /** Slugs from content/articles.ts, rendered as a "Related reading" block
   * (SEO audit 2026-08-16, item 7 — zero links existed in either direction
   * between the blog and the service/industry pages they support). */
  relatedArticleSlugs?: string[];
};

export const servicePages: ServicePageData[] = [
  {
    slug: "google-ads",
    serviceRef: "google-ads",
    title: "Google Ads",
    metaTitle: "Google Ads Management for Small Business | South Africa",
    metaDescription:
      "Google Ads management for South African small businesses: tight keywords, honest ad copy, real tracking, and a monthly report in plain language.",
    h1: "Google Ads management for small businesses across South Africa.",
    heroIntro:
      "Most small businesses either skip Google Ads entirely or hand the budget to someone who burns it on broad keywords and vague clicks. Money goes out, enquiries don't come in. We build campaigns around what your customers actually type when they're ready to act, not around vanity metrics like impressions or clicks that never turn into anything. Google Ads can be one of the fastest ways to get in front of a customer who's already decided they want what you offer, if the campaign is actually built to find that person, rather than anyone who happens to type a related word.",
    keywordChips: ["Google Ads management", "PPC agency", "Search ads", "Google Ads for small business"],
    painPoints: [
      {
        title: "Broad keywords burn budget on the wrong clicks",
        body: "Bidding on \"electricity\" instead of \"emergency electrician near me\" spends your money on browsers, not buyers, and it's the single most common way a small business account bleeds budget without anyone noticing why.",
      },
      {
        title: "No real tracking means no real answers",
        body: "Without proper conversion tracking, you can see the spend but not which of it actually turned into an enquiry, so every decision about what to change next is a guess dressed up as a strategy.",
      },
      {
        title: "The landing page doesn't match the ad",
        body: "An ad that promises one thing and a page that delivers another loses the click the moment someone arrives, and you've already paid for that click whether it converts or not.",
      },
    ],
    included: [
      "Tight keyword targeting built around what your customers actually search when they're ready to act",
      "Honest ad copy that matches what you actually offer",
      "Proper conversion tracking, so spend maps to real enquiries, not guesses",
      "Landing pages that match the ad's promise instead of sending traffic to a generic homepage",
      "A simple monthly report in plain language: spend, leads, and cost per result",
      "No lock-in contract. Cancel with 30 days' notice",
      "Negative keyword lists maintained over time, so budget stops leaking to searches that were never going to convert",
      "Regular bid and budget reviews, not a campaign set up once and left to run unattended",
      "Ad extensions set up properly (call, location, sitelinks), so an ad takes up more space and gives searchers more reasons to click",
      "Campaign structure built around your actual services, not one catch-all ad group covering everything you do",
    ],
    localProof:
      "We manage Google Ads for businesses across South Africa, wherever your customers are searching from. Because we also build the websites those ads point to, your ads and your site tell one consistent story, which converts better than handing the two jobs to separate people who never talk to each other. A campaign built by someone who has no say over the landing page can only ever optimise half the funnel. We can adjust both sides: tighten the keyword targeting on the ad side, and fix a slow-loading or unclear landing page on the site side, without waiting on a handoff between two different suppliers who don't share the same incentives. Management stays hands-on rather than automated and left to run itself. Search terms get reviewed regularly, underperforming keywords get paused, and budget moves toward whatever's actually converting instead of sitting spread evenly across everything on the assumption that it will sort itself out.",
    faq: [
      {
        question: "How much should I spend on Google Ads?",
        answer:
          "It depends on your goals and margins, but we'll always start with a budget you're comfortable with and only recommend increasing it once the results justify it. You're never locked into a number. What matters more than the total spend is whether the account is structured to spend it efficiently, a small budget aimed precisely at the right searches usually outperforms a bigger one spread across broad, unfocused keywords.",
      },
      {
        question: "Do I need a new website before I start running ads?",
        answer:
          "Not necessarily, but ads work far better when they point to a fast, well-structured site. If your current site needs work first, we'll tell you honestly before you spend a rand on clicks, rather than run a campaign we already suspect the landing page will undercut.",
      },
      {
        question: "Is there a long contract?",
        answer:
          "No. We work month to month with 30 days' notice. We'd rather earn your business every month than trap you in a contract, which also means we have every incentive to keep the account performing rather than coast once you've signed.",
      },
      {
        question: "Will I own my Google Ads account?",
        answer:
          "Always. Your account, your data, your audiences, they belong to you, whatever happens down the line. If you ever move to a different agency or bring management in-house, you leave with everything intact, not locked inside an account you can't access.",
      },
      {
        question: "How do you decide which keywords to target?",
        answer:
          "We start with what your actual customers type when they're close to booking or buying, not broad category terms that sound impressive but attract browsers. That usually means fewer, more specific keywords than a business expects, and it's a big part of why the budget goes further.",
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
      "Facebook and Instagram ads management for South African small businesses: real audiences, scroll-stopping creative, and automatic remarketing.",
    h1: "Facebook and Instagram ads management for South African businesses.",
    heroIntro:
      "Boosting a post feels like marketing, but it rarely builds anything. It reaches the wrong people, teaches you nothing, and stops working the moment you stop paying. We plan Meta campaigns around real audiences instead: your local area, your ideal customer, and the people who already visited your site. A properly structured Meta account compounds over time, every campaign teaches the next one something, and the audiences you build keep working long after a single boosted post would have stopped. Instagram and Facebook are treated as one connected account rather than two separate efforts, since your audience usually moves between both without thinking about which app they're in.",
    keywordChips: ["Facebook ads management", "Instagram ads agency", "Social media advertising", "Meta Ads"],
    painPoints: [
      {
        title: "Boosted posts reach the wrong people",
        body: "A boosted post spends money showing your content to whoever Facebook decides, not necessarily anyone close to buying, because the boost button optimises for reach, not for the outcome you actually want.",
      },
      {
        title: "Nothing gets built for next time",
        body: "Each boosted post starts from zero. There's no audience data carried forward, no remarketing list, nothing compounding, so month twelve of boosting posts looks exactly like month one.",
      },
      {
        title: "It stops the second you stop paying",
        body: "No ad spend, no reach, no follow-up with the people who almost enquired last week, which means every pause in spend also pauses the relationship you were building with them.",
      },
    ],
    included: [
      "Real audience targeting: your local area, your ideal customer, and people who already visited your site",
      "Scroll-stopping creative built for the platform, not a resized print ad",
      "A clear offer in every campaign, not just brand awareness with no next step",
      "Remarketing that quietly follows up with visitors who didn't enquire the first time",
      "A simple monthly report: spend, leads, and cost per result",
      "No lock-in contract. Cancel with 30 days' notice",
      "Creative testing across formats, feed, stories, reels, so budget shifts toward whatever's actually performing",
      "Pixel and conversion setup handled properly from day one, not bolted on after the first campaign already ran blind",
      "Lookalike audiences built from your existing customers or site visitors, once there's enough data to build them properly",
      "Campaign structure that separates cold audiences from warm remarketing, instead of one broad audience doing both jobs badly",
    ],
    localProof:
      "We run Meta Ads for businesses across South Africa, from single-town campaigns to national reach. Because the same team builds your website, remarketing sends people who already know your brand to a site built to close the enquiry, not just a landing page bolted on for the campaign. That matters more on Meta than almost anywhere else, because most people scrolling past an ad weren't actively looking for you the way a Google searcher was. The job of the ad is to interrupt them with something worth stopping for, and the job of the site they land on is to hold that attention once they've clicked, rather than losing it to a slow load or a page that doesn't match what the ad promised. Meta's own algorithm also rewards accounts with clean conversion data, so the pixel and event setup done properly at the start isn't just bookkeeping, it directly affects how efficiently the platform can find the right people for you later.",
    faq: [
      {
        question: "What's the difference between Google Ads and Meta Ads?",
        answer:
          "Google captures people already searching for what you offer, high intent, ready to act. Meta builds awareness and trust with the right people before they need you. Most businesses do best with a mix of both: Google to catch demand that already exists, Meta to build demand that doesn't exist yet.",
      },
      {
        question: "How much should I spend on Meta Ads?",
        answer:
          "We'll start with a budget you're comfortable with and only recommend an increase once the results justify it. Nothing here locks you into a number. Meta campaigns generally need a short learning period before the platform's own targeting settles, so we'll be upfront if the first couple of weeks look slower than they'll end up being.",
      },
      {
        question: "Is there a long contract?",
        answer:
          "No. We work month to month with 30 days' notice, the same as our Google Ads management. If a campaign isn't working, the fix is to change the campaign, not to hold you to a contract while it underperforms.",
      },
      {
        question: "Will I own my ad accounts and audiences?",
        answer:
          "Always. Your accounts, your data, your audiences, they belong to you, whatever happens down the line. That includes any custom or lookalike audiences built up over time, which stay yours to use however you need.",
      },
      {
        question: "Do you write and design the ad creative, or do I need to supply it?",
        answer:
          "We handle the creative: copy, imagery or video, and the different sizes each placement needs. If you already have brand photography or video you'd like used, send it through and we'll build the campaign around it rather than start from nothing.",
      },
      {
        question: "Can Meta Ads work for a business with no existing following?",
        answer:
          "Yes. A big following helps but isn't required, since these campaigns target audiences by location, interests, and behaviour rather than relying on your existing page followers. Plenty of businesses run their first successful campaign starting from a page with barely any followers at all.",
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
      "Website redesign for South African businesses that have outgrown their current site. Same fixed-price model, existing content and rankings kept intact.",
    h1: "Website redesign for South African businesses outgrowing their current site.",
    heroIntro:
      "Your business has changed since your website launched. If the site hasn't changed with it, it's quietly working against you every day it stays the same, describing services you've dropped, missing ones you've added, and looking dated next to competitors who redesigned more recently. A redesign isn't starting from scratch. It's carrying forward what's actually working, your existing traffic, your search rankings, the parts of the site customers already respond to, and rebuilding around it properly instead of throwing the whole thing out and hoping the new version happens to perform as well.",
    keywordChips: ["Website redesign", "Website revamp", "Rebuild my website", "Website relaunch"],
    painPoints: [
      {
        title: "The site describes a business you've outgrown",
        body: "Old pricing, discontinued services, a team photo from three staff ago. Visitors trust what they see, even when it's out of date, and an out-of-date site quietly erodes that trust before a customer even reaches out.",
      },
      {
        title: "It looks dated next to competitors who redesigned recently",
        body: "Design ages. A site that looked current five years ago now quietly signals that the business behind it hasn't kept up either, whether or not that's actually true of the business itself.",
      },
      {
        title: "Nobody in-house can safely change it",
        body: "Old code, a departed freelancer, or a platform nobody remembers logging into all mean a small update turns into a small crisis, so the site just stays frozen instead.",
      },
    ],
    included: [
      "A full audit of your current site before we touch anything, so nothing that's actually working gets thrown out by accident",
      "Content and structure carried over deliberately, not lost in the rebuild",
      "Existing URLs and redirects preserved where possible, so your search rankings aren't reset to zero on launch day",
      "The same fixed-price model as every GoodGround build: 50% deposit and the rest on completion, or 12 monthly instalments",
      "SEO foundations rebuilt properly, not just carried over broken",
      "A clean handover from whatever platform or codebase you're currently on, however messy it's become over the years",
      "The same care plan option available at launch as any new build, so the new site doesn't quietly age the same way the old one did",
    ],
    localProof:
      "We redesign websites for businesses across South Africa, whether the current site was built by a freelancer, an old agency, or a DIY builder you've since outgrown. A redesign often surfaces things a fresh build never has to deal with: old tracking codes nobody remembers installing, pages indexed by Google that shouldn't be, redirects from an even earlier version of the site that were never cleaned up. Part of the audit before we touch anything is finding that clutter and deciding deliberately what carries forward and what finally gets retired. It's also usually the point where a business realises how much has quietly changed since the original site launched, services added or dropped, a different customer base, a brand that's matured, none of which the old site was ever updated to reflect.",
    faq: [
      {
        question: "Will a redesign reset my Google rankings?",
        answer:
          "Rankings can dip briefly during any relaunch, but we plan around it: preserving your URLs, setting up the right redirects, and keeping your SEO foundations intact, so a redesign is a step forward, not a reset. The businesses that lose rankings after a redesign almost always lost them because nobody planned for this part, not because a redesign inherently costs you your position.",
      },
      {
        question: "Do you need my old site's files to start?",
        answer:
          "Access to your current site and its content helps, but we don't need the original files themselves. We build the new site fresh, custom-coded, and bring your existing content across deliberately. If you've lost access to your old site entirely, that's still workable, we can usually reconstruct what's needed from what's publicly visible and from Google's own cached record of your pages.",
      },
      {
        question: "Is a redesign priced differently from a new build?",
        answer:
          "No. It's quoted the same way as any project: one fixed price based on scope, with the same two ways to pay. A redesign can land cheaper than a new build if a lot of the existing content and structure carries over cleanly, but that's decided by scope, not by a different pricing model.",
      },
      {
        question: "What if I only need a few pages fixed, not a full rebuild?",
        answer:
          "Then a full redesign is probably more than you need. Tell us what's not working and we'll recommend the smallest fix that actually solves it, not the biggest one that pads the invoice. Sometimes that's a handful of pages rebuilt properly. Sometimes it's genuinely the whole site, and we'll say so either way.",
      },
      {
        question: "How long does a redesign usually take?",
        answer:
          "It depends on scope, but a typical redesign runs a similar timeline to a comparable new build, since most of the work, design, coding, content, is the same either way. The audit stage at the start adds a little time upfront and usually saves more than that later by catching problems before they're built into the new site.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
    relatedArticleSlugs: ["hand-coded-websites-vs-drag-and-drop-builders"],
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
      "A gorgeous website nobody can find on Google isn't an investment. It's a cost. Every GoodGround site is built on solid technical SEO from day one: fast load times, proper page structure, and content built around how your customers actually search. Most SEO problems aren't exotic. They're ordinary things done wrong or skipped entirely: a page title that doesn't match what anyone searches for, a heading structure that confuses search engines about what the page is actually about, images with no description, a site so slow that a visitor leaves before it finishes loading. Fixing the ordinary things properly does more for most small businesses than any amount of exotic tactics ever will.",
    keywordChips: ["Local SEO", "Local SEO South Africa", "Technical SEO", "SEO for small business"],
    painPoints: [
      {
        title: "The site is invisible for the exact searches that matter",
        body: "A business with no local SEO can lose the customer to a competitor with a worse product and a better-structured website, simply because Google could read one site and not the other.",
      },
      {
        title: "Technical debt quietly caps how high you can rank",
        body: "Slow load times and messy page structure hold a site back in search results no matter how good the content is, and no amount of extra content fixes a technical ceiling.",
      },
      {
        title: "SEO gets bolted on after launch, badly",
        body: "A site built first and optimised later usually needs a second project just to fix what should have been right from the start, because some structural decisions are expensive to undo once the site is live.",
      },
    ],
    included: [
      "Fast load times, built in from the first line of code rather than optimised in afterward",
      "Proper page structure and headings that search engines can actually read",
      "Local SEO for South African search, town by town",
      "Content structured around how your customers actually search, not around how you'd describe the business internally",
      "Google Analytics and Search Console set up correctly from launch",
      "Clean, descriptive URLs and a submitted XML sitemap, so Google can find and understand every page",
      "Structured data (schema markup) that describes your business correctly to search engines, not just to visitors",
      "Image alt text and compression handled properly, so pages stay fast and accessible without stripping out useful context for search engines",
      "Internal linking between related pages, so authority and relevance flow through the site instead of every page competing on its own",
    ],
    localProof:
      "We build SEO foundations into every website for businesses across South Africa. SEO isn't sold as a bolt-on service from a developer who doesn't understand your site, it's built into every GoodGround project from day one. If you already have a site and just need the deeper work, Advanced SEO (keyword research, schema markup, meta strategy) and site speed optimisation are available as standalone add-ons, from R3,000, confirmed in a quote. Because the same people building the site are the ones thinking about how it ranks, SEO decisions get made at the point they're cheapest to make: during the build, not months later when a page's structure has already been indexed and changing it means starting the ranking clock over. That also means the SEO work is never guesswork bolted onto a site nobody on the team fully understands. Every recommendation is grounded in how the site is actually built, not a generic checklist applied the same way regardless of what platform or codebase sits underneath it.",
    faq: [
      {
        question: "Do you offer SEO as a standalone service, or only with a new website?",
        answer:
          "SEO foundations come standard with every website we build. If you already have a site and just need the SEO work, Advanced SEO and site speed optimisation are available as standalone add-ons, priced from R3,000 and confirmed in a quote. We'll audit the existing site first so the quote reflects what it actually needs, not a generic package.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical improvements can help within weeks. Ranking for competitive terms takes longer, usually months, and no honest agency will promise you a page-one spot on a specific date. Anyone who guarantees a ranking or a timeline is telling you something about how they operate, not about how Google actually works.",
      },
      {
        question: "Do you do local SEO for my town specifically?",
        answer:
          "Yes, and we build the same local SEO discipline into projects for businesses anywhere else in South Africa too. That means your town, suburb, or service area is worked into page titles, headings, and content wherever it's genuinely relevant, not stuffed in mechanically.",
      },
      {
        question: "What's the difference between SEO foundations and Advanced SEO?",
        answer:
          "Foundations cover titles, meta descriptions, headings, and local structure, included in every build. Advanced SEO adds keyword research, schema markup, and a deeper meta strategy, priced separately as an add-on for businesses that want to go further than the included baseline.",
      },
      {
        question: "Can you fix SEO on a site you didn't build?",
        answer:
          "Sometimes, depending on the platform and how much control it gives us over the underlying code. We'll audit it honestly and tell you what's fixable in place versus what would need a rebuild to actually solve.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
    relatedArticleSlugs: ["biggest-website-mistakes-south-african-smes-make"],
  },
  {
    slug: "ux-design",
    serviceRef: "ux-design",
    title: "UX & Design",
    metaTitle: "UX & UI Design Services | South Africa",
    metaDescription:
      "UX and UI design for South African businesses, built around how customers actually decide. Mapped customer journeys, clear calls to action.",
    h1: "UX and UI design services for South African businesses.",
    heroIntro:
      "A beautiful website that confuses visitors, buries your contact details, or takes six clicks to explain what you do will lose the customer before they act. We map the customer journey before we design a single screen: what a visitor needs to see, and in what order, before they trust you enough to act. Good UX rarely announces itself. Nobody compliments a site for being easy to use, they just quietly stay on it and do the thing they came to do. Bad UX is the opposite: it announces itself constantly, through every hesitation, every back button, every visitor who leaves without you ever knowing why.",
    keywordChips: ["UX design", "UI design", "Website design services", "User experience design"],
    painPoints: [
      {
        title: "Visitors can't find what they need",
        body: "A confused visitor doesn't ask a question. They close the tab and try the next result on Google, and you never find out what they were actually looking for.",
      },
      {
        title: "Too many competing calls to action",
        body: "Three buttons fighting for attention convert worse than one obvious next step, because indecision is the easiest way to lose a click, and every extra option is a chance to hesitate.",
      },
      {
        title: "Contact details buried three clicks deep",
        body: "If getting in touch takes effort, most visitors won't make it, no matter how good the rest of the page looks, because the effort itself reads as a small reason to give up.",
      },
    ],
    included: [
      "Customer journey mapped before a single screen gets designed",
      "One clear next step per page, not several competing for attention",
      "Proof placed exactly where doubt shows up, not buried on a separate page nobody visits",
      "Mobile-first layouts, since most visitors decide from a phone",
      "Accessible design: readable contrast, visible focus states, and structure that works with a keyboard, not just a mouse",
      "Consistent visual language across every page, so the site feels like one product, not several pages stitched together",
      "Loading, empty, and error states designed on purpose, not left as whatever the framework does by default",
      "Typography and spacing built on a deliberate scale, not eyeballed pixel values that drift inconsistently across the site",
      "Forms designed to reduce friction: clear labels, sensible field order, and validation that explains what to fix rather than just flagging that something's wrong",
    ],
    localProof:
      "We design for businesses across South Africa. UX and UI design isn't sold as a separate service, it's included in every GoodGround website build, mapped around your specific customers rather than applied from a generic template. That matters because a generic template optimises for looking good in a portfolio, not for how your specific customer actually decides. A funeral home, a fitness studio, and an accounting firm are all asking a visitor to trust them, but the proof that earns that trust and the tone that carries it look completely different for each one. Design decisions get made with your actual customer in mind, not a hypothetical one. Every layout decision gets tested against the same question: does this make the next step obvious, or does it just look considered. Those aren't always the same thing, and the second one on its own has never been enough for us to call a design finished.",
    faq: [
      {
        question: "Is UX design sold separately, or only with a website build?",
        answer:
          "It's included in every GoodGround website, not sold as a standalone service. If you specifically need a UX audit or redesign without touching the code, tell us what you need and we'll scope it honestly, rather than force it into a package that doesn't fit.",
      },
      {
        question: "Do you design mobile-first?",
        answer:
          "Yes. Most visitors to a small business site arrive on a phone, so mobile is the starting point for layout decisions, not an afterthought fitted in at the end. Designing desktop-first and then squeezing it onto a phone is a common shortcut, and it's usually visible in how cramped the mobile version feels.",
      },
      {
        question: "Can you redesign just the UX of my existing site without a full rebuild?",
        answer:
          "Sometimes. If the underlying code can support new UX without a full rebuild, we'll say so. If it can't, a full website redesign is usually the more honest recommendation than patching around the problem, since a workaround built on shaky foundations tends to need redoing again later anyway.",
      },
      {
        question: "How many rounds of design revisions do I get?",
        answer:
          "It depends on the package: Micro and Launch include 1 round, Grow includes 2, and Scale includes 3. Extra rounds can be added from the à la carte menu on request. Most projects don't need every available round, because the customer-journey mapping upfront catches a lot of what a later revision round would otherwise be fixing.",
      },
      {
        question: "Do you use design tools like Figma, or design straight in code?",
        answer:
          "It depends on the project's complexity. Straightforward layouts often go straight to code, since a separate design file just adds a translation step. More involved projects get mocked up first, so the direction is agreed before development time is spent on it.",
      },
    ],
    ctaHref: "/start-project",
    ctaLabel: "Start Your Project",
    relatedArticleSlugs: ["website-that-converts-and-grows-with-your-business"],
  },
];
