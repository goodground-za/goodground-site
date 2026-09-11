import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { site } from "@/content/site";
import "./globals.css";

// The site's typefaces: Oswald for display, IBM Plex Sans for body.
//
// Self-hosted woff2 from the delivered homepage package rather than
// next/font/google, because the licences travel with the files
// (public/fonts/font-licenses.txt) and the subsetting is already done.
//
// These replaced Parkinsans/Instrument Sans on 2026-09-11 when the homepage
// design went site-wide. Both of those were removed the same day: the @theme
// block in globals.css no longer references their variables, so they were two
// Google Font families downloaded on every page for nothing.
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
      className={`${oswald.variable} ${ibmPlexSans.variable} h-full`}
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
