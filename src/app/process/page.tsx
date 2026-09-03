import type { Metadata } from "next";
import { ProcessSteps } from "@/components/sections/ProcessSteps";

export const metadata: Metadata = {
  title: "Process — Blue Line Marine Transport",
};

/** How It Works — the 4-step process. */
export default function ProcessPage() {
  return (
    <ProcessSteps />
  );
}
