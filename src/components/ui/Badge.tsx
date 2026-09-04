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
  variant?: "default" | "outline" | "blue";
  size?: "sm" | "md";
}

export function Badge({ children, className, variant = "default", size = "md" }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-[4px] font-medium transition-colors";
  const sizes =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5 text-sm";
  const styles: Record<string, string> = {
    default: `${base} ${sizes} bg-brand/10 text-brand`,
    outline: `${base} ${sizes} border border-brand/30 text-brand`,
    blue: `${base} ${sizes} bg-blue/10 text-blue`,
  };

  return <span className={cn(styles[variant], className)}>{children}</span>;
}
