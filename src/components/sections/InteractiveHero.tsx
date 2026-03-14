"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";

export default function InteractiveHero() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    // Initialize the tsParticles engine with the slim package for smaller bundle size
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log("Particles loaded", container);
  };

  // 🌌 Anti-Gravity "Neural Web" Configuration
  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: ["grab", "repulse"], // Combined grab interaction with soft anti-gravity
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.8,
            color: "#3B82F6",
          },
        },
        push: {
          quantity: 5,
        },
        repulse: {
          distance: 120,
          duration: 0.4,
          factor: 1.5,
          speed: 1,
          easing: "ease-out-quad",
        },
      },
    },
    particles: {
      color: {
        value: ["#2563EB", "#3B82F6", "#0B1120"], // Electric Blue and Navy
      },
      links: {
        color: "#60A5FA",      // lighter electric accent connecting the web
        distance: 160,
        enable: true,
        opacity: 0.5,
        width: 1.5,
        triangles: { // Creates polygon fills between dense particles
          enable: true,
          opacity: 0.03,
        }
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce", // Bounces off the edges of the screen
        },
        random: true,
        speed: { min: 0.5, max: 2 }, // Variable speed for more organic life-like feel
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 150,
      },
      opacity: {
        value: { min: 0.2, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        }
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        }
      },
    },
    detectRetina: true,
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center pt-12 md:pt-20 overflow-hidden bg-white">
      {/* Background Interactive Particles */}
      {init && (
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="h-full w-full"
          />
        </div>
      )}

      {/* Hero Content positioned above the particles */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-5xl flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-6 md:mb-8 bg-white/50 border-navy-900/10 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-electric-500 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium text-navy-800 tracking-wide uppercase">AI Built for Healthcare, Real Estate, and Enterprise</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter text-navy-900 mb-6 md:mb-8 leading-[1.05]"
        >
          Hours of Meetings.<br/>
          <span className="text-gradient">Summarized in Seconds.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-xl text-navy-700 max-w-2xl mb-8 md:mb-12 leading-relaxed px-2 sm:px-0"
        >
          Empowering real estate brokerages, enterprises, and healthcare providers to reclaim 10+ hours a week with secure, AI-driven summarization and workflow automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center mt-4 md:mt-6 z-20 relative px-2 sm:px-0"
        >
          <motion.a
            href="/services/meeting-bots"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-navy-900 text-white font-semibold text-base sm:text-lg hover:bg-navy-800 shadow-[0_8px_30px_rgb(11,17,32,0.15)] hover:shadow-[0_8px_40px_rgb(11,17,32,0.3)] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <span>Start Reclaiming Time</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-electric-500 transition-colors duration-300">
              <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform duration-300" />
            </span>
          </motion.a>

          <motion.a
            href="/services/meeting-bots"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-navy-900 font-semibold text-base sm:text-lg border border-navy-900/10 hover:border-navy-900/20 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span>Explore Solutions</span>
            <Zap className="w-4 h-4 text-electric-500 group-hover:scale-110 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        {/* Gradient Fade to connect Hero with next section */}
        <div className="absolute -bottom-1 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-0"></div>
      </div>
    </section>
  );
}
