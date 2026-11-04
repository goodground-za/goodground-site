import { formatRand } from "@/components/gg/format";
import { localFromMonthly } from "@/content/pricing";

/**
 * The three conversion tracks of the funnel and the one place their button
 * labels, destinations and next-best-track links are written. The gradient CTA, and later the heroes and
 * sticky bars, read these; no page types a track label by hand.
 *
 *  - local:  Track A, a monthly Local plan. "Get my free preview".
 *  - custom: Track B, a custom build. "Start your project".
 *  - check:  Track C, the free AI visibility check. "Book a free check".
 */
export type PrimaryTrack = "local" | "custom" | "check";

export const PRIMARY_TRACKS: PrimaryTrack[] = ["local", "custom", "check"];
export const isPrimaryTrack = (v: unknown): v is PrimaryTrack => typeof v === "string" && (PRIMARY_TRACKS as string[]).includes(v);

export type TrackAction = { label: string; href: string };

const q = (ref?: string) => (ref ? `ref=${encodeURIComponent(ref)}` : "");

/** The primary (Light) button for a track. `ref` is the page the visitor is on. */
export function trackPrimary(track: PrimaryTrack, ref?: string): TrackAction {
  switch (track) {
    case "local":
      return { label: "Get my free preview", href: `/start-project?plan=local-plus${ref ? `&${q(ref)}` : ""}` };
    case "check":
      return { label: "Book a free check", href: `/services/ai-visibility${ref ? `?${q(ref)}` : ""}#book` };
    default:
      return { label: "Start your project", href: `/start-project${ref ? `?${q(ref)}` : ""}` };
  }
}

/** The secondary link/button for a track. */
export function trackSecondary(track: PrimaryTrack): TrackAction {
  switch (track) {
    case "local":
      return { label: "See monthly plans", href: "/pricing#monthly" };
    case "check":
      return { label: "See a sample report", href: "/services/ai-visibility#sample" };
    default:
      return { label: "See pricing", href: "/pricing" };
  }
}

/**
 * The single text link under the CTA buttons, pointing to the next-best track.
 * Custom pages offer the monthly plans; local pages offer the free check; check
 * pages offer a custom build.
 */
export function trackNextLink(track: PrimaryTrack, ref?: string): TrackAction {
  switch (track) {
    case "local":
      return { label: "Not ready yet? Book a free AI check →", href: `/services/ai-visibility${ref ? `?${q(ref)}` : ""}#book` };
    case "check":
      return { label: "Ready to build? Start your project →", href: `/start-project${ref ? `?${q(ref)}` : ""}` };
    default:
      return { label: `Just need to be found? Monthly plans from ${formatRand(localFromMonthly)} →`, href: "/pricing#monthly" };
  }
}

/**
 * Default track per page type. Content records
 * carry their own `primaryTrack`; these cover pages with no record.
 */
export const PAGE_TRACKS = {
  home: "local",
  about: "custom",
  work: "custom",
  caseStudy: "custom",
  process: "custom",
  services: "custom",
  insights: "check",
  notFound: "custom",
  faq: "custom",
  /** Articles that do not set `cta.track`. */
  article: "check",
} as const satisfies Record<string, PrimaryTrack>;
