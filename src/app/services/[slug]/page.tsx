import { features } from "@/data/features";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import { ServiceParticleIcon } from "@/components/animations/ServiceParticleIcon";
import InteractiveLockParticle from "@/components/animations/InteractiveLockParticle";
import HeroParticleCanvas from "@/components/animations/HeroParticleCanvas";
import type { Metadata } from 'next';
import { getServiceMeta } from "@/data/seo";
import { ServiceSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const meta = getServiceMeta(resolvedParams.slug);

  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(", "),
  };
}

export function generateStaticParams() {
  return features.map((f) => ({
    slug: f.id,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = features.find((f: any) => f.id === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const bulletsToDisplay = service.detailBullets || service.bullets;

  return (
    <div className="pb-24">
        <ServiceSchema name={service.title} description={service.description} />
        
        {/* Dynamic Hero Section */}
        <div className="relative pt-20 pb-16 md:pt-32 md:pb-32 mb-10 md:mb-16 overflow-hidden bg-navy-950">
          {/* Particle Physics Background */}
          <HeroParticleCanvas color={service.color} />
          
          <div className="absolute inset-0 z-0">
            <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-20 ${service.color} blur-[120px] mix-blend-screen pointer-events-none`}></div>
            <div className={`absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 ${service.color} blur-[100px] mix-blend-screen pointer-events-none`}></div>
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-white to-transparent z-[2]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 text-center md:text-left">
            <Link href="/#services" className="text-navy-300 hover:text-white transition-colors inline-flex items-center gap-2 mb-8 md:mb-12 text-sm font-medium tracking-wide uppercase group">
              <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Services
            </Link>
            
            <FadeIn className="max-w-4xl">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                   <ServiceParticleIcon icon={service.icon} tailwindBgColor={service.color} />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight leading-tight">
                  {service.title}
                </h1>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl text-navy-200 leading-relaxed md:pl-[104px] max-w-3xl">
                {service.description}
              </p>
            </FadeIn>
          </div>
        </div>

        <article className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content (Capabilities grid) - Takes up 7 columns */}
            <div className="lg:col-span-7">
              <FadeIn>
                <section>
                  <h2 className="text-3xl font-heading font-bold text-navy-900 mb-8 border-b border-navy-900/10 pb-4">Key Capabilities & Benefits</h2>
                  
                  <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12" delay={0.2}>
                  {bulletsToDisplay.map((bullet: string, idx: number) => (
                    <FadeInItem key={idx} className="h-full">
                      <div className="flex items-start text-base text-navy-800 p-5 rounded-2xl bg-white border border-navy-900/5 shadow-sm hover:scale-[1.02] hover:shadow-md hover:border-electric-200 transition-all duration-300 h-full">
                        <CheckCircle2 className="w-5 h-5 text-electric-500 mr-4 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug flex-grow">{bullet}</span>
                      </div>
                    </FadeInItem>
                  ))}
                  </FadeInStagger>
                </section>
              </FadeIn>
            </div>

            {/* Right Column (Sticky image and CTA) - Takes up 5 columns */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-6 md:gap-8">
              {/* Feature Visualization Image or Interactive Component */}
              {service.id === 'enterprise-security' ? (
                <FadeIn delay={0.3}>
                  <InteractiveLockParticle />
                </FadeIn>
              ) : service.image && (
                <FadeIn delay={0.3}>
                  <div className="relative w-full aspect-video md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-navy-900/10 group bg-navy-900">
                    <img 
                      src={service.image} 
                      alt={`${service.title} Visualization`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent pointer-events-none"></div>
                  </div>
                </FadeIn>
              )}

              {/* Action/Contact Card */}
              <FadeIn delay={0.4} className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] bg-navy-900 text-white shadow-2xl relative overflow-hidden text-center group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 md:mb-4 relative z-10">
                  Ready to implement {service.title}?
                </h3>
                
                <p className="text-navy-300 mb-6 md:mb-8 relative z-10 text-sm md:text-base lg:text-lg">
                  Let's discuss how we can integrate this solution directly into your existing enterprise stack.
                </p>

                <Link
                  href="/contact"
                  className="w-full py-4 rounded-xl bg-electric-600 text-white font-semibold text-lg hover:bg-electric-500 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 block relative z-10"
                >
                  Request a Custom Demo
                </Link>
              </FadeIn>
            </div>

          </div>
        </article>
    </div>
  );
}
