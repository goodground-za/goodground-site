import type { CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { Icon, type IconName } from "../Icon";
import { Resp } from "../Resp";
import { Tag } from "../Tag";
import { HighlightHeading } from "./HighlightHeading";

const REASONS: { icon: IconName; title: string; long: string; short: string }[] = [
  {
    icon: "compass",
    title: "Strategy first",
    long: "The plan gets agreed with you before anything gets designed.",
    short: "The plan is agreed before anything is designed.",
  },
  {
    icon: "pen",
    title: "Personalised design",
    long: "No recycled templates. Everything shaped around your goals.",
    short: "No recycled templates, ever.",
  },
  {
    icon: "bulb",
    title: "Problem solving",
    long: "We clarify friction and improve journeys, not just looks.",
    short: "We fix friction, not just looks.",
  },
  {
    icon: "bolt",
    title: "Quick turnaround",
    long: "AI-assisted and human-finished, so work moves faster.",
    short: "AI-assisted, human-finished.",
  },
  {
    icon: "tag",
    title: "Clear pricing",
    long: "Simple scope, transparent effort, no surprise costs.",
    short: "Simple scope, no surprise costs.",
  },
  {
    icon: "heart",
    title: "Support past launch",
    long: "A month of support included, and Full Service after that.",
    short: "A month of support included.",
  },
];

/**
 * Home 08. Desktop: the left column is sticky while the reason grid scrolls
 * past, and the heading's words light up as the section scrolls. Phones: no
 * sticky column and no scrub; the reasons are one white list with dividers.
 * The reasons are informational, not links: no lift, just the icon chip turning.
 */
export function StoryReasons() {
  return (
    <section className="hm-section hm-section--lilac" aria-labelledby="story-title">
      <div className="gg-wrap hm-story">
        <div className="hm-story__copy" data-reveal="group">
          <Tag tone="plum" className="hm-fu">
            06 / WHY WE START HERE
          </Tag>
          <div className="hm-fu" style={{ "--gg-i": 1 } as CSSProperties}>
            <HighlightHeading id="story-title" text="Good ground grows good business." />
          </div>
          <p className="gg-lead hm-story__body hm-fu" style={{ "--gg-i": 2 } as CSSProperties}>
            <Resp
              long="Our name comes from the Parable of the Sower: seed scattered on paths, rocks and thorns fails, but seed on prepared, deep-rooted soil produces a harvest. That’s the ground we help you build on, before you grow."
              short="Our name comes from the Parable of the Sower: only seed on prepared, deep-rooted soil produces a harvest. That’s the ground we help you build on."
            />
          </p>
          <div className="hm-fu" style={{ "--gg-i": 3 } as CSSProperties}>
            <ButtonLink href="/about#our-story" variant="outline">
              Read the full story
            </ButtonLink>
          </div>
        </div>

        <ul className="hm-reasons" data-reveal="stagger" style={{ "--gg-stagger-step": "70ms" } as CSSProperties}>
          {REASONS.map((reason) => (
            <li key={reason.title} className="hm-reason">
              <span className="hm-reason__icon" aria-hidden="true">
                <Icon name={reason.icon} size={22} stroke={2} />
              </span>
              <div className="hm-reason__text">
                <h3>{reason.title}</h3>
                <p>
                  <Resp long={reason.long} short={reason.short} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
