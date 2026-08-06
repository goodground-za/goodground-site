import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { site } from "@/content/site";

/** Copy deck §4, retargeted development-first / South Africa per the site positioning. */
export const metadata: Metadata = {
  title: { absolute: "Contact GoodGround | Website Development, South Africa" },
  description:
    "Tell us about your business and we'll come back with next steps and a monthly payment plan. A website development studio in South Africa.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact`,
    name: "Contact GoodGround",
    url: `${site.url}/contact`,
    ...(site.email ? { email: site.email } : {}),
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Contact", path: "/contact" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <PageHero
        eyebrow="Get in touch"
        title="Let's build something that lasts."
        intro="Tell us a bit about your business and what you're hoping to build. We'll come back to you with next steps, and what it would look like on a monthly payment plan."
      />

      {/* pb-[24vw]: reserves room for the footer's CloudDivider, which scales
          with viewport width to keep its circles round — a fixed padding
          would leave the bumps burying this section's content on wide
          screens (same reasoning as CTABand). */}
      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto grid max-w-[1434px] gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            <ContactForm />
          </div>

          {/* Direct contact + reassurance, in the site's dark card treatment. */}
          <aside className="min-w-0 lg:col-span-5">
            <div className="bg-ht-purple rounded-block h-full overflow-hidden">
              <div className="flex h-full flex-col p-8 sm:p-10">
                <SplitWords
                  as="p"
                  text="Every project starts with a conversation, not a contract."
                  className="font-ht-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.2] font-bold text-white"
                />
                <RevealSection delay={0.08}>
                  <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.6] text-white/75">
                    Let&rsquo;s talk about the ground you&rsquo;re building on.
                  </p>

                  <dl className="border-white/15 mt-10 space-y-6 border-t pt-8">
                    {site.email ? (
                      <div>
                        <dt className="text-[13px] font-medium tracking-[0.1em] text-white/55 uppercase">
                          Prefer email?
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={`mailto:${site.email}`}
                            className="font-ht-display text-[clamp(1.05rem,1.6vw,1.35rem)] font-bold text-white transition-colors duration-150 hover:text-ht-orange"
                          >
                            {site.email}
                          </a>
                        </dd>
                      </div>
                    ) : null}

                    <div>
                      <dt className="text-[13px] font-medium tracking-[0.1em] text-white/55 uppercase">
                        Based in
                      </dt>
                      <dd className="mt-1.5 text-[15px] leading-[1.6] text-white/85">
                        {site.address.locality}, {site.address.area}
                        <br />
                        {site.address.region}, South Africa
                      </dd>
                    </div>
                  </dl>
                </RevealSection>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
