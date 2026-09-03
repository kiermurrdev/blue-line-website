/**
 * Content accessor layer — single boundary between content data and components.
 * Today reads from src/content/*; tomorrow reads Sanity via GROQ with identical signatures.
 */

export { siteConfig } from "@/content/site";

// Placeholder getters — to be implemented in Phase 2+
export function getServices() {
  return [];
}

export function getFaqs() {
  return [];
}
