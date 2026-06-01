"use client";

import { useExperienceStore } from "@/hooks/useExperienceStoreImpl";

export default function SceneLighting() {
  const [{ activeDiamondId }] = useExperienceStore();

  return (
    <>
      {/* Ambient cool fill — subtle base visibility */}
      <ambientLight color="#0E1220" intensity={1.2} />

      {/* Key warm light (gold) — primary illumination from upper-right */}
      <directionalLight
        color="#FFCC66"
        intensity={0.8}
        position={[2, 8, 5]}
      />

      {/* Fill light — warm side fill from left */}
      <directionalLight
        color="#F4ECD8"
        intensity={0.3}
        position={[-3, 4, 3]}
      />

      {/* Cool-blue rim light — cinematic contrast on back-left */}
      <pointLight
        color="#3366AA"
        intensity={0.6}
        position={[-5, 1, -4]}
        distance={18}
      />

      {/* Back rim gold — warm back-separation */}
      <pointLight
        color="#FFAA33"
        intensity={0.8}
        position={[0, 2, -6]}
        distance={16}
      />

      {/* Left fill — champagne glow for helix surface */}
      <pointLight
        color="#EFDBA0"
        intensity={1.0}
        position={[-7, 0, 2]}
        distance={16}
      />

      {/* Right fill — copper warmth for depth balance */}
      <pointLight
        color="#B57A44"
        intensity={0.5}
        position={[7, 0, 2]}
        distance={16}
      />

      {/* Near-camera gold fill — subtle sparkle on front-facing geometry */}
      <pointLight
        color="#CCAA44"
        intensity={0.35}
        position={[1.5, 0.5, 6]}
        distance={10}
      />

      {/* Active diamond spotlight — focused highlight on the active zone */}
      {activeDiamondId && (
        <spotLight
          color="#fffae5"
          intensity={2.2}
          angle={0.3}
          penumbra={0.5}
          position={[0, 0, 5] as [number, number, number]}
          distance={10}
        />
      )}
    </>
  );
}
