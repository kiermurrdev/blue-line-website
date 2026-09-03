import type { ProcessStep } from "@/types/content";

/**
 * The 4-step process — draft wording pending owner sign-off.
 */
export const processSteps: ProcessStep[] = [
  {
    order: 1,
    title: "Request a Quote",
    description:
      "Tell us your boat details and route. We'll respond within one business day with a detailed estimate.",
  },
  {
    order: 2,
    title: "Prep & Pickup",
    description:
      "We coordinate pickup at your marina or launch site — you prep the boat per our checklist, or we handle it for you.",
  },
  {
    order: 3,
    title: "Secure Transport",
    description:
      "Your vessel is loaded onto a custom trailer and secured with professional tie-downs. We track the load en route.",
  },
  {
    order: 4,
    title: "Delivery & Unload",
    description:
      "We deliver to your destination, unload carefully, and confirm everything is in order before we leave.",
  },
];
