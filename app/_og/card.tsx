import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared builder for every opengraph-image route.
 *
 * Before this existed the site shipped no og:image at all, so every share on
 * WhatsApp, LinkedIn and Facebook rendered as a bare text link. For a studio
 * selling web design that read as an unfinished site.
 *
 * Updated 2026-09-11 with the rest of the site: Oswald in place of Parkinsans,
 * ink in place of purple, and the wordmark drawn from the homepage's own SVG.
 * A share card is the site's face in a feed, so leaving it on the retired
 * palette would have been the most public place the old design survived.
 *
 * The heading font ships as a repo asset rather than being fetched at build
 * time, so the build has no network dependency. Satori (behind ImageResponse)
 * needs TTF, OTF, or WOFF — it cannot parse WOFF2, which is what the site
 * itself serves. Oswald-500.ttf is the site's own public/fonts/oswald-500.woff2
 * re-flavoured to TTF with fontTools; 500 because that is the weight every
 * heading on the site is set in.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Literal hex, not var(--color-*): these render in Satori, not a browser, so
// there is no stylesheet to resolve custom properties against. Kept in step
// with the @theme block in app/globals.css by hand.
const INK = "#111111";
const PAPER = "#f7f7f4";
const ORANGE = "#f13e1b";

export async function renderOgCard({
  eyebrow,
  title,
}: {
  /** Small orange label above the headline, e.g. the section name. */
  eyebrow?: string;
  /** The headline. Keep it short; long strings shrink to fit awkwardly. */
  title: string;
}) {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/Oswald-500.ttf")),
    readFile(join(process.cwd(), "public/home2026/goodground-logo.svg"), "utf8"),
  ]);

  // The wordmark's paths carry no fill, so they default to black — the site
  // inverts it with a CSS filter, which Satori does not implement. Setting the
  // fill on the root element is the equivalent that survives into the render.
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(
    logo.replace("<svg ", '<svg fill="#ffffff" '),
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "72px 80px",
          fontFamily: "Oswald",
        }}
      >
        {/* Wordmark as an image so the logo is pixel-accurate rather than a
            font approximation of it. Width is set explicitly because Satori
            does not infer it from the SVG's viewBox (2090 x 392.44).
            eslint-disable-next-line: this renders in Satori, not a browser.
            next/image has no meaning here and would break the render. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={352} height={66} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 2,
                color: ORANGE,
                marginBottom: 24,
              }}
            >
              {eyebrow.toUpperCase()}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 62 : 78,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              textTransform: "uppercase",
              color: "#ffffff",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 64, height: 4, background: ORANGE }} />
          <div style={{ display: "flex", fontSize: 24, color: PAPER, opacity: 0.75 }}>
            goodground.co.za
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Oswald", data: font, style: "normal", weight: 500 }],
    },
  );
}
