import LeadCapture from "@/components/sections/LeadCapture";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Purewave Josh LLC",
  description: "Get in touch with Purewave Josh LLC for a custom AI implementation plan. We automate workflows for healthcare, real estate, and enterprise teams in Florida.",
};

export default function ContactPage() {
  return (
    <div className="pt-8 lg:pt-16">
      <div className="container mx-auto px-6 max-w-5xl mb-8">
          <h1 className="sr-only">Contact Purewave Josh LLC</h1>
      </div>
      <LeadCapture />
    </div>
  );
}
