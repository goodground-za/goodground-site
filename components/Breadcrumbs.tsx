import { site } from "@/content/site";

/**
 * BreadcrumbList schema for inner pages (dev brief §8). Schema only: the site is
 * two levels deep, so a visible breadcrumb trail would be chrome for no gain.
 */
export function BreadcrumbSchema({ trail }: { trail: { name: string; path: string }[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
