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

/** Boat preparation guidance — scannable checklist by category. */
export const boatPrepGuide = {
  heading: "Boat Preparation Checklist",
  lede: "Follow these steps before pickup to ensure a smooth transport day. If you'd prefer, we can handle prep for you — just ask when you request your quote.",
  sections: [
    {
      heading: "Before You Call",
      items: [
        "Remove all personal belongings from the cabin and console",
        "Secure or remove loose gear (fishing rods, bimini tops, canvas covers)",
        "Lower the outdrive to the trailering position and secure with the travel lock",
        "Disconnect the negative battery terminal",
        "Drain bilge water and close all through-hull fittings",
      ],
    },
    {
      heading: "On Transport Day",
      items: [
        "Ensure your trailer lights are connected and working",
        "Leave the parking brake off so the boat can roll freely onto the trailer",
        "Remove the key and leave it in a secure, accessible location",
        "Confirm that all windows and hatches are closed and latched",
      ],
    },
    {
      heading: "What We Handle",
      items: [
        "Professional loading and tie-down with rated straps and chocks",
        "Bridge-clearance checks and route survey for oversized loads",
        "Wide-load permit coordination when required by state",
        "Real-time load tracking — we text your ETA before arrival",
      ],
    },
  ],
};

/** Quote process explanation. */
export const quoteProcessInfo = {
  heading: "How to Get a Quote",
  lede: "We keep it simple. Tell us what you need and we'll get back within one business day with a detailed, no-obligation estimate.",
  steps: [
    {
      title: "Share your details",
      description:
        "Boat type, length, weight (if known), pickup address, delivery address, and preferred date. The faster you share these, the faster we respond.",
    },
    {
      title: "Receive your estimate",
      description:
        "We'll provide a detailed quote covering distance, vessel size, special requirements, and any permits needed — all in one message.",
    },
    {
      title: "Confirm & schedule",
      description:
        "Once you accept the quote, we lock in your pickup date and coordinate all logistics. You ride along or arrange separate travel — your call.",
    },
  ],
};
