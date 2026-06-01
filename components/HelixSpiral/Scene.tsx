"use client";

import { ExperienceProvider, useExperienceStore } from "@/hooks/useExperienceStoreImpl";

import { Suspense, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import SceneLighting from "./SceneLighting";
import DNAHelix from "./DNAHelix";
import DiamondRing from "./DiamondRing";
import Particles from "./Particles";
import { DIAMOND_IMAGES } from "./diamonds.config";
import { getCameraState, getHelixRotation, getBloomIntensity, progressToCamIndex, diamondY } from "./helixMotion";

// Chapter mapping for ExperienceStore — each diamond maps to a narrative chapter
const DIAMOND_CHAPTERS: Array<"compliance" | "automation" | "growth" | "operations"> = [
  "operations",  // 0 — Logo beacon
  "automation",  // 1 — Excel/WhatsApp
  "automation",  // 2 — Manual workflow
  "automation",  // 3 — Missed calls after 6 PM
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
  const { camera } = useThree();

  // Track bloom intensity for smooth transitions
  const bloomIntensityRef = useRef(0.7);

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
    const progress = scrollProgressRef.current ?? 0;

    // ── Cinematic camera from helixMotion ──────────────────────
    const camState = getCameraState(progress);

    // Smoothly interpolate camera position for buttery transitions
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      camState.position[0],
      delta * 4
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      camState.position[1],
      delta * 4
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      camState.position[2],
      delta * 4
    );

    // FOV zoom — smooth interpolation for cinematic feel
    if ((state.camera as THREE.PerspectiveCamera).fov !== undefined) {
      const perspCam = state.camera as THREE.PerspectiveCamera;
      perspCam.fov = THREE.MathUtils.lerp(perspCam.fov, camState.fov, delta * 3);
      perspCam.updateProjectionMatrix();
    }

    // Look-at target
    const lookTarget = new THREE.Vector3(
      camState.lookAt[0],
      camState.lookAt[1],
      camState.lookAt[2]
    );
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    const targetDir = lookTarget.clone().sub(state.camera.position).normalize();
    currentLookAt.lerp(targetDir, delta * 5);
    state.camera.lookAt(
      state.camera.position.x + currentLookAt.x,
      state.camera.position.y + currentLookAt.y,
      state.camera.position.z + currentLookAt.z
    );

    // ── Helix rotation — scroll-driven choreography ────────────
    if (outerGroupRef.current) {
      const targetRotY = getHelixRotation(progress);
      outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.y,
        targetRotY,
        delta * 4
      );

      // Mouse parallax: subtle tilt. Interactive and self-resetting
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

    // ── Dynamic bloom intensity ────────────────────────────────
    bloomIntensityRef.current = THREE.MathUtils.lerp(
      bloomIntensityRef.current,
      getBloomIntensity(progress),
      delta * 2
    );
  });

  return (
    <>
      <SceneLighting />

      {/* Subtle gold grid floor — faint reflection for depth grounding */}
      <gridHelper
        args={[24, 24, 0xFFAA33, 0x332211]}
        position={[0, -6, 0]}
        rotation={[0, 0, 0]}
      >
        <meshBasicMaterial attach="material" transparent opacity={0.08} />
      </gridHelper>

      {/* Single rotation group — helix and diamonds share the same parent so they
          rotate in lockstep. */}
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

      {/* Bloom post-processing — luxurious gold glow on emissive surfaces */}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensityRef.current}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette
          offset={0.3}
          darkness={0.7}
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
