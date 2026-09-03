import type { Service } from "@/types/content";

/**
 * Service categories — draft list pending owner sign-off (BRAND_ASSETS_CHECKLIST §B).
 * Marked TODO(owner-content) until confirmed.
 */
export const services: Service[] = [
  {
    slug: "powerboat",
    title: "Powerboat Transport",
    summary: "Door-to-door delivery for powerboats of all sizes.",
    description: "TODO(owner-content)",
    vesselTypes: ["Center console", "Dual console", "Walkaround", "Express cruiser"],
    equipment: ["Air-ride trailers", "Adjustable bunks", "Wide choker straps"],
    prepNotes: "Remove loose gear, lower outdrive, disconnect battery.",
    faqRefs: ["prep-battery", "prep-outdrive"],
    ctaLabel: "Get a powerboat quote",
  },
  {
    slug: "sailboat",
    title: "Sailboat Transport",
    summary: "Careful mast-strike and trailering for sailboats.",
    description: "TODO(owner-content)",
    vesselTypes: ["Keelboat", "Cutter", "Sloop"],
    equipment: ["Mast cradle", "Stern lines", "Winch-assist ramp loading"],
    prepNotes: "Remove mast or lower to trailering height; secure rigging.",
    faqRefs: ["prep-mast-removal"],
    ctaLabel: "Get a sailboat quote",
  },
  {
    slug: "heavy-vessel",
    title: "Heavy / Large Vessel",
    summary: "Specialized transport for vessels over 30 ft or 10,000 lbs.",
    description: "TODO(owner-content)",
    vesselTypes: ["Motor yacht", "Trawler", "Houseboat"],
    equipment: ["Multi-axle modular trailers", "Hydraulic ramp trucks", "Permit coordination"],
    prepNotes: "Pre-inspection required; route survey for low bridges.",
    faqRefs: ["heavy-permits", "heavy-route-survey"],
    ctaLabel: "Get a heavy vessel quote",
  },
];
