/**
 * Content specific to the homepage's own section set (promoted from the
 * approved /home-test variant, formerly content/home-test.ts). Everything
 * else the homepage needs (services, industries, process, FAQ, NAP) is read
 * directly from the existing content files, so there's exactly one source
 * of truth for each — only genuinely new copy for these sections lives here.
 *
 * Trimmed 2026-08-23: heroImage/heroImageMobile/carouselCards/processBanner
 * and their backing images were removed once the components that used them
 * (the pre-2026-08-20 Hero, ServiceCarousel and CreativeProcess) were deleted
 * as dead code from the earlier homepage design.
 */

export type Reason = { title: string; body: string };

/**
 * The client's mockup shipped its 4th card ("Creative Strategy") with literal
 * "Need text" placeholder copy. Written 2026-08-13 in the voice of the other
 * five and against facts already stated elsewhere on the site (strategy
 * before design, per content/process.ts and the About page's beliefs list).
 */
export const sixReasons: Reason[] = [
  {
    title: "World Class Quality",
    body: "Every project is shaped with senior-level craft, clear thinking, and detail we'd proudly put in our portfolio.",
  },
  {
    title: "Personalised Design",
    body: "No recycled templates. Every interface, brand asset, and digital experience is shaped around your goals.",
  },
  {
    title: "Problem Solving",
    body: "We don't just make things look good. We clarify friction, improve journeys, and design with purpose.",
  },
  {
    title: "Strategy First",
    body: "We start with your business and your customers, not a blank canvas. The plan gets agreed before anything gets designed.",
  },
  {
    title: "Quick Turnaround",
    body: "AI-assisted and human-finished, so work moves faster without feeling rushed or generic.",
  },
  {
    title: "Clear Pricing",
    body: "Simple scope, transparent effort, and no surprise costs once the direction is agreed.",
  },
];
