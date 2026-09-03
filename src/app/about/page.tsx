import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Blue Line Marine Transport",
};

/** Stub page — about content added in Phase 2. */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-container-xl px-4 py-16 md:px-8 md:py-24">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-5xl">About Us</h1>
      <p className="text-center text-steel">Coming in Phase 2.</p>
    </div>
  );
}
