import type { Metadata } from "next";
import "./globals.css";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { LocalBusinessJsonLd } from "@/components/structured-data/JsonLd";
import { getSite } from "@/lib/content";

const site = getSite();

/* Variable font families — DESIGN_SYSTEM.md §3 */
const archivo = Archivo({
  variable: "--font-display",
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-body",
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const BASE_URL = "https://bluelinemarinetransport.com";

/** Root metadata — site-wide defaults inherited by all pages. */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s — Blue Line Marine Transport",
    default: "Blue Line Marine Transport — Professional Boat Transportation",
  },
  description:
    "Professional boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    siteName: "Blue Line Marine Transport",
    locale: "en_US",
    type: "website",
    images: [`${BASE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bluelinemarine",
    creator: "@bluelinemarine",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen font-body text-ink antialiased ${archivo.variable} ${inter.variable}`}>
        <SkipLink />
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
        {/* Mobile-only sticky call bar — adds bottom padding to body on mobile */}
        <div className="h-16 md:hidden" aria-hidden="true" />
        <StickyCallBar />
        {/* Structured data — site-wide LocalBusiness */}
        {site.phone && site.email && (
          <LocalBusinessJsonLd
            description={
              site.dotNumber && site.insuranceStatement
                ? "Licensed & insured boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling."
                : "Professional boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling."
            }
            phone={site.phone}
            email={site.email}
          />
        )}
      </body>
    </html>
  );
}
