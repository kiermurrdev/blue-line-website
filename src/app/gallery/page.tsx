import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import GalleryCard from "@/components/gallery/GalleryCard";
import CategoryFilter from "@/components/gallery/CategoryFilter";

export const metadata: Metadata = {
  title: "Gallery — Blue Line Marine Transport",
  description:
    "Real job photos from Blue Line Marine Transport. See how we move powerboats, sailboats, and heavy vessels across the East Coast.",
};

/** Gallery page — full photo grid treatment per Issue #16. */
export default function GalleryPage() {
  const items = getGalleryItems();

  // Derive unique categories from content (sorted for determinism)
  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))].sort();

  return (
    <main id="main" role="main">
      {/* Hero */}
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

      {/* Gallery grid */}
      <section className="bg-surface-section-alt section-rhythm" aria-label="Job Photos">
        <Container>
          {/* Category filter tabs — only shown when categories exist */}
          {categories.length > 0 && (
            <div className="mb-8 -mx-4 sm:mx-0 sm:-mx-6 lg:-mx-8 xl:-mx-10">
              <CategoryFilter categories={categories} />
            </div>
          )}

          {/* Responsive grid: 1-up mobile / 2-up tablet / 3-up desktop */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <GalleryCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            /* Intentional empty state — clearly marked, no stock imagery */
            <EmptyGalleryState />
          )}

          {/* CTA when items exist */}
          {items.length > 0 && (
            <div className="mt-10 flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[4px] bg-blue px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
              >
                Request a Quote
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

/** Empty gallery state — intentional placeholder, not stock imagery. */
function EmptyGalleryState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[4px] border-2 border-dashed border-gray/20 py-20 text-center">
      {/* Blue-line motif as placeholder indicator */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="mb-4 opacity-[0.12]">
        <rect x="8" y="8" width="48" height="48" rx="4" stroke="var(--blue)" strokeWidth="2" />
        <line x1="8" y1="32" x2="56" y2="32" stroke="var(--blue)" strokeWidth="1.5" />
      </svg>
      <p className="text-sm font-medium text-slate">No photos available yet.</p>
      <p className="mt-1 max-w-[40ch] text-xs leading-relaxed text-steel">
        We document every job from load to delivery. Photos will appear here as they become available.
      </p>
    </div>
  );
}
