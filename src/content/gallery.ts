import type { GalleryItem } from "@/types/content";

/**
 * Gallery items — real job photos only (BRAND_ASSETS_CHECKLIST §B).
 * Section ships empty until owner supplies them.
 */
export const galleryItems: GalleryItem[] = [
  {
    slug: "placeholder-1",
    imageRef: "/images/gallery/placeholder.webp",
    caption: "Content pending owner confirmation",
    category: "powerboat",
  },
  {
    slug: "placeholder-2",
    imageRef: "/images/gallery/placeholder.webp",
    caption: "Content pending owner confirmation",
    category: "sailboat",
  },
  {
    slug: "placeholder-3",
    imageRef: "/images/gallery/placeholder.webp",
    caption: "Content pending owner confirmation",
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
