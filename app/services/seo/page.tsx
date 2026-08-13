import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { servicePages } from "@/content/servicePages";
import { pageSocialMeta } from "@/lib/metadata";

const entry = servicePages.find((p) => p.slug === "seo")!;
const path = `/services/${entry.slug}`;

export const metadata: Metadata = {
  title: entry.metaTitle,
  description: entry.metaDescription,
  alternates: { canonical: path },
  ...pageSocialMeta({ title: entry.metaTitle, description: entry.metaDescription, path }),
};

export default function SeoPage() {
  return <ServicePageTemplate slug={entry.slug} />;
}
