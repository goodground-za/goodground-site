/**
 * Real projects only — CLAUDE.md §9. While empty, /work renders an honest
 * "case studies coming soon" state rather than fabricated work.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  image: string;
  resultStat?: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [];
