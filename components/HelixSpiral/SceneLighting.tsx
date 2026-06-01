"use client";

import { useExperienceStore } from "@/hooks/useExperienceStoreImpl";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cinematic lighting rig with animated spotlight that tracks the active diamond.
 * Designed for warm institutional gold-on-dark palette with dramatic contrast.
 */
export default function SceneLighting() {
  const [{ activeDiamondId }] = useExperienceStore();
  const spotRef = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);

  // Animate spotlight to track the camera's current focus zone
  useFrame((state) => {
    if (spotRef.current && targetRef.current) {
      // Spotlight follows the camera's look direction for dramatic reveal
      const camPos = state.camera.position;
      targetRef.current.position.set(camPos.x * 0.3, camPos.y, 0);
      spotRef.current.target = targetRef.current;
    }
  });

  return (
    <>
      {/* Ambient warm fill — subtle base visibility in vault-dark space */}
      <ambientLight color="#0E1220" intensity={1.4} />

      {/* Key warm light (gold) — primary illumination from upper-right */}
      <directionalLight
        color="#FFCC66"
        intensity={1.0}
        position={[2, 8, 5]}
      />

      {/* Fill light — warm side fill from left */}
      <directionalLight
        color="#F4ECD8"
        intensity={0.4}
        position={[-3, 4, 3]}
      />

      {/* Cool-blue rim light — cinematic contrast on back-left */}
      <pointLight
        color="#3366AA"
        intensity={0.6}
        position={[-5, 1, -4]}
        distance={18}
      />

      {/* Back rim gold — warm back-separation for depth */}
      <pointLight
        color="#FFAA33"
        intensity={1.0}
        position={[0, 2, -6]}
        distance={16}
      />

      {/* Left fill — champagne glow for helix surface richness */}
      <pointLight
        color="#EFDBA0"
        intensity={1.2}
        position={[-7, 0, 2]}
        distance={16}
      />

      {/* Right fill — copper warmth for depth balance */}
      <pointLight
        color="#B57A44"
        intensity={0.6}
        position={[7, 0, 2]}
        distance={16}
      />

      {/* Near-camera gold fill — sparkle on front-facing geometry */}
      <pointLight
        color="#CCAA44"
        intensity={0.45}
        position={[1.5, 0.5, 6]}
        distance={10}
      />

      {/* ── Animated tracking spotlight ────────────────────────── */}
      <spotLight
        ref={spotRef}
        color="#FFF5E0"
        intensity={activeDiamondId ? 3.0 : 1.5}
        angle={0.35}
        penumbra={0.6}
        position={[0, 3, 6]}
        distance={14}
        decay={2}
      />
      <object3D ref={targetRef} />

      {/* ── Volumetric glow lights (simulated) ─────────────────── */}

      {/* Top-down god-ray — subtle golden wash from above */}
      <pointLight
        color="#FFD866"
        intensity={0.4}
        position={[0, 12, 0]}
        distance={25}
      />

      {/* Bottom-up warmth — subtle copper under-glow for grounding */}
      <pointLight
        color="#8B5E2B"
        intensity={0.3}
        position={[0, -8, 2]}
        distance={16}
      />
    </>
  );
}
