import { firstOfNextMonth } from "@/lib/freeCheck";
import { getFreeCheckCounters, getOfferSpots } from "@/lib/liveCounters";

/**
 * The live counters, read-only: the New Business Offer spaces and the free AI
 * check budget. The pages that show them (Home, Pricing, Start your project,
 * Website launch, AI visibility) are all static, so each renders the typed
 * values and asks this after load (components/gg/useLiveCounters.ts), then
 * swaps the live ones in. Counts and month names only: no personal data, and it
 * starts nothing. The CDN keeps an answer for 30 seconds and may serve it for 60
 * more while it fetches a fresh one, so a sold-out month shows within a minute.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const [spots, check] = await Promise.all([getOfferSpots(), getFreeCheckCounters()]);
  return Response.json(
    {
      total: spots.total,
      taken: spots.taken,
      left: spots.left,
      soldOut: spots.soldOut,
      month: spots.month,
      nextMonth: spots.nextMonth,
      freeCheck: { monthlyBudget: check.monthlyBudget, used: check.used, left: check.left, full: check.full, nextRun: firstOfNextMonth() },
    },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
  );
}
