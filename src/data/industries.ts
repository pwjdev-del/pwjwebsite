import { Activity, Building2, Briefcase } from "lucide-react";
import React from "react";

export const industries = [
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Secure, HIPAA-compliant AI solutions designed to reduce administrative burden on clinical staff. Automate patient intake, secure meeting transcription, and EHR integration without compromising patient privacy.",
    iconName: "Activity",
    color: "bg-[#10B981]", // Emerald
    image: "/images/features/healthcare.webp", // Fallback placeholder if missing
    bullets: [
      "100% HIPAA-Compliant Infrastructure",
      "Automated EHR data entry & sync",
      "Secure telehealth transcription",
      "Private local-LLM deployment options"
    ],
    ctaText: "Secure Your Practice"
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description: "Transform your brokerage with AI workflows that never sleep. From automated property summaries to intelligent CRM lead routing, we help Florida realtors reclaim their time and scale their business.",
    iconName: "Building2",
    color: "bg-[#3B82F6]", // Blue
    image: "/images/features/real-estate.webp", // Fallback placeholder if missing
    bullets: [
      "Automated lead capture and CRM routing",
      "Instant property viewing summaries",
      "AI-driven follow-up campaigns",
      "Contract and document parsing"
    ],
    ctaText: "Scale Your Brokerage"
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Custom-tailored Open-Source AI models deployed directly on your hardware. Keep your intellectual property entirely offline while harnessing the power of cutting-edge automation.",
    iconName: "Briefcase",
    color: "bg-[#6366F1]", // Indigo
    image: "/images/features/enterprise.webp", // Fallback placeholder if missing
    bullets: [
      "Zero monthly API fees with Open Claw",
      "Air-gapped and secure local deployment",
      "Custom model fine-tuning",
      "Dedicated integration engineering"
    ],
    ctaText: "Deploy Local AI"
  }
];

export function getIndustry(slug: string) {
  return industries.find(ind => ind.id === slug) || null;
}
