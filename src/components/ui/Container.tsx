/** Container — max-width 72rem, horizontal padding 1rem mobile / 2rem desktop. */

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[72rem] px-4 sm:px-6 lg:px-8", className)}
      {...rest}
    />
  );
}
