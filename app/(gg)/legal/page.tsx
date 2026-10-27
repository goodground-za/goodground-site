import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { GgShell } from "@/components/gg/GgShell";
import { Legal } from "@/components/gg/legal/LegalClient";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/legal/legal.css";

// Live title kept (add "& Terms" once the Terms are approved and live).
const title = { absolute: "Legal Notice & Privacy Policy | GoodGround" };
const description =
  "GoodGround's legal notice and privacy policy: how we handle personal information under South Africa's Protection of Personal Information Act (POPIA).";
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
