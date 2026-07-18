import { faq } from "@/content/faq";
import { site } from "@/content/site";

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
    description:
      "Website development studio building custom, fast business websites across South Africa. Every project is one fixed price split into 12 equal monthly payments.",
    url: site.url,
    foundingDate: site.foundingDate,
    // Serves the country, based in Cape Town: South Africa first for reach, the
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

  const answered = faq.filter((item) => item.answer !== null);

  const graph = [
    business,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
    ...(answered.length
      ? [
          {
            "@type": "FAQPage",
            "@id": `${site.url}/#faq`,
            mainEntity: answered.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
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
