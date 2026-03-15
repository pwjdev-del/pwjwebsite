"use client";

import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { ShieldCheck } from 'lucide-react';

// ─────────────────────────────────────────────
// Shield shape path
// ─────────────────────────────────────────────
function createShieldShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 1.6);
  s.bezierCurveTo(-0.2, 1.58, -0.8, 1.5, -1.2, 1.3);
  s.bezierCurveTo(-1.4, 1.2, -1.5, 1.0, -1.5, 0.8);
  s.bezierCurveTo(-1.5, 0.3, -1.4, -0.2, -1.2, -0.6);
  s.bezierCurveTo(-0.9, -1.1, -0.5, -1.5, 0, -1.8);
  s.bezierCurveTo(0.5, -1.5, 0.9, -1.1, 1.2, -0.6);
  s.bezierCurveTo(1.4, -0.2, 1.5, 0.3, 1.5, 0.8);
  s.bezierCurveTo(1.5, 1.0, 1.4, 1.2, 1.2, 1.3);
  s.bezierCurveTo(0.8, 1.5, 0.2, 1.58, 0, 1.6);
  return s;
}

// ─────────────────────────────────────────────
// 3D Shield Body
// ─────────────────────────────────────────────
function ShieldBody({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const shape = useMemo(() => createShieldShape(), []);
  const extrudeSettings = useMemo(() => ({
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 8,
    curveSegments: 32,
  }), []);

  const innerShape = useMemo(() => {
    const s = new THREE.Shape();
    const sc = 0.75;
    s.moveTo(0, 1.6 * sc);
    s.bezierCurveTo(-0.2 * sc, 1.58 * sc, -0.8 * sc, 1.5 * sc, -1.2 * sc, 1.3 * sc);
    s.bezierCurveTo(-1.4 * sc, 1.2 * sc, -1.5 * sc, 1.0 * sc, -1.5 * sc, 0.8 * sc);
    s.bezierCurveTo(-1.5 * sc, 0.3 * sc, -1.4 * sc, -0.2 * sc, -1.2 * sc, -0.6 * sc);
    s.bezierCurveTo(-0.9 * sc, -1.1 * sc, -0.5 * sc, -1.5 * sc, 0, -1.8 * sc);
    s.bezierCurveTo(0.5 * sc, -1.5 * sc, 0.9 * sc, -1.1 * sc, 1.2 * sc, -0.6 * sc);
    s.bezierCurveTo(1.4 * sc, -0.2 * sc, 1.5 * sc, 0.3 * sc, 1.5 * sc, 0.8 * sc);
    s.bezierCurveTo(1.5 * sc, 1.0 * sc, 1.4 * sc, 1.2 * sc, 1.2 * sc, 1.3 * sc);
    s.bezierCurveTo(0.8 * sc, 1.5 * sc, 0.2 * sc, 1.58 * sc, 0, 1.6 * sc);
    return s;
  }, []);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      const base = isHovered ? 0.25 : 0.08;
      mat.opacity = base + Math.sin(clock.elapsedTime * 2) * 0.04;
      const s = isHovered ? 1.08 + Math.sin(clock.elapsedTime * 3) * 0.02 : 1.04;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, 0, -0.2]}>
      <mesh ref={glowRef} position={[0, 0, -0.3]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <mesh ref={meshRef} castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.92}
          roughness={0.15}
          envMapIntensity={1.8}
        />
      </mesh>

      <mesh position={[0, 0, 0.43]} castShadow>
        <extrudeGeometry args={[innerShape, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4, curveSegments: 32 }]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      <mesh position={[0, 0, 0.42]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.9}
          roughness={0.1}
          emissive="#2563eb"
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────
// Checkmark Icon
// ─────────────────────────────────────────────
function CheckmarkIcon({ isHovered }: { isHovered: boolean }) {
  const ref = useRef<THREE.Group>(null);

  const checkShape = useMemo(() => {
    const s = new THREE.Shape();
    const t = 0.12;
    s.moveTo(-0.55, 0.05);
    s.lineTo(-0.55 + t, 0.05 + t);
    s.lineTo(-0.15, -0.25 + t);
    s.lineTo(0.55, 0.45 + t);
    s.lineTo(0.55 + t, 0.45);
    s.lineTo(-0.15, -0.4);
    s.closePath();
    return s;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = isHovered ? 1.05 + Math.sin(clock.elapsedTime * 3) * 0.03 : 1;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={ref} position={[0, -0.05, 0.5]}>
      <mesh>
        <extrudeGeometry args={[checkShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.01, bevelSegments: 2 }]} />
        <meshStandardMaterial
          color="#22c55e"
          metalness={0.8}
          roughness={0.15}
          emissive="#16a34a"
          emissiveIntensity={isHovered ? 1.2 : 0.5}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────
// Energy Ring
// ─────────────────────────────────────────────
function EnergyRing({ isHovered }: { isHovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const targetOpacity = useRef(0);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    targetOpacity.current = isHovered ? 0.3 : 0;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity += (targetOpacity.current - mat.opacity) * 0.05;
    ref.current.rotation.z = clock.elapsedTime * 0.8;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[2.2, 0.015, 16, 100]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function EnergyRing2({ isHovered }: { isHovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((isHovered ? 0.2 : 0) - mat.opacity) * 0.05;
    ref.current.rotation.z = -clock.elapsedTime * 0.6;
    ref.current.rotation.y = Math.cos(clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[2.5, 0.01, 12, 80]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

// ─────────────────────────────────────────────
// Floating particles (scaled for device)
// ─────────────────────────────────────────────
function FloatingParticles({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ─────────────────────────────────────────────
// Mouse-following tilt controller
// ─────────────────────────────────────────────
function ShieldGroup({ isHovered, mousePos, children }: { isHovered: boolean; mousePos: React.RefObject<{x: number; y: number}>; children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const targetRotY = (mousePos.current?.x ?? 0) * 0.3;
    const targetRotX = -(mousePos.current?.y ?? 0) * 0.2;
    
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.06;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─────────────────────────────────────────────
// Camera
// ─────────────────────────────────────────────
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    camera.position.z = 5.5 + Math.sin(t * 0.1) * 0.15;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─────────────────────────────────────────────
// Full Scene
// ─────────────────────────────────────────────
function Scene({ isHovered, mousePos, floatingParticleCount }: { isHovered: boolean; mousePos: React.RefObject<{x: number; y: number}>; floatingParticleCount: number }) {
  return (
    <>
      <CameraRig />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#e0e7ff" castShadow />
      <pointLight position={[-4, 3, 4]} intensity={0.6} color="#3b82f6" distance={15} />
      <pointLight position={[4, -2, 3]} intensity={0.4} color="#60a5fa" distance={12} />
      <spotLight position={[0, 5, 4]} angle={0.35} penumbra={0.9} intensity={0.9} color="#dbeafe" castShadow />
      <pointLight position={[0, 0, -4]} intensity={0.4} color="#1d4ed8" distance={10} />

      <Environment preset="city" />
      <FloatingParticles count={floatingParticleCount} />

      <ShieldGroup isHovered={isHovered} mousePos={mousePos}>
        <ShieldBody isHovered={isHovered} />
        <CheckmarkIcon isHovered={isHovered} />
        <EnergyRing isHovered={isHovered} />
        <EnergyRing2 isHovered={isHovered} />
      </ShieldGroup>

      <ContactShadows position={[0, -2.2, 0]} opacity={0.35} scale={8} blur={2.5} far={5} color="#1e3a5f" />
    </>
  );
}

// ─────────────────────────────────────────────
// CSS Fallback for mobile / low-end devices
// ─────────────────────────────────────────────
function ShieldFallback() {
  return (
    <div
      className="relative w-full aspect-video xl:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-navy-900/10 flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0f172a 0%, #050810 100%)' }}
    >
      {/* Animated glow rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-56 h-56 rounded-full border border-blue-400/10 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      </div>
      
      {/* Shield icon */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <ShieldCheck className="w-10 h-10 text-blue-400" />
        </div>
        <div className="px-5 py-2 rounded-full backdrop-blur-md border bg-white/[0.03] border-white/[0.08] text-white/40 flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-xs font-semibold tracking-[0.15em] uppercase">Enterprise Shield</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────
export default function InteractiveLockParticle() {
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const { isMobile, isTablet, isLowEnd, particleScale, prefersReducedMotion } = useDeviceCapability();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }, []);

  // On mobile or low-end with reduced motion, show CSS fallback instead of WebGL
  if (isMobile || prefersReducedMotion) {
    return <ShieldFallback />;
  }

  // Scale floating particles: tablet gets 40, desktop gets 100
  const floatingParticleCount = isTablet || isLowEnd ? 40 : 100;
  const dprRange: [number, number] = isTablet || isLowEnd ? [1, 1] : [1, 2];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative w-full aspect-video xl:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-navy-900/10 group cursor-pointer"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0f172a 0%, #050810 100%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); mousePos.current = { x: 0, y: 0 }; }}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        dpr={dprRange}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        shadows
      >
        <color attach="background" args={['#050810']} />
        <fog attach="fog" args={['#050810', 8, 18]} />
        <Scene isHovered={isHovered} mousePos={mousePos} floatingParticleCount={floatingParticleCount} />
      </Canvas>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,8,16,0.6) 100%)'
      }} />

      {/* Status badge */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center pointer-events-none z-10">
        <div className={`px-5 py-2 rounded-full backdrop-blur-md border transition-all duration-500 flex items-center gap-2.5 ${
          isHovered
            ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
            : 'bg-white/[0.03] border-white/[0.08] text-white/40'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
            isHovered
              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]'
              : 'bg-white/20'
          }`} />
          <span className="text-xs font-semibold tracking-[0.15em] uppercase">
            {isHovered ? 'Protected' : 'Enterprise Shield'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
