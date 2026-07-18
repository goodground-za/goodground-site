import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { KineticText, Reveal } from "@/components/motion/KineticText";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

/** Copy deck §4, retargeted development-first / South Africa per the site positioning. */
export const metadata: Metadata = {
  title: { absolute: "Contact GoodGround | Website Development, South Africa" },
  description:
    "Start your website project with GoodGround, a website development studio in South Africa. Tell us about your business and we'll come back with next steps and a monthly payment plan.",
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
        phrases={["Let's build", "something that lasts."]}
        intro={
          <>
            Tell us a bit about your business and what you&rsquo;re hoping to build. We&rsquo;ll come
            back to you with next steps, and what it would look like on a monthly payment plan.
          </>
        }
      />

      <section className="px-3 pb-16 sm:px-5 md:pb-24">
        <div className="mx-auto grid max-w-[1434px] gap-6 px-3 sm:px-6 md:px-11 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Direct contact + reassurance, in the site's dark block treatment. */}
          <aside className="lg:col-span-5">
            <div className="rounded-block bg-bark grain text-peach h-full overflow-hidden">
              <div className="relative z-[2] flex h-full flex-col p-8 sm:p-10">
                <KineticText
                  phrases={["Every project starts with", "a conversation, not a contract."]}
                  tone="light"
                  className="font-heading text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.2] font-bold tracking-[-0.02em]"
                />
                <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.6] text-peach/75">
                  Let&rsquo;s talk about the ground you&rsquo;re building on.
                </p>

                <dl className="mt-10 space-y-6 border-t border-peach/15 pt-8">
                  {site.email ? (
                    <div>
                      <dt className="text-[13px] font-medium tracking-[0.1em] text-peach/55 uppercase">
                        Prefer email?
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={`mailto:${site.email}`}
                          className="font-heading text-[clamp(1.05rem,1.6vw,1.35rem)] font-bold transition-colors duration-150 hover:text-ember"
                        >
                          {site.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}

                  <div>
                    <dt className="text-[13px] font-medium tracking-[0.1em] text-peach/55 uppercase">
                      Based in
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-[1.6] text-peach/85">
                      {site.address.locality}, {site.address.city}
                      <br />
                      Northern Suburbs, South Africa
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
