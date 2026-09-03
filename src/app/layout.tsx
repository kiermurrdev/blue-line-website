import type { Metadata } from "next";
import "./globals.css";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

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
    "Licensed & insured boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today.",
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
      </body>
    </html>
  );
}
