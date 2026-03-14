"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { features } from "@/data/features";
import { motion, AnimatePresence } from "framer-motion";

// Helper to group features by category for the mega menu
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
          ? "bg-white/95 backdrop-blur-md border-b border-navy-900/10 py-4 shadow-sm"
          : "bg-white/90 backdrop-blur-sm py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center text-white font-heading font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
            P
          </div>
          <span className={cn(
            "font-heading font-bold text-lg sm:text-xl tracking-tight transition-colors",
            isScrolled ? "text-navy-900" : "text-navy-900"
          )}>
            Purewave<span className="text-electric-500">Josh</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          
          {/* Services Mega Menu */}
          <div className="group">
            <Link
              href="/#services"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-electric-500 py-6",
                isScrolled ? "text-navy-800" : "text-navy-800"
              )}
            >
              Solutions <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            
            {/* Mega Menu Dropdown */}
            <div className="absolute top-[100%] left-0 w-full bg-white shadow-2xl border-t border-b border-navy-900/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
              <div className="container mx-auto px-6 max-w-7xl py-10">
                <div className="grid grid-cols-3 gap-12">
                  {Object.entries(categorizedFeatures).map(([category, items]) => (
                    <div key={category} className="space-y-6">
                      <h3 className="text-navy-900 font-heading font-bold text-lg border-b border-slate-100 pb-3">
                        {category}
                      </h3>
                      <div className="space-y-4">
                        {items.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.id}`}
                            className="group/link flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white shadow-sm transition-transform group-hover/link:scale-110", service.color.startsWith('bg-') ? service.color : '')} style={service.color.startsWith('#') ? {backgroundColor: service.color} : {}}>
                              <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                                {service.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-navy-900 group-hover/link:text-electric-600 transition-colors mb-1">
                                {service.title}
                              </h4>
                              <p className="text-xs text-navy-500 line-clamp-2 leading-relaxed">
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
            className={cn(
              "text-sm font-medium transition-colors hover:text-electric-500",
              isScrolled ? "text-navy-800" : "text-navy-800"
            )}
          >
            Open Claw
          </Link>

          <Link
            href="/#proof"
            className={cn(
              "text-sm font-medium transition-colors hover:text-electric-500",
              isScrolled ? "text-navy-800" : "text-navy-800"
            )}
          >
            Proof
          </Link>

          <Link
            href="/contact"
            className={cn(
               "px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-md hover:shadow-lg",
               isScrolled 
                 ? "bg-navy-900 text-white hover:bg-electric-600" 
                 : "bg-navy-900 text-white hover:bg-electric-600"
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className={cn(
            "lg:hidden p-2 transition-colors",
            isScrolled ? "text-navy-900" : "text-navy-900"
          )}
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
            className="lg:hidden absolute top-full left-0 w-full overflow-hidden bg-white border-b border-navy-900/10 shadow-xl"
          >
            <div className="max-h-[85vh] overflow-y-auto py-4 sm:py-6 px-4 sm:px-6 flex flex-col gap-5 sm:gap-6">
              
              <div className="space-y-4">
                <Link
                  href="/#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-navy-900 block border-b border-slate-100 pb-2"
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
                        <span className="text-sm font-bold text-electric-600 uppercase tracking-wider">{category}</span>
                        <ChevronDown className={cn("w-4 h-4 text-electric-600 transition-transform", activeMobileCategory === category ? "rotate-180" : "")} />
                      </button>
                      
                      <AnimatePresence>
                        {(activeMobileCategory === category || activeMobileCategory === null) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-4 pt-2 border-l-2 border-slate-100 pl-4"
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
                                <span className="text-sm font-medium text-navy-700 group-hover:text-electric-600">
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

              <div className="h-px bg-slate-100 w-full"></div>

              <Link
                href="/open-claw"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-navy-900 block"
              >
                Open Claw
              </Link>
              
              <Link
                href="/#proof"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-navy-900 block"
              >
                Proof
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 mt-2 rounded-xl bg-navy-900 text-white text-center font-bold hover:bg-electric-600 transition-colors shadow-lg"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
