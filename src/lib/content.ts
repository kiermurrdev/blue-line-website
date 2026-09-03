/**
 * Content accessor layer — single boundary between content data and components.
 * Today reads from src/content/*; tomorrow reads Sanity via GROQ with identical signatures.
 */

import type { Service, Faq, Testimonial, GalleryItem, CoverageArea } from "@/types/content";

// ── Local content imports (all data lives here) ────────────────────────

import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { faqs } from "@/content/faqs";
import { testimonials } from "@/content/testimonials";
import { galleryItems } from "@/content/gallery";
import { coverageAreas } from "@/content/coverage";
import { aboutPageContent } from "@/content/pages/about";
import { processSteps } from "@/content/pages/process";

// ── Re-exports (for backwards compat) ─────────────────────────────────

export { siteConfig };

// ── Getters ────────────────────────────────────────────────────────────

/** Full site configuration — single source of truth for CTAs, footer, metadata. */
export function getSite() {
  return siteConfig;
}

/** All service categories. */
export function getServices(): Service[] {
  return services;
}

/** A single service by slug. Returns undefined if not found. */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** All FAQs, optionally filtered by context group. */
export function getFaqs(context?: "general" | "quote-process" | "prep"): Faq[] {
  if (context) return faqs.filter((f) => f.context === context);
  return faqs;
}

/** All testimonials — empty until owner supplies real ones. */
export function getTestimonials(): Testimonial[] {
  return testimonials;
}

/** All gallery items, optionally filtered by category tag. */
export function getGalleryItems(category?: string): GalleryItem[] {
  if (category) return galleryItems.filter((g) => g.category === category);
  return galleryItems;
}

/** All service-area regions. */
export function getCoverageAreas(): CoverageArea[] {
  return coverageAreas;
}

/** Page-level content by name (e.g. "about", "process"). */
export function getPageContent(name: string) {
  if (name === "about") return aboutPageContent;
  if (name === "process") return processSteps;
  return null;
}
