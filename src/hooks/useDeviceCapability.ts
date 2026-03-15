"use client";

import { useState, useEffect } from "react";

interface DeviceCapability {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  /** Particle multiplier: 1.0 = full, 0.5 = half, 0.3 = minimal */
  particleScale: number;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowEnd: false,
    prefersReducedMotion: false,
    particleScale: 1,
  });

  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      const isTablet = w >= 768 && w <= 1024;
      const isDesktop = w > 1024;

      // Detect low-end device
      const cores = navigator.hardwareConcurrency || 4;
      const lowMemory = (navigator as any).deviceMemory
        ? (navigator as any).deviceMemory < 4
        : false;
      const isLowEnd = cores <= 4 || lowMemory || isMobile;

      // Detect reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Calculate particle scale
      let particleScale = 1;
      if (prefersReducedMotion) {
        particleScale = 0;
      } else if (isMobile) {
        particleScale = 0.3;
      } else if (isTablet || isLowEnd) {
        particleScale = 0.55;
      }

      setCapability({
        isMobile,
        isTablet,
        isDesktop,
        isLowEnd,
        prefersReducedMotion,
        particleScale,
      });
    };

    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  return capability;
}
