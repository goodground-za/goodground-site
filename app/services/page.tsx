import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { KineticText, Reveal, RevealGroup, RevealItem } from "@/components/motion/KineticText";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { type Service, services } from "@/content/services";
import { site } from "@/content/site";

/** Copy deck §3, retargeted development-first / South Africa. */
export const metadata: Metadata = {
  title: "Website Development Services in South Africa",
  description:
    "Website development, UX and design, SEO foundations, and care plans. Built in-house in South Africa, payable over 12 monthly instalments.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/services#list`,
    name: "GoodGround services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${site.url}/services#${s.slug}`,
    })),
  };

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Services", path: "/services" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <PageHero
        eyebrow="What we do"
        phrases={["Websites built properly.", "Paid for sensibly."]}
        intro={
          <>
            We&rsquo;re a website development and maintenance studio. Every project we take on is
            designed, built, optimised for search, and supported after launch, as one connected
            process, not four separate line items. And every project can be split into 12 equal
            monthly payments.
          </>
        }
      >
        {/* Jump index */}
        <Reveal delay={0.14}>
          <ul className="mt-10 flex flex-wrap gap-2">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`#${s.slug}`}
                  className="border-bark/15 text-bark hover:border-ember hover:text-ember rounded-pill inline-flex items-center gap-2 border px-4 py-2 text-[14px] font-medium transition-colors duration-150"
                >
                  <span className="text-ember font-heading text-[12px] font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </PageHero>

      {/* Service deep-dives */}
      <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
        {services.map((service, i) => (
          <ServiceDeepDive key={service.slug} service={service} index={i} />
        ))}
      </div>

      {/* Payment recap */}
      <section className="px-3 py-8 sm:px-5">
        <div className="bg-ember rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
          <div className="relative z-[2] grid gap-8 px-6 py-14 sm:px-10 md:grid-cols-12 md:items-center md:px-14 md:py-16">
            <div className="md:col-span-8">
              <KineticText
                phrases={["However you build with us,", "you pay the same way."]}
                tone="light"
                className="font-heading max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.03em]"
              />
              <Reveal delay={0.08}>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.65] text-peach/90">
                  Every website project, regardless of size or scope, is quoted as one fixed price
                  and split into 12 equal monthly payments. No large deposit, no surprise final
                  invoice.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <ButtonLink href="/contact" variant="ink" size="lg">
                Get a Quote →
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Contextual link into the blog. Before this the article had exactly one
          inbound link (the /insights listing), so nothing passed relevance to it
          from the commercial pages. */}
      <section className="px-3 pb-4 sm:px-5">
        <div className="mx-auto max-w-[1434px] px-3 sm:px-6 md:px-11">
          <p className="text-bark-muted text-[15px] leading-[1.7]">
            Not sure a website is the right spend right now?{" "}
            <Link
              href="/insights/why-small-businesses-in-south-africa-need-a-website"
              className="text-ember underline underline-offset-4 hover:no-underline"
            >
              We wrote about why it matters for South African businesses
            </Link>
            .
          </p>
        </div>
      </section>

      <FAQ />
      <CTABanner />
    </>
  );
}

function ServiceDeepDive({ service, index }: { service: Service; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <section
      id={service.slug}
      // scroll-mt clears the sticky nav when jumped to via the index links.
      className="scroll-mt-24 border-t border-bark/10 py-14 md:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Identity, sticky on desktop so it stays with the P/S/O as it scrolls. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <span className="font-heading text-ember text-[15px] font-bold tabular-nums">
                {number}
              </span>
              {service.flagship ? (
                <span className="bg-ember text-peach rounded-pill px-3 py-1 text-[12px] font-bold">
                  Flagship service
                </span>
              ) : service.includedInEveryBuild ? (
                <span className="bg-bark text-peach rounded-pill px-3 py-1 text-[12px] font-bold">
                  Included in every build
                </span>
              ) : null}
            </div>

            <h2 className="font-heading text-pine mt-4 text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em]">
              {service.title}
            </h2>
            <p className="text-bark mt-3 max-w-[32ch] text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug font-medium">
              {service.subheading}
            </p>

            {service.paymentLine ? (
              <p className="text-bark-muted mt-6 max-w-[38ch] text-[14px] leading-[1.6]">
                {service.paymentLine}
              </p>
            ) : null}

            {service.cta ? (
              <div className="mt-6">
                <ButtonLink href={service.cta.href} size="lg">
                  {service.cta.label}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>

        {/* Problem / approach / outcome, divided rows. */}
        <RevealGroup className="lg:col-span-7 lg:pt-1">
          <ProblemBlock label="The problem" text={service.problem} first />
          <ProblemBlock label="Our approach" text={service.solution} accent />
          <ProblemBlock label="The outcome" text={service.outcome} />
        </RevealGroup>
      </div>
    </section>
  );
}

function ProblemBlock({
  label,
  text,
  accent,
  first,
}: {
  label: string;
  text: string;
  accent?: boolean;
  first?: boolean;
}) {
  return (
    <RevealItem>
      <div className={`py-6 ${first ? "border-t-0 pt-0" : "border-bark/10 border-t"}`}>
        <p
          className={`text-[12px] font-bold tracking-[0.12em] uppercase ${
            accent ? "text-ember" : "text-bark-muted"
          }`}
        >
          {label}
        </p>
        <p className="text-bark mt-3 max-w-[52ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.55]">
          {text}
        </p>
      </div>
    </RevealItem>
  );
}
