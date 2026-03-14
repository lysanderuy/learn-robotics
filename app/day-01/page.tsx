import type { Metadata } from "next";
import { PresentationShell } from "@/components/presentation-shell";

export const metadata: Metadata = {
  title: "Day 01 | Robotics Workshop Series",
  description: "Day 01 workshop presentation: meet, build, and drive your robot.",
};

export default function DayOnePage() {
  return <PresentationShell />;
}
