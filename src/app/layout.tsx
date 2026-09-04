import type { Metadata } from "next";
import "./globals.css";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { getSite } from "@/lib/content";

const site = getSite();

/* Variable font families — DESIGN_SYSTEM.md §3 */
const archivo = Archivo({
  variable: "--font-display",
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blue Line Marine Transport — Professional Boat Transportation",
  description:
    site.dotNumber && site.insuranceStatement
      ? "Licensed & insured boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today."
      : "Professional boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen font-body text-ink antialiased ${archivo.variable} ${inter.variable}`}>
        <SkipLink />
        <Header />
        <main id="main" role="main">
          {children}
        </main>
        <Footer />
        {/* Mobile-only sticky call bar — adds bottom padding to body on mobile */}
        <div className="h-16 md:hidden" aria-hidden="true" />
        <StickyCallBar />
      </body>
    </html>
  );
}
