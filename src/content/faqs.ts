import type { Faq } from "@/types/content";

/**
 * FAQ entries — draft set pending owner sign-off (BRAND_ASSETS_CHECKLIST §B).
 * Grouped by context for filtering on the /faq page.
 */
export const faqs: Faq[] = [
  // General
  {
    slug: "how-works",
    question: "How does Blue Line Marine Transport work?",
    answer:
      "We pick up your boat at the launch site or marina, load it onto a custom trailer, and deliver it door-to-door to the destination. You can ride along in your vehicle or arrange separate travel.",
    context: "general",
  },
  {
    slug: "insurance-coverage",
    question: "Is my boat insured during transport?",
    answer: "TODO(owner-content)",
    context: "general",
  },
  {
    slug: "pricing-basis",
    question: "How do you price a move?",
    answer:
      "We quote based on distance, vessel size and weight, pickup/delivery locations, and any special requirements (wide-load permits, crane assist). Call or email for a free estimate.",
    context: "general",
  },
  {
    slug: "timeline",
    question: "How long does transport take?",
    answer: "TODO(owner-content)",
    context: "general",
  },

  // Quote process
  {
    slug: "quote-what-needed",
    question: "What do I need to provide for a quote?",
    answer:
      "Boat type, length and weight (if known), pickup address, delivery address, preferred date, and any special requirements. We'll get back within one business day.",
    context: "quote-process",
  },
  {
    slug: "quote-response-time",
    question: "How quickly will I hear back?",
    answer: "TODO(owner-content)",
    context: "quote-process",
  },

  // Prep
  {
    slug: "prep-battery",
    question: "Should I disconnect the battery before pickup?",
    answer:
      "Yes — disconnect the negative terminal to prevent any electrical issues during transit. Also drain bilge water and secure all loose items inside the boat.",
    context: "prep",
  },
  {
    slug: "prep-outdrive",
    question: "What about my outdrive or stern drive?",
    answer:
      "Lower it to trailering position (usually halfway down) and secure with the manufacturer's travel lock. If you're unsure, tell us during your quote and we'll advise.",
    context: "prep",
  },
  {
    slug: "prep-mast-removal",
    question: "Do I need to remove my mast?",
    answer:
      "For most sailboats under 40 ft, yes — removing the mast is safest and often required for bridge clearance. We can coordinate a mast-removal service if needed.",
    context: "prep",
  },
  {
    slug: "heavy-permits",
    question: "Do you handle permits for wide loads?",
    answer: "TODO(owner-content)",
    context: "prep",
  },
  {
    slug: "heavy-route-survey",
    question: "What is a route survey and do I need one?",
    answer: "TODO(owner-content)",
    context: "prep",
  },
];
