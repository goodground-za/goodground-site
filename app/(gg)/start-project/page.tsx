import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { GgShell } from "@/components/gg/GgShell";
import { StartProject } from "@/components/gg/start/StartProject";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/start/start.css";

const title = { absolute: "Start Your Project | GoodGround Website Development" };
const description =
  "Start your website project with GoodGround. Answer a few quick questions and we'll come back with next steps and a fixed price, your choice of payment plan.";
const path = "/start-project";

// Every parameter URL (?plan, ?intent, ?ref, ?step, UTMs) canonicalises here.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

/** A plain WebPage: ContactPage + LocalBusiness live on /contact. */
const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${site.url}${path}`,
  name: "Start your project",
  url: `${site.url}${path}`,
  isPartOf: { "@id": `${site.url}/#website` },
};

export default function StartProjectPage() {
  return (
    <GgShell crumbs={[{ label: "START YOUR PROJECT" }]} footer={{ ruled: true }}>
      <BreadcrumbSchema trail={[{ name: "Start your project", path }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <StartProject />
    </GgShell>
  );
}
