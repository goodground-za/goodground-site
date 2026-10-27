"use client";

import { useState } from "react";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { SectionHeader } from "../SectionHeader";
import { Tag } from "../Tag";
import { COMPARE_ROWS, MOBILE_ROWS, PLANS, PLAN_CTA, type Cell, type PlanKey } from "./data";

const KEYS: PlanKey[] = ["build", "care", "full"];

function CellContent({ value, plum }: { value: Cell; plum?: boolean }) {
  if (value === "yes") {
    return (
      <>
        <span className={plum ? "sv-tick sv-tick--coral" : "sv-tick"} aria-hidden="true">
          <Icon name="check" size={13} stroke={2.6} />
        </span>
        <span className="gg-sr-only">Included</span>
      </>
    );
  }
  if (value === "no") {
    return (
      <>
        <Icon name="minus" size={18} stroke={2} className="sv-dash" />
        <span className="gg-sr-only">Not included</span>
      </>
    );
  }
  if (value === "ask") return <span className="sv-ask">Ask us</span>;
  return <span className="sv-cell-text">{value}</span>;
}

/**
 * Services 05: the after-launch comparison. Desktop is a real <table> (plan
 * names in <th scope="col">, features in <th scope="row">; ticks carry visually
 * hidden "Included", dashes "Not included"); hovering a plan column rings it and
 * dims the others. Phones get a segmented control that shows one plan at a time
 * (default Full Service) and a CTA that follows the plan.
 *
 * Every "Ask us" cell is something the live copy does not state; they are the
 * open item for the owner (README section 10, item 9).
 */
export function Compare() {
  const [plan, setPlan] = useState<PlanKey>("full");
  const [hover, setHover] = useState<PlanKey | null>(null);

  return (
    <section className="hm-section hm-section--canvas sv-compare" aria-labelledby="sv-compare-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="sv-compare-title"
          layout="split"
          tag="AFTER LAUNCH"
          heading="Three ways your site is looked after."
          headingClass="gg-h2 hm-h2"
          sub="Basic care is included while you pay off a 12-month build. After that, pick the level of help you want."
          subClassName="hm-hide-phone"
        />

        <div className="sv-table-wrap" data-reveal="fade-up">
          <table className="sv-table" data-hover={hover ?? undefined} onMouseLeave={() => setHover(null)}>
            <caption className="gg-sr-only">Compare the 12-month build plan, Website Care Plan and Full Service</caption>
            <thead>
              <tr>
                <th scope="col" className="sv-table__feature">
                  <span className="gg-kicker">WHAT’S COVERED</span>
                </th>
                {PLANS.map((p) => (
                  <th key={p.key} scope="col" className={`sv-col sv-col--${p.key}`} data-col={p.key} onMouseEnter={() => setHover(p.key)}>
                    <span className="sv-plan">{p.name}</span>
                    <span className="sv-plan__sub">{p.sub}</span>
                    {p.badge ? <Tag tone="coral">{p.badge}</Tag> : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.feature}>
                  <th scope="row" className="sv-table__feature">
                    {row.feature}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={KEYS[i]} className={`sv-col sv-col--${KEYS[i]}`} data-col={KEYS[i]} onMouseEnter={() => setHover(KEYS[i])}>
                      <CellContent value={cell} plum={KEYS[i] === "full"} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="sv-table__feature" />
                {KEYS.map((k) => (
                  <td key={k} className={`sv-col sv-col--${k}`} data-col={k} onMouseEnter={() => setHover(k)}>
                    <ButtonLink href={PLAN_CTA[k].href} variant={PLAN_CTA[k].variant}>
                      {PLAN_CTA[k].label}
                    </ButtonLink>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="sv-planswitch">
          <div className="sv-seg" role="tablist" aria-label="Plans" data-n="3" data-i={KEYS.indexOf(plan)}>
            <span className="sv-seg__pill" aria-hidden="true" />
            {PLANS.map((p) => (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={plan === p.key}
                className="sv-seg__opt"
                onClick={() => setPlan(p.key)}
              >
                {p.key === "build" ? "Build plan" : p.key === "care" ? "Care Plan" : "Full Service"}
              </button>
            ))}
          </div>
          {PLANS.filter((p) => p.key === plan).map((p) => (
            <div key={p.key} className={`sv-panel sv-panel--${p.key}`}>
              <div className="sv-panel__head">
                <strong>{p.key === "build" ? "12-month build" : p.name}</strong>
                <span>{p.key === "full" ? "From R1,500/month · no minimum term" : p.sub}</span>
              </div>
              <ul>
                {MOBILE_ROWS.map((row) => {
                  const value = row.cells[KEYS.indexOf(p.key)];
                  return (
                    <li key={row.feature}>
                      <span>{row.feature}</span>
                      <CellContent value={value} plum={p.key === "full"} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <ButtonLink href={PLAN_CTA[plan].href} variant="coral" full>
            {PLAN_CTA[plan].label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
