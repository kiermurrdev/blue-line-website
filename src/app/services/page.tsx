import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Blue Line Marine Transport",
};

/** Stub page — service grid + detail routes added in Phase 2. */
export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-container-xl px-4 py-16 md:px-8 md:py-24">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-5xl">Our Services</h1>
      <p className="text-center text-steel">Service pages coming in Phase 2.</p>
    </div>
  );
}
