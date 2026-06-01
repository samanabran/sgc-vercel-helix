"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "@/components/HelixSpiral/Scene";

interface HelixCanvasProps {
  scrollProgressRef: React.RefObject<number>;
  activeIndex: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  particleCount: number;
  diamondSize: number;
  strandSegments: number;
  scrollVelocityRef: React.RefObject<number>;
}

function PulsingDot() {
  return (
    <mesh>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshBasicMaterial color="#C7A23A" />
    </mesh>
  );
}

export default function HelixCanvas({
  scrollProgressRef,
  activeIndex,
  mouseRef,
  reducedMotion,
  particleCount,
  diamondSize,
  strandSegments,
  scrollVelocityRef,
}: HelixCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2, 16], fov: 42 }}
      gl={{
        toneMapping: 4,           // ReinhardToneMapping
        toneMappingExposure: 1.2,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#080B11", width: "100%", height: "100%" }}
    >
      {/* Deep fog — fades distant geometry into cinematic vault-dark */}
      <fog attach="fog" args={["#080B11", 10, 30]} />
      <Suspense fallback={<PulsingDot />}>
        <Scene
          scrollProgressRef={scrollProgressRef}
          activeIndex={activeIndex}
          mouseRef={mouseRef}
          reducedMotion={reducedMotion}
          particleCount={particleCount}
          diamondSize={diamondSize}
          strandSegments={strandSegments}
          scrollVelocityRef={scrollVelocityRef}
        />
      </Suspense>
    </Canvas>
  );
}
