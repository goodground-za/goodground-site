import type { Metadata } from "next";
import Image from "next/image";
import { Button, ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { site } from "@/content/site";

// Internal reference document, not a marketing page. Kept out of search
// entirely (index and follow both off) rather than relying on sitemap
// omission alone, since a stray internal/external link could still get it
// crawled otherwise.
export const metadata: Metadata = {
  title: "Brand Guide",
  description: "Internal brand and design reference for GoodGround. Not for public search.",
  robots: { index: false, follow: false, nocache: true },
};

function Section({
  id,
  title,
  eyebrow,
  children,
  last = false,
}: {
  id: string;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  /** Closing padding on the final section, before the footer. */
  last?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 border-t border-ht-purple/10 pt-16 md:pt-20 ${last ? "pb-20 md:pb-28" : "py-16 md:py-20"}`}
    >
      <div className="mx-auto max-w-[1200px] px-gutter">
        <RevealSection>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-ht-display text-ht-purple mt-3 max-w-[24ch] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-bold uppercase">
            {title}
          </h2>
        </RevealSection>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Swatch({
  name,
  token,
  hex,
  usage,
  textClassName = "text-white",
}: {
  name: string;
  token: string;
  hex: string;
  usage: string;
  textClassName?: string;
}) {
  return (
    <div className="rounded-card overflow-hidden shadow-soft border border-ht-purple/10">
      <div
        className={`flex h-28 items-end p-4 font-ht-display text-[13px] font-bold tracking-wide uppercase ${textClassName}`}
        style={{ backgroundColor: hex }}
      >
        {name}
      </div>
      <div className="bg-white p-4">
        <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">{hex}</p>
        <p className="font-ht-body text-ht-purple/70 mt-1 text-[12px]">{token}</p>
        <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px] leading-[1.5]">{usage}</p>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ht-purple/10 py-3 last:border-b-0">
      <span className="font-ht-body text-ht-purple/70 text-[13px]">{label}</span>
      <span className="font-ht-display text-ht-purple text-right text-[13px] font-bold">{value}</span>
    </div>
  );
}

const jumpLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#logo", label: "Logo" },
  { href: "#color", label: "Color" },
  { href: "#type", label: "Typography" },
  { href: "#layout", label: "Layout & Spacing" },
  { href: "#buttons", label: "Buttons" },
  { href: "#shadow", label: "Edges" },
  { href: "#motion", label: "Motion" },
  { href: "#voice", label: "Voice & Tone" },
  { href: "#a11y", label: "Accessibility" },
];

export default function BrandGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Internal, No Index"
        title="GoodGround Brand Guide"
        intro="The single source of truth for GoodGround's visual identity: color, type, spacing, components, motion, and voice, as actually implemented on this site, not an aspirational moodboard."
      >
        <nav aria-label="Brand guide sections" className="mt-8 flex flex-wrap gap-2">
          {jumpLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-ht-display rounded-pill bg-white/10 px-4 py-2 text-[11px] font-bold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-white/20"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <Section id="overview" eyebrow="Who we are" title="Brand overview">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-card bg-ht-cream shadow-soft space-y-3 p-6">
            <SpecRow label="Name" value={site.name} />
            <SpecRow label="Legal name" value={site.legalName} />
            <SpecRow label="Registration no." value={site.registrationNumber} />
            <SpecRow label="Tagline" value={site.tagline} />
            <SpecRow label="Founded" value={site.foundingDate} />
            <SpecRow label="Based" value={`${site.address.locality}, ${site.address.region}`} />
            <SpecRow label="Serves" value={site.areaServed} />
          </div>
          <div>
            <p className="font-ht-body text-ht-purple/80 text-[15px] leading-[1.7]">
              GoodGround is a website development studio building custom, fast business websites
              across South Africa, with a choice of two payment plans instead of one large upfront
              invoice. The brand voice is direct, specific, and confident, closer to a straight-talking
              contractor than a corporate agency.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Say what a thing does before saying why it matters.",
                "Specificity over adjectives: a number or a named outcome beats \"stunning\" or \"seamless.\"",
                "\"X, not just Y\" is a deliberate, recurring construction in this brand's voice.",
                "Confident, not salesy. No exclamation marks in body copy.",
              ].map((rule) => (
                <li key={rule} className="font-ht-body text-ht-purple/70 flex gap-2 text-[14px] leading-[1.6]">
                  <span aria-hidden="true" className="text-ht-crimson mt-1 shrink-0">
                    &#9632;
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="logo" eyebrow="Mark" title="Logo">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-card bg-ht-purple shadow-soft flex h-40 items-center justify-center p-8">
            <Image
              src="/logos/gg-horizontal.svg"
              alt="GoodGround horizontal logo, white on purple"
              width={160}
              height={30}
              className="h-7 w-auto brightness-0 invert"
            />
          </div>
          <div className="rounded-card bg-ht-cream shadow-soft flex h-40 items-center justify-center p-8">
            <Image
              src="/logos/gg-stacked.svg"
              alt="GoodGround stacked logo, purple on cream"
              width={100}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <div className="rounded-card bg-ht-orange shadow-soft flex h-40 items-center justify-center p-8">
            <Image
              src="/logos/gg-mark.svg"
              alt="GoodGround mark only, white on orange"
              width={64}
              height={64}
              className="h-14 w-auto brightness-0 invert"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Files</p>
            <ul className="font-ht-body text-ht-purple/70 mt-2 space-y-1 text-[14px]">
              <li>
                <code className="bg-ht-cream rounded px-1.5 py-0.5 text-[13px]">/logos/gg-horizontal.svg</code>
                {": nav and footer lockup"}
              </li>
              <li>
                <code className="bg-ht-cream rounded px-1.5 py-0.5 text-[13px]">/logos/gg-stacked.svg</code>
                {": square and social profile placements"}
              </li>
              <li>
                <code className="bg-ht-cream rounded px-1.5 py-0.5 text-[13px]">/logos/gg-mark.svg</code>
                {": favicon-adjacent placements, tight spaces"}
              </li>
            </ul>
          </div>
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Usage rules</p>
            <ul className="font-ht-body text-ht-purple/70 mt-2 space-y-1 text-[14px] leading-[1.6]">
              <li>Rendered pure white (brightness-0 invert) on every dark surface, never tinted.</li>
              <li>Never stretched, rotated, or recolored outside the palette below.</li>
              <li>Minimum clear space: the height of the mark itself on every side.</li>
              <li>Never placed on a busy photograph without a solid or scrim behind it.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="color" eyebrow="Palette" title="Color">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Swatch
            name="ht-orange"
            token="--color-ht-orange"
            hex="#f13e1b"
            usage="Primary action colour: buttons and key section backgrounds. Text on it is ALWAYS ink, 4.90:1. White on it is 3.86:1 and is never used for text, only for icons."
            textClassName="text-ink"
          />
          <Swatch
            name="ht-purple"
            token="--color-ht-purple"
            hex="#111111"
            usage="Ink, despite the name. Dark sections, the footer, and headings on paper. White on it is 18.9:1. The name is a stable identifier kept from the previous palette, not a description of the colour."
          />
          <Swatch
            name="ht-pink"
            token="--color-ht-pink"
            hex="#f13e1b"
            usage="An alias of ht-orange. This design has no pink. The token survives because around twenty call sites name it, and repointing it was one edit where renaming it was twenty."
            textClassName="text-ink"
          />
          <Swatch
            name="ht-crimson"
            token="--color-ht-crimson"
            hex="#bc3116"
            usage="A darker orange for prose links and hover states on paper, where ht-orange itself is 3.59:1 and cannot carry body text."
          />
          <Swatch
            name="ht-cream"
            token="--color-ht-cream"
            hex="#f7f7f4"
            usage="Paper. The base page background. Ink on it is 17.6:1."
            textClassName="text-ht-purple"
          />
          <Swatch
            name="ink"
            token="--color-ink"
            hex="#010602"
            usage="Near-black, reserved for text needing maximum contrast: outline button hover state only."
          />
        </div>
        <p className="font-ht-body text-ht-purple/70 mt-6 text-[13px] leading-[1.6]">
          Hex values are the client-supplied palette, used exactly as given. Do not adjust for
          “better” contrast without checking with Johandre first. Contrast ratios above are checked
          against WCAG AA (4.5:1 body text, 3:1 large/bold text ≥ 18px).
        </p>
      </Section>

      <Section id="type" eyebrow="Type system" title="Typography">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-card bg-ht-cream shadow-soft p-6">
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Display / Headings</p>
            <p className="font-ht-display text-ht-purple mt-3 text-[32px] leading-[1.05] font-bold uppercase">
              Oswald
            </p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px]">
              Medium (500) and Bold (700). Self-hosted woff2 via{" "}
              <code className="text-[12px]">next/font/local</code> rather than Google Fonts, so the
              licence travels with the files (
              <code className="text-[12px]">public/fonts/font-licenses.txt</code>).{" "}
              <code className="text-[12px]">--font-ht-display</code>. Every h1–h4, button, nav label and
              eyebrow, set uppercase with tight negative tracking. Social cards render from{" "}
              <code className="text-[12px]">app/_og/Oswald-500.ttf</code>, the same file re-flavoured
              to TTF because Satori cannot parse woff2.
            </p>
          </div>
          <div className="rounded-card bg-ht-cream shadow-soft p-6">
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Body</p>
            <p className="font-ht-body text-ht-purple mt-3 text-[22px] leading-[1.4]">IBM Plex Sans</p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px]">
              Regular (400), self-hosted woff2.{" "}
              <code className="text-[12px]">--font-ht-body</code>. All paragraph text, form fields and
              captions. <code className="text-[12px]">text-wrap: pretty</code> on paragraphs to prevent
              orphans.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="border-b border-ht-purple/10 pb-6">
            <p className="font-ht-display text-ht-purple text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-bold uppercase">
              Display
            </p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px]">
              <code className="text-[12px]">--text-ht-display</code>: clamp(2.5rem, 6vw, 5.5rem), page-level
              hero headlines
            </p>
          </div>
          <div className="border-b border-ht-purple/10 pb-6">
            <p className="font-ht-display text-ht-purple text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] font-bold uppercase">
              Heading 3
            </p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px]">
              <code className="text-[12px]">--text-ht-h3</code>: clamp(1.5rem, 2.5vw, 2rem), section headings
            </p>
          </div>
          <div className="border-b border-ht-purple/10 pb-6">
            <p className="font-ht-body text-ht-purple text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6]">
              Body large: intros, lead paragraphs, pull quotes.
            </p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px]">
              <code className="text-[12px]">--text-ht-body-lg</code>: clamp(1.1rem, 1.6vw, 1.4rem)
            </p>
          </div>
          <div className="border-b border-ht-purple/10 pb-6">
            <p className="font-ht-body text-ht-purple text-[1rem] leading-[1.6]">
              Body: the default paragraph size used everywhere else.
            </p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px]">
              <code className="text-[12px]">--text-ht-body</code>: 1rem (16px)
            </p>
          </div>
          <div>
            <p className="font-ht-display text-ht-purple text-[0.8125rem] font-bold tracking-[0.15em] uppercase">
              Label / eyebrow
            </p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px]">
              <code className="text-[12px]">--text-ht-label</code>: 0.8125rem (13px), tracked wide, uppercase
            </p>
          </div>
        </div>
      </Section>

      <Section id="layout" eyebrow="Structure" title="Layout & spacing">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Corner radius scale</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-block bg-ht-orange ring-ht-purple/12 size-16 shrink-0 ring-1" />
                <div>
                  <p className="font-ht-display text-ht-purple text-[13px] font-bold">--radius-block · 24px</p>
                  <p className="font-ht-body text-ht-purple/70 text-[13px]">
                    Inset panels: forms, dark bento blocks, case-study figures. The same 24px as
                    --radius-card on purpose — the site has one container radius. Full-bleed
                    sections stay square by carrying no radius at all, not by this token being 0.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-card bg-ht-orange size-16 shrink-0" />
                <div>
                  <p className="font-ht-display text-ht-purple text-[13px] font-bold">--radius-card · 24px</p>
                  <p className="font-ht-body text-ht-purple/70 text-[13px]">
                    Cards, swatches and images. It matches the 1.5rem the homepage gives its own
                    project and intro images.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-pill bg-ht-orange h-8 w-16 shrink-0" />
                <div>
                  <p className="font-ht-display text-ht-purple text-[13px] font-bold">--radius-pill · 999px</p>
                  <p className="font-ht-body text-ht-purple/70 text-[13px]">Buttons, nav pills, badges</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-card bg-ht-cream shadow-soft space-y-1 p-6">
            <p className="font-ht-display text-ht-purple mb-3 text-[13px] font-bold uppercase">Container widths</p>
            <SpecRow label="Wide sections" value="max-w-[1600px]" />
            <SpecRow label="Dark and orange bands" value="max-w-[1434px]" />
            <SpecRow label="Copy-heavy sections" value="max-w-[900-1000px]" />
            <SpecRow label="Page hero copy" value="max-w-[900px]" />
            <p className="font-ht-display text-ht-purple mt-5 mb-3 text-[13px] font-bold uppercase">
              Section vertical rhythm
            </p>
            <SpecRow label="Mobile" value="py-14 to py-20" />
            <SpecRow label="Desktop (md+)" value="py-20 to py-28" />
            <p className="font-ht-body text-ht-purple/70 mt-4 text-[13px] leading-[1.6]">
              Horizontal padding is one utility everywhere:{" "}
              <code className="text-[12px]">px-gutter</code>, which resolves to{" "}
              <code className="text-[12px]">clamp(1.25rem, 4.45vw, 5.5rem)</code>: 20px on a phone,
              64px at 1440. It is the same value the homepage&rsquo;s{" "}
              <code className="text-[12px]">.wrap</code> uses, so a hero and the section beneath it
              start on the same line. Vertical spacing follows Tailwind&rsquo;s 4px scale, with no
              one-off values like <code className="text-[12px]">margin: 23px</code>.
            </p>
          </div>
        </div>
      </Section>

      <Section id="buttons" eyebrow="Component" title="Buttons">
        <div className="space-y-10">
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Variants</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 rounded-card bg-ht-cream p-6 shadow-soft">
              <Button variant="ember">Ember</Button>
              <Button variant="ink">Ink</Button>
              <Button variant="peach">Peach</Button>
            </div>
            <div className="rounded-card bg-ht-purple mt-4 flex flex-wrap items-center gap-4 p-6">
              <Button variant="outline">Outline</Button>
              <p className="font-ht-body text-[13px] leading-[1.6] text-white/75">
                On ink, where its only production use is (the cookie banner). Orange text is 4.90:1
                here and 3.59:1 on paper, so this variant must never be dropped onto a light
                surface.
              </p>
            </div>
            <p className="font-ht-body text-ht-purple/70 mt-3 text-[13px] leading-[1.6]">
              Variant names are historical (kept from the previous bark/ember palette so no call site
              needed remapping): they now map to <strong>ember</strong> = orange fill,{" "}
              <strong>ink</strong> = ink fill, <strong>peach</strong> = paper fill,{" "}
              <strong>outline</strong> = orange border.
            </p>
          </div>
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Sizes</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 rounded-card bg-ht-cream p-6 shadow-soft">
              <Button variant="ember" size="md">
                Medium (h-11)
              </Button>
              <Button variant="ember" size="lg">
                Large (h-13)
              </Button>
            </div>
          </div>
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">States & motion</p>
            <ul className="font-ht-body text-ht-purple/70 mt-3 space-y-1 text-[14px] leading-[1.6]">
              <li>Hover: scale to 1.02, and the hairline ring darkens from soft to lift.</li>
              <li>Press: scale to 0.97, enough to feel the tap register.</li>
              <li>Disabled: 50% opacity, pointer-events removed.</li>
              <li>Transition: 150ms on transform/background/shadow/border, custom ease-out curve.</li>
              <li>All motion respects <code className="text-[12px]">prefers-reduced-motion</code> via <code className="text-[12px]">motion-safe:</code>.</li>
            </ul>
          </div>
          <div>
            <ButtonLink href="/start-project" variant="ember" size="lg">
              Live example: links to /start-project
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section id="shadow" eyebrow="Elevation" title="Edges, not shadows">
        <p className="font-ht-body text-ht-purple/80 max-w-[62ch] text-[15px] leading-[1.7]">
          There is no elevation system any more. The homepage separates things with hairline rules,
          never with a drop shadow, so the two shadow tokens were redefined as rings: a 1px hairline
          drawn at the element&rsquo;s own radius, no blur, no layout cost. Every card that already
          said <code className="text-[12px]">shadow-soft</code> picked up the new language without a
          call-site change.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-card bg-white p-6 shadow-soft">
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">--shadow-soft</p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px] leading-[1.6]">
              Resting state for cards and panels on paper.
            </p>
            <code className="font-ht-body text-ht-purple/70 mt-3 block text-[11px] leading-[1.5]">
              0 0 0 1px rgb(17 17 17 / 0.12)
            </code>
          </div>
          <div className="rounded-card bg-white p-6 shadow-lift">
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">--shadow-lift</p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[13px] leading-[1.6]">
              Hover. The same rule, darker.
            </p>
            <code className="font-ht-body text-ht-purple/70 mt-3 block text-[11px] leading-[1.5]">
              0 0 0 1px rgb(17 17 17 / 0.3)
            </code>
          </div>
        </div>
        <p className="font-ht-body text-ht-purple/70 mt-6 max-w-[62ch] text-[13px] leading-[1.6]">
          On a dark surface a dark hairline is invisible, which is correct: the homepage&rsquo;s dark
          sections separate with a white-line border or with nothing at all.
        </p>
      </Section>

      <Section id="motion" eyebrow="Interaction" title="Motion">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-card bg-ht-cream shadow-soft space-y-1 p-6">
            <p className="font-ht-display text-ht-purple mb-3 text-[13px] font-bold uppercase">Easing curves</p>
            <SpecRow label="--ease-out" value="cubic-bezier(.23,1,.32,1)" />
            <SpecRow label="--ease-in-out" value="cubic-bezier(.77,0,.175,1)" />
            <p className="font-ht-body text-ht-purple/70 mt-4 text-[13px] leading-[1.6]">
              Default UI feedback uses ease-out; on-screen scroll movement uses ease-in-out. Standard
              CSS ease-outs read as too weak against this brand’s confident type. These curves are
              intentionally stronger.
            </p>
          </div>
          <div className="rounded-card bg-ht-cream shadow-soft space-y-1 p-6">
            <p className="font-ht-display text-ht-purple mb-3 text-[13px] font-bold uppercase">Durations</p>
            <SpecRow label="Micro-interactions" value="150–200ms" />
            <SpecRow label="Nav / larger transitions" value="400–600ms" />
            <SpecRow label="Scroll reveals" value="800ms, power4.out" />
            <p className="font-ht-body text-ht-purple/70 mt-4 text-[13px] leading-[1.6]">
              Built on GSAP + Lenis smooth scroll, gated behind <code className="text-[12px]">gsap.matchMedia</code>{" "}
              for reduced motion. Reveals fade+rise once per element (never replay on re-scroll).
            </p>
          </div>
        </div>
      </Section>

      <Section id="voice" eyebrow="Copy" title="Voice & tone">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Hard rules</p>
            <ul className="font-ht-body text-ht-purple/70 mt-3 space-y-2 text-[14px] leading-[1.6]">
              <li>No fabricated stats, quotes, client logos, or testimonials, ever.</li>
              <li>No em dashes in user-facing copy.</li>
              <li>The founder is never named on the site.</li>
              <li>Active voice throughout; cut filler words and weak adverbs.</li>
              <li>Every blog article runs through the humanizer skill’s AI-writing-tell audit before publishing.</li>
            </ul>
          </div>
          <div>
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Tone reference</p>
            <p className="font-ht-body text-ht-purple/70 mt-3 text-[14px] leading-[1.6]">
              Write like a specific, credible person who has actually built the thing being described,
              not a brochure. Prefer a concrete number or outcome over an adjective. “X, not just
              Y” is a deliberate, recurring brand construction, not an AI tell to avoid.
            </p>
          </div>
        </div>
      </Section>

      <Section id="a11y" eyebrow="Standards" title="Accessibility" last>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-card bg-ht-cream shadow-soft p-6">
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Focus ring</p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[14px] leading-[1.6]">
              2px solid ht-purple outline with a 4px cream halo box-shadow, 2px offset, 5px radius.
              Purple carries light surfaces (11.7:1), the cream halo carries dark surfaces. Real
              CSS <code className="text-[12px]">outline</code>, not box-shadow alone, so it survives
              forced-colors/high-contrast mode.
            </p>
          </div>
          <div className="rounded-card bg-ht-cream shadow-soft p-6">
            <p className="font-ht-display text-ht-purple text-[13px] font-bold uppercase">Contrast floor</p>
            <p className="font-ht-body text-ht-purple/70 mt-2 text-[14px] leading-[1.6]">
              WCAG 2.1 AA target. Body text minimum 4.5:1. White-on-orange (3.48:1) is flagged and
              restricted to large/bold text (buttons, nav labels) where the 3:1 large-text threshold
              applies.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
