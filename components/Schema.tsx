import { packages } from "@/content/pricing";
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
 * No FAQPage node here (SEO audit 2026-08-16, item 15): /faq already emits
 * the full, canonical FAQPage schema via <FAQSchema>. Repeating it here put
 * the exact same FAQPage content on two indexed URLs, which reads as
 * duplicate content — the same reasoning /services already applies.
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
    // Raster, not the SVG: Google's Organization.logo requires a raster format
    // (PNG/JPG/GIF), and it's a prerequisite for knowledge-panel eligibility.
    // /icon.png is Next's generated app icon, so it's guaranteed to exist.
    logo: `${site.url}/icon.png`,
    image: `${site.url}/icon.png`,
    // Derived from the real packages array rather than hard-coded, so it can't
    // drift when prices change.
    priceRange: `R${Math.min(...packages.map((p) => p.total))}-R${Math.max(...packages.map((p) => p.total))}`,
    // Positioned nationally. areaServed is the country; the postal address
    // stays the real registered one so the local pack and the Google Business
    // Profile keep matching NAP.
    serviceType: "Website development and design",
    areaServed: { "@type": "Country", name: "South Africa" },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    ...(site.email ? { email: site.email } : {}),
    // `site.phone` stays null by design (it would print digits sitewide via the
    // footer). The WhatsApp number is the real, owner-confirmed contact number,
    // so it's what belongs in `telephone` — this is the field Google matches
    // against the Google Business Profile for NAP consistency. It's reachable
    // from /contact as a click-to-chat button, so it isn't hidden markup.
    telephone: site.whatsapp.e164,
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
  };

  const graph = [
    business,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
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
