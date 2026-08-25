import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { PricingPageClient } from "@/components/PricingPageClient";
import { FAQSchema } from "@/components/Schema";
import { pricingFaq } from "@/content/pricing";
import { pageSocialMeta } from "@/lib/metadata";

const title = { absolute: "Pricing | Website Design Packages, South Africa | GoodGround" };
const description =
  "Four fixed website packages from R8,500, a build-your-own menu, or Full Service from R1,500/mo with hosting, mailboxes, SEO, and maintenance included.";
const path = "/pricing";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Pricing", path: "/pricing" }]} />
      <FAQSchema items={pricingFaq} id="pricing-faq" />

      <PageHero
        eyebrow="Pricing"
        title="Simple pricing, built around what you actually need."
        intro="Four fixed packages to start fast, or build your own from our full menu. Pay 50% upfront and the rest on completion, or split the total into 12 monthly instalments: your call. Prefer to have it all handled? Full Service bundles the build with hosting, mailboxes, SEO, and maintenance, monthly."
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="#packages"
            className="font-ht-body rounded-pill inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-150 hover:border-white"
          >
            View packages
          </Link>
          <Link
            href="#full-service"
            className="font-ht-body rounded-pill inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-150 hover:border-white"
          >
            Full Service
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
