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
 */

export type CaseStudyKind = "concept" | "client";

export type Metric = {
  value: string;
  label: string;
  /** How a reader can check this themselves. Required — if it can't be checked, don't claim it. */
  verify: string;
};

export type CaseStudy = {
  slug: string;
  kind: CaseStudyKind;
  /** Client/brand name. */
  client: string;
  /** Headline for the case study page. */
  title: string;
  /** One line under the headline. */
  standfirst: string;
  /** Card summary on /work. */
  summary: string;
  tags: string[];
  year: string;
  liveUrl?: string;
  /** Hero screenshot. */
  image: string;
  imageAlt: string;
  snapshot: { label: string; value: string }[];
  challenge: string[];
  solution: { heading: string; body: string[]; image?: string; imageAlt?: string }[];
  results: Metric[];
  /** Plain-language note on what the results do and do not prove. */
  resultsCaveat: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "b3tter-bottle",
    kind: "concept",
    client: "B3TTER",
    title: "A premium product page, built and measured in a day",
    standfirst:
      "B3TTER is our own concept build: a full product site for an insulated stainless steel bottle, scoring 100 for accessibility on the live URL with 56 MB of source photography shipped as 1.5 MB.",
    summary:
      "A concept product site built to show what a premium single-product page looks like when every image is optimised and every interaction is accessible. Live, public, and testable.",
    tags: ["Design", "Development", "Accessibility", "Performance"],
    year: "2026",
    liveUrl: "https://preview.goodground.co.za/better-bottle/",
    image: "/images/case-b3tter-hero.webp",
    imageAlt:
      "The B3TTER product site hero, showing six colourways of an insulated bottle across the full width of the page",
    snapshot: [
      { label: "Client", value: "B3TTER — a GoodGround concept brand" },
      { label: "Industry", value: "Outdoor gear, direct to consumer" },
      { label: "Services", value: "Design, front-end build, image optimisation, accessibility, SEO setup" },
      { label: "Build", value: "Hand-written HTML, CSS and JavaScript. No framework, no build step, no third-party requests." },
    ],
    challenge: [
      "Most product pages for physical goods fail in the same two places. The photography is heavy enough to stall the page on a phone, and the interactive parts — colour pickers, review sliders, image galleries — are built with a mouse in mind and fall apart for anyone using a keyboard or a screen reader.",
      "We wanted to prove both problems are solvable at the same time, on a page that still had to feel expensive. So we set the brief against ourselves: 56 MB of studio renders and lifestyle photography, a live colour switcher, a review carousel, an animated statistic grid, and a hard requirement that none of it drop a single accessibility point.",
    ],
    solution: [
      {
        heading: "The product carries the colour, the interface stays silent",
        body: [
          "The entire interface is monochrome. Every bit of colour on the page comes from the bottle itself, which is what makes a six-colourway range read as a range rather than as decoration.",
          "The finish switcher crossfades six real photographs rather than recolouring one. Each shot is preloaded and stacked, so changing colour never flashes white while an image loads, and the swatches respond to arrow keys as well as clicks.",
        ],
        image: "/images/case-b3tter-finishes.webp",
        imageAlt: "The finish switcher showing six colour swatches beneath the selected bottle",
      },
      {
        heading: "A bento grid that actually packs",
        body: [
          "The specification section is a bento grid of mixed tile sizes rather than a row of identical cards. Uniform card grids are the visual default of every template on the internet, and varying the spans gives the section a focal point instead of an even field.",
          "It packs exactly: four columns by three rows at desktop, two by three at tablet, with no orphan tiles and no gaps at any width. We verified that by mapping every grid cell and checking coverage, not by looking at it.",
        ],
        image: "/images/case-b3tter-bento.webp",
        imageAlt: "The bento grid showing mixed-size tiles for construction, temperature and mouth width",
      },
      {
        heading: "56 MB of photography, shipped as 1.5 MB",
        body: [
          "Twenty-seven source images arrived as PNGs and JPEGs totalling 56 MB. Every one was converted to WebP, resized to the largest size it is actually displayed at, and trimmed to the product's real bounds so the layout is not fighting empty transparent space.",
          "The finished page ships 1.5 MB across 28 files, with alpha preserved on every product cut-out. Nothing is loaded from a CDN, an analytics script or a font service, so there is no third-party request anywhere in the page.",
        ],
        image: "/images/case-b3tter-lifestyle.webp",
        imageAlt: "The lifestyle section pairing environment photography with macro detail shots",
      },
      {
        heading: "Accessible because it was checked, not because it was assumed",
        body: [
          "Every interactive part is reachable and operable by keyboard: the colour switcher, the review slider, the mobile menu and the navigation. The slider exposes only the visible quote to screen readers, and the auto-advance stops the moment anyone hovers, focuses or clicks.",
          "All motion — the hero settle, the scroll reveals, the counting statistics, the carousel — is switched off under prefers-reduced-motion rather than merely slowed down.",
        ],
        image: "/images/case-b3tter-mobile.webp",
        imageAlt: "The B3TTER site on a phone, showing the hero and the six-bottle lineup",
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
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
