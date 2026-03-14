"use client";

import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────
// Shield shape path
// ─────────────────────────────────────────────
function createShieldShape() {
  const s = new THREE.Shape();
  // Classic shield silhouette
  s.moveTo(0, 1.6);
  // Top-left curve
  s.bezierCurveTo(-0.2, 1.58, -0.8, 1.5, -1.2, 1.3);
  // Left shoulder
  s.bezierCurveTo(-1.4, 1.2, -1.5, 1.0, -1.5, 0.8);
  // Left side curve down
  s.bezierCurveTo(-1.5, 0.3, -1.4, -0.2, -1.2, -0.6);
  // Bottom-left taper
  s.bezierCurveTo(-0.9, -1.1, -0.5, -1.5, 0, -1.8);
  // Bottom-right taper (mirror)
  s.bezierCurveTo(0.5, -1.5, 0.9, -1.1, 1.2, -0.6);
  // Right side curve up
  s.bezierCurveTo(1.4, -0.2, 1.5, 0.3, 1.5, 0.8);
  // Right shoulder
  s.bezierCurveTo(1.5, 1.0, 1.4, 1.2, 1.2, 1.3);
  // Top-right curve
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

  // Inner shield shape (smaller for the face detail)
  const innerShape = useMemo(() => {
    const s = new THREE.Shape();
    const sc = 0.75; // Scale down
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

  // Animate glow intensity
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
      {/* Glow halo behind shield */}
      <mesh ref={glowRef} position={[0, 0, -0.3]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Main shield body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.92}
          roughness={0.15}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Inner face plate (slightly raised) */}
      <mesh position={[0, 0, 0.43]} castShadow>
        <extrudeGeometry args={[innerShape, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4, curveSegments: 32 }]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Edge accent - thin bright ring */}
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
// Checkmark Icon (embossed on shield face)
// ─────────────────────────────────────────────
function CheckmarkIcon({ isHovered }: { isHovered: boolean }) {
  const ref = useRef<THREE.Group>(null);

  const checkShape = useMemo(() => {
    const s = new THREE.Shape();
    const t = 0.12; // thickness
    // Checkmark path (thick stroke)
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
      // Gentle pulse
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
// Energy Ring (orbiting shield on hover)
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
// Floating particles
// ─────────────────────────────────────────────
function Particles({ count = 100 }: { count?: number }) {
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
    
    // Mouse-reactive tilt
    const targetRotY = (mousePos.current?.x ?? 0) * 0.3;
    const targetRotX = -(mousePos.current?.y ?? 0) * 0.2;
    
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    
    // Gentle float
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
function Scene({ isHovered, mousePos }: { isHovered: boolean; mousePos: React.RefObject<{x: number; y: number}> }) {
  return (
    <>
      <CameraRig />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#e0e7ff" castShadow />
      <pointLight position={[-4, 3, 4]} intensity={0.6} color="#3b82f6" distance={15} />
      <pointLight position={[4, -2, 3]} intensity={0.4} color="#60a5fa" distance={12} />
      <spotLight position={[0, 5, 4]} angle={0.35} penumbra={0.9} intensity={0.9} color="#dbeafe" castShadow />
      {/* Rim light */}
      <pointLight position={[0, 0, -4]} intensity={0.4} color="#1d4ed8" distance={10} />

      <Environment preset="city" />
      <Particles />

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
// Export
// ─────────────────────────────────────────────
export default function InteractiveLockParticle() {
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1, // -1 to 1
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }, []);

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
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        shadows
      >
        <color attach="background" args={['#050810']} />
        <fog attach="fog" args={['#050810', 8, 18]} />
        <Scene isHovered={isHovered} mousePos={mousePos} />
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
