"use client";

import { useEffect, useState, useId } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

interface ServiceParticleIconProps {
  icon: React.ReactNode;
  tailwindBgColor: string;
  className?: string;
}

export function ServiceParticleIcon({ icon, tailwindBgColor, className = "w-24 h-24 rounded-3xl" }: ServiceParticleIconProps) {
  const [init, setInit] = useState(false);
  const particleId = useId();
  const { isMobile, particleScale, prefersReducedMotion } = useDeviceCapability();

  const extractedHex = tailwindBgColor.includes("[") 
    ? tailwindBgColor.split("[")[1].split("]")[0] 
    : "#60A5FA";

  useEffect(() => {
    if (prefersReducedMotion) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [prefersReducedMotion]);

  const scaledParticleCount = isMobile ? 6 : 12;

  const options: ISourceOptions = {
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: isMobile ? 30 : 120,
    interactivity: {
      events: {
        onHover: {
          enable: !isMobile,
          mode: ["attract", "repulse"],
        },
      },
      modes: {
        attract: {
          distance: 150,
          duration: 0.4,
          speed: 2,
          factor: 3,     
        },
        repulse: {
          distance: 30,  
          duration: 0.4,
          factor: 2
        }
      },
    },
    particles: {
      color: { value: ["#ffffff", extractedHex, "#f8fafc"] },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: { min: 0.5, max: 1.5 },
        straight: false,
      },
      number: {
        density: { enable: true },
        value: scaledParticleCount,
      },
      opacity: {
        value: { min: 0.2, max: 0.8 },
        animation: { enable: !isMobile, speed: 1.5, sync: false }
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: true,
        distance: 25, 
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      }
    },
    detectRetina: true,
  };

  const showParticles = init && particleScale > 0;

  return (
    <div className={`relative ${className} ${tailwindBgColor} flex items-center justify-center mb-8 shadow-2xl overflow-hidden group/icon isolate border border-white/20 ring-4 ring-white/5`}>
      {showParticles && (
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen overflow-hidden">
          <Particles
            id={`tsparticles-${particleId}`}
            options={options}
            className="w-full h-full"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

      <motion.div 
        className="relative z-20 text-white pointer-events-none drop-shadow-xl"
        whileHover={{ scale: 1.25, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="group-hover/icon:scale-125 group-hover/icon:-translate-y-1 transition-all duration-300 ease-out">
          {icon}
        </div>
      </motion.div>
    </div>
  );
}
