"use client";

import type { CSSProperties } from "react";

import { newBusinessOffer } from "@/content/newBusinessOffer";
import { localPlans } from "@/content/pricing";

import { formatRand } from "../format";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import { AvailabilityButton } from "./AvailabilityButton";
import { useAvailability } from "./AvailabilityContext";
import type { Availability } from "./availability";

/**
 * The pieces of /website-launch that change with the month's open spaces. The
 * page itself is static; these read the availability from context (typed at
 * build, live after load) so a full month flips the pill, the offer card, the
 * calendar and the form heading together.
 */
const localStart = localPlans.find((plan) => plan.slug === newBusinessOffer.planSlug)!;
const monthly = formatRand(localStart.monthly);

function Meter({ availability, size }: { availability: Availability; size: "lg" | "sm" }) {
  const { month, total, taken, left, soldOut } = availability;
  return (
    <div className={`ln-meter ln-meter--${size}`} data-reveal="fill">
      <p className="ln-meter__row">
        <span>{month} intake</span>
        <strong className={soldOut ? "is-full" : undefined}>
          {soldOut ? (
            "Fully booked"
          ) : (
            <>
              <span className="gg-resp-long">
                {left} of {total} spaces left
              </span>
              <span className="gg-resp-short">
                {left} of {total} left
              </span>
            </>
          )}
        </strong>
      </p>
      <div
        className="ln-meter__segments"
        role="img"
        aria-label={`${taken} of ${total} ${month} spaces taken`}
        style={{ "--total": total } as CSSProperties}
      >
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={soldOut ? "is-full" : i < taken ? "is-taken" : undefined} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

/** The live pill in the hero: "1 OF 2 SPACES LEFT IN NOVEMBER" or "NOVEMBER IS FULLY BOOKED". */
export function HeroPill() {
  const availability = useAvailability();
  return (
    <span className={availability.soldOut ? "ln-pill is-full" : "ln-pill"}>
      <i aria-hidden="true" />
      {availability.pill}
    </span>
  );
}

/** The hero offer card. `checklist` is the Local Start inclusions (components/gg/launch/data.ts heroChecklist). */
export function OfferCard({ checklist }: { checklist: { long: string; short: string }[] }) {
  const availability = useAvailability();
  return (
    <div id="ln-offer-card" className={availability.soldOut ? "ln-card is-sold-out" : "ln-card"} data-reveal="fade-up" data-delay={150}>
      <div className="ln-card__head">
        <p className="ln-card__name">{localStart.name}</p>
        {availability.soldOut ? null : <Tag tone="coral">12-MONTH PLAN</Tag>}
      </div>
      <div className="ln-card__price" data-reveal="line-mask">
        <SplitHeading as="p" className="gg-number ln-card__amount" text={formatRand(0)} />
        <span className="ln-card__period">
          <span className="gg-resp-long">/ first month</span>
          <span className="gg-resp-short">/ first month · then {monthly}/mo</span>
        </span>
      </div>

      {availability.soldOut ? null : (
        <>
          <dl className="ln-maths">
            <div>
              <dt className="gg-sr-only">Deposit</dt>
              <dd>
                <strong>{monthly}</strong>
                <span>deposit to start</span>
              </dd>
            </div>
            <div>
              <dt className="gg-sr-only">Month 1</dt>
              <dd>
                <strong>{formatRand(0)}</strong>
                <span>month 1</span>
              </dd>
            </div>
            <div>
              <dt className="gg-sr-only">From month 2</dt>
              <dd className="is-total">
                <strong>{monthly}/mo</strong>
                <span>from month 2</span>
              </dd>
            </div>
          </dl>
          <dl className="ln-tiles">
            <div>
              <dt className="gg-sr-only">Deposit</dt>
              <dd>
                <strong>{monthly}</strong>
                <span>deposit to start</span>
              </dd>
            </div>
            <div>
              <dt className="gg-sr-only">First month</dt>
              <dd>
                <strong>{formatRand(0)}</strong>
                <span>first month</span>
              </dd>
            </div>
          </dl>
          <p className="ln-card__deposit">{newBusinessOffer.depositLine}</p>
          <ul className="ln-checks">
            {checklist.map((item, i) => (
              <li key={item.long} style={{ "--i": i } as CSSProperties}>
                <span className="ln-checks__chip" aria-hidden="true">
                  <Icon name="check" size={11} stroke={3} />
                </span>
                <Resp long={item.long} short={item.short} />
              </li>
            ))}
          </ul>
        </>
      )}

      <Meter availability={availability} size="lg" />

      {availability.soldOut ? (
        <p className="ln-next">
          <span aria-hidden="true">
            <Icon name="bell" size={15} stroke={2.2} />
          </span>
          Next opening: {availability.nextMonth}, {availability.total} spaces.
        </p>
      ) : null}

      <AvailabilityButton placement="offer-card" full />
      {availability.soldOut ? null : <p className="ln-card__fine">No obligation. We confirm availability and fit before you book.</p>}
    </div>
  );
}

/** "Upcoming intakes": the current month and the next two, one dot per space. */
export function IntakeCalendar() {
  const availability = useAvailability();
  return (
    <div className="ln-calendar" data-reveal="group">
      <h3>Upcoming intakes</h3>
      <ul>
        {availability.intakes.map((intake, i) => (
          <li key={intake.label} className={intake.filled > 0 ? "has-filled" : undefined} style={{ "--i": i } as CSSProperties}>
            <span className="ln-calendar__month">{intake.label}</span>
            <span className="ln-calendar__dots" aria-hidden="true">
              {Array.from({ length: availability.total }, (_, d) => (
                <i key={d} className={d < intake.filled ? "is-filled" : undefined} style={{ "--d": d } as CSSProperties} />
              ))}
            </span>
            <span className="ln-calendar__status">
              {intake.open === 0 ? "Fully booked" : `${intake.open} space${intake.open === 1 ? "" : "s"} ${intake.filled > 0 ? "left" : "open"}`}
            </span>
          </li>
        ))}
      </ul>
      <p className="ln-calendar__note">Filled spaces shown in coral.</p>
    </div>
  );
}

/** The copy beside the form: tag, heading and the open-spaces line. */
export function FormCopy() {
  const availability = useAvailability();
  return (
    <div className="ln-form-copy" data-reveal="header">
      <Tag tone="on-dark" data-part="tag">
        {availability.soldOut ? "JOIN THE WAITLIST" : "CHECK AVAILABILITY"}
      </Tag>
      {/* keyed on the state: the motion helper has already split this heading into lines, so a new text needs a new element. */}
      <SplitHeading
        key={availability.soldOut ? "full" : "open"}
        as="h2"
        id="ln-form-title"
        className="gg-display-m ln-form-title"
        text={availability.soldOut ? `JOIN THE ${availability.nextMonth.toUpperCase()} WAITLIST.` : "GET YOUR FIRST BUSINESS WEBSITE UNDERWAY."}
      />
      <p className="gg-lead ln-form-lead" data-part="sub">
        First month free, then {monthly} a month, with a business mailbox free for {newBusinessOffer.terms.mailboxFreeMonths} months.
        {" "}
        {newBusinessOffer.depositLine} Exclusively for new businesses without a website.
      </p>
      <p className="ln-banner" data-part="sub">
        <i aria-hidden="true" />
        {availability.soldOut
          ? `${availability.month} is fully booked. Tell us about your business and we’ll add you to the ${availability.nextMonth} waitlist.`
          : `${availability.left} space${availability.left === 1 ? "" : "s"} left for ${availability.month}. Tell us about your business and we’ll confirm whether ${availability.left === 1 ? "it’s" : "they’re"} still open.`}
      </p>
      <ul className="ln-form-ticks" data-part="cta">
        {["Takes about a minute", "Commits you to nothing", "We reply about availability and next steps"].map((line) => (
          <li key={line}>
            <Icon name="check" size={14} stroke={2.6} />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
