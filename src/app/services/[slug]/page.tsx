import type { Metadata } from "next";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug} — Blue Line Marine Transport` };
}

/** Stub page — per-service detail added in Phase 2. */
export default function ServiceDetailPage() {
  return (
    <div className="mx-auto max-w-container-xl px-4 py-16 md:px-8 md:py-24">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-5xl">Service Detail</h1>
      <p className="text-center text-steel">Coming in Phase 2.</p>
    </div>
  );
}
