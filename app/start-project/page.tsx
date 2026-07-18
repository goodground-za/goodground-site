import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { StartProjectForm } from "@/components/StartProjectForm";

export const metadata: Metadata = {
  title: { absolute: "Start Your Project | GoodGround Website Development" },
  description:
    "Start your website project with GoodGround. Answer a few quick questions and we'll come back with next steps and a monthly payment plan.",
  alternates: { canonical: "/start-project" },
};

export default function StartProjectPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Start your project", path: "/start-project" }]} />

      <PageHero
        eyebrow="Start your project"
        phrases={["Let's plant", "something that grows."]}
        intro={
          <>
            A few quick questions, then your details. It takes about a minute, and there&rsquo;s no
            obligation, just a starting point for the conversation.
          </>
        }
      />

      <section className="px-3 pb-16 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-[820px] px-3 sm:px-6 md:px-11">
          <StartProjectForm />
        </div>
      </section>
    </>
  );
}
