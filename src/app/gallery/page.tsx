import type { Metadata } from "next";
import { GalleryStrip } from "@/components/sections/GalleryStrip";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery — Blue Line Marine Transport",
  description: "Real job photos from Blue Line Marine Transport. See how we move powerboats, sailboats, and heavy vessels across the East Coast.",
};

/** Gallery page — full photo grid treatment. */
export default function GalleryPage() {
  return (
    <main id="main" role="main">
      {/* Hero stub for gallery page */}
      <section className="bg-navy py-16 md:py-24 lg:py-32">
        <Container>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foam">
            Gallery
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-steel">
            Every boat we move is documented — from load to delivery. Photos are added as jobs complete.
          </p>
        </Container>
      </section>

      <GalleryStrip />
    </main>
  );
}
