"use client";

import Link from "next/link";
import { useState } from "react";

import { Icon } from "../Icon";
import { PillToggle } from "../PillToggle";
import { AvailabilityButton } from "./AvailabilityButton";
import { getAvailability } from "./data";

type YesNo = "yes" | "no";
const OPTIONS: { value: YesNo; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/**
 * Launch 03. Two segmented questions. Yes + No qualifies (mint); any other
 * combination gets a blush note pointing at the Launch package or a redesign.
 * Guidance only: it never blocks the form, which keeps its own required
 * confirmation. The result is announced (aria-live) and swaps with a crossfade.
 */
export function EligibilityChecker() {
  const [isNew, setIsNew] = useState<YesNo>("yes");
  const [hasSite, setHasSite] = useState<YesNo>("no");
  const availability = getAvailability();
  const qualifies = isNew === "yes" && hasSite === "no";

  const sub = availability.soldOut
    ? `${availability.month} is full. Join the ${availability.nextMonth} waitlist.`
    : availability.left === 1
      ? `Check if ${availability.month}’s last slot is still open.`
      : `Check which ${availability.month} slots are still open.`;

  return (
    <div className="ln-checker">
      <h3 className="ln-checker__title">Check in 5 seconds</h3>
      <div className="ln-checker__q">
        <p id="ln-q1">Is your business new, or about to start trading?</p>
        <PillToggle options={OPTIONS} value={isNew} onChange={setIsNew} label="Is your business new, or about to start trading?" fill size="sm" />
      </div>
      <div className="ln-checker__q">
        <p id="ln-q2">Does your business already have a website?</p>
        <PillToggle options={OPTIONS} value={hasSite} onChange={setHasSite} label="Does your business already have a website?" fill size="sm" />
      </div>

      <div className="ln-checker__result" role="status" aria-live="polite">
        <div key={qualifies ? "yes" : "no"} className={qualifies ? "ln-result ln-result--yes" : "ln-result ln-result--no"}>
          {qualifies ? (
            <>
              <span className="ln-result__icon" aria-hidden="true">
                <Icon name="check" size={16} stroke={2.6} />
              </span>
              <p>
                <strong>Good news: you qualify.</strong>
                <span>{sub}</span>
              </p>
            </>
          ) : (
            <p>
              This offer is for new businesses without a website. A Launch package or a redesign may suit you better.{" "}
              <Link href="/pricing#packages">See packages</Link>
            </p>
          )}
        </div>
      </div>

      <AvailabilityButton placement="checker" full />
    </div>
  );
}
