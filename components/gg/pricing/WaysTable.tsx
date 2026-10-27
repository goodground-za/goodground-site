"use client";

import { useState, type CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { CountUp } from "../CountUp";
import { formatRand } from "../format";
import { Icon } from "../Icon";
import { WAY_ROWS, ways, type WayValue } from "./data";

/** A value in the Oswald "money" rows: a count-up figure, or plain text such as "Nothing". */
function Money({ v }: { v: WayValue }) {
  if (v.money === undefined) return <span className="pr-money">{v.text}</span>;
  return (
    <span className={v.coral ? "pr-money is-coral" : "pr-money"}>
      <CountUp to={v.money} prefix={`${v.prefix ?? ""}R`} suffix={v.suffix} />
    </span>
  );
}

/** A value in the sentence rows. Any figure inside is plain text, not a count-up. */
function Plain({ v }: { v: WayValue }) {
  return (
    <>
      {v.text}
      {v.money !== undefined ? formatRand(v.money) : null}
    </>
  );
}

/**
 * Pricing 02. Desktop: a real table. Columns are the four ways to pay, rows are
 * Upfront, Monthly, How long, Total over 12 months, What you get, At the end.
 * Hovering a column rings it and dims the others to 85%. Below 1024px it becomes
 * swipeable cards (scroll-snap, 280px) showing Monthly and Total, where "See all
 * details" opens that card to all six rows (one open at a time).
 */
export function WaysTable() {
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <div className="pr-ways-table-wrap">
        <table className="pr-ways-table" data-hover={hover !== null ? "" : undefined} onMouseLeave={() => setHover(null)}>
          <caption className="gg-sr-only">Four ways to pay, compared</caption>
          <colgroup>
            <col className="pr-ways-labels" />
            {ways.map((way) => (
              <col key={way.id} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <td className="pr-ways-corner" />
              {ways.map((way, c) => (
                <th
                  key={way.id}
                  scope="col"
                  className={`pr-col pr-col--${way.tone} is-first`}
                  data-active={hover === c ? "" : undefined}
                  onMouseEnter={() => setHover(c)}
                >
                  <span className="pr-col__name">{way.name}</span>
                  <span className="pr-col__sub">{way.sub}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody data-reveal="stagger" style={{ "--gg-stagger-step": "40ms" } as CSSProperties}>
            {WAY_ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row" className="pr-rowlabel">
                  {row.label}
                </th>
                {ways.map((way, c) => (
                  <td
                    key={way.id}
                    className={`pr-col pr-col--${way.tone}`}
                    data-active={hover === c ? "" : undefined}
                    onMouseEnter={() => setHover(c)}
                  >
                    {row.money ? <Money v={way[row.key]} /> : <span className="pr-cell"><Plain v={way[row.key]} /></span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="pr-rowlabel pr-rowlabel--cta">
                <span className="gg-sr-only">Choose</span>
              </th>
              {ways.map((way, c) => (
                <td
                  key={way.id}
                  className={`pr-col pr-col--${way.tone} is-last`}
                  data-active={hover === c ? "" : undefined}
                  onMouseEnter={() => setHover(c)}
                >
                  <ButtonLink href={way.cta.href} variant={way.cta.variant} full>
                    {way.cta.label}
                  </ButtonLink>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="pr-ways-cards" aria-label="Four ways to pay">
        {ways.map((way) => {
          const expanded = open === way.id;
          return (
            <li key={way.id} className={`pr-wcard pr-wcard--${way.tone}${expanded ? " is-open" : ""}`}>
              <h3 className="pr-wcard__name">{way.card.name}</h3>
              <div className="pr-wcard__vals">
                <div>
                  <p className="pr-wcard__label">Monthly</p>
                  <Money v={way.card.monthly} />
                </div>
                <div>
                  <p className="pr-wcard__label">Total over 12 months</p>
                  <Money v={way.card.total} />
                </div>
              </div>
              <button
                type="button"
                className="pr-wcard__more"
                aria-expanded={expanded}
                aria-controls={`pr-wcard-${way.id}`}
                onClick={() => setOpen(expanded ? null : way.id)}
              >
                {expanded ? "Hide details" : "See all details"}
                <Icon name="chev" size={14} stroke={2.2} />
              </button>
              <div id={`pr-wcard-${way.id}`} className="pr-wcard__panel" inert={!expanded}>
                <div className="pr-wcard__panel-in">
                <dl>
                  {WAY_ROWS.map((row) => (
                    <div key={row.key}>
                      <dt>{row.label}</dt>
                      <dd>
                        <Plain v={way[row.key]} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <ButtonLink href={way.cta.href} variant={way.cta.variant === "coral" ? "coral" : "outline"} className="pr-wcard__cta">
                  {way.cta.label}
                </ButtonLink>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
