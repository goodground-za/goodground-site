import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import type { Block } from "@/content/articles";
import { pricesAsOf } from "@/content/pricing";

import { ButtonLink } from "../Button";
import { FaqAccordion } from "../FaqAccordion";
import { Icon, type IconName } from "../Icon";
import { formatNumber, formatRand } from "../format";
import { buildItemById, encodeBuild } from "../pricing/data";
import { Checklist, PlanCards } from "./ArticleClient";

/** "The short answer: real 2026 price ranges" -> "the-short-answer-real-2026-price-ranges". */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Renders `[label](/path)` inside article text as a real link. The content model is plain typed
 * data with no JSX (no CMS), so contextual internal links use this tiny markdown-ish syntax.
 * Internal paths use next/link; anything else is a normal anchor that leaves the site.
 */
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
export function withLinks(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [full, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      href.startsWith("/") ? (
        <Link key={`${href}-${at}`} href={href} className="ar-link">
          {label}
        </Link>
      ) : (
        <a key={`${href}-${at}`} href={href} rel="noopener noreferrer" className="ar-link">
          {label}
        </a>
      ),
    );
    last = at + full.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length ? out : text;
}

const CALLOUT_ICON: Record<"tip" | "warning" | "note", IconName> = { tip: "bulb", warning: "alert", note: "doc" };

const ADDON_LABEL: Record<string, string> = {
  "pages-standard": "Extra standard page",
  "pages-complex": "Complex custom page",
  "pages-blog-setup": "Blog setup",
  "seo-advanced": "Advanced SEO",
  "func-conditional-form": "Conditional-logic form",
};

function Soft({ children, className }: { children: ReactNode; className?: string }) {
  // Content blocks (not paragraphs or headings) fade up 12px.
  return (
    <div className={className ? `ar-block ${className}` : "ar-block"} data-reveal="group">
      {children}
    </div>
  );
}

function BarsChart({ block }: { block: Extract<Block, { type: "bars" }> }) {
  const max = Math.max(...block.bars.map((b) => b.value));
  return (
    <Soft className="ar-bars">
      <div className="ar-bars__head">
        <strong>{block.title}</strong>
        <span>{block.sub}</span>
      </div>
      <ul className="ar-bars__cols">
        {block.bars.map((bar, i) => (
          <li key={bar.label} style={{ "--i": i } as CSSProperties}>
            <strong className="gg-number">
              {block.unit}
              {formatNumber(bar.value)}
            </strong>
            <span className="ar-bars__bar" style={{ "--h": bar.value / max } as CSSProperties} />
            <small>{bar.label}</small>
          </li>
        ))}
      </ul>
      <p>{block.note}</p>
    </Soft>
  );
}

/** Rich-text blocks to markup. Headings and paragraphs are plain (reading text should simply be there). */
export function ArticleBlocks({ blocks, slug }: { blocks: Block[]; slug: string }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={i} className="ar-lead">
                {withLinks(block.text)}
              </p>
            );
          case "p":
            return (
              <p key={i} className="ar-p">
                {withLinks(block.text)}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)} className="ar-h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="ar-h3">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="ar-ul">
                {block.items.map((item) => (
                  <li key={item}>{withLinks(item)}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i} className="ar-pull" data-reveal="group">
                <span className="ar-pull__line" aria-hidden="true" />
                <p>{block.text}</p>
              </blockquote>
            );
          case "options":
            return (
              <Soft key={i}>
                <ul className="ar-options">
                  {block.items.map((item) => (
                    <li key={item.label} className={item.highlight ? "is-highlight" : undefined}>
                      <span className="ar-options__text">
                        <span className="ar-options__label">
                          <strong>{item.label}</strong>
                          <small>{item.sub}</small>
                        </span>
                        <span className="ar-options__desc">{item.text}</span>
                      </span>
                      <span className="ar-options__value gg-number">
                        <span className="ar-hide-phone">{item.value}</span>
                        <span className="ar-phone-only">{item.shortValue ?? item.value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Soft>
            );
          case "factors":
            return (
              <Soft key={i}>
                <ul className="ar-factors">
                  {block.items.map((item, n) => (
                    <li key={item.title}>
                      <span className="ar-factors__chip" aria-hidden="true">
                        <Icon name={item.icon as IconName} size={20} stroke={2} />
                      </span>
                      <span className="ar-factors__text">
                        <strong>{item.title}</strong>
                        <span>{item.text}</span>
                      </span>
                      <span className="ar-factors__n gg-number" aria-hidden="true">
                        {String(n + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </Soft>
            );
          case "checklist":
            return (
              <Soft key={i}>
                <Checklist storageKey={`gg-article-${slug}-${block.id}`} title={block.title} items={block.items} shortItems={block.shortItems} />
              </Soft>
            );
          case "callout":
            return (
              <Soft key={i} className={`ar-callout ar-callout--${block.tone}`}>
                <span className="ar-callout__icon" aria-hidden="true">
                  <Icon name={CALLOUT_ICON[block.tone]} size={16} stroke={2} />
                </span>
                <p>{withLinks(block.text)}</p>
              </Soft>
            );
          case "table":
            return (
              <Soft key={i} className="ar-tablewrap">
                <div className="ar-table" role="region" aria-label="Table" tabIndex={0}>
                  <table>
                    <thead>
                      <tr>
                        {block.head.map((h) => (
                          <th key={h} scope="col" className="gg-kicker">
                            {h.toUpperCase()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, c) => (
                            <td key={c}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Soft>
            );
          case "bars":
            return <BarsChart key={i} block={block} />;
          case "plans":
            return (
              <Soft key={i}>
                <PlanCards asOf={pricesAsOf} />
              </Soft>
            );
          case "addons": {
            const items = block.ids.flatMap((id) => {
              const item = buildItemById.get(id);
              return item ? [{ item, label: ADDON_LABEL[id] ?? item.short }] : [];
            });
            return (
              <Soft key={i} className="ar-addons">
                <p>{block.intro}</p>
                <ul>
                  {items.map(({ item, label }) => (
                    <li key={item.id}>
                      {/* Opens the build-your-own tool with this item already added. */}
                      <Link href={`/pricing?build=${encodeBuild({ [item.id]: 1 })}#build-your-own`} className="ar-chip">
                        <Icon name="plus" size={14} stroke={2.4} />
                        <span>{label}</span>
                        <strong>{formatRand(item.price)}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/pricing#build-your-own" variant="outline">
                  Open the build-your-own tool
                </ButtonLink>
              </Soft>
            );
          }
          case "payment":
            return (
              <Soft key={i} className="ar-pay">
                <div className="ar-pay__card">
                  <span className="ar-pay__big gg-number">50 / 50</span>
                  <strong>50% deposit</strong>
                  <p>Half upfront secures the project; the other half on completion, before handover.</p>
                </div>
                <div className="ar-pay__card ar-pay__card--blush">
                  <span className="ar-pay__big gg-number">12 ×</span>
                  <strong>12-month plan</strong>
                  <p>The first instalment books your slot; the other 11 start once the project is complete.</p>
                </div>
              </Soft>
            );
          case "faq":
            return (
              <div key={i} className="ar-faq" data-reveal="group">
                <FaqAccordion
                  tone="plain"
                  items={block.items.map((item) => ({ question: item.question, answer: [item.answer.replace(LINK_RE, "$1")] }))}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
