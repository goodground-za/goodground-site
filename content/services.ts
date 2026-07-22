/**
 * Copy verbatim from the copy deck: §1 Section 3 (short cards, used on the
 * homepage) and §3 (the in-depth Problem / Solution / Outcome, used on the
 * Services page). Do not paraphrase.
 */

export type Service = {
  slug: string;
  title: string;
  /** One-liner for the homepage cards. */
  description: string;
  /** Flagship leads the homepage bento and the Services page. */
  flagship?: boolean;
  /** Growth services (ads) are tagged distinctly from the build services. */
  growth?: boolean;

  // Services-page detail.
  subheading: string;
  problem: string;
  solution: string;
  outcome: string;
  /** Only the flagship shows the payment line. */
  paymentLine?: string;
  /** UX & SEO are bundled into every build, not sold standalone. */
  includedInEveryBuild?: boolean;
  cta?: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description: "Custom-built, fast, and made to grow with your business.",
    flagship: true,
    subheading: "A website that works as hard as you do.",
    problem:
      "Most business websites are built fast and then left alone. They get slow and outdated, and they quietly cost you customers every month they stay that way.",
    solution:
      "We design and build custom websites from the ground up. They're fast, they work properly on a phone, and they're structured around how your customers actually make decisions rather than around a generic template.",
    outcome:
      "A website that loads quickly, looks credible on any device, and gives your business a digital front door worth walking through.",
    paymentLine:
      "Spread across 12 equal monthly payments, with no large invoice before you've seen a page.",
    cta: { label: "Start Your Project", href: "/start-project" },
  },
  {
    slug: "ux-design",
    title: "UX & Design",
    description: "Every page designed around how your customers actually decide.",
    subheading: "Design that's judged by results, not just looks.",
    problem:
      "A beautiful website that confuses visitors, buries your contact details, or takes six clicks to explain what you do will lose the customer before they act.",
    solution:
      "We map the customer journey before we design a single screen: what a visitor needs to see, and in what order, before they trust you enough to act.",
    outcome:
      "A site people can actually use. Visitors find what they need, and you get more enquiries as a result.",
    includedInEveryBuild: true,
  },
  {
    slug: "seo-foundations",
    title: "SEO Foundations",
    description: "Built to be found, not just built to look nice.",
    subheading: "Search visibility designed in from the start.",
    problem:
      "A gorgeous website nobody can find on Google isn't an investment. It's a cost.",
    solution:
      "Every GoodGround site is built on solid technical SEO from day one: fast load times, proper page structure, local SEO for South African search, and content built around how your customers actually search.",
    outcome:
      "A website that starts working in search results from launch, instead of needing a second project six months later to “fix the SEO”.",
    includedInEveryBuild: true,
  },
  {
    slug: "care-plans",
    title: "Website Care Plans",
    description: "Ongoing updates, support, and performance after launch.",
    subheading: "A website is a foundation, not a one-time job.",
    problem:
      "Websites go stale. Plugins fall out of date, content stops being accurate, and small issues turn into slow load times or security risks that nobody notices until they become a problem.",
    solution:
      "Ongoing updates, security monitoring, performance checks, and small content changes, handled monthly so you don't have to think about it.",
    outcome:
      "A website that keeps performing months and years after launch, backed by a team that already knows exactly how it was built.",
    cta: { label: "Talk to Us About a Care Plan", href: "/contact" },
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    description: "Be there the moment someone searches for you.",
    growth: true,
    subheading: "Be there the moment someone searches for you.",
    problem:
      "Most small businesses either don't advertise on Google or hand it to an 'expert' who burns the budget on broad keywords and vague clicks. Money goes out; enquiries don't come in.",
    solution:
      "We build search campaigns around what your customers actually type when they're ready to act, 'emergency electrician near me', not 'electricity'. Tight keywords, honest ad copy, proper tracking, and landing pages that match the promise. We manage the budget like it's our own, because your trust is the account we care about most.",
    outcome:
      "Qualified enquiries you can see and measure, a cost-per-lead you actually understand, and a tap you can turn up when you're quiet and down when you're full.",
    cta: { label: "Start Your Project", href: "/start-project" },
  },
  {
    slug: "meta-ads",
    title: "Meta Ads (Facebook & Instagram)",
    description: "Stay in front of the people deciding whether to trust you.",
    growth: true,
    subheading: "Stay in front of the people deciding whether to trust you.",
    problem:
      "'Boosting a post' feels like marketing, but it rarely builds anything. It reaches the wrong people, teaches you nothing, and stops working the second you stop paying.",
    solution:
      "We plan Facebook and Instagram campaigns around real audiences, your local area, your ideal customer, and the people who've already visited your site. Scroll-stopping creative, a clear offer, and remarketing that quietly follows up with visitors who didn't enquire the first time.",
    outcome:
      "A brand people recognise before they need you, a steady stream of interest from the right area, and warm leads that already know who you are by the time they get in touch.",
    cta: { label: "Start Your Project", href: "/start-project" },
  },
];
