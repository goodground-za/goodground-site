import type { Metadata } from "next";

import { AiVisibilityPage } from "@/components/gg/ai/AiVisibilityPage";
import { aiPage } from "@/content/aiVisibility";
import { pageSocialMeta } from "@/lib/metadata";

const title = { absolute: aiPage.title };

export const metadata: Metadata = {
  title,
  description: aiPage.description,
  alternates: { canonical: aiPage.path },
  ...pageSocialMeta({ title, description: aiPage.description, path: aiPage.path }),
};

export default function Page() {
  return <AiVisibilityPage />;
}
