import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

export const metadata: Metadata = {
  title: "Blue Line Marine Transport — Professional Boat Transportation",
  description:
    "Licensed & insured boat transportation across the East Coast. Powerboat, sailboat, and heavy vessel hauling. Get a free quote today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-body text-ink antialiased">
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
