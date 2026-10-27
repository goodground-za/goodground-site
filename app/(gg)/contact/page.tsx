import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { ButtonFace } from "@/components/gg/Button";
import { AskLink } from "@/components/gg/contact/AskLink";
import { Channels } from "@/components/gg/contact/Channels";
import { ContactForm } from "@/components/gg/contact/ContactForm";
import { GgShell } from "@/components/gg/GgShell";
import { Icon, type IconName } from "@/components/gg/Icon";
import { ArrowChip, LinkedCard } from "@/components/gg/LinkedCard";
import { Resp } from "@/components/gg/Resp";
import { SectionHeader } from "@/components/gg/SectionHeader";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { site } from "@/content/site";
import { REPLY_TIME } from "@/lib/enquiryShared";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/contact/contact.css";

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

/** ContactPage + LocalBusiness (George, Western Cape, email, sameAs Instagram/Facebook). */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${site.url}/contact`,
      name: "Contact GoodGround",
      url: `${site.url}/contact`,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#localbusiness`,
      name: site.name,
      url: site.url,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      areaServed: { "@type": "Country", name: "South Africa" },
      sameAs: site.socials.map((s) => s.href),
    },
  ],
};

const QUICK: { kicker: string; q: string; a: string; href: string }[] = [
  { kicker: "PRICING", q: "How do the payment options work?", a: "One fixed price: 50/50, or 12 monthly instalments.", href: "/#faq-payment-options" },
  { kicker: "TIMELINES", q: "How long does a project take?", a: "See typical timelines in our FAQ.", href: "/#faq-project-length" },
  { kicker: "PROOF", q: "Can I see your work first?", a: "Every case study has numbers you can check.", href: "/work" },
];

function RouteBody({
  icon,
  kicker,
  title: heading,
  body,
  short,
  button,
  dark,
}: {
  icon: IconName;
  kicker: string;
  title: string;
  body: string;
  short: string;
  button: ReactNode;
  dark?: boolean;
}) {
  return (
    <>
      <span className="ct-route__top">
        <span className="ct-route__chip" aria-hidden="true">
          <Icon name={icon} size={24} stroke={2} />
        </span>
        <span className="gg-kicker ct-route__kicker">{kicker}</span>
      </span>
      <span className="ct-route__copy">
        <span className="ct-route__title">{heading}</span>
        <span className="ct-route__body">
          <span className="gg-resp-long">{body}</span>
          <span className="gg-resp-short">{short}</span>
        </span>
      </span>
      <span className="ct-route__button">{button}</span>
      {dark ? null : <Icon name="chev" size={18} stroke={2.2} />}
    </>
  );
}

export default function ContactPage() {
  return (
    <GgShell crumbs={[{ label: "CONTACT" }]} footer={{ ruled: true }}>
      <div className="ct-page">
        <BreadcrumbSchema trail={[{ name: "Contact", path }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        {/* 01 · Hero ---------------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ct-hero" aria-labelledby="ct-title">
          <div className="gg-wrap ct-hero__grid">
            <div className="ct-hero__copy" data-reveal="header">
              <Tag tone="coral" data-part="tag">
                GET IN TOUCH
              </Tag>
              <SplitHeading as="h1" id="ct-title" className="gg-display-l ct-h1" text={"LET’S BUILD SOMETHING\nTHAT LASTS."} />
              <p className="gg-lead ct-hero__lead" data-part="sub">
                <Resp
                  long="Every project starts with a conversation, not a contract. Pick the route that fits, and a real person will get back to you."
                  short="Every project starts with a conversation, not a contract."
                />
              </p>
              <p className="ct-pill" data-part="cta">
                <i aria-hidden="true" />
                <span className="gg-resp-long">We reply within {REPLY_TIME}</span>
                <span className="gg-resp-short">Reply within {REPLY_TIME}</span>
              </p>
            </div>
          </div>
        </section>

        {/* 02 · Choose your route ------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ct-routes-section" aria-label="Choose your route">
          <div className="gg-wrap">
            <ul className="ct-routes" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
              <li>
                <LinkedCard href="/start-project?ref=contact" className="ct-route ct-route--plum">
                  <RouteBody
                    icon="sprout"
                    kicker="MOST ENQUIRIES"
                    title="Start a project"
                    body="Four quick questions, about a minute. We’ll come back with a fixed price, split however you’d like to pay it."
                    short="Four quick questions. We’ll come back with a fixed price."
                    button={<ButtonFace variant="coral">Start your project</ButtonFace>}
                    dark
                  />
                </LinkedCard>
              </li>
              <li>
                <AskLink className="gg-card ct-route ct-route--row">
                  <RouteBody
                    icon="chat"
                    kicker="GENERAL"
                    title="Ask a question"
                    body="Not ready for a project yet? Send us a quick message below about anything at all."
                    short="Send a quick message below"
                    button={<ButtonFace variant="outline">Write a message</ButtonFace>}
                  />
                </AskLink>
              </li>
              <li>
                <LinkedCard href={site.whatsapp.link} className="ct-route ct-route--row">
                  <RouteBody
                    icon="users"
                    kicker="EXISTING CLIENTS"
                    title="Already working with us?"
                    body="For changes, support or your Full Service plan, message us directly and we’ll pick it up."
                    short="WhatsApp us for changes or support"
                    button={<ButtonFace variant="outline">WhatsApp us</ButtonFace>}
                  />
                </LinkedCard>
              </li>
            </ul>
          </div>
        </section>

        {/* 03 · Quick message + channels ------------------------------------------------- */}
        <section id="quick-message" className="hm-section hm-section--surface ct-message" aria-labelledby="ct-message-title">
          <div className="gg-wrap ct-message__grid">
            <div className="ct-message__form" data-reveal="fade-up">
              <SectionHeader
                tag="QUICK MESSAGE"
                heading="Send us a quick message"
                headingClass="gg-h2 ct-h2"
                id="ct-message-title"
                sub="For project enquiries, the 4-step project form gets you a fixed price faster."
                subClassName="hm-hide-phone"
              />
              <ContactForm />
            </div>
            <div className="ct-message__channels">
              <h2 className="ct-or">Or reach us directly</h2>
              <Channels />
            </div>
          </div>
        </section>

        {/* 04 · Quick answers ----------------------------------------------------------- */}
        <section className="hm-section hm-section--canvas ct-quick" aria-labelledby="ct-quick-title">
          <div className="gg-wrap">
            <h2 id="ct-quick-title" className="ct-quick__title">
              Quick answers
            </h2>
            <ul className="ct-quick__grid" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
              {QUICK.map((item) => (
                <li key={item.q}>
                  <LinkedCard href={item.href} className="ct-qcard">
                    <span className="ct-qcard__top">
                      <span className="gg-kicker">{item.kicker}</span>
                      <ArrowChip size={32} />
                    </span>
                    <span className="ct-qcard__q">{item.q}</span>
                    <span className="ct-qcard__a">{item.a}</span>
                    <Icon name="chev" size={18} stroke={2.2} />
                  </LinkedCard>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </GgShell>
  );
}
