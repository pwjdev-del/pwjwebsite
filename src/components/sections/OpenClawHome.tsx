"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldAlert, Zap, Check } from "lucide-react";
import Link from "next/link";

export default function OpenClawHome() {
  return (
    <section id="open-claw" className="py-16 md:py-24 bg-navy-900 text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
              <Cpu className="w-4 h-4 text-electric-400" />
              <span className="text-sm font-medium text-electric-100 tracking-wide uppercase">Local Hardware AI</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 md:mb-6 leading-tight">
              Meet your personal, <span className="text-electric-400">Offline AI.</span>
            </h2>
            
            <p className="text-base md:text-lg text-navy-200 mb-6 md:mb-8 leading-relaxed max-w-xl font-medium">
              Stop paying Silicon Valley monthly. One setup. No APIs. No data leaving your building. Ever.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Zero Subscription Fees: Stop paying monthly token-taxes to Silicon Valley giants.",
                "100% Offline Privacy: Your files never leave your computer. No APIs. No tracking.",
                "Native OS Integration: The AI interacts directly with your folders and active applications.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 min-w-[24px] w-6 h-6 rounded-full bg-electric-600/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-electric-400" />
                  </div>
                  <p className="text-navy-100 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            
            <Link
               href="/open-claw"
               className="inline-flex items-center text-electric-400 hover:text-white transition-colors gap-2 font-medium"
            >
              Learn more about Open Claw &rarr;
            </Link>
          </motion.div>

          {/* Right Content - Pricing/Offer Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-400 to-electric-600 rounded-[2rem] transform rotate-3 scale-[1.02] opacity-50 blur-lg transition-transform duration-500 hover:rotate-6"></div>
            
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] bg-navy-800 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
              
              <div className="w-20 h-20 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative group">
                <Cpu className="w-8 h-8 text-electric-400 absolute transition-all duration-300 group-hover:opacity-0" />
                <ShieldAlert className="w-8 h-8 text-white absolute opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
              </div>

              <h3 className="text-2xl font-heading font-bold mb-4">Complete Workstation Setup</h3>
              
              <p className="text-navy-300 mb-8 max-w-sm">
                We handle the complete installation and tuning of the Open Claw AI runtime onto your compatible local workstation.
              </p>

              <div className="mb-10 w-full p-6 rounded-2xl bg-navy-900/50 border border-white/5">
                <span className="block text-navy-400 text-sm font-medium mb-2 uppercase tracking-wider">Starting at</span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-heading font-black text-white">$4,500</span>
                </div>
                <span className="block text-electric-400 text-sm mt-3">+ custom workflow additions</span>
              </div>

              <Link
                href="/contact"
                className="w-full py-3.5 md:py-4 rounded-xl bg-electric-600 text-white font-semibold text-base md:text-lg hover:bg-electric-500 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 block text-center"
              >
                Request Consultation
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
