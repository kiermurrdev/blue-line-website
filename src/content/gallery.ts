import type { GalleryItem } from "@/types/content";

/**
 * Gallery items — real job photos only (BRAND_ASSETS_CHECKLIST §B).
 * Section ships empty until owner supplies them.
 *
 * TODO(owner-content): Replace placeholder entries with real images once
 * owner-supplied photos land in public/images/gallery/. Each entry needs:
 *   - imageRef pointing to a WebP/AVIF asset (e.g., "/images/gallery/powerboat-load-nj.webp")
 *   - caption with location + vessel type (e.g., "2018 Sea Ray 350 — loading in Cape May, NJ")
 *   - category tag matching one of: powerboat, sailboat, heavy-vessel, port-transfer
 */
export const galleryItems: GalleryItem[] = [
  {
    slug: "placeholder-1",
    imageRef: "/images/gallery/placeholder.webp",
    caption: "TODO(owner-content): location + vessel type",
    category: "powerboat",
  },
  {
    slug: "placeholder-2",
    imageRef: "/images/gallery/placeholder.webp",
    caption: "TODO(owner-content): location + vessel type",
    category: "sailboat",
  },
  {
    slug: "placeholder-3",
    imageRef: "/images/gallery/placeholder.webp",
    caption: "TODO(owner-content): location + vessel type",
    category: "heavy-vessel",
  },
];

/** All available category tags, in display order. */
export const galleryCategories = [
  { slug: "all", label: "All Jobs" },
  { slug: "powerboat", label: "Powerboats" },
  { slug: "sailboat", label: "Sailboats" },
  { slug: "heavy-vessel", label: "Heavy Vessels" },
  { slug: "port-transfer", label: "Port Transfers" },
] as const;
