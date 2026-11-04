"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { newBusinessOffer } from "@/content/newBusinessOffer";
import { funnelEvents } from "@/lib/analytics";

import { ArrowChip } from "../LinkedCard";

/** What the strip needs from the live count (app/api/offer-spots). */
export type OfferState = { total: number; taken: number; left: number; soldOut: boolean; month: string; nextMonth: string };

const isState = (v: unknown): v is OfferState => {
  const o = v as Partial<OfferState> | null;
  return !!o && typeof o.total === "number" && typeof o.taken === "number" && typeof o.left === "number" && typeof o.soldOut === "boolean" && typeof o.month === "string" && typeof o.nextMonth === "string";
};

/**
 * Home 03: the New Business Offer strip under the plan rows. It reuses the
 * availability meter. Home stays a static page, so the strip is rendered with
 * the typed value in content/newBusinessOffer.ts (`initial`) and, once mounted,
 * asks /api/offer-spots for the live count and swaps it in. The wording and
 * the bar are the same size either way, so nothing moves. Sold out applies to
 * this strip only: full bar, "Fully booked", link to the next month's waitlist.
 * It links to /website-launch#check-availability and fires offer_spot_view once
 * when half visible.
 */
export function OfferStrip({ initial }: { initial: OfferState }) {
  const [state, setState] = useState<OfferState>(initial);
  const root = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/offer-spots", { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        if (live && isState(data)) setState(data);
      })
      .catch(() => {
        /* keep the typed value */
      });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        funnelEvents.offerSpotView({ month: state.month });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // The month never changes within a visit.
  }, [state.month]);

  const { left, total, taken, soldOut, month, nextMonth } = state;
  const mailbox = newBusinessOffer.terms.mailboxFreeMonths;

  return (
    <Link ref={root} href={`${newBusinessOffer.path}#check-availability`} className={soldOut ? "hm-offer is-sold-out" : "hm-offer"}>
      <span className="hm-offer__text">
        <strong>New business? First month free + a free mailbox for {mailbox} months</strong>
        <span className="hm-offer__line">
          {soldOut
            ? `Fully booked for ${month} · join the ${nextMonth} waitlist`
            : `${left} of ${total} ${total === 1 ? "space" : "spaces"} left in ${month}`}
        </span>
      </span>
      <span
        className={soldOut ? "hm-offer__track is-sold-out" : "hm-offer__track"}
        role="img"
        aria-label={`${taken} of ${total} spaces taken for ${month}`}
        data-reveal="fill"
      >
        <span className="hm-meter__fill" style={{ "--fill": total ? taken / total : 1 } as CSSProperties} />
      </span>
      <ArrowChip size={32} className="hm-offer__chip" />
    </Link>
  );
}
