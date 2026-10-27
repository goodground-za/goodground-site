import type { Metadata } from "next";

import { ServiceDetailPage } from "@/components/gg/service-detail/ServiceDetailPage";
import { servicePages } from "@/content/servicePages";
import { pageSocialMeta } from "@/lib/metadata";

const entry = servicePages.find((p) => p.slug === "website-redesign")!;
const path = `/services/${entry.slug}`;

export const metadata: Metadata = {
  title: entry.metaTitle,
  description: entry.metaDescription,
  alternates: { canonical: path },
  ...pageSocialMeta({ title: entry.metaTitle, description: entry.metaDescription, path }),
};

export default function Page() {
  return <ServiceDetailPage slug="website-redesign" />;
}
