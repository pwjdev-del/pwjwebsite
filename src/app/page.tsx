import InteractiveHero from "@/components/sections/InteractiveHero";
import NicheShowcase from "@/components/sections/NicheShowcase";
import OpenClawHome from "@/components/sections/OpenClawHome";
import LeadCapture from "@/components/sections/LeadCapture";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Meeting Intelligence | Purewave Josh LLC",
  description: "Stop taking notes. Start closing deals. Specialized AI meeting intelligence for healthcare, real estate, and enterprise teams.",
};

export default function Home() {
  return (
    <>
      <InteractiveHero />
      <NicheShowcase />
      <OpenClawHome />
      <LeadCapture />
    </>
  );
}
