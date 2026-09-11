import type { Metadata } from "next";
import { Instrument_Sans, Parkinsans } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { site } from "@/content/site";
import "./globals.css";

// The site's design language (2026-08-20 font update, client-supplied
// choice): Parkinsans for every heading, Instrument Sans for body copy.
// Replaces the Syne/DM Sans pairing that shipped 2026-08-12, promoted
// site-wide alongside the new homepage.
//
// adjustFontFallback is off for Parkinsans because Next has no built-in
// metric overrides for it and warns at build time, so it cannot synthesise a
// size-matched fallback. An explicit stack is declared instead: without one
// the swap falls back to the browser default and shifts layout more, not
// less.
const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

// The 2026-09 homepage redesign ships its own pairing: Oswald for display,
// IBM Plex Sans for body. Self-hosted woff2 from the delivered package rather
// than next/font/google, because the licences travel with the files
// (public/fonts/font-licenses.txt) and the subsetting is already done.
//
// Declared here so <html> can carry the CSS variables, but NOT applied to
// anything globally — only components under the homepage's own scope use
// them. The rest of the site stays on Parkinsans/Instrument Sans.
const oswald = localFont({
  variable: "--font-oswald",
  display: "swap",
  fallback: ["Arial Narrow", "ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
  src: [
    { path: "../public/fonts/oswald-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/oswald-700.woff2", weight: "700", style: "normal" },
  ],
});

const ibmPlexSans = localFont({
  variable: "--font-ibm-plex-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
  src: [{ path: "../public/fonts/ibm-plex-sans-400.woff2", weight: "400", style: "normal" }],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Website Development in South Africa | GoodGround",
    template: "%s | GoodGround",
  },
  description:
    "GoodGround is a website development studio building custom, fast business websites across South Africa. Pay a 50% deposit and the rest on completion, or split it over 12 monthly instalments.",
  alternates: { canonical: "/" },
  // Google Search Console ownership check. Emitted as
  // <meta name="google-site-verification" ...>. It lives in the root layout so
  // it appears on every page, which keeps verification working even if Google
  // re-checks a URL other than the homepage. Do not remove after verifying:
  // Search Console re-validates periodically and will drop the property.
  verification: {
    google: "RDMvId_yS37hPFjJbBuZg4A8c1pZ0IBobkOrX6l1Ih4",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "GoodGround",
    title: "Website Development in South Africa | GoodGround",
    description:
      "A South African website development studio building custom business websites, with a choice of payment plans.",
  },
  // The generated opengraph-image is 1200x630, so it should render as a large
  // card rather than the default small thumbnail.
  twitter: {
    card: "summary_large_image",
    title: "Website Development in South Africa | GoodGround",
    description:
      "A South African website development studio building custom business websites, with a choice of payment plans.",
  },
};

// GA only loads when the ID is set AND the visitor has accepted cookies, so
// local dev and preview builds stay out of the reporting data unless you
// deliberately set the var there too.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior: globals.css sets scroll-behavior:smooth for in-page
    // anchors; without this, Next 16 lets route changes smooth-scroll to top too.
    <html
      lang="en-ZA"
      data-scroll-behavior="smooth"
      className={`${parkinsans.variable} ${instrumentSans.variable} ${oswald.variable} ${ibmPlexSans.variable} h-full`}
    >
      {/* No Nav/Footer/skip-link here: they moved to app/(site)/layout.tsx so
          the homepage, which brings its own chrome, can opt out of them. */}
      <body className="flex min-h-full flex-col">
        {children}
        {/* Renders the consent banner, and GA only once consent is granted.
            Lives inside <body> because the banner is a positioned element. */}
        <Analytics gaId={gaId} />
      </body>
    </html>
  );
}
