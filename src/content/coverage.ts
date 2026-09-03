import type { CoverageArea } from "@/types/content";

/**
 * Service areas — pending owner confirmation (BRAND_ASSETS_CHECKLIST §B).
 * Draft list for structure; to be replaced with confirmed regions.
 */
export const coverageAreas: CoverageArea[] = [
  { slug: "new-jersey", name: "New Jersey", notes: "TODO(owner-content)" },
  { slug: "new-york", name: "New York" },
  { slug: "connecticut", name: "Connecticut" },
  { slug: "florida", name: "Florida" },
  { slug: "delaware", name: "Delaware" },
  { slug: "maryland", name: "Maryland" },
];
