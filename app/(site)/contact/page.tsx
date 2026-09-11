import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { site } from "@/content/site";
import { pageSocialMeta } from "@/lib/metadata";

/** Copy deck §4, retargeted development-first / South Africa per the site positioning. */
const title = { absolute: "Contact GoodGround | Website Development, South Africa" };
const description =
  "Tell us about your business and we'll come back with next steps and how you'd like to pay. A website development studio in South Africa.";
const path = "/contact";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
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
        intro="Tell us a bit about your business and what you're hoping to build. We'll come back to you with next steps and a fixed price, split however you'd like to pay it."
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

                    {/* Click-to-chat only. The number is never rendered as
                        digits anywhere on the site (see content/site.ts): email
                        stays the primary channel above, and this is the quieter
                        second option for people who'd rather message. */}
                    <div>
                      <dt className="text-[13px] font-medium tracking-[0.1em] text-white/55 uppercase">
                        Rather message?
                      </dt>
                      <dd className="mt-2.5">
                        <a
                          href={site.whatsapp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-ht-display rounded-pill inline-flex items-center gap-2 border-2 border-white/30 px-5 py-2.5 text-[13px] font-bold tracking-wide text-white uppercase transition-colors duration-150 hover:border-white"
                        >
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
                          </svg>
                          WhatsApp
                        </a>
                      </dd>
                    </div>

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
