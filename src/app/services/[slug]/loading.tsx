/** Loading skeleton for /services/[slug] — enables partial prefetching. */

export default function Loading() {
  return (
    <div className="mx-auto max-w-[72rem] px-4 py-16 md:px-8 md:py-24">
      {/* Hero skeleton */}
      <div className="mb-12 animate-pulse space-y-4">
        <div className="h-12 w-3/4 rounded bg-mist" />
        <div className="h-6 w-full max-w-[50ch] rounded bg-mist" />
        <div className="h-10 w-48 rounded bg-mist" />
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-[65ch] space-y-6 animate-pulse">
        <div className="h-6 w-32 rounded bg-mist" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-mist" />
          <div className="h-4 w-[90%] rounded bg-mist" />
          <div className="h-4 w-[85%] rounded bg-mist" />
        </div>
      </div>
    </div>
  );
}
