import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/motion-gsap/LenisProvider";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";
import "./globals.css";

// The site's design language (2026-08-12 font update, client-supplied
// choice): Syne Bold for every heading, DM Sans for body copy. Bold-only —
// matches the previous Clash Display setup's "one weight" rule, no other
// Syne cut is used anywhere on the site.
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
      className={`${syne.variable} ${dmSans.variable} h-full`}
    >
      <head>
        {/*
          Framer's initial styles are server-rendered, so scroll-reveal content
          ships as opacity:0 and stays there if JS never runs. This makes the page
          readable without it; !important beats the inline styles.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="bg-ht-purple text-white sr-only rounded-full px-5 py-3 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <LenisProvider>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LenisProvider>
        {/* Renders the consent banner, and GA only once consent is granted.
            Lives inside <body> because the banner is a positioned element. */}
        <Analytics gaId={gaId} />
      </body>
    </html>
  );
}
