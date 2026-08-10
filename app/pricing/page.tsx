import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { PricingPageClient } from "@/components/PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing | Website Design Packages, South Africa",
  description:
    "Four fixed website design packages from R8,500, or build your own from an à la carte menu. Every price splits into 12 equal monthly payments.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Pricing", path: "/pricing" }]} />

      <PageHero
        eyebrow="Pricing"
        title="Simple pricing, built around what you actually need."
        intro="Four fixed packages to start fast, or build your own from our full menu. Every price on this page splits into 12 equal monthly payments, so a proper website never means a big upfront hit."
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="#packages"
            className="font-ht-body rounded-pill inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-150 hover:border-white"
          >
            View packages
          </Link>
          <Link
            href="#build-your-own"
            className="font-ht-body rounded-pill inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-150 hover:border-white"
          >
            Build your own
          </Link>
        </div>
      </PageHero>

      <PricingPageClient />
    </>
  );
}
