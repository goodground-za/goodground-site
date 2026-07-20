import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";
import "./globals.css";

// One family, weights carrying the hierarchy: Bold for every heading (client
// instruction), Regular/Medium for body.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Website Development in South Africa | Pay Monthly | GoodGround",
    template: "%s | GoodGround",
  },
  description:
    "GoodGround is a website development studio building custom, fast business websites across South Africa. Spread the cost over 12 equal monthly payments, with no large upfront bill.",
  keywords: [
    "website development South Africa",
    "web development company South Africa",
    "website development Cape Town",
    "website design South Africa",
    "custom website development",
    "monthly payment website development",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "GoodGround",
    title: "Website Development in South Africa | GoodGround",
    description:
      "A South African website development studio building custom business websites, paid over 12 equal monthly instalments.",
  },
  // The generated opengraph-image is 1200x630, so it should render as a large
  // card rather than the default small thumbnail.
  twitter: {
    card: "summary_large_image",
    title: "Website Development in South Africa | GoodGround",
    description:
      "A South African website development studio building custom business websites, paid over 12 equal monthly instalments.",
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
      className={`${montserrat.variable} h-full`}
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
          className="bg-ink text-peach sr-only rounded-full px-5 py-3 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Renders the consent banner, and GA only once consent is granted.
            Lives inside <body> because the banner is a positioned element. */}
        <Analytics gaId={gaId} />
      </body>
    </html>
  );
}
