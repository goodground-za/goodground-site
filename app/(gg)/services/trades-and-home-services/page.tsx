import type { Metadata } from "next";

import { IndustryPage } from "@/components/gg/industry/IndustryPage";
import { industryPages } from "@/content/industryPages";
import { pageSocialMeta } from "@/lib/metadata";

const entry = industryPages.find((p) => p.slug === "trades-and-home-services")!;
const path = `/services/${entry.slug}`;

export const metadata: Metadata = {
  title: entry.metaTitle,
  description: entry.metaDescription,
  alternates: { canonical: path },
  ...pageSocialMeta({ title: entry.metaTitle, description: entry.metaDescription, path }),
};

export default function Page() {
  return <IndustryPage slug="trades-and-home-services" />;
}
