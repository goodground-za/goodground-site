import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { StartProjectForm } from "@/components/StartProjectForm";
import { pageSocialMeta } from "@/lib/metadata";

const title = { absolute: "Start Your Project | GoodGround Website Development" };
const description =
  "Start your website project with GoodGround. Answer a few quick questions and we'll come back with next steps and a fixed price, split however you'd like to pay it.";
const path = "/start-project";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMeta({ title, description, path }),
};

export default function StartProjectPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Start your project", path: "/start-project" }]} />

      <PageHero
        eyebrow="Start your project"
        title="Let's plant something that grows."
        intro="A few quick questions, then your details. It takes about a minute, and there's no obligation, just a starting point for the conversation."
      />

      {/* pb-[24vw]: last section before the footer's CloudDivider. */}
      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[820px]">
          <StartProjectForm />
        </div>
      </section>
    </>
  );
}
