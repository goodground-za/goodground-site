import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { servicePages } from "@/content/servicePages";

const entry = servicePages.find((p) => p.slug === "website-redesign")!;

export const metadata: Metadata = {
  title: entry.metaTitle,
  description: entry.metaDescription,
  alternates: { canonical: `/services/${entry.slug}` },
};

export default function WebsiteRedesignPage() {
  return <ServicePageTemplate slug={entry.slug} />;
}
