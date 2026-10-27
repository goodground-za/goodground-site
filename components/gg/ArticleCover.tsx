import { Icon, type IconName } from "./Icon";

/**
 * Generated cover art for Insights cards, the article page and "Related
 * reading" — Figma set 41:177. No photos.
 *
 * A new topic needs a colour and icon decision before it is added here.
 */
export type CoverTopic = "websites" | "growth" | "pricing";

const TOPICS: Record<CoverTopic, { icon: IconName; word: string }> = {
  websites: { icon: "code", word: "Websites" },
  growth: { icon: "up", word: "Growth" },
  pricing: { icon: "tag", word: "Pricing" },
};

export function ArticleCover({ topic, className }: { topic: CoverTopic; className?: string }) {
  const { icon, word } = TOPICS[topic];
  return (
    <div className={`gg-cover gg-cover--${topic}${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span className="gg-cover__circle" />
      <span className="gg-cover__circle" />
      <span className="gg-cover__circle" />
      <span className="gg-cover__chip">
        <Icon name={icon} size={32} stroke={2} />
      </span>
      <span className="gg-cover__word">{word}</span>
    </div>
  );
}
