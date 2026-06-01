"use client";

import { ExperienceProvider, useExperienceStore } from "@/hooks/useExperienceStoreImpl";

import { Suspense, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SceneLighting from "./SceneLighting";
import DNAHelix from "./DNAHelix";
import DiamondRing from "./DiamondRing";
import Particles from "./Particles";
import { DIAMOND_IMAGES } from "./diamonds.config";
import { progressToCamIndex, diamondY } from "./helixMotion";

// Chapter mapping for ExperienceStore — each diamond maps to a narrative chapter
const DIAMOND_CHAPTERS: Array<"compliance" | "automation" | "growth" | "operations"> = [
  "operations", // 0 — Logo beacon
  "automation", // 1 — Excel/WhatsApp
  "automation", // 2 — Manual workflow
  "automation", // 3 — Missed calls after 6 PM
  "operations",  // 4 — Commission disputes
  "growth",      // 5 — Month-old reports
  "compliance",  // 6 — AED 150K filing
  "operations",  // 7 — Tired of consultants
];

// Preload all 8 textures at module level — no pop-in when diamonds mount
useTexture.preload(DIAMOND_IMAGES);

interface SceneProps {
  scrollProgressRef: React.RefObject<number>;
  activeIndex: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  particleCount: number;
  diamondSize: number;
  strandSegments: number;
  scrollVelocityRef: React.RefObject<number>;
}

/**
 * Inner scene content — must be rendered inside ExperienceProvider so it can
 * dispatch active-diamond state to the shared store (used by SceneLighting).
 */
function SceneContent({
  scrollProgressRef,
  activeIndex,
  mouseRef,
  reducedMotion,
  particleCount,
  diamondSize,
  strandSegments,
  scrollVelocityRef,
}: SceneProps) {
  const outerGroupRef = useRef<THREE.Group>(null!);
  const [, dispatch] = useExperienceStore();
  const prevActiveRef = useRef(-1);

  // Sync active diamond to ExperienceStore — only dispatches on change
  useEffect(() => {
    const rounded = Math.round(activeIndex);
    if (rounded !== prevActiveRef.current && rounded >= 0 && rounded < 8) {
      prevActiveRef.current = rounded;
      dispatch({
        type: "SET_ACTIVE",
        id: String(rounded),
        chapter: DIAMOND_CHAPTERS[rounded],
      });
    }
  }, [activeIndex, dispatch]);

  useFrame((state, delta) => {
    // Camera + helix rotation are PURE functions of scroll progress, so the
    // scene reverses frame-for-frame. Smoothness comes from Lenis-smoothed
    // `progress`, not from per-frame damping. (See helixMotion.ts.)
    const progress = scrollProgressRef.current ?? 0;

    // Camera rides the helix axis, dwelling on each diamond. Z = 7.5 keeps the
    // active diamond surface filling the frame without losing the helix.
    const camIndex = progressToCamIndex(progress);
    const camY = diamondY(camIndex);
    state.camera.position.set(0, camY + 0.5, 7.5);
    state.camera.lookAt(0, camY, 0);

    if (outerGroupRef.current) {
      // One full scroll-driven revolution — deterministic in progress. The old
      // free-running idle auto-spin was a time accumulator that made the same
      // progress render differently each pass and broke reverse scrubbing.
      outerGroupRef.current.rotation.y = progress * Math.PI * 2;

      // Mouse parallax: subtle tilt. Interactive and self-resetting (0 when the
      // pointer is still) — orthogonal to scroll, doesn't affect reversibility.
      if (!reducedMotion && mouseRef?.current) {
        outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          outerGroupRef.current.rotation.x,
          mouseRef.current.y * 0.05,
          delta * 3
        );
        outerGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          outerGroupRef.current.rotation.z,
          -mouseRef.current.x * 0.03,
          delta * 3
        );
      }
    }
  });

  return (
    <>
      <SceneLighting />

      {/* Single rotation group — helix and diamonds share the same parent so they
          rotate in lockstep. RotatingSpine removed: it was spinning the helix alone
          at a different rate, visually decoupling it from the diamond positions. */}
      <group ref={outerGroupRef}>
        <DNAHelix segments={strandSegments} />
        <Suspense fallback={null}>
          <DiamondRing
            scrollProgressRef={scrollProgressRef}
            diamondSize={diamondSize}
          />
        </Suspense>
        <Particles
          count={particleCount}
          reduced={reducedMotion}
          scrollVelocityRef={scrollVelocityRef}
        />
      </group>

      <EffectComposer>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.32}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function Scene(props: SceneProps) {
  return (
    <ExperienceProvider>
      <SceneContent {...props} />
    </ExperienceProvider>
  );
}
