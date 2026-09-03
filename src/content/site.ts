import type { SiteConfig } from "@/types/content";

/**
 * Company contact & identity — single source of truth for all CTAs, footers, and metadata.
 * Confirmed values (2026-09-03): name, phone, email.
 * Missing (★): address, hours, DOT #, insurance statement — filled with undefined until owner confirms.
 */
export const siteConfig: SiteConfig = {
  name: "Blue Line Marine Transport",
  phone: "(732) 222-1026",
  email: "bluelinemarinetransport@gmail.com",
};
