"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Lock,
  Stethoscope,
  Home,
  Briefcase,
  CheckCircle,
  MessageSquare,
  FileText,
} from "lucide-react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

const industryViews = [
  {
    id: "healthcare",
    label: "Healthcare",
    icon: <Stethoscope className="w-5 h-5" />,
    title: "Clinical Notes — HIPAA Ready",
    entries: [
      { icon: <CheckCircle className="w-4 h-4 text-teal-400" />, text: "Patient: M. Rodriguez — Follow-up cardiology consult" },
      { icon: <FileText className="w-4 h-4 text-teal-400" />, text: "Diagnosis: Atrial fibrillation, stable on Eliquis 5mg" },
      { icon: <CheckCircle className="w-4 h-4 text-teal-400" />, text: "Next Steps: Echo in 6 weeks, adjust beta-blocker" },
      { icon: <Shield className="w-4 h-4 text-teal-400" />, text: "Status: HIPAA Compliant • Encrypted • Private" },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: <Home className="w-5 h-5" />,
    title: "CRM — Auto-Populated",
    entries: [
      { icon: <CheckCircle className="w-4 h-4 text-magenta-400" />, text: "Lead: Jennifer & Mark Thompson — Buyer" },
      { icon: <FileText className="w-4 h-4 text-magenta-400" />, text: "Budget: $800K–$1.1M • Waterfront preferred" },
      { icon: <CheckCircle className="w-4 h-4 text-magenta-400" />, text: "Action: Schedule showing — 1847 Bayshore Dr" },
      { icon: <MessageSquare className="w-4 h-4 text-magenta-400" />, text: "Synced to Salesforce • Zillow data pulled" },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: <Briefcase className="w-5 h-5" />,
    title: "Action Items — Synced to Slack",
    entries: [
      { icon: <CheckCircle className="w-4 h-4 text-electric-400" />, text: "@sarah — Finalize Q2 budget proposal by Friday" },
      { icon: <CheckCircle className="w-4 h-4 text-electric-400" />, text: "@dev-team — Ship auth module to staging" },
      { icon: <FileText className="w-4 h-4 text-electric-400" />, text: "Decision: Migrate to AWS by end of month" },
      { icon: <MessageSquare className="w-4 h-4 text-electric-400" />, text: "Posted to #engineering • Teams synced" },
    ],
  },
];

const trustBadges = [
  { label: "HIPAA READY", icon: <ShieldCheck className="w-5 h-5" /> },
  { label: "PRIVATE & SECURE AI", icon: <Lock className="w-5 h-5" /> },
  { label: "SOC 2 TYPE II", icon: <Shield className="w-5 h-5" /> },
];

export default function InteractiveHero() {
  const [init, setInit] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const { isMobile, isTablet, particleScale, prefersReducedMotion } = useDeviceCapability();

  useEffect(() => {
    if (prefersReducedMotion) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveView((prev) => (prev + 1) % industryViews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {}, []);

  const particleCount = useMemo(() => Math.round(80 * particleScale), [particleScale]);
  const linkDistance = isMobile ? 100 : 160;

  const options: ISourceOptions = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: isMobile ? 30 : 60,
      interactivity: {
        events: {
          onHover: { enable: !isMobile, mode: "grab" },
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 0.3, color: "#2DD4BF" },
          },
        },
      },
      particles: {
        color: { value: ["#2DD4BF", "#FF3CAC", "#60A5FA"] },
        links: {
          color: "#1E2D5A",
          distance: linkDistance,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: { default: "bounce" as const },
          random: true,
          speed: { min: 0.3, max: isMobile ? 0.6 : 1 },
          straight: false,
        },
        number: {
          density: { enable: true },
          value: particleCount,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 2.5 },
          animation: { enable: !isMobile, speed: 1, sync: false },
        },
      },
      detectRetina: true,
    }),
    [isMobile, particleCount, linkDistance]
  );

  const currentView = industryViews[activeView];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-900">
      {/* Ambient background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-magenta-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Network node particles — skipped when reduced motion or zero scale */}
      {init && particleScale > 0 && (
        <div className="absolute inset-0 z-[1]">
          <Particles
            id="tsparticles-hero"
            particlesLoaded={particlesLoaded}
            options={options}
            className="h-full w-full"
          />
        </div>
      )}

      {/* Hero content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-6xl flex flex-col items-center text-center pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-400/20 bg-teal-400/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-teal-300 tracking-widest uppercase">
            Specialized Meeting Intelligence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white mb-4 leading-[1.08]"
        >
          STOP TAKING NOTES.
          <br />
          <span className="text-gradient">START CLOSING DEALS.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-navy-300 max-w-2xl mb-12 leading-relaxed"
        >
          From clinical notes to CRM data, automatically transform your
          high-stakes conversations.
        </motion.p>

        {/* Rotating Mockup Device */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="w-full max-w-2xl mb-12"
        >
          <div className="relative rounded-2xl border border-white/[0.06] bg-obsidian-800/80 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Device header bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-obsidian-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-magenta-400/60" />
                <div className="w-3 h-3 rounded-full bg-teal-400/40" />
                <div className="w-3 h-3 rounded-full bg-electric-400/40" />
              </div>
              {/* View tabs */}
              <div className="flex gap-1 ml-4">
                {industryViews.map((view, i) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(i)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                      i === activeView
                        ? "bg-white/10 text-white"
                        : "text-navy-400 hover:text-navy-200"
                    }`}
                  >
                    {view.icon}
                    <span className="hidden sm:inline">{view.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content area */}
            <div className="p-5 sm:p-6 min-h-[220px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-sm font-semibold text-white/80 tracking-wide">
                      {currentView.title}
                    </span>
                  </div>
                  {currentView.entries.map((entry, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] transition-colors"
                    >
                      {entry.icon}
                      <span className="text-sm text-navy-200 leading-relaxed">
                        {entry.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-magenta-500 to-magenta-400 text-white font-bold text-base sm:text-lg tracking-wide glow-magenta hover:shadow-[0_0_40px_rgba(255,60,172,0.5)] transition-shadow duration-500"
          >
            START FREE TRIAL — NO CREDIT CARD REQUIRED
          </motion.a>
        </motion.div>

        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-teal-400/15 bg-teal-400/5"
            >
              <span className="text-teal-400">{badge.icon}</span>
              <span className="text-xs sm:text-sm font-semibold text-teal-300 tracking-wider uppercase">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-obsidian-900 to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
