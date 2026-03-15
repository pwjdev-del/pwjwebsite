"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { features } from "@/data/features";
import { motion, AnimatePresence } from "framer-motion";

const categorizedFeatures = features.reduce((acc, feature) => {
  const cat = feature.category || "Other";
  if (!acc[cat]) {
    acc[cat] = [];
  }
  acc[cat].push(feature);
  return acc;
}, {} as Record<string, typeof features>);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-obsidian-900/95 backdrop-blur-md border-b border-white/[0.06] py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 px-2 min-w-[32px] rounded bg-gradient-to-br from-magenta-400 to-magenta-600 flex items-center justify-center text-white font-heading font-bold text-sm shadow-lg group-hover:scale-105 transition-transform tracking-wider">
            PWJ
          </div>
          <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white">
            Purewave<span className="text-magenta-400">Josh</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          
          {/* Services Mega Menu */}
          <div className="group">
            <Link
              href="/#services"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors text-navy-200 hover:text-white py-6"
            >
              Solutions <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            
            {/* Mega Menu Dropdown */}
            <div className="absolute top-[100%] left-0 w-full bg-obsidian-800/98 backdrop-blur-xl shadow-2xl border-b border-white/[0.06] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
              <div className="container mx-auto px-6 max-w-7xl py-10">
                <div className="grid grid-cols-3 gap-12">
                  {Object.entries(categorizedFeatures).map(([category, items]) => (
                    <div key={category} className="space-y-6">
                      <h3 className="text-white font-heading font-bold text-lg border-b border-white/[0.06] pb-3">
                        {category}
                      </h3>
                      <div className="space-y-4">
                        {items.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.id}`}
                            className="group/link flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                          >
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white shadow-sm transition-transform group-hover/link:scale-110", service.color.startsWith('bg-') ? service.color : '')} style={service.color.startsWith('#') ? {backgroundColor: service.color} : {}}>
                              <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                                {service.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white group-hover/link:text-magenta-400 transition-colors mb-1">
                                {service.title}
                              </h4>
                              <p className="text-xs text-navy-400 line-clamp-2 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/open-claw"
            className="text-sm font-medium transition-colors text-navy-200 hover:text-white"
          >
            Open Claw
          </Link>

          <Link
            href="/#proof"
            className="text-sm font-medium transition-colors text-navy-200 hover:text-white"
          >
            Proof
          </Link>

          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg bg-gradient-to-r from-magenta-500 to-magenta-400 text-white hover:shadow-magenta-500/30"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="lg:hidden p-2 transition-colors text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full overflow-hidden bg-obsidian-800/98 backdrop-blur-xl border-b border-white/[0.06] shadow-xl"
          >
            <div className="max-h-[85vh] overflow-y-auto py-4 sm:py-6 px-4 sm:px-6 flex flex-col gap-5 sm:gap-6">
              
              <div className="space-y-4">
                <Link
                  href="/#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-white block border-b border-white/[0.06] pb-2"
                >
                  Solutions
                </Link>
                
                <div className="flex flex-col gap-6 pl-2">
                  {Object.entries(categorizedFeatures).map(([category, items]) => (
                    <div key={category} className="space-y-3">
                      <button 
                        onClick={() => setActiveMobileCategory(activeMobileCategory === category ? null : category)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <span className="text-sm font-bold text-magenta-400 uppercase tracking-wider">{category}</span>
                        <ChevronDown className={cn("w-4 h-4 text-magenta-400 transition-transform", activeMobileCategory === category ? "rotate-180" : "")} />
                      </button>
                      
                      <AnimatePresence>
                        {(activeMobileCategory === category || activeMobileCategory === null) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-4 pt-2 border-l-2 border-white/[0.06] pl-4"
                          >
                            {items.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 group"
                              >
                                <div className={cn("w-8 h-8 rounded-md flex items-center justify-center shrink-0 text-white", service.color.startsWith('bg-') ? service.color : '')} style={service.color.startsWith('#') ? {backgroundColor: service.color} : {}}>
                                  <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">
                                    {service.icon}
                                  </div>
                                </div>
                                <span className="text-sm font-medium text-navy-200 group-hover:text-magenta-400">
                                  {service.title}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/[0.06] w-full" />

              <Link
                href="/open-claw"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-white block"
              >
                Open Claw
              </Link>
              
              <Link
                href="/#proof"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-white block"
              >
                Proof
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 mt-2 rounded-xl bg-gradient-to-r from-magenta-500 to-magenta-400 text-white text-center font-bold hover:shadow-magenta-500/30 transition-shadow shadow-lg"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
