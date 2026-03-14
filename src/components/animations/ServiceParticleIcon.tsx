"use client";

import { useEffect, useState, useId } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";

interface ServiceParticleIconProps {
  icon: React.ReactNode;
  tailwindBgColor: string;
  className?: string; // e.g., "w-14 h-14 rounded-2xl" or "w-24 h-24 rounded-3xl"
}

export function ServiceParticleIcon({ icon, tailwindBgColor, className = "w-24 h-24 rounded-3xl" }: ServiceParticleIconProps) {
  const [init, setInit] = useState(false);
  const particleId = useId();

  // Extract raw hex from tailwind "bg-[#HEX]" format
  const extractedHex = tailwindBgColor.includes("[") 
    ? tailwindBgColor.split("[")[1].split("]")[0] 
    : "#60A5FA"; // Fallback blue

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["attract", "repulse"], // Pulls them in closely but agitates them!
        },
      },
      modes: {
        attract: {
          distance: 150, // Larger magnetic pull distance so it grabs cursor easily
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
        speed: { min: 0.5, max: 1.5 }, // Smooth, graceful movement
        straight: false,
      },
      number: {
        density: { enable: true },
        value: 12, // Reduced dramatically to prevent blurry blob
      },
      opacity: {
        value: { min: 0.2, max: 0.8 },
        animation: { enable: true, speed: 1.5, sync: false }
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

  return (
    <div className={`relative ${className} ${tailwindBgColor} flex items-center justify-center mb-8 shadow-2xl overflow-hidden group/icon isolate border border-white/20 ring-4 ring-white/5`}>
      {/* Background Particles Container */}
      {init && (
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen overflow-hidden">
          <Particles
            id={`tsparticles-${particleId}`}
            options={options}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Soft central glow behind the icon inside the box */}
      <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

      {/* Actual Icon positioned absolutely at the center over the particles */}
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
