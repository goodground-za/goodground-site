import type { IconName } from "../Icon";

/**
 * /about copy. All of it comes from the live /about page, lightly tightened as
 * the Figma frame does it. Three things are NEW in the design and flagged in
 * tasks/figma-redesign-questions.md: the four "On the web" lines, the stats
 * strip (10+ and 20+ must both stay true), and the hero image (a gradient
 * stands in until a real photo exists).
 */

export const stats = [
  { value: "2026", label: "founded", countTo: null as number | null, suffix: "" },
  { value: "10+", label: "years founder experience", countTo: 10, suffix: "+" },
  { value: "20+", label: "years combined experience", countTo: 20, suffix: "+" },
  { value: "1", label: "connected team", countTo: 1, suffix: "" },
];

export const problems: { icon: IconName; title: string; short: string; body: string; shortBody: string }[] = [
  {
    icon: "eye",
    title: "Websites that looked polished and did nothing",
    short: "Polished websites that did nothing",
    body: "No strategy behind the design, and no plan for what happened after launch.",
    shortBody: "No strategy, no plan after launch.",
  },
  {
    icon: "wallet",
    title: "The whole bill, upfront",
    short: "The whole bill, upfront",
    body: "Which put a proper website out of reach for a business that was still growing.",
    shortBody: "Out of reach for a growing business.",
  },
];

export const grounds: { icon: IconName; name: string; parable: string; web: string; good?: boolean }[] = [
  { icon: "arrow", name: "The path", parable: "Seed lands on the surface and never takes hold.", web: "A website with no strategy" },
  { icon: "layers", name: "Rocky ground", parable: "It sprouts fast, then withers without roots.", web: "A quick launch with no plan after it" },
  { icon: "alert", name: "Among thorns", parable: "It grows, but gets choked by everything around it.", web: "Good work buried by a poor experience" },
  {
    icon: "sprout",
    name: "Good ground",
    parable: "Prepared, deep-rooted soil that produces a harvest.",
    web: "A strong foundation, then growth",
    good: true,
  },
];

export const statements = [
  "A logo without strategy has little value.",
  "A website without purpose rarely performs.",
  "Marketing can’t fix a poor customer experience.",
  "Growth is the result of a strong foundation, not a substitute for one.",
];

export const beliefs = [
  "Strong businesses are built on strong foundations.",
  "Strategy comes before design.",
  "Design should solve a problem, not decorate one.",
  "Growth is earned through consistency, not a single big launch.",
  "Simple is powerful.",
  "Relationships matter more than transactions, which is why we don’t ask for your entire budget on day one.",
];

export const soils = [
  {
    name: "The Path",
    heart: "Hard Heart",
    text: "Seed is snatched away by birds, representing those who hear the message but don’t understand it, making them vulnerable to the devil.",
  },
  {
    name: "Rocky Ground",
    heart: "Shallow Heart",
    text: "Plants sprout quickly but wither in the sun because they have no deep root. This represents people who receive the word with joy but fall away as soon as trouble or persecution arises.",
  },
  {
    name: "Among Thorns",
    heart: "Crowded Heart",
    text: "The seed grows but is choked out by thorns. This symbolises those whose faith is suffocated by the worries of life, the deceitfulness of wealth, and worldly desires.",
  },
  {
    name: "Good Soil",
    heart: "Fruitful Heart",
    text: "The seed takes root and yields a massive harvest. This represents people who hear the word, understand it, and produce a fruitful life.",
    good: true,
  },
];
