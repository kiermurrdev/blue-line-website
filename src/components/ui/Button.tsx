/** Button — primary (signal bg, ink text) and secondary (bordered, current-color). */

import { cn } from "@/lib/utils";

/* ─── Primary (signal bg, ink text) ─── */
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function PrimaryButton({ className, ...rest }: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[6px] border bg-signal px-6 py-3 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand",
        className
      )}
      {...rest}
    />
  );
}

/* ─── Secondary (transparent, bordered) ─── */
interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SecondaryButton({ className, ...rest }: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[6px] border border-steel/30 px-6 py-3 text-sm font-semibold leading-5 text-current transition-colors duration-150 hover:-translate-y-[1px] hover:border-brand hover:bg-surface-section-alt/40 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand",
        className
      )}
      {...rest}
    />
  );
}

/* ─── Primary as <a> link element ─── */
interface PrimaryLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function PrimaryLink({ className, ...rest }: PrimaryLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[6px] border bg-signal px-6 py-3 text-sm font-semibold leading-5 text-ink transition-colors duration-150 hover:-translate-y-[1px] hover:bg-signal-dark disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand",
        className
      )}
      {...rest}
    />
  );
}

/* ─── Secondary as <a> link element ─── */
interface SecondaryLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function SecondaryLink({ className, ...rest }: SecondaryLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[6px] border border-current px-6 py-3 text-sm font-semibold leading-5 transition-colors duration-150 hover:-translate-y-[1px] hover:bg-surface-section-alt/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand",
        className
      )}
      {...rest}
    />
  );
}

/* ─── Full-width on mobile in CTA contexts ─── */
function PrimaryButtonFull({ className, ...rest }: PrimaryButtonProps) {
  return <PrimaryButton className={cn("w-full sm:w-auto", className)} {...rest} />;
}

export { PrimaryButton, SecondaryButton, PrimaryLink, SecondaryLink, PrimaryButtonFull };
