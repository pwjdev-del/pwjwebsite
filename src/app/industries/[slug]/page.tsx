import { getIndustry, industries } from "@/data/industries";
import { getIndustryMeta } from "@/data/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Activity, Building2, Briefcase } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import { ServiceParticleIcon } from "@/components/animations/ServiceParticleIcon";
import type { Metadata } from 'next';
import { ServiceSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const meta = getIndustryMeta(resolvedParams.slug);
  
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(", "),
  };
}

export function generateStaticParams() {
  return industries.map((ind) => ({
    slug: ind.id,
  }));
}

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-8 h-8 text-white" />,
  Building2: <Building2 className="w-8 h-8 text-white" />,
  Briefcase: <Briefcase className="w-8 h-8 text-white" />
};

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const industry = getIndustry(resolvedParams.slug);

  if (!industry) {
    notFound();
  }

  const icon = iconMap[industry.iconName] || <Briefcase className="w-8 h-8 text-white" />;

  return (
    <div className="pt-16 pb-24">
      <ServiceSchema name={`${industry.title} AI Solutions`} description={industry.description} />

      <article className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        <Link href="/" className="text-navy-500 hover:text-electric-600 transition-colors inline-block mb-12 text-sm font-medium tracking-wide uppercase">
          &larr; Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* Left Content */}
          <FadeIn>
            <ServiceParticleIcon icon={icon} tailwindBgColor={industry.color} />
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-navy-900 mb-4 md:mb-6 tracking-tight leading-tight">
              AI for {industry.title}
            </h1>
            
            <p className="text-lg md:text-xl text-navy-700 leading-relaxed mb-8 md:mb-10">
              {industry.description}
            </p>

            <section>
              <h2 className="text-2xl font-heading font-bold text-navy-900 mb-6">Key Benefits</h2>
              
              <FadeInStagger className="space-y-4 mb-12" delay={0.2}>
                {industry.bullets.map((bullet: string, idx: number) => (
                  <FadeInItem key={idx}>
                    <div className="flex items-center text-lg text-navy-800 p-4 rounded-2xl bg-white border border-navy-900/5 shadow-sm hover:scale-105 hover:shadow-md hover:border-electric-200 transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6 text-electric-500 mr-4 flex-shrink-0" />
                      {bullet}
                    </div>
                  </FadeInItem>
                ))}
              </FadeInStagger>
            </section>
          </FadeIn>

          {/* Right Column (Sticky) */}
          <aside className="lg:sticky lg:top-32 flex flex-col gap-6 md:gap-8">
            {industry.image && (
              <FadeIn delay={0.3}>
                <div className="relative w-full aspect-video xl:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-navy-900/10 group bg-navy-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                    <div className="text-navy-700 opacity-50 scale-150 transform transition-transform duration-700 group-hover:scale-[1.6]">
                      {iconMap[industry.iconName]}
                    </div>
                  </div>
                  <img 
                    src={industry.image} 
                    alt={`AI Automation for ${industry.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-40 group-hover:opacity-60 mix-blend-overlay relative z-10" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent pointer-events-none z-20"></div>
                </div>
              </FadeIn>
            )}

            {/* Action/Contact Card */}
            <FadeIn delay={0.4} className="p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] bg-navy-900 text-white shadow-2xl relative overflow-hidden text-center group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-electric-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
              
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 md:mb-4 relative z-10">
                Ready to upgrade your {industry.title} workflows?
              </h3>
              
              <p className="text-navy-300 mb-6 md:mb-8 relative z-10 text-base md:text-lg">
                Let&apos;s discuss how we can deploy these solutions directly for your team.
              </p>

              <Link
                href="/contact"
                className="w-full py-4 rounded-xl bg-electric-600 text-white font-semibold text-lg hover:bg-electric-500 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 block relative z-10"
              >
                {industry.ctaText}
              </Link>
            </FadeIn>
          </aside>

        </div>
      </article>
    </div>
  );
}
