import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { GgShell } from "@/components/gg/GgShell";
import { Legal } from "@/components/gg/legal/LegalClient";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/legal/legal.css";

const title = { absolute: "Legal Notice, Privacy Policy & Terms | GoodGround" };
const description =
  "GoodGround’s legal notice, privacy policy and terms: how we handle personal information under POPIA, and the terms that apply to every project.";
const path = "/legal";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

export default function LegalPage() {
  return (
    <GgShell crumbs={[{ label: "LEGAL" }]}>
      <div className="lg-page">
        <BreadcrumbSchema trail={[{ name: "Legal", path }]} />
        <Legal />
      </div>
    </GgShell>
  );
}
