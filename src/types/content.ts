/** Shared TypeScript types for the Blue Line website — CMS-ready shapes. */

export interface SiteConfig {
  name: string;
  phone: string;
  email: string;
  address?: string;
  hours?: string;
  socials?: SocialLink[];
  dotNumber?: string;
  insuranceStatement?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

/** A single service category (e.g. powerboat transport). */
export interface Service {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  vesselTypes?: string[];
  equipment?: string[];
  prepNotes?: string;
  faqRefs?: string[]; // references to FAQ slugs relevant to this service
  ctaLabel?: string;
}

/** A single FAQ entry. */
export interface Faq {
  slug: string;
  question: string;
  answer: string;
  context?: "general" | "quote-process" | "prep"; // grouping key
}

/** A customer testimonial — real ones only (owner-supplied). */
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  boatType?: string;
}

/** A gallery photo entry. */
export interface GalleryItem {
  slug: string;
  imageRef: string; // public/images/... path or future Sanity asset ID
  caption: string;
  category: string;
}

/** One step in the "how it works" process. */
export interface ProcessStep {
  order: number;
  title: string;
  description: string;
}

/** A service-area region. */
export interface CoverageArea {
  slug: string;
  name: string;
  notes?: string;
}
