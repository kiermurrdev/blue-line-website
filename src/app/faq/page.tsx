import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Blue Line Marine Transport",
};

/** Stub page — FAQ accordion added in Phase 2. */
export default function FaqPage() {
  return (
    <div className="mx-auto max-w-container-xl px-4 py-16 md:px-8 md:py-24">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-5xl">Frequently Asked Questions</h1>
      <p className="text-center text-steel">Coming in Phase 2.</p>
    </div>
  );
}
