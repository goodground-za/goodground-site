import type { CSSProperties } from "react";

import type { ShortAnswer as ShortAnswerData } from "@/content/articles";

import { formatRand } from "../format";
import { Tag } from "../Tag";

const pct = (value: number, max: number) => `${(value / max) * 100}%`;

/**
 * The TL;DR card (Article 01): one sentence and a range chart. The chart is real HTML with text
 * labels (not an image), so the numbers are readable by search engines and screen readers. Each
 * bar grows from its start value to its end value (scaleX from the bar's left edge, 120ms
 * stagger); the peach "typical" band grows last. Hover or focus shows the exact range.
 */
export function ShortAnswerCard({ data }: { data: ShortAnswerData }) {
  return (
    <section className="ar-short" data-reveal="group" aria-label="The short answer">
      <div className="ar-short__head">
        <Tag tone="on-dark">THE SHORT ANSWER</Tag>
        <span>{data.label}</span>
      </div>
      <p className="ar-short__sentence">{data.sentence}</p>

      <div className="ar-range" role="table" aria-label="Typical build price ranges">
        <div className="ar-range__axis" aria-hidden="true">
          {data.axis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        {data.ranges.map((range, i) => {
          const typical = range.typical ? `${formatK(range.typical[0])} – ${formatK(range.typical[1])}` : null;
          const tip = typical ? `${range.label}: ${range.range} · most land ${typical}` : `${range.label}: ${range.range}`;
          return (
            <div key={range.label} role="row" className={range.highlight ? "ar-range__row is-highlight" : "ar-range__row"} style={{ "--i": i } as CSSProperties}>
              <p className="ar-range__label" role="rowheader">
                <strong>{range.label}</strong>
                <span>
                  <span className="ar-hide-phone">{range.range}</span>
                  <span className="ar-phone-only">{range.shortRange}</span>
                </span>
              </p>
              <div className="ar-range__track" role="cell">
                <span
                  className="ar-range__bar"
                  role="img"
                  tabIndex={0}
                  data-tip={tip}
                  aria-label={tip}
                  style={{ left: pct(range.from, data.max), width: pct(range.to - range.from, data.max) }}
                />
                {range.typical ? (
                  <span
                    className="ar-range__typical"
                    aria-hidden="true"
                    style={{ left: pct(range.typical[0], data.max), width: pct(range.typical[1] - range.typical[0], data.max) }}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="ar-short__legend">
        <p className="ar-short__legend-key">
          <i aria-hidden="true" />
          {data.legend}
        </p>
        <p className="ar-short__note">
          <span className="ar-hide-phone">{data.note}</span>
          <span className="ar-phone-only">{data.shortNote}</span>
        </p>
      </div>
    </section>
  );
}

const formatK = formatRand;
