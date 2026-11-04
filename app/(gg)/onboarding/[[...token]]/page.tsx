import type { Metadata } from "next";

import { Onboarding } from "@/components/gg/onboarding/Onboarding";
import { parsePlan, parseTrack } from "@/components/gg/onboarding/steps";
import "@/components/gg/home/home.css";
import "@/components/gg/onboarding/onboarding.css";

// Private working document sent by link: never indexed, never in the sitemap, never linked from the site.
export const metadata: Metadata = {
  title: { absolute: "Client onboarding | GoodGround" },
  description: "Your private project brief for GoodGround.",
  // Its own canonical (every token link is the same form), not the homepage.
  alternates: { canonical: "/onboarding" },
  robots: { index: false, follow: false },
};

type Search = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function OnboardingPage({ params, searchParams }: { params: Promise<{ token?: string[] }>; searchParams: Promise<Search> }) {
  const { token } = await params;
  const query = await searchParams;
  // The token will select the saved brief once server storage exists (open item 8); for now it only names the local draft.
  const key = (token?.[0] ?? "default").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64) || "default";
  // v2: ?track=local is the short brief for monthly-plan clients, ?plan= (local-start | local-plus | local-pro) names their plan.
  // Both are whitelisted: anything else is ignored and the full brief is used.
  const track = parseTrack(first(query.track));
  const plan = track === "local" ? parsePlan(first(query.plan)) : "";
  return (
    <div className="gg">
      <Onboarding token={key} track={track} plan={plan} />
    </div>
  );
}
