import InteractiveHero from "@/components/sections/InteractiveHero";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import OpenClawHome from "@/components/sections/OpenClawHome";
import LeadCapture from "@/components/sections/LeadCapture";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Agency | Purewave Josh LLC",
  description: "Reclaim 10+ hours a week with custom AI meeting bots, workflow automation, and enterprise infrastructure.",
};

export default function Home() {
  return (
    <>
      <InteractiveHero />
      <FeaturesGrid />
      <OpenClawHome />
      <LeadCapture />
    </>
  );
}
