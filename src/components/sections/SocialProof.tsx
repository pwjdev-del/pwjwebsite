"use client";

import { motion } from "framer-motion";
import { Shield, Building2, Stethoscope, LockKeyhole } from "lucide-react";

const trustBadges = [
  { icon: <LockKeyhole className="w-6 h-6" />, label: "End-to-End Encryption" },
  { icon: <Shield className="w-6 h-6" />, label: "HIPAA Compliant Infrastructure" },
  { icon: <Building2 className="w-6 h-6" />, label: "Florida Based" },
  { icon: <Stethoscope className="w-6 h-6" />, label: "EHR/EMR Ready" },
];

export default function SocialProof() {
  return (
    <section id="proof" className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy-900 mb-4 md:mb-6 tracking-tight">
            Trusted by Local Leaders. <span className="text-electric-600">Secured for the Enterprise.</span>
          </h2>
        </div>

        {/* Security Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {trustBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="px-4 py-6 md:px-6 md:py-8 rounded-xl md:rounded-2xl bg-white border border-navy-900/5 shadow-sm flex flex-col items-center text-center gap-3 md:gap-4 hover:border-electric-200 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-electric-50 flex items-center justify-center text-electric-600">
                {badge.icon}
              </div>
              <span className="font-medium text-navy-800 text-sm">{badge.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Feature */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="relative max-w-4xl mx-auto p-6 sm:p-10 md:p-14 rounded-2xl md:rounded-[2.5rem] bg-navy-900 text-center overflow-hidden"
        >
          {/* Decorative Quote Mark */}
          <div className="absolute top-4 left-8 text-8xl font-serif text-white/5 select-none pointer-events-none">
            "
          </div>
          
          <p className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-white leading-relaxed mb-8 md:mb-10 font-medium">
            "As a healthcare provider in Florida, patient data security is paramount. This AI infrastructure not only saves our administrative team 12 hours a week, but does so with ironclad compliance we control."
          </p>
          
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-electric-600/20 flex items-center justify-center text-electric-400 font-bold font-heading mb-2">
              D
            </div>
            <span className="text-white font-semibold tracking-wide">Dr. E. Reynolds</span>
            <span className="text-navy-300 text-sm">Managing Partner, Florida Private Health</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
