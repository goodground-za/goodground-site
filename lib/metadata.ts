import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Next.js does not derive openGraph/twitter title+description from a page's
 * own `title`/`description` fields. An inner page that doesn't set its own
 * `openGraph` object inherits the ROOT layout's static one unchanged, so
 * every inner page's link preview (Slack, WhatsApp, Twitter/X, Facebook)
 * silently showed the homepage's title and description instead of its own.
 * This resolves the page's own effective title (unwraps `{ absolute }` or
 * appends the layout's "%s | GoodGround" template) and returns matching
 * openGraph + twitter blocks to spread into that page's own metadata.
 */
export function pageSocialMeta({
  title,
  description,
  path,
}: {
  title: string | { absolute: string };
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const resolvedTitle = typeof title === "string" ? `${title} | GoodGround` : title.absolute;
  const url = `${site.url}${path}`;
  return {
    openGraph: { type: "website", url, title: resolvedTitle, description },
    twitter: { card: "summary_large_image", title: resolvedTitle, description },
  };
}
