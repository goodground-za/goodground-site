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
 * Montserrat ships as a repo asset rather than being fetched from Google at
 * build time, so the build has no network dependency. Satori (behind
 * ImageResponse) needs TTF or WOFF — it cannot parse WOFF2.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Literal hex, not var(--color-*): these render in Satori, not a browser, so
// there is no stylesheet to resolve custom properties against.
const BARK = "#331816";
const PEACH = "#fde5c1";
const EMBER = "#ac4119";

export async function renderOgCard({
  eyebrow,
  title,
}: {
  /** Small ember label above the headline, e.g. the section name. */
  eyebrow?: string;
  /** The headline. Keep it short; long strings shrink to fit awkwardly. */
  title: string;
}) {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/Montserrat-Bold.ttf")),
    // logo-footer, not logo-hero: the hero wordmark is the dark version drawn
    // on cream, and it disappears against this bark background.
    readFile(join(process.cwd(), "public/images/logo-footer.png")),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BARK,
          padding: "72px 80px",
          fontFamily: "Montserrat",
        }}
      >
        {/* Wordmark as an image so the logo is pixel-accurate rather than a
            font approximation of it.
            eslint-disable-next-line: this renders in Satori, not a browser.
            next/image has no meaning here and would break the render. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} height={96} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 1,
                color: EMBER,
                marginBottom: 20,
              }}
            >
              {eyebrow.toUpperCase()}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 54 : 66,
              lineHeight: 1.15,
              color: PEACH,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 64, height: 6, background: EMBER }} />
          <div style={{ display: "flex", fontSize: 24, color: PEACH, opacity: 0.75 }}>
            goodground.co.za
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Montserrat", data: font, style: "normal", weight: 700 }],
    },
  );
}
