import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Legal Notice & Privacy Policy | GoodGround" },
  description:
    "GoodGround's legal notice and privacy policy, including how we handle personal information under South Africa's Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/legal" },
  robots: { index: true, follow: true },
};

const toc = [
  { id: "terms", label: "Legal Notice" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "sec-collection", label: "Data Collection" },
  { id: "sec-use", label: "How We Use Your Data" },
  { id: "sec-nonpersonal", label: "Non-Personal Data" },
  { id: "sec-recruitment", label: "Recruitment" },
  { id: "sec-sharing", label: "Data Sharing" },
  { id: "sec-international", label: "International Transfers" },
  { id: "sec-rights", label: "Your Rights (POPIA)" },
  { id: "sec-retention", label: "Data Retention" },
  { id: "sec-security", label: "Data Security" },
  { id: "sec-cookies", label: "Cookies" },
  { id: "sec-links", label: "Third-Party Links" },
  { id: "sec-minors", label: "Minors" },
  { id: "sec-updates", label: "Updates" },
  { id: "sec-contact", label: "Contact" },
];

const rights = [
  "Access the personal data we hold about you",
  "Correct or update inaccurate data",
  "Request deletion of your data",
  "Object to or restrict processing",
  "Withdraw consent at any time",
  "Request transfer of your data",
];

export default function LegalPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Legal", path: "/legal" }]} />

      {/* Hero */}
      <PageHero
        eyebrow="Legal"
        phrases={["Legal Notice &", "Privacy Policy"]}
        intro={
          <>
            GoodGround is committed to transparency, data protection, and responsible use of
            information. By using this website, you agree to the terms below.
          </>
        }
      />

      <div className="mx-auto grid max-w-[1434px] gap-10 px-3 pb-16 sm:px-6 md:px-11 lg:grid-cols-12 lg:gap-14 md:pb-24">
        {/* TOC */}
        <aside className="lg:col-span-4">
          <nav aria-label="On this page" className="lg:sticky lg:top-24">
            <p className="text-bark-muted text-[13px] font-bold tracking-[0.12em] uppercase">
              Contents
            </p>
            <ul className="mt-4 space-y-1">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-bark-muted hover:text-ember block py-1 text-[14px] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Document */}
        <div className="lg:col-span-8">
          {/* Company details */}
          <div className="rounded-card bg-surface border-bark/10 border p-6 sm:p-8">
            <p className="text-bark-muted text-[13px] font-bold tracking-[0.12em] uppercase">
              Company Details
            </p>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <CompanyItem label="Business Name" value="GoodGround" />
              <CompanyItem label="Operated by" value="The Trail Tribe" />
              <CompanyItem label="Founded" value="2026" />
              <CompanyItem
                label="Registered Location"
                value={`${site.address.locality}, ${site.address.city}, South Africa`}
              />
            </dl>
          </div>

          <div className="mt-12 space-y-12">
            <Section num="01" id="terms" title="Legal Notice">
              <P>
                GoodGround is a website design and development studio operating under The Trail
                Tribe, committed to transparency, data protection, and responsible use of
                information.
              </P>
              <Banner>
                By accessing or using this website, you confirm that you have read, understood, and
                accepted this legal notice and privacy policy. If you do not agree with these terms,
                you must stop using the website immediately.
              </Banner>
              <P>
                GoodGround reserves the right to update or modify this legal notice at any time
                without prior notice. Updates become effective immediately upon publication.
              </P>
              <P>Continued use of the website after updates confirms your acceptance of the revised terms.</P>
            </Section>

            <Section num="02" id="privacy" title="Privacy Policy">
              <P>
                We take your privacy seriously. This section explains how we collect, use, store, and
                protect your personal information in accordance with applicable laws, including the{" "}
                <strong className="text-bark font-bold">
                  Protection of Personal Information Act (POPIA)
                </strong>{" "}
                in South Africa.
              </P>
            </Section>

            <Section num="03" id="sec-collection" title="Data Collection">
              <P>We only collect personal data that is necessary to deliver our services and improve your experience.</P>
              <H3>You may provide information when you:</H3>
              <UL
                items={[
                  "Submit a contact or project form",
                  "Request a quote or proposal",
                  "Subscribe to updates or newsletters",
                  "Apply for a job",
                  "Communicate with us directly",
                ]}
              />
              <H3>Personal data collected may include:</H3>
              <UL
                items={[
                  "Full name",
                  "Email address",
                  "Phone number",
                  "Company or business name",
                  "Project details and requirements",
                  "Any other information you choose to share",
                ]}
              />
              <P>
                Providing this information is voluntary. If required information is not provided, we
                may not be able to deliver certain services.
              </P>
            </Section>

            <Section num="04" id="sec-use" title="How We Use Your Data">
              <P>We use your data to:</P>
              <UL
                items={[
                  "Respond to enquiries and communicate with you",
                  "Deliver services and manage projects",
                  "Improve our website and service offering",
                  "Analyse user behaviour and performance",
                  "Send relevant updates or marketing communications where consent is given",
                ]}
              />
              <P>
                We process your data based on legitimate business interests, contractual necessity,
                or your explicit consent.
              </P>
            </Section>

            <Section num="05" id="sec-nonpersonal" title="Non-Personal Data Collection">
              <P>We may automatically collect non-identifiable data such as:</P>
              <UL items={["IP address", "Browser type and device", "Pages visited and time spent", "Referral sources"]} />
              <P>
                This data helps us improve website performance, identify technical issues, and
                understand user behaviour. This information does not personally identify you.
              </P>
            </Section>

            <Section num="06" id="sec-recruitment" title="Recruitment and Candidate Data">
              <P>If you apply for a role at GoodGround, we collect your data for recruitment purposes. This includes:</P>
              <UL
                items={[
                  "Reviewing your application",
                  "Assessing qualifications and experience",
                  "Managing hiring processes",
                  "Considering you for future roles",
                ]}
              />
              <P>
                Your data may be stored for up to <strong className="text-bark font-bold">24 months</strong> unless
                you request deletion earlier. You may request access, correction, or deletion of your
                data at any time.
              </P>
            </Section>

            <Section num="07" id="sec-sharing" title="Data Sharing and Third Parties">
              <P>
                We do not sell, rent, or trade your personal information. We may share data with
                trusted third-party providers where necessary to operate our business.
              </P>
              <div className="rounded-card bg-cream mt-4 flex flex-wrap items-center justify-between gap-2 p-4">
                <span className="font-heading text-bark font-bold">Google</span>
                <span className="text-bark-muted text-[14px]">Analytics and performance tracking</span>
              </div>
              <P>
                These providers are selected based on their compliance with data protection
                standards. We may also disclose information if required by law, necessary to protect
                our legal rights, or required to prevent fraud or security threats.
              </P>
            </Section>

            <Section num="08" id="sec-international" title="International Data Transfers">
              <P>
                As we work with global clients and tools, your data may be processed outside South
                Africa. In such cases, we ensure that appropriate safeguards are in place and that
                data is handled in line with applicable data protection laws.
              </P>
            </Section>

            <Section num="09" id="sec-rights" title="Your Rights Under POPIA">
              <P>You have the right to:</P>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {rights.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span aria-hidden="true" className="bg-ember mt-2 size-1.5 shrink-0 rounded-full" />
                    <span className="text-bark text-[15px] leading-[1.5]">{r}</span>
                  </li>
                ))}
              </ul>
              <P>
                To exercise your rights, contact us with your details and request. We will respond
                within a reasonable timeframe.
              </P>
              <P>
                You also have the right to lodge a complaint with the{" "}
                <strong className="text-bark font-bold">Information Regulator of South Africa</strong>.
              </P>
            </Section>

            <Section num="10" id="sec-retention" title="Data Retention">
              <P>We only retain personal data for as long as necessary. Retention periods depend on:</P>
              <UL
                items={[
                  "The purpose of data collection",
                  "Legal and regulatory requirements",
                  "Business and operational needs",
                ]}
              />
              <P>Once data is no longer required, it is securely deleted or anonymised.</P>
            </Section>

            <Section num="11" id="sec-security" title="Data Security">
              <P>We take reasonable technical and organisational steps to protect your data. This includes:</P>
              <UL
                items={[
                  "Secure hosting environments",
                  "Access control and restricted permissions",
                  "Use of encrypted connections where applicable",
                  "Regular monitoring and updates",
                ]}
              />
              <Banner>
                Despite these measures, no online system is completely secure. You share information
                at your own risk.
              </Banner>
            </Section>

            <Section num="12" id="sec-cookies" title="Cookies and Tracking Technologies">
              <P>We use cookies and similar technologies to improve your experience. Cookies help us:</P>
              <UL items={["Remember user preferences", "Analyse site usage", "Improve performance and functionality"]} />
              <P>
                You can manage or disable cookies through your browser settings. Some features of the
                website may not function correctly if cookies are disabled.
              </P>
            </Section>

            <Section num="13" id="sec-links" title="Third-Party Links">
              <P>
                Our website may include links to third-party websites. We do not control these
                websites and are not responsible for their content, policies, or practices.
              </P>
              <P>You should review their privacy policies before providing any personal data.</P>
            </Section>

            <Section num="14" id="sec-minors" title="Minors">
              <P>
                Our services are not intended for individuals under the age of{" "}
                <strong className="text-bark font-bold">16</strong>. We do not knowingly collect personal data from
                minors without parental or guardian consent.
              </P>
              <P>If such data is identified, it will be removed promptly.</P>
            </Section>

            <Section num="15" id="sec-updates" title="Updates to This Policy">
              <P>
                We may update this legal notice and privacy policy from time to time. Changes will be
                published on this page.
              </P>
              <P>You are responsible for reviewing this page regularly to stay informed.</P>
            </Section>

            <Section num="16" id="sec-contact" title="Contact">
              <P>
                If you have any questions about this legal notice or how your data is handled, contact
                GoodGround{site.email ? " at " : " through the website"}
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="text-ember font-bold underline underline-offset-2">
                    {site.email}
                  </a>
                ) : null}
                .
              </P>
              <P>We aim to respond promptly and resolve any concerns efficiently.</P>
              <div className="mt-6">
                <ButtonLink href="/contact" size="lg">
                  Get in touch →
                </ButtonLink>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

function CompanyItem({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <dt className="text-bark-muted text-[12px] font-medium tracking-[0.08em] uppercase">{label}</dt>
      <dd className={`font-heading mt-1 text-[16px] font-bold ${muted ? "text-bark-muted italic" : "text-bark"}`}>
        {value}
      </dd>
    </div>
  );
}

function Section({ num, id, title, children }: { num: string; id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className="font-heading text-ember text-[13px] font-bold tabular-nums">{num}</p>
      <h2 className="font-heading text-pine mt-2 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-bold tracking-[-0.02em]">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-bark-muted max-w-[68ch] text-[15px] leading-[1.7]">{children}</p>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-heading text-bark pt-1 text-[15px] font-bold">{children}</h3>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="text-bark-muted flex items-start gap-3 text-[15px] leading-[1.6]">
          <span aria-hidden="true" className="bg-ember/50 mt-2.5 size-1.5 shrink-0 rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Banner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-card border-ember/25 bg-ember/8 text-bark border-l-0 p-5 text-[15px] leading-[1.6]">
      {children}
    </div>
  );
}
