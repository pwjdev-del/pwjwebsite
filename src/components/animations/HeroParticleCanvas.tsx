"use client";

import { useRef, useEffect, useCallback } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export default function HeroParticleCanvas({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const { isMobile, particleScale, prefersReducedMotion } = useDeviceCapability();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Skip mouse tracking on mobile (no hover)
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const hexToRgb = (hex: string) => {
      const map: Record<string, string> = {
        "bg-electric-500": "#3b82f6", "bg-electric-600": "#2563eb",
        "bg-green-500": "#22c55e", "bg-emerald-500": "#10b981",
        "bg-amber-500": "#f59e0b", "bg-rose-500": "#f43f5e",
        "bg-cyan-500": "#06b6d4", "bg-indigo-500": "#6366f1",
        "bg-teal-500": "#14b8a6", "bg-orange-500": "#f97316",
      };
      let h = map[hex] || hex;
      if (h.startsWith("bg-[")) h = h.slice(4, -1);
      if (!h.startsWith("#")) h = "#3b82f6";
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 59, g: 130, b: 246 };
    };
    const rgb = hexToRgb(color);

    // Scale particle count by device capability
    const particleCount = Math.round(90 * Math.max(particleScale, 0.15));
    const connectionDistance = isMobile ? 80 : 140;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.6 : 1.2),
      vy: (Math.random() - 0.5) * (isMobile ? 0.6 : 1.2),
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // If reduced motion, draw static dots once and stop
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
        ctx.fill();
      }
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Mouse interaction only on desktop
        if (!isMobile) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
        ctx.fill();
      }

      // Connection lines — reduced distance on mobile
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.15 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [color, handleMouseMove, isMobile, particleScale, prefersReducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />;
}
