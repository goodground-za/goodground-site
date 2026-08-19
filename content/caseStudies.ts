/**
 * Real projects only — the no-fabrication rule that governs every content file
 * here (see content/projects.ts and /brand-guide).
 *
 * WHAT THAT MEANS FOR A CONCEPT BUILD:
 * B3TTER is a real build. GoodGround designed it, built it, and it is live at a
 * public URL anyone can open and test. What it is NOT is a client engagement, so
 * there is no traffic, no conversion rate, no bookings and no client quote,
 * because no such numbers exist.
 *
 * The case study therefore states plainly that it is a concept build, and the
 * results section carries only figures that can be independently verified by
 * the reader: Lighthouse scores measured on the live URL, payload sizes, request
 * counts. Every number below was measured, not estimated.
 *
 * If a real client project lands later, add it with genuine outcome numbers and
 * set kind: "client". Do not retro-fit business metrics onto this one.
 *
 * kind: "studio" is the third case: goodground.co.za itself. It's real,
 * live production work, not a fictional concept brand, but it's also not a
 * paying client engagement — so it gets its own label rather than being
 * folded into either of the other two kinds.
 */

export type CaseStudyKind = "concept" | "client" | "studio";

export type Metric = {
  value: string;
  label: string;
  /** How a reader can check this themselves. Required — if it can't be checked, don't claim it. */
  verify: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  /** Real pixel dimensions, so Next/Image renders every gallery image at its
   * own natural aspect ratio instead of stretching a portrait shot into a
   * landscape box (the bug fixed on 2026-08-18). */
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  kind: CaseStudyKind;
  /** Client/brand name. */
  client: string;
  /** Headline for the case study page. */
  title: string;
  /** One line under the headline. Shown on the old template; used only for
   * metadata/OG description on the new one (see `galleries` below). */
  standfirst: string;
  /** Card summary on /work. */
  summary: string;
  tags: string[];
  year: string;
  /** ISO date this case study was published, for CreativeWork schema (SEO
   * audit 2026-08-16, item 13). Taken from the commit that added it, not
   * guessed. */
  datePublished: string;
  liveUrl?: string;
  /** Hero screenshot. Always required — used for the /work card thumbnail
   * regardless of which page template a case study uses, and as the on-page
   * hero for studies still on the old template. */
  image: string;
  imageAlt: string;
  snapshot: { label: string; value: string }[];
  challenge: string[];
  solution: {
    heading: string;
    body: string[];
    image?: string;
    imageAlt?: string;
    /** Real pixel dimensions of `image`, used so Next/Image doesn't stretch
     * a portrait phone screenshot into a landscape box. Required whenever
     * `image` is set. */
    imageDimensions?: { width: number; height: number };
    /** "phone" renders the image at a small, centred, phone-proportioned
     * size instead of stretching it to the full column width — for mobile
     * screenshots, which are portrait and much narrower than the desktop
     * shots they sit alongside. */
    imageFit?: "wide" | "phone";
  }[];
  results: Metric[];
  /** Plain-language note on what the results do and do not prove. */
  resultsCaveat: string;

  /**
   * ---- New page template (2026-08-19) ----
   * Client-supplied reference layout: full lifestyle hero photo, a Year /
   * Service / Details meta row, an optional looping video under "The
   * Brief", standalone image galleries between sections instead of one
   * image per solution block, and a short "Solution" intro before the named
   * sub-blocks.
   *
   * A case study renders on this template once `galleries` OR
   * `solutionIntro` is present — until then it renders on the original
   * template above using `image`/`solution[].image`. Migrate a case study
   * by adding these fields once its own matching asset set (multi-shot
   * lifestyle photography + a demo clip) is in hand; don't force it onto a
   * study that only has the old single-hero-plus-per-block-screenshot set.
   */
  /** Full-bleed lifestyle hero photo (devices on a real surface), replacing
   * `image` on the page itself — `image` above still supplies the /work
   * card and is the fallback OG image. */
  heroImage?: GalleryImage;
  /** Right-hand meta column under the title, one line each. */
  service?: string;
  details?: string;
  /** Short paragraph(s) under "The Brief" heading, above the video/live-site
   * button. */
  briefText?: string[];
  /** "The Brief" video loop. */
  video?: { src: string };
  /** Standalone image rows, rendered in this order relative to the text:
   * pair → Challenge/Solution-intro text → wide + row → named solution
   * sub-blocks → grid → Results. Every key is independently optional. */
  galleries?: {
    pair?: GalleryImage[];
    wide?: GalleryImage;
    row?: GalleryImage[];
    grid?: GalleryImage[];
  };
  /** Short paragraph(s) under "The Solution" heading, before the named
   * sub-blocks (which reuse the existing `solution` field above, minus its
   * per-block images on this template). */
  solutionIntro?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "b3tter-bottle",
    kind: "concept",
    client: "B3TTER",
    title: "A premium product page, built in a day",
    standfirst:
      "B3TTER is our own concept build: a complete product website for an insulated bottle, designed to look expensive, work for every visitor, and still load fast with dozens of high-resolution photos on the page.",
    summary:
      "A concept product site that shows what a premium single-product page can look like: beautiful photography that loads fast, and an experience that works whether you're using a mouse, a keyboard, or a screen reader.",
    tags: ["Design", "Development", "Accessibility", "Performance"],
    year: "2026",
    datePublished: "2026-08-15",
    liveUrl: "https://preview.goodground.co.za/better-bottle/",
    image: "/images/case-b3tter-hero.webp",
    imageAlt:
      "The B3TTER product site hero, showing six colourways of an insulated bottle across the full width of the page",
    heroImage: {
      src: "/images/case-b3tter-v2-hero.webp",
      alt: "A laptop and phone side by side on a stone table, both showing the B3TTER product page with six bottle colourways",
      width: 2400,
      height: 812,
    },
    service: "Design & Front-End Development",
    details: "Hand-written HTML, CSS and JavaScript. No framework, no build step, no third-party requests.",
    briefText: [
      "B3TTER needed a product page that could carry a premium single-item brand on its own: no supporting range, no category page to lean on, just one bottle that had to look and feel expensive from the first scroll.",
      "The clip below is a straight walkthrough of the finished site, recorded end to end rather than cut together from separate takes, so what you're seeing is exactly what a visitor gets.",
    ],
    video: { src: "/videos/case-b3tter-demo.mp4" },
    snapshot: [
      { label: "Client", value: "B3TTER — a GoodGround concept brand" },
      { label: "Industry", value: "Outdoor gear, direct to consumer" },
      { label: "Services", value: "Design, front-end build, image optimisation, accessibility, SEO setup" },
    ],
    galleries: {
      pair: [
        {
          src: "/images/case-b3tter-v2-pair-1.webp",
          alt: "The B3TTER site open on a laptop resting on a leather couch",
          width: 1200,
          height: 938,
        },
        {
          src: "/images/case-b3tter-v2-pair-2.webp",
          alt: "The B3TTER site open on a laptop, viewed from over someone's shoulder",
          width: 1200,
          height: 938,
        },
      ],
      wide: {
        src: "/images/case-b3tter-v2-wide.webp",
        alt: "A hand reaching for the trackpad of a laptop showing the B3TTER site, camera and coffee cup nearby",
        width: 2400,
        height: 921,
      },
      row: [
        { src: "/images/case-b3tter-v2-row-1.webp", alt: "The B3TTER site open on a phone, resting on grass outdoors", width: 900, height: 960 },
        { src: "/images/case-b3tter-v2-row-2.webp", alt: "A hand holding a phone showing the B3TTER finish switcher", width: 900, height: 960 },
        { src: "/images/case-b3tter-v2-row-3.webp", alt: "The B3TTER site open on a laptop at a work desk", width: 900, height: 960 },
      ],
      grid: [
        { src: "/images/case-b3tter-v2-grid-1.webp", alt: "Close-up of a laptop trackpad and keyboard with the B3TTER site on screen", width: 700, height: 546 },
        { src: "/images/case-b3tter-v2-grid-2.webp", alt: "Hands typing on a laptop keyboard with the B3TTER site open", width: 700, height: 546 },
        { src: "/images/case-b3tter-v2-grid-3.webp", alt: "A phone showing the B3TTER site held in one hand", width: 700, height: 546 },
        { src: "/images/case-b3tter-v2-grid-4.webp", alt: "Hands holding an insulated bottle next to a laptop showing the B3TTER site", width: 700, height: 546 },
      ],
    },
    challenge: [
      "Most product pages for physical goods fail in the same two places. The photos are so heavy the page stalls on a phone, and the fun interactive bits — colour pickers, review sliders, photo galleries — are built assuming everyone uses a mouse, which leaves anyone relying on a keyboard or a screen reader stuck.",
      "We wanted to prove both problems can be solved at once, without the page losing its premium feel. So we gave ourselves a tough brief: dozens of studio and lifestyle photos, a live colour switcher, a scrolling review carousel, and a rule that none of it could cost us a single point on accessibility.",
    ],
    solutionIntro: [
      "We took each problem in turn: colour without clutter, a specifications section people actually read, photography that stays light, and accessibility that's checked rather than assumed. Here's how each one was built.",
    ],
    solution: [
      {
        heading: "The product carries the colour, the interface stays silent",
        body: [
          "The entire interface is black and white. Every bit of colour on the page comes from the bottle itself, which is what makes a six-colourway range actually feel like a range, instead of decoration slapped on top.",
          "Clicking a colour swatch smoothly fades between six real photographs of the bottle, rather than just tinting one image. Every photo is ready before you click, so there's never a flash of white while it loads, and you can flip through colours with your arrow keys, not just a mouse.",
        ],
      },
      {
        heading: "A specifications section that doesn't feel like a spec sheet",
        body: [
          "The specifications section uses a mix of large and small tiles instead of a row of identical boxes. Most websites default to a wall of matching cards, and mixing the sizes gives the eye somewhere to land instead of a flat, even grid.",
          "It was built to fit perfectly on every screen size, with no odd gaps or leftover tiles. We checked every layout by hand, at every width, rather than eyeballing it and hoping.",
        ],
      },
      {
        heading: "56 MB of photography, shipped as 1.5 MB",
        body: [
          "Twenty-seven original photos came in at 56 MB combined, which is far too heavy for a fast-loading page. Every one was carefully compressed and resized to exactly the size it needed to be, with no wasted space around the product.",
          "The finished page loads all of that photography in 1.5 MB total, with every cut-out product shot still perfectly transparent. Nothing on the page is fetched from anywhere else on the internet — no ad trackers, no font services, nothing slowing it down but the page itself.",
        ],
      },
      {
        heading: "Accessible because it was checked, not because it was assumed",
        body: [
          "Every interactive part of the page — the colour switcher, the review carousel, the mobile menu — works just as well with a keyboard as it does with a mouse. Screen readers are only told about the review that's actually on screen, and the carousel stops moving the instant anyone interacts with it.",
          "And for anyone whose device is set to reduce motion, every animation on the page — the settling hero image, the scroll effects, the counting numbers — turns off completely rather than just slowing down.",
        ],
      },
    ],
    results: [
      {
        value: "100",
        label: "Lighthouse Accessibility",
        verify: "Run Lighthouse against the live URL in Chrome DevTools.",
      },
      {
        value: "100",
        label: "Lighthouse Best Practices",
        verify: "Same audit, same run.",
      },
      {
        value: "56 MB → 1.5 MB",
        label: "Photography payload",
        verify: "Compare the source renders with the shipped assets in the Network panel.",
      },
      {
        value: "0",
        label: "Third-party requests",
        verify: "Open the Network panel and filter by domain. Everything is first-party.",
      },
      {
        value: "0",
        label: "Console errors",
        verify: "Open the Console on the live URL.",
      },
    ],
    resultsCaveat:
      "These are build-quality measurements, not business outcomes. B3TTER is a concept brand with no customers, so there is no traffic, revenue or conversion data to report, and we are not going to invent any. What these numbers show is how the page was built — and every one of them can be checked in your own browser in under a minute.",
  },
  {
    slug: "point-break-surf",
    kind: "concept",
    client: "Point Break Surf Academy",
    title: "A one-page booking site with a real pricing engine, no backend",
    standfirst:
      "Point Break is our concept build for a surf school in Jeffreys Bay: lessons, camps, coaches, and an instant custom quote, all on one page that loads almost immediately.",
    summary:
      "A concept booking site for a fictional surf academy, built to show how much of a real booking experience — pricing, itineraries, meet-the-coach bios, a custom package builder — can live on one page without a single visitor waiting for anything to load.",
    tags: ["Design", "Development", "Booking UX", "Performance"],
    year: "2026",
    datePublished: "2026-08-17",
    liveUrl: "https://preview.goodground.co.za/point-break-surf/",
    image: "/images/case-point-break-hero.webp",
    imageAlt:
      "The Point Break Surf Academy hero, showing a surfer riding a wave at Jeffreys Bay at sunset behind the headline",
    snapshot: [
      { label: "Client", value: "Point Break Surf Academy — a GoodGround concept brand" },
      { label: "Industry", value: "Adventure travel and sports coaching, direct to consumer" },
      { label: "Services", value: "Design, front-end build, booking UX, SEO setup" },
      { label: "Build", value: "Hand-written HTML, CSS and JavaScript. No framework, no build step, no backend." },
    ],
    challenge: [
      "Most one-page booking sites fall into one of two traps. Either they're a brochure that funnels every enquiry through a single generic contact form, hiding the details people actually want to know — how long, how many people, what's included — behind a phone call. Or they try to become a real booking system and end up needing months of backend development before the first lesson is even listed.",
      "We set out to prove there's a middle path. Four different things a visitor might want to book — lessons, camp packages, meeting a coach, or building their own custom trip — all needed to live on one scrolling page, each with real depth behind a click. And the price calculator had to feel instant and alive, as if it were checking with someone in real time, even though nothing was happening anywhere but in the visitor's own browser.",
    ],
    solution: [
      {
        heading: "One pop-up window, doing four different jobs",
        body: [
          "Lesson details, camp itineraries, coach bios and the booking form all open in the exact same style of pop-up window: a photo at the top, scrollable details below, and the same familiar way of closing it, whether that's the X, clicking outside, or hitting Escape. We built that one pop-up once, and every card on the page just fills it with different content.",
          "The booking pop-up in particular can be opened from almost anywhere on the page, and it always remembers what the visitor was already looking at — so if you were checking the price for a family camp package, that's exactly what shows up when you go to book.",
        ],
        image: "/images/case-point-break-modal.webp",
        imageAlt: "The coach bio modal open on the live site, showing a founder's background and coaching philosophy",
      },
      {
        heading: "A price calculator with nothing to talk to",
        body: [
          "The package builder updates a full quote — lesson type, camp package, extras, number of guests — the instant anyone changes a selection. There's no waiting, no spinner, no delay, because there's nothing anywhere else it needs to check with. Everything happens right there in the browser.",
          "Every line in the price breakdown comes from exactly the same information that produces the total, so the two can never disagree with each other, which is the thing that makes most online quote tools feel untrustworthy.",
        ],
        image: "/images/case-point-break-builder.webp",
        imageAlt:
          "The Build Your Trip package builder mid-selection, showing a live R45,200 total with an itemised breakdown",
      },
      {
        heading: "Pricing tiers that read like tiers, not a template",
        body: [
          "The three lesson options and three camp packages are laid out the same way, because they need to be easy to compare side by side. But each one has its own photograph, its own specific inclusions, and a real description of what you'll actually get, not the generic icon-and-heading treatment that makes most pricing pages look interchangeable.",
          "That distinction matters most in the details people actually weigh up before booking: how many people are in the group, how long it runs, and what actually happens in the lesson, not just the price tag.",
        ],
        image: "/images/case-point-break-lessons.webp",
        imageAlt: "The three lesson tier cards, Beginner through Advanced, each with its own photo, price and outcomes",
      },
      {
        heading: "Built mobile-first, because that is how it gets booked",
        body: [
          "Most people booking a trip like this do it from their phone, often while they're already travelling. So the whole layout was designed for a phone screen first, then built up to fit a laptop, not the other way around. Every part of the page was checked on the smallest and largest screens we could think of, with nothing ever spilling off the edge.",
          "One dropdown menu with long text once quietly pushed part of the layout wider than it should have been. A small bug, the kind that only shows up once you actually test on a real device instead of assuming a design will hold — caught before it ever reached a real visitor.",
        ],
        image: "/images/case-point-break-mobile.webp",
        imageAlt: "The Point Break hero rendered on a 390px-wide phone screen with no layout overflow",
        imageDimensions: { width: 390, height: 844 },
        imageFit: "phone",
      },
    ],
    results: [
      {
        value: "331 ms",
        label: "Largest Contentful Paint",
        verify: "Record a performance trace against the live URL in Chrome DevTools.",
      },
      {
        value: "0.00",
        label: "Cumulative Layout Shift",
        verify: "Same trace, same run.",
      },
      {
        value: "100",
        label: "Lighthouse Accessibility",
        verify: "Run Lighthouse against the live URL in Chrome DevTools.",
      },
      {
        value: "100",
        label: "Lighthouse Agentic Browsing",
        verify: "Same audit, same run.",
      },
      {
        value: "5 files",
        label: "Entire site",
        verify: "View source on the live URL: one HTML file, one stylesheet, one script, robots.txt and sitemap.xml. No bundler output.",
      },
      {
        value: "0",
        label: "Console errors",
        verify: "Open the Console on the live URL.",
      },
    ],
    resultsCaveat:
      "Point Break Surf Academy is a fictional brand with no customers, so like B3TTER, there is no traffic, bookings or revenue to report, and the six testimonials on the page are invented and disclosed as such in the footer. The site also carries a deliberate noindex tag and a Disallow in robots.txt, which is why its own Lighthouse SEO score reads around 66 rather than 100: a made-up surf school has no business ranking in real search results. Every other SEO check on the page passes, and removing those two lines is a one-line change if this pattern is ever reused for a real client.",
  },
  {
    slug: "goodground-site",
    kind: "studio",
    client: "GoodGround",
    title: "The studio holds itself to the same brief it gives clients",
    standfirst:
      "This is our own site, built and held to the same standard we hold every client site to: fast, accessible, and honestly checked against the live version anyone can visit, not a private staging copy.",
    summary:
      "GoodGround's own site, built and checked the same way we check every client's. This case study covers what we found when we audited ourselves, and what we fixed: pages that weren't sharing properly on social media, repeated copy, and a work page that quietly favoured one project over the others.",
    tags: ["Design", "Development", "SEO", "Performance"],
    year: "2026",
    datePublished: "2026-08-17",
    liveUrl: "https://www.goodground.co.za/",
    image: "/images/case-goodground-hero.webp",
    imageAlt: "The GoodGround homepage hero, showing the headline over a full-bleed lifestyle photograph",
    snapshot: [
      { label: "Client", value: "GoodGround (the studio itself)" },
      { label: "Industry", value: "Website design and development studio, South Africa" },
      { label: "Services", value: "Design, front-end build, SEO, ongoing iteration" },
      { label: "Build", value: "Next.js 16, Tailwind v4, GSAP and Framer Motion, deployed on Vercel." },
    ],
    challenge: [
      "A studio's own website is where every shortcut it would never let a client take suddenly becomes tempting. There's no client waiting on a deadline, and no one watching to notice if a claim about speed or accessibility quietly stops being true. It's a familiar trap: the agency that sells fast, accessible websites while running one that doesn't live up to its own pitch.",
      "So we held this site to the exact same bar as our other work: real checks on the live version, not a private build; an honest audit rather than an assumed clean bill of health; and every fix checked again after it was made, rather than trusted from memory. This case study exists because that audit turned up real problems, and this is the record of fixing them.",
    ],
    solution: [
      {
        heading: "An audit run against ourselves, not just clients",
        body: [
          "The audit that produced this case study found sixteen pages that all shared the exact same social-media preview image instead of their own, a leftover note telling search engines our work page was 'coming soon' when it had been live for weeks, and a work page that gave one project a big featured spot while the rest sat smaller below it, quietly suggesting it mattered more than the others.",
          "Every one of those got fixed in the same pass: all sixteen pages now generate their own proper preview image, the outdated note was corrected, and the work page was rebuilt so every case study, including this one, appears at exactly the same size and weight, with no favourites.",
        ],
        image: "/images/case-goodground-work.webp",
        imageAlt: "The /work page after the fix, showing every case study as an equal-size grid card with no featured project",
      },
      {
        heading: "An animation the audit flagged as broken, that wasn't",
        body: [
          "The same audit also reported that a small light animation on our recommended pricing card had stopped working, based on a screenshot that showed it sitting still. But checking the actual page over time told a different story: the light was moving exactly as it was supposed to.",
          "The likely explanation: a screenshot only ever catches one single frozen instant of a slow, looping animation, and any frozen instant of something in motion looks like it's standing still. It's a useful reminder that looking at a picture of a page and watching the real thing aren't the same test, and this case study only fixes what was actually found, not what a screenshot happened to catch by accident.",
        ],
        image: "/images/case-goodground-pricing.webp",
        imageAlt: "The four pricing package cards on the live site, with the recommended Grow card carrying an animated light along its edge",
      },
      {
        heading: "Numbers that hold up on the real domain",
        body: [
          "Every number in the results section below was measured against the real, live website, not a local copy on someone's laptop, and not a guess. If a claim about speed or accessibility is going to mean anything, it has to hold up on the site people actually visit.",
          "The site itself is intentionally unglamorous under the hood: nearly every page is built in advance rather than assembled on the fly, so visitors are served a ready-made page rather than waiting on a server to build one just for them.",
        ],
      },
      {
        heading: "Built mobile-first, same as every other project here",
        body: [
          "The same care that went into B3TTER and Point Break went into this site too: nothing was designed for a laptop screen and then awkwardly squeezed onto a phone afterwards, and every animated element respects a visitor's request for less motion.",
          "The difference here is what's at stake. If a client's site had a small layout bug, it would just be an embarrassing fix. If this site has one, it's us failing to keep the exact promise we make to everyone else.",
        ],
        image: "/images/case-goodground-mobile.webp",
        imageAlt: "The GoodGround homepage hero rendered on a 390px-wide phone screen",
        imageDimensions: { width: 390, height: 844 },
        imageFit: "phone",
      },
    ],
    results: [
      {
        value: "100",
        label: "Lighthouse Accessibility",
        verify: "Run Lighthouse against www.goodground.co.za in Chrome DevTools.",
      },
      {
        value: "100",
        label: "Lighthouse Best Practices",
        verify: "Same audit, same run.",
      },
      {
        value: "100",
        label: "Lighthouse SEO",
        verify: "Same audit, same run.",
      },
      {
        value: "772 ms",
        label: "Largest Contentful Paint",
        verify: "Record a performance trace against the live homepage in Chrome DevTools.",
      },
      {
        value: "0.02",
        label: "Cumulative Layout Shift",
        verify: "Same trace, same run.",
      },
      {
        value: "48 pages",
        label: "Statically generated at build time",
        verify: "Run a production build and read the route summary Next.js prints.",
      },
    ],
    resultsCaveat:
      "These numbers describe how the site is built, not how the business is performing: traffic, leads and client outcomes are real but aren't the subject of this page. Where they're relevant, they belong in a business update, not a build case study, and won't be invented here to fill the gap.",
  },
  {
    slug: "sunbird-early-learners",
    kind: "concept",
    client: "Sunbird Early Learners",
    title: "A preschool site built from one reference photo, with a booking flow that needs no server at all",
    standfirst:
      "Sunbird is our concept build for a fictional Cape Town preschool: a full, animation-led website matched to a single reference image, with a working visit-booking and enrolment flow that runs entirely in the visitor's browser.",
    summary:
      "A concept preschool website built from one client-supplied reference photo, carrying its own brand, colours and voice throughout. Includes a fully working booking and enrolment flow, built and tested end to end without a single line of backend code.",
    tags: ["Design", "Development", "Motion", "Booking UX"],
    year: "2026",
    datePublished: "2026-08-18",
    liveUrl: "https://preview.goodground.co.za/sunbird-early-learners/",
    image: "/images/case-sunbird-hero.webp",
    imageAlt:
      "The Sunbird Early Learners hero section, showing layered cutout photographs of children over a deep green background",
    snapshot: [
      { label: "Client", value: "Sunbird Early Learners — a GoodGround concept brand" },
      { label: "Industry", value: "Early childhood education, direct to parents" },
      { label: "Services", value: "Design, front-end build, booking UX, SEO setup" },
      { label: "Build", value: "Hand-written HTML, CSS and JavaScript. No framework, no build step, no backend." },
    ],
    challenge: [
      "A client sent us one reference photo of a website they liked and asked for something that felt the same, without copying it outright. That's a harder brief than it sounds: match the feeling and structure of someone else's design closely enough that it clearly did its job as a reference, while making sure the finished site has its own name, its own colours, its own voice, and never reads as a copy with the logo swapped out.",
      "On top of that, every 'Book a Visit' and 'Apply Now' button on a typical preschool site is usually just a link to a contact form, or worse, a dead link that goes nowhere. We wanted to build the real thing: a working booking and enrolment flow a parent could actually use, without a server, a database, or anyone on the other end to make it feel genuine.",
    ],
    solution: [
      {
        heading: "One reference photo, turned into a whole site's worth of decisions",
        body: [
          "We started by describing the reference image back in detail — the deep green hero, the cut-out photo shapes, the stats sitting on the seam between two sections, the mascot doodles, the big oversized name in the footer — and rebuilt each of those ideas with Sunbird's own colours, its own mascot, and copy written specifically for a Cape Town audience.",
          "The result reads as its own brand rather than a reskin: the same warm, playful feeling as the reference, the same structure, but nothing borrowed outright.",
        ],
        image: "/images/case-sunbird-trusted.webp",
        imageAlt: "The Trusted by Families section, showing organic blob-shaped photo cards in Sunbird's teal and marigold palette",
      },
      {
        heading: "A booking button that actually books something",
        body: [
          "Every 'Book a Visit' button on the site, and the 'Apply Now' button in the closing section, opens the same pop-up window with a real form: parent and child's names, contact details, the age group, and either a preferred visit date or a preferred starting term, depending on which button was clicked.",
          "Fill it in and submit, and it behaves like a real booking system would: checking the form is filled in properly, showing a brief sending state, then confirming back with a message built from what was actually typed in — the child's name, the programme, and the date or term chosen. Nothing is sent anywhere, since there's no real preschool on the other end, but every part of the experience works exactly as it would if there were.",
        ],
        image: "/images/case-sunbird-modal.webp",
        imageAlt: "The booking pop-up open on the live site, showing the visit-request form with parent, child and programme fields",
      },
      {
        heading: "Caught by looking twice, not just once",
        body: [
          "Every part of this site was screenshotted, checked, fixed, and screenshotted again, on a full-size screen, a tablet, and a phone. That habit is what caught the real problems: navigation text that was invisible against the dark background, a mobile menu that left a faint stripe behind when it closed, and a photo that overlapped the heading text on small phones.",
          "It also caught something smaller but just as real: a couple of photo captions that didn't actually match what was in the photo. Easy to miss on a quick glance, obvious the moment you look properly, which is the whole point of checking twice.",
        ],
        image: "/images/case-sunbird-mobile.webp",
        imageAlt: "The Sunbird hero rendered on a 390px-wide phone screen with no layout overflow",
        imageDimensions: { width: 390, height: 844 },
        imageFit: "phone",
      },
      {
        heading: "Two sections rebuilt after a second reference came in",
        body: [
          "Partway through, the client sent two more reference images and asked for the equivalent sections to be added. Rather than bolt them on as extra content and end up with two sections both explaining why the school could be trusted, we replaced the closest matching sections with the new approach, so the page still reads as one considered whole rather than a page that grew by accident.",
          "The programmes section became a scrollable set of age-based cards with its own working previous and next controls, and each card's 'Learn More' link opens the booking pop-up with that exact age group already selected — a small detail, but one that saves a parent from re-explaining what they just clicked on.",
        ],
        image: "/images/case-sunbird-programmes.webp",
        imageAlt: "The Programmes Designed for Every Stage carousel, showing four colour-coded age-group cards with prev/next arrows",
      },
    ],
    results: [
      {
        value: "5 files",
        label: "Entire site",
        verify:
          "View source on the live URL: index.html, styles.css, script.js, robots.txt and sitemap.xml. No bundler output, no framework.",
      },
      {
        value: "0",
        label: "Console errors",
        verify: "Open the Console on the live URL.",
      },
      {
        value: "0",
        label: "Broken requests",
        verify: "Open the Network panel on the live URL and reload — every request returns 200.",
      },
      {
        value: "44px",
        label: "Minimum touch target size",
        verify:
          "Inspect the mobile nav toggle or the gallery lightbox controls in DevTools — every tappable control measures at least 44×44px.",
      },
      {
        value: "2 in 1",
        label: "Booking flows, one pop-up",
        verify:
          "Click any 'Book a Visit' button, then 'Apply Now' in the closing section — same pop-up, two different forms.",
      },
    ],
    resultsCaveat:
      "Sunbird Early Learners is a fictional brand with no real families or enrolments, so like our other concept builds, there's no traffic or booking data to report, and we're not going to invent any. The site also carries a deliberate noindex tag and a Disallow in robots.txt, so a made-up preschool doesn't turn up in real search results. Every number above can be checked directly in your own browser.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

const KIND_LABELS: Record<CaseStudyKind, string> = {
  concept: "Concept build",
  client: "Client project",
  studio: "Our own site",
};

export const caseStudyKindLabel = (kind: CaseStudyKind) => KIND_LABELS[kind];
