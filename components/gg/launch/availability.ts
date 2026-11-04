import { newBusinessOffer } from "@/content/newBusinessOffer";
import type { OfferSpots } from "@/lib/liveCounters";

/**
 * Availability: one source, read by the live pill, the offer-card meter, the
 * intake calendar, the sticky mobile bar and the form banner. The page is
 * static, so it builds this from the typed count (content/newBusinessOffer.ts
 * spotsTaken) and LiveAvailabilityProvider rebuilds it from the live count
 * (GET /api/offer-spots) after load; every piece reads it through
 * AvailabilityProvider. Month names come from the setting, never typed twice.
 */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthAfter = (month: string, year: number, steps: number) => {
  const i = MONTHS.indexOf(month);
  const index = i + steps;
  return { month: MONTHS[index % 12], year: year + Math.floor(index / 12) };
};

export type Availability = {
  month: string;
  nextMonth: string;
  total: number;
  taken: number;
  left: number;
  soldOut: boolean;
  /** The offer tag on a submission. */
  offer: "new-business" | "new-business-waitlist";
  /** What every "Check availability" button says. */
  cta: string;
  /** The live pill: "1 OF 2 SPACES LEFT IN NOVEMBER". */
  pill: string;
  intakes: { label: string; filled: number; open: number }[];
};

export function buildAvailability(spots: OfferSpots): Availability {
  const { month, year } = newBusinessOffer;
  const { total, taken, left, soldOut } = spots;
  const next = monthAfter(month, year, 1);
  const third = monthAfter(month, year, 2);
  return {
    month,
    nextMonth: next.month,
    total,
    taken,
    left,
    soldOut,
    offer: soldOut ? "new-business-waitlist" : "new-business",
    cta: soldOut ? `Join the ${next.month} waitlist` : "Check availability",
    pill: soldOut ? `${month.toUpperCase()} IS FULLY BOOKED` : `${left} OF ${total} SPACES LEFT IN ${month.toUpperCase()}`,
    // Months further out show every space open until bookings exist.
    intakes: [
      { label: `${month} ${year}`, filled: taken, open: left },
      { label: `${next.month} ${next.year}`, filled: 0, open: total },
      { label: `${third.month} ${third.year}`, filled: 0, open: total },
    ],
  };
}
