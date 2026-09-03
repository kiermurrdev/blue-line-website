/** Badge / Stat — display numeral + steel label. */

import { cn } from "@/lib/utils";

interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  numeral: string | number;
  label: string;
}

export function Stat({ numeral, label, className }: StatProps) {
  return (
    <div className={cn("text-center", className)}>
      <p
        className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight text-foam"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {numeral}
      </p>
      <p className="mt-1 text-sm uppercase tracking-[0.1em] text-steel">{label}</p>
    </div>
  );
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-[4px] px-2.5 py-0.5 text-xs font-medium transition-colors";
  const styles =
    variant === "outline"
      ? "border border-brand/30 text-brand"
      : "bg-brand/10 text-brand";

  return <span className={cn(base, styles, className)}>{children}</span>;
}
