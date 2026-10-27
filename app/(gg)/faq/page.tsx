import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { FAQSchema } from "@/components/Schema";
import { GgShell } from "@/components/gg/GgShell";
import { GradientCta } from "@/components/gg/GradientCta";
import { Resp } from "@/components/gg/Resp";
import { SplitHeading } from "@/components/gg/SplitHeading";
import { Tag } from "@/components/gg/Tag";
import { entries } from "@/components/gg/faq/data";
import { FaqBody, FaqProvider, FaqSearch, TopicCards } from "@/components/gg/faq/FaqClient";
import { pageSocialMeta } from "@/lib/metadata";
import "@/components/gg/faq/faq.css";

// Live title and description kept (README: keep live SEO titles).
const title = { absolute: "Frequently Asked Questions | GoodGround" };
const description =
  "Everything you need to know about payment plans, project scope, timelines, and our Google & Meta Ads growth services, before you start with GoodGround.";
const path = "/faq";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

export default function FaqPage() {
  return (
    <GgShell crumbs={[{ label: "FAQ" }]}>
      <div className="fq-page">
        <BreadcrumbSchema trail={[{ name: "FAQ", path }]} />
        {/* All 13 questions, answers stay in the DOM when closed. */}
        <FAQSchema items={entries.map((e) => ({ question: e.question, answer: e.answer }))} id="faq-page-faq" />

        <FaqProvider>
          {/* 01 · Hero + search ------------------------------------------------------------- */}
          <section className="hm-section hm-section--canvas fq-hero" aria-labelledby="fq-title">
            <div className="gg-wrap">
              <div className="fq-hero__col" data-reveal="header">
                <Tag tone="coral" data-part="tag">
                  FAQ
                </Tag>
                <SplitHeading as="h1" id="fq-title" className="gg-display-l fq-h1" text="EVERY QUESTION WE’RE ACTUALLY ASKED." />
                <p className="gg-lead fq-hero__lead" data-part="sub">
                  <Resp
                    long="Answered plainly. No chatbot, no call centre, just a straight answer or an honest admission that we haven’t settled something yet."
                    short="Answered plainly. No chatbot, no call centre."
                  />
                </p>
                <div className="fq-hero__search" data-part="cta">
                  <FaqSearch />
                </div>
              </div>
              <div className="fq-hero__col fq-hero__col--topics">
                <TopicCards />
              </div>
            </div>
          </section>

          {/* 02 · Questions ----------------------------------------------------------------- */}
          <section className="fq-zone" aria-label="Questions">
            <FaqBody />
          </section>
        </FaqProvider>
      </div>

      {/* 03 · CTA ---------------------------------------------------------------------------- */}
      <GradientCta variant="home" refSource="faq" />
    </GgShell>
  );
}
