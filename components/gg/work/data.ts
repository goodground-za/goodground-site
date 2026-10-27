import { caseStudies, type CaseStudyKind } from "@/content/caseStudies";

/**
 * Cards for /work, built from content/caseStudies.ts so nothing is typed twice
 * (title, slug, kind, services, image). The card summaries are the Figma
 * wording (Work 03); the "MEASURED" line is a real figure from each case
 * study's own results (the Figma file shows placeholders for three of them).
 */
export type WorkProject = {
  slug: string;
  kind: CaseStudyKind;
  typeLabel: string;
  title: string;
  image: string;
  imageAlt: string;
  summary: string;
  summaryShort: string;
  services: string[];
  keyResult: string;
};

const COPY: Record<string, { title: string; summary: string; short: string; result: string }> = {
  "b3tter-bottle": {
    title: "B3TTER",
    summary:
      "A concept product site that shows what a premium single-product page can look like: beautiful photography that loads fast, and an experience that works with a mouse, a keyboard or a screen reader.",
    short: "A premium single-product page: beautiful photography that loads fast, and works with a mouse, keyboard or screen reader.",
    result: "100 Accessibility · 56 MB → 1.5 MB photos",
  },
  "point-break-surf": {
    title: "Point Break Surf Academy",
    summary:
      "A concept booking site for a surf academy: pricing, itineraries, coach bios and a custom package builder on one page, without a single visitor waiting for anything to load.",
    short: "A one-page booking site with pricing, itineraries, coach bios and a package builder, with no waiting.",
    result: "100 Accessibility · 5 files, whole site",
  },
  "goodground-site": {
    title: "GoodGround",
    summary:
      "Our own site, built and checked the way we check every client’s: what we found when we audited ourselves, and what we fixed.",
    short: "Our own site, audited the way we audit clients’, and what we fixed.",
    result: "100 Accessibility, Best Practices and SEO",
  },
  "sunbird-early-learners": {
    title: "Sunbird Early Learners",
    summary:
      "A concept preschool site built from one reference photo, with its own brand and voice and a fully working booking and enrolment flow, without a line of backend code.",
    short: "A preschool site built from one reference photo, with a working booking and enrolment flow.",
    result: "5 files, whole site · 0 console errors",
  },
};

const TYPE_LABEL: Record<CaseStudyKind, string> = {
  concept: "CONCEPT BUILD",
  studio: "OUR OWN SITE",
  client: "CLIENT WORK",
};

export const workProjects: WorkProject[] = caseStudies.map((cs) => {
  const copy = COPY[cs.slug];
  return {
    slug: cs.slug,
    kind: cs.kind,
    typeLabel: TYPE_LABEL[cs.kind],
    title: copy?.title ?? cs.client,
    image: cs.image,
    imageAlt: cs.imageAlt,
    summary: copy?.summary ?? cs.summary,
    summaryShort: copy?.short ?? cs.summary,
    services: cs.tags,
    keyResult: copy?.result ?? `${cs.results[0]?.value ?? ""} ${cs.results[0]?.label ?? ""}`.trim(),
  };
});

export const workCounts = {
  total: workProjects.length,
  concept: workProjects.filter((p) => p.kind === "concept").length,
  studio: workProjects.filter((p) => p.kind === "studio").length,
  client: workProjects.filter((p) => p.kind === "client").length,
};
