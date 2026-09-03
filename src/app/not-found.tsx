import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

/** Stub page — proper 404 added in Phase 5. */
export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-container-xl items-center justify-center px-4 py-16 md:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-navy">404</h1>
        <p className="mb-6 text-lg text-steel">This page doesn't exist yet.</p>
        <a href="/" className="rounded-md bg-signal px-6 py-3 font-semibold text-ink hover:bg-signal-dark">
          Go Home
        </a>
      </div>
    </div>
  );
}
