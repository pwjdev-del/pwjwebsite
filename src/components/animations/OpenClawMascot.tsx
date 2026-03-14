"use client";

import { motion } from "framer-motion";

export default function OpenClawMascot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-full h-full min-h-[400px] select-none pointer-events-none ${className}`}>
      {/* Soft background glow to blend with the surroundings */}
      <div className="absolute w-[250px] h-[250px] bg-red-600/15 blur-[60px] rounded-full pointer-events-none" />
      
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-[320px] h-[320px] flex items-center justify-center -ml-8"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-2xl">
          <defs>
            {/* The main red gradient of the Open Claw logo */}
            <radialGradient id="clawRed" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff5252" />
              <stop offset="50%" stopColor="#e53935" />
              <stop offset="90%" stopColor="#b71c1c" />
            </radialGradient>
            
            <radialGradient id="clawArm" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff5252" />
              <stop offset="100%" stopColor="#c62828" />
            </radialGradient>

            <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="shadow">
              <feDropShadow dx="0" dy="15" stdDeviation="15" floodOpacity="0.3" floodColor="#000" />
            </filter>
          </defs>

          {/* Left Antenna */}
          <motion.path
            d="M 85 40 Q 60 25 55 30"
            fill="none"
            stroke="#ff5252"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Right Antenna */}
          <motion.path
            d="M 115 40 Q 140 25 145 30"
            fill="none"
            stroke="#ff5252"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Left Leg */}
          <rect x="80" y="155" width="15" height="20" fill="#a01111" />
          {/* Right Leg */}
          <rect x="105" y="155" width="15" height="20" fill="#a01111" />

          {/* Main Body */}
          <circle cx="100" cy="95" r="65" fill="url(#clawRed)" filter="url(#shadow)" />

          {/* Left Arm */}
          <path d="M 45 100 C 20 95 20 125 45 125 Z" fill="url(#clawArm)" />
          
          {/* Right Arm */}
          <path d="M 155 100 C 180 95 180 125 155 125 Z" fill="url(#clawArm)" />

          {/* Eyes Black Base */}
          <circle cx="78" cy="80" r="10" fill="#0f172a" />
          <circle cx="122" cy="80" r="10" fill="#0f172a" />

          {/* Pupil blinking animation */}
          <motion.g
            animate={{ scaleY: [1, 1, 1, 0.1, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              times: [0, 0.95, 0.96, 0.98, 1],
              ease: "easeInOut"
            }}
            style={{ originY: "80px" }}
          >
            {/* Left Eye Bright Cyan */}
            <circle cx="78" cy="80" r="3.5" fill="#06b6d4" filter="url(#cyanGlow)" />
            <circle cx="78" cy="80" r="1.5" fill="#e0f2fe" />

            {/* Right Eye Bright Cyan */}
            <circle cx="122" cy="80" r="3.5" fill="#06b6d4" filter="url(#cyanGlow)" />
            <circle cx="122" cy="80" r="1.5" fill="#e0f2fe" />
          </motion.g>

        </svg>

        {/* Floating tech motes — deterministic values to avoid SSR hydration mismatch */}
        {[
          { w: 4.2, h: 3.1, left: 15, top: 35, dur: 3.4, del: 0.3 },
          { w: 2.8, h: 5.0, left: 42, top: 55, dur: 4.1, del: 1.1 },
          { w: 3.5, h: 2.6, left: 68, top: 28, dur: 2.7, del: 0.8 },
          { w: 5.1, h: 4.3, left: 30, top: 70, dur: 3.9, del: 1.6 },
          { w: 2.3, h: 3.8, left: 82, top: 45, dur: 4.5, del: 0.5 },
        ].map((mote, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: mote.w,
              height: mote.h,
              backgroundColor: i % 2 === 0 ? "#06b6d4" : "#ff5252",
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              opacity: 0
            }}
            animate={{
              y: [-10, -50],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: mote.dur,
              repeat: Infinity,
              delay: mote.del,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
