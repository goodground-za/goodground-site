import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/Breadcrumbs";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import { SplitWords } from "@/components/motion-gsap/SplitWords";
import { caseStudies, caseStudyKindLabel, getCaseStudy, type CaseStudy, type GalleryImage } from "@/content/caseStudies";
import { site } from "@/content/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.client}: ${study.title}`;
  const description = study.standfirst;
  const url = `${site.url}/work/${study.slug}`;
  const ogImage = study.heroImage
    ? { url: study.heroImage.src, width: study.heroImage.width, height: study.heroImage.height, alt: study.heroImage.alt }
    : { url: study.image, width: 1440, height: 900, alt: study.imageAlt };

  return {
    title: { absolute: `${title} | GoodGround` },
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: "article", url, title, description, images: [ogImage] },
    // Without its own twitter block this inherits the root layout's homepage
    // title/description on X specifically — same fix as the insights pages.
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

/** A row of images at their own natural aspect ratio, not stretched to a
 * shared height. `cols` is the max column count at the widest breakpoint. */
function ImageRow({ images, cols }: { images: GalleryImage[]; cols: 2 | 3 | 4 }) {
  const gridCols =
    cols === 2 ? "sm:grid-cols-2" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <RevealSection>
      <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
        {images.map((img) => (
          <div key={img.src} className="rounded-card ring-ht-pink overflow-hidden bg-white ring-2">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              quality={90}
              sizes={`(max-width: 640px) 100vw, ${Math.round(100 / cols)}vw`}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

/**
 * Client-supplied reference layout (2026-08-19): full lifestyle hero photo,
 * a Year / Service / Details meta row, an optional looping video under "The
 * Brief", standalone image galleries between sections, and a short
 * "Solution" intro before the named sub-blocks. Used once a case study has
 * `heroImage`, `galleries` or `solutionIntro` — see the type comment in
 * content/caseStudies.ts for how a study gets migrated onto it.
 */
function NewTemplateBody({ study }: { study: CaseStudy }) {
  const galleries = study.galleries ?? {};
  const hero = study.heroImage ?? { src: study.image, alt: study.imageAlt, width: 1440, height: 900 };

  return (
    <>
      {/* ---------- Hero ----------
          Full-bleed: no side padding, no top gap under the nav, no rounded
          corners — the reference layout runs this photo edge-to-edge. */}
      <section className="bg-ht-cream">
        <RevealSection>
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            priority
            quality={90}
            sizes="100vw"
            className="h-auto w-full"
          />
        </RevealSection>
      </section>

      {/* ---------- Meta header ---------- */}
      <section className="bg-ht-cream px-6 pt-10 pb-10 sm:px-10">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8">
              <div>
                <span className="bg-ht-orange text-ink font-ht-display rounded-pill px-3 py-1 text-[12px] font-bold tracking-[0.08em] uppercase">
                  {caseStudyKindLabel(study.kind)}
                </span>
                <h1 className="font-ht-display text-ht-purple mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.06] font-bold">
                  {study.client}
                </h1>
              </div>

              <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-ht-purple/50 uppercase">Year</dt>
                  <dd className="text-ht-purple mt-1.5 text-[15px] leading-[1.6] font-medium">{study.year}</dd>
                </div>
                <div>
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-ht-purple/50 uppercase">Service</dt>
                  <dd className="text-ht-purple mt-1.5 max-w-[26ch] text-[15px] leading-[1.6] font-medium">
                    {study.service}
                  </dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-ht-purple/50 uppercase">Details</dt>
                  <dd className="text-ht-purple mt-1.5 max-w-[32ch] text-[15px] leading-[1.6] font-medium">
                    {study.details}
                  </dd>
                </div>
              </dl>
            </div>
          </RevealSection>
          <div className="border-ht-purple/15 mt-10 border-t" />
        </div>
      </section>

      {/* ---------- The Brief ---------- */}
      {(study.video || study.liveUrl) && (
        <section className="bg-ht-cream px-6 pb-16 sm:px-10 md:pb-24">
          <div className="mx-auto max-w-[1434px]">
            {study.video ? (
              <RevealSection>
                <h2 className="font-ht-display text-ht-purple text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold">
                  The brief
                </h2>
                {study.briefText && study.briefText.length > 0 ? (
                  <div className="mt-6 max-w-[68ch] space-y-5">
                    {study.briefText.map((p) => (
                      <p key={p.slice(0, 40)} className="text-ht-purple/75 text-[16px] leading-[1.75]">
                        {p}
                      </p>
                    ))}
                  </div>
                ) : null}
                <div className="rounded-block ring-ht-pink mt-7 overflow-hidden bg-white ring-2">
                  {/* Muted autoplay loop: no controls, no sound (browsers block
                      autoplay-with-sound anyway), respects the page's own
                      layout rather than a third-party player's chrome. */}
                  <video
                    src={study.video.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    className="h-auto w-full"
                  />
                </div>
              </RevealSection>
            ) : null}
            {study.liveUrl ? (
              <p className={study.video ? "mt-7 text-center" : "text-center"}>
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03]"
                >
                  Open the live site
                </a>
              </p>
            ) : null}
          </div>
        </section>
      )}

      {/* ---------- Snapshot ---------- */}
      <section className="bg-ht-purple px-6 py-14 sm:px-10 md:py-20">
        <div className="mx-auto max-w-[1434px]">
          <h2 className="font-ht-display text-ht-pink text-[13px] font-bold tracking-[0.14em] uppercase">
            Snapshot
          </h2>
          <RevealSection>
            <dl className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-3">
              {study.snapshot.map((row) => (
                <div key={row.label}>
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-white/55 uppercase">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-[1.6] text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </RevealSection>
        </div>
      </section>

      {/* ---------- Image pair ---------- */}
      {galleries.pair && galleries.pair.length > 0 && (
        <section className="bg-ht-cream px-6 py-16 sm:px-10 md:py-24">
          <div className="mx-auto max-w-[1434px]">
            <ImageRow images={galleries.pair} cols={2} />
          </div>
        </section>
      )}

      {/* ---------- The Challenge / The Solution (intro) ---------- */}
      <section className={`bg-ht-cream px-6 sm:px-10 ${galleries.pair ? "pb-16 md:pb-24" : "py-16 md:py-24"}`}>
        <div className="mx-auto max-w-[1434px]">
          <div className="grid gap-12 md:grid-cols-2 md:gap-14">
            <RevealSection>
              <h2 className="font-ht-display text-ht-purple text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold">
                The challenge
              </h2>
              <div className="mt-6 max-w-[68ch] space-y-5">
                {study.challenge.map((p) => (
                  <p key={p.slice(0, 40)} className="text-ht-purple/75 text-[16px] leading-[1.75]">
                    {p}
                  </p>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <h2 className="font-ht-display text-ht-purple text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold">
                The solution
              </h2>
              <div className="mt-6 max-w-[68ch] space-y-5">
                {(study.solutionIntro ?? []).map((p) => (
                  <p key={p.slice(0, 40)} className="text-ht-purple/75 text-[16px] leading-[1.75]">
                    {p}
                  </p>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ---------- Wide image ---------- */}
      {galleries.wide && (
        <section className="bg-ht-cream px-6 pb-16 sm:px-10 md:pb-24">
          <div className="mx-auto max-w-[1434px]">
            <RevealSection>
              <div className="rounded-block ring-ht-pink overflow-hidden bg-white ring-2">
                <Image
                  src={galleries.wide.src}
                  alt={galleries.wide.alt}
                  width={galleries.wide.width}
                  height={galleries.wide.height}
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 1434px) 100vw, 1434px"
                  className="h-auto w-full"
                />
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ---------- Image row ---------- */}
      {galleries.row && galleries.row.length > 0 && (
        <section className="bg-ht-cream px-6 pb-16 sm:px-10 md:pb-24">
          <div className="mx-auto max-w-[1434px]">
            <ImageRow images={galleries.row} cols={3} />
          </div>
        </section>
      )}

      {/* ---------- Solution detail blocks ---------- */}
      <section className="bg-white px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1434px] gap-x-14 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {study.solution.map((block) => (
            <RevealSection key={block.heading}>
              <h3 className="font-ht-display text-ht-purple max-w-[36ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-tight font-bold">
                {block.heading}
              </h3>
              <div className="mt-5 max-w-[68ch] space-y-4">
                {block.body.map((p) => (
                  <p key={p.slice(0, 40)} className="text-ht-purple/75 text-[15px] leading-[1.75]">
                    {p}
                  </p>
                ))}
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ---------- Image grid ---------- */}
      {galleries.grid && galleries.grid.length > 0 && (
        <section className="bg-white px-6 pb-16 sm:px-10 md:pb-24">
          <div className="mx-auto max-w-[1434px]">
            <ImageRow images={galleries.grid} cols={4} />
          </div>
        </section>
      )}
    </>
  );
}

/** Original template: still used by every case study that hasn't been
 * migrated onto the reference layout above yet (no matching multi-shot
 * asset set + video in hand). Unchanged from before 2026-08-19. */
function OriginalTemplateBody({ study }: { study: CaseStudy }) {
  return (
    <>
      {/* ---------- Headline ---------- */}
      <section className="bg-ht-cream px-6 pt-16 pb-10 sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="bg-ht-orange text-ink font-ht-display rounded-pill px-3 py-1 text-[12px] font-bold tracking-[0.08em] uppercase">
                {study.client}
              </span>
              {/* Says "concept build" up front rather than letting a reader
                  assume this was a paying client. */}
              <span className="border-ht-purple/25 text-ht-purple/80 rounded-pill border px-3 py-1 text-[12px] font-medium">
                {caseStudyKindLabel(study.kind)}
              </span>
              <span className="text-ht-purple/70 text-[13px] font-medium">{study.year}</span>
            </div>

            <h1 className="font-ht-display text-ht-purple mt-6 max-w-[22ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] font-bold">
              {study.title}
            </h1>
            <SplitWords
              as="p"
              text={study.standfirst}
              className="text-ht-purple/75 mt-5 max-w-[64ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.6]"
            />
          </RevealSection>
        </div>
      </section>

      {/* ---------- Hero image ---------- */}
      <section className="bg-ht-cream px-6 pb-14 sm:px-10">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <div className="rounded-block ring-ht-pink overflow-hidden bg-white ring-2">
              <Image
                src={study.image}
                alt={study.imageAlt}
                width={1440}
                height={900}
                priority
                sizes="(max-width: 1434px) 100vw, 1434px"
                className="h-auto w-full"
              />
            </div>
            {study.liveUrl ? (
              <p className="mt-4">
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ht-crimson inline-flex items-center gap-2 text-[14px] font-bold"
                >
                  Open the live site
                  <span aria-hidden="true">→</span>
                </a>
              </p>
            ) : null}
          </RevealSection>
        </div>
      </section>

      {/* ---------- Snapshot ---------- */}
      <section className="bg-ht-purple px-6 py-14 sm:px-10 md:py-20">
        <div className="mx-auto max-w-[1434px]">
          <h2 className="font-ht-display text-ht-pink text-[13px] font-bold tracking-[0.14em] uppercase">
            Snapshot
          </h2>
          {/* A real <dl>, not RevealStagger: that component renders a <div>, which
              would leave the <dt>/<dd> pairs orphaned outside a list. The spec
              allows dl > div > dt+dd, so each pair keeps its own wrapper. */}
          <RevealSection>
            <dl className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {study.snapshot.map((row) => (
                <div key={row.label}>
                  <dt className="text-[12px] font-bold tracking-[0.1em] text-white/55 uppercase">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-[1.6] text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </RevealSection>
        </div>
      </section>

      {/* ---------- The Challenge ---------- */}
      <section className="bg-ht-cream px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <h2 className="font-ht-display text-ht-purple text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold">
              The challenge
            </h2>
            <div className="mt-6 max-w-[68ch] space-y-5">
              {study.challenge.map((p) => (
                <p key={p.slice(0, 40)} className="text-ht-purple/75 text-[16px] leading-[1.75]">
                  {p}
                </p>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ---------- The Solution ---------- */}
      <section className="bg-white px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <h2 className="font-ht-display text-ht-purple text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold">
              The solution
            </h2>
          </RevealSection>

          <div className="mt-12 space-y-16 md:space-y-24">
            {study.solution.map((block, i) => (
              <RevealSection key={block.heading}>
                {/* No fixed 2-column grid when a block carries no image: that
                    left an empty second column rather than letting the text
                    take the full width. */}
                <div
                  className={
                    block.image
                      ? "grid items-center gap-8 md:grid-cols-2 md:gap-14"
                      : "grid items-center gap-8"
                  }
                >
                  {/* alternate which side the image sits on */}
                  <div className={block.image && i % 2 === 1 ? "md:order-2" : undefined}>
                    <h3 className="font-ht-display text-ht-purple max-w-[24ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-tight font-bold">
                      {block.heading}
                    </h3>
                    <div className={`mt-5 space-y-4 ${block.image ? "" : "max-w-[68ch]"}`}>
                      {block.body.map((p) => (
                        <p key={p.slice(0, 40)} className="text-ht-purple/75 text-[15px] leading-[1.75]">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {block.image ? (
                    <div className={i % 2 === 1 ? "md:order-1" : undefined}>
                      {/* Phone screenshots are portrait and much narrower
                          than the desktop shots they sit beside. Rendered
                          at the same full column width as those, a tall
                          390px-wide capture stretches into a huge slab.
                          Cap it to a small, centred, phone-proportioned
                          box instead. */}
                      <div
                        className={
                          block.imageFit === "phone"
                            ? "rounded-card ring-ht-pink mx-auto w-full max-w-[220px] overflow-hidden bg-white ring-2 sm:max-w-[240px]"
                            : "rounded-card ring-ht-pink overflow-hidden bg-white ring-2"
                        }
                      >
                        <Image
                          src={block.image}
                          alt={block.imageAlt ?? ""}
                          width={block.imageDimensions?.width ?? 1440}
                          height={block.imageDimensions?.height ?? 900}
                          loading="lazy"
                          sizes={block.imageFit === "phone" ? "240px" : "(max-width: 768px) 100vw, 700px"}
                          className="h-auto w-full"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  // CreativeWork, not Product: the subject is the website GoodGround built,
  // not whatever the site sells (SEO audit 2026-08-16, item 13). Templated
  // for every case study, not just the one the audit found missing it.
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/work/${study.slug}`,
    name: `${study.client}: ${study.title}`,
    headline: `${study.client}: ${study.title}`,
    description: study.standfirst,
    creator: { "@id": `${site.url}/#organization` },
    datePublished: study.datePublished,
    genre: "Case study",
    keywords: study.tags.join(", "),
    url: `${site.url}/work/${study.slug}`,
    mainEntityOfPage: `${site.url}/work/${study.slug}`,
    isPartOf: { "@id": `${site.url}/#website` },
  };

  // A case study renders on the new client-reference template once it has a
  // matching multi-shot asset set — signalled by any of these three fields.
  // Until then it renders on the original template unchanged.
  const isNewTemplate = Boolean(study.heroImage || study.galleries || study.solutionIntro);

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Work", path: "/work" },
          { name: study.client, path: `/work/${study.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      {isNewTemplate ? <NewTemplateBody study={study} /> : <OriginalTemplateBody study={study} />}

      {/* ---------- The Results ---------- */}
      <section className="bg-ht-purple px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-[1434px]">
          <RevealSection>
            <h2 className="font-ht-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold text-white">
              The results
            </h2>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.7] text-white/70">
              Every figure below was measured on the live URL. Each one tells you how to check it
              yourself.
            </p>
          </RevealSection>

          <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" y={16}>
            {study.results.map((m) => (
              <div key={m.label} className="rounded-card bg-white/5 p-7 ring-1 ring-white/15">
                <p className="font-ht-display text-ht-pink text-[clamp(1.9rem,4vw,2.8rem)] leading-none font-bold">
                  {m.value}
                </p>
                <p className="mt-3 text-[15px] font-bold text-white">{m.label}</p>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/60">{m.verify}</p>
              </div>
            ))}
          </RevealStagger>

          {/* The honest bit. Deliberately not buried in small print. */}
          <RevealSection>
            <div className="rounded-card mt-8 border-2 border-dashed border-white/25 p-7">
              <p className="max-w-[76ch] text-[15px] leading-[1.75] text-white/80">
                {study.resultsCaveat}
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ---------- Call to action ----------
          pb-[24vw]: last section before the footer's CloudDivider, which scales
          with viewport width and will otherwise swallow this block. Same
          reservation every other page here makes. */}
      <section className="bg-ht-cream px-6 pt-16 pb-[24vw] sm:px-10 md:pt-24">
        <div className="mx-auto max-w-[1434px] text-center">
          <RevealSection>
            <h2 className="font-ht-display text-ht-purple mx-auto max-w-[20ch] text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight font-bold">
              Want a website like this?
            </h2>
            <p className="text-ht-purple/70 mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.7]">
              Tell us what you sell and who you sell it to. We will tell you honestly whether a new
              site is the thing that will move the needle.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/start-project"
                  className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03]"
                >
                  Start Your Project
                </Link>
              </MagneticButton>
              <Link
                href="/work"
                className="font-ht-display text-ht-purple border-ht-purple/25 rounded-pill inline-block border-2 px-7 py-3.5 text-[14px] font-bold tracking-wide uppercase"
              >
                See all work
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
