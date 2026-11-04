import { getOfferSpots } from "@/lib/liveCounters";

/**
 * The live spaces-left count for the New Business Offer, read-only. Home is a
 * static page, so its offer strip asks this after load (components/gg/home/
 * OfferStrip.tsx) and swaps the typed value it was rendered with. It carries
 * month and counts only: no personal data, and it starts nothing.
 */
export async function GET() {
  const spots = await getOfferSpots();
  return Response.json(
    { total: spots.total, taken: spots.taken, left: spots.left, soldOut: spots.soldOut, month: spots.month, nextMonth: spots.nextMonth },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
  );
}
