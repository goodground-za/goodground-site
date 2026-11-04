import { Icon, type IconName } from "./Icon";

/**
 * Generated cover art for Insights cards, the article page and "Related
 * reading" — Figma set 41:177. No photos.
 *
 * A new topic needs a colour and icon decision before it is added here. "AI search" (mint
 * with the search icon) is the cover for the AI visibility articles.
 */
export type CoverTopic = "websites" | "growth" | "pricing" | "ai-search";

const TOPICS: Record<CoverTopic, { icon: IconName; word: string }> = {
  websites: { icon: "code", word: "Websites" },
  growth: { icon: "up", word: "Growth" },
  pricing: { icon: "tag", word: "Pricing" },
  "ai-search": { icon: "search", word: "AI search" },
};

/** An article's `category` ("Growth", "AI search" ...) as a cover topic; anything unknown is Websites. */
export function coverTopic(category: string): CoverTopic {
  const key = category.trim().toLowerCase().replace(/\s+/g, "-");
  return key === "growth" || key === "pricing" || key === "ai-search" ? key : "websites";
}

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
