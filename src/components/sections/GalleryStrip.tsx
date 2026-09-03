/** GalleryStrip — responsive photo grid from getGalleryItems(). Lazy below fold. */

import { getGalleryItems } from "@/lib/content";
import type { GalleryItem } from "@/types/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ImageFrame } from "../ui/ImageFrame";

/** Placeholder frame shown when no gallery images are available. */
function EmptyGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative aspect-[4/3] overflow-hidden rounded-[6px] border border-steel/20 bg-surface-section-alt"
        >
          {/* Subtle grid pattern — same treatment as Hero placeholder */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id={`gallery-grid-${i}`} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-ink)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#gallery-grid-${i})`} />
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-steel/60">
              Photo pending
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** GalleryStrip — renders on home, /gallery, and /coverage. */
export function GalleryStrip({ variant = "default" }: { variant?: "default" | "compact" }) {
  const items = getGalleryItems();
  const isEmpty = !items.length;

  return (
    <section className="bg-surface-section-alt section-rhythm" aria-label="Job Photos">
      <Container>
        {variant !== "compact" && (
          <SectionHeading
            eyebrow="Our Work"
            title="Real Jobs, Real Results"
            lede={isEmpty ? "Photos pending owner-supplied images." : "Every boat we move is documented — from load to delivery."}
          />
        )}

        {isEmpty ? (
          <EmptyGallery />
        ) : (
          <>
            {/* Responsive grid: 1-up mobile / 2-up tablet / 3-up desktop */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <GalleryCard key={item.slug} item={item} />
              ))}
            </div>

            {/* Empty state when filtered */}
            {items.length === 0 && (
              <p className="text-center text-sm text-steel">No photos available yet.</p>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

/** Single gallery card — uses ImageFrame with explicit dimensions and lazy loading. */
function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <figure className="group overflow-hidden rounded-[6px] border border-steel/20 bg-surface-section transition-colors duration-200 hover:border-brand/30">
      {/* Image — lazy below fold, explicit dimensions */}
      <ImageFrame
        src={item.imageRef}
        alt={`${item.caption}`}
        width={640}
        height={480}
        className="aspect-[4/3]"
      />

      {/* Caption */}
      {item.caption && (
        <figcaption className="border-t border-steel/15 px-4 py-3">
          <p className="text-sm font-medium text-ink">{item.caption}</p>
          {item.category && (
            <p className="mt-0.5 text-xs leading-relaxed text-steel">{item.category}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
