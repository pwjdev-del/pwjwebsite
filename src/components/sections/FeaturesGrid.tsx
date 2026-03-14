"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";
import { features } from "@/data/features";
import { ServiceParticleIcon } from "@/components/animations/ServiceParticleIcon";

// Helper to group features by string category
const categorizedFeatures = features.reduce((acc, feature) => {
  const cat = feature.category || "Other";
  if (!acc[cat]) {
    acc[cat] = [];
  }
  acc[cat].push(feature);
  return acc;
}, {} as Record<string, typeof features>);

export default function FeaturesGrid() {
  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center w-full max-w-3xl mx-auto mb-12 md:mb-20 flex flex-col items-center">
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6">
            <Box size={16} /> <span>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-navy-900 mb-4 md:mb-6 tracking-tight">
            Powerful AI Solutions <br className="hidden md:block" /> for Modern Teams
          </h2>
          <p className="text-lg text-navy-700 leading-relaxed max-w-2xl text-center">
            Streamline your workflow with cutting-edge AI technology and dedicated engineering solutions designed specifically for enterprise professionals.
          </p>
        </div>

        <div className="flex flex-col gap-14 md:gap-24">
          {Object.entries(categorizedFeatures).map(([category, items], catIdx) => (
            <div key={category} className="relative">
              {/* Category Header */}
              <div className="flex items-center mb-10 gap-6">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy-900 shrink-0">
                  {category}
                </h3>
                <div className="h-px bg-gradient-to-r from-navy-900/10 to-transparent flex-grow"></div>
              </div>

              {/* Minimalist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {items.map((feature, idx) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                    className="group relative p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-navy-900/10 hover:border-electric-400/50 hover:shadow-2xl hover:shadow-electric-600/10 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                  >
                    {/* Entire Card Clickable Link overlay */}
                    <Link href={`/services/${feature.id}`} className="absolute inset-0 z-20"><span className="sr-only">View {feature.title}</span></Link>

                    {/* Subtle hover background highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col h-full pointer-events-none">
                      <ServiceParticleIcon 
                        icon={feature.icon} 
                        tailwindBgColor={feature.color} 
                        className="w-14 h-14 rounded-2xl mb-6 shadow-sm"
                      />
                      
                      <h4 className="text-xl md:text-2xl font-heading font-bold text-navy-900 mb-3 md:mb-4">{feature.title}</h4>
                      
                      <p className="text-navy-700 text-sm leading-relaxed mb-8 flex-grow">
                        {feature.description}
                      </p>

                      <ul className="mb-8 space-y-3">
                        {feature.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start text-sm text-navy-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-electric-500 mr-3 mt-1.5 shrink-0"></div>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pointer-events-none pt-6 border-t border-navy-900/5">
                        <div className="inline-flex items-center text-electric-600 font-semibold group-hover:text-electric-500 group/link transition-all duration-300">
                          <span>Explore Solution</span>
                          <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
