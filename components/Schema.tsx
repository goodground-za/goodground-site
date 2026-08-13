import { faq } from "@/content/faq";
import { site } from "@/content/site";
import type { Service } from "@/content/services";

/**
 * Shared FAQPage emitter (dev brief §8) — one page can render several FAQ
 * sections with different question sets (sitewide, pricing-specific,
 * industry-specific), so this takes whatever list is actually visible on
 * that page rather than being hard-wired to content/faq.ts. Only answered
 * items enter the schema; unanswered ones would otherwise ship "coming
 * soon" as a rich result. `id` keeps multiple FAQPage nodes on the same
 * page (or across pages sharing a @graph) from colliding on @id.
 */
function faqPageNode(items: { question: string; answer: string | null }[], id: string) {
  const answered = items.filter((item) => item.answer !== null);
  if (!answered.length) return null;

  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#${id}`,
    mainEntity: answered.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function FAQSchema({ items, id }: { items: { question: string; answer: string | null }[]; id: string }) {
  const node = faqPageNode(items, id);
  if (!node) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...node }) }}
    />
  );
}

/**
 * Service schema for content/services.ts (dev brief §8 follow-up: the six
 * services were described in prose but never marked up). description
 * composes subheading + outcome since Service has no dedicated field for
 * either alone.
 */
export function ServicesSchema({ services }: { services: Service[] }) {
  const graph = services.map((s) => ({
    "@type": "Service",
    "@id": `${site.url}/services#${s.slug}`,
    name: s.title,
    description: `${s.subheading} ${s.outcome}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    url: `${site.url}/services#${s.slug}`,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

/**
 * Dev brief §8. NAP fields that the client has not confirmed are omitted rather
 * than filled with placeholders — wrong structured data is worse than absent
 * structured data, and Google will happily index a fake phone number.
 *
 * Only answered FAQs enter FAQPage schema; unanswered ones would otherwise ship
 * "coming soon" as a rich result.
 */
export function HomeSchema() {
  const business = {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    description:
      "Website development studio building custom, fast business websites across South Africa. Every project is one fixed price, payable as a 50% deposit and the rest on completion, or over 12 monthly instalments.",
    url: site.url,
    foundingDate: site.foundingDate,
    // Serves the country, based in George: South Africa first for reach, the
    // locality kept for the local pack.
    serviceType: "Website development and design",
    areaServed: { "@type": "Country", name: "South Africa" },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    ...(site.email ? { email: site.email } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
  };

  const faqNode = faqPageNode(faq, "faq");

  const graph = [
    business,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
    ...(faqNode ? [faqNode] : []),
  ];

  return (
    <script
      type="application/ld+json"
      // Content is fully static and authored here, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
