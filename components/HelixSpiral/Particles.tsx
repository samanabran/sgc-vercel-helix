"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Layer {
  positions: Float32Array;
  velY: Float32Array;
  velX: Float32Array;
  velZ: Float32Array;
  sizes: Float32Array;
  opacities: Float32Array;
}

function buildLayer(
  count: number,
  radiusXZ: number,
  height: number,
  speedMul: number,
  sizeRange: [number, number],
  opacityRange: [number, number],
): Layer {
  const positions = new Float32Array(count * 3);
  const velY = new Float32Array(count);
  const velX = new Float32Array(count);
  const velZ = new Float32Array(count);
  const sizes = new Float32Array(count);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radiusXZ; // sqrt for uniform disk distribution
    positions[i * 3 + 0] = r * Math.cos(angle);
    positions[i * 3 + 1] = (Math.random() - 0.5) * height;
    positions[i * 3 + 2] = r * Math.sin(angle);
    velY[i] = -(Math.random() * 0.4 + 0.1) * speedMul;
    velX[i] = (Math.random() - 0.5) * 1.5;
    velZ[i] = (Math.random() - 0.5) * 1.5;
    sizes[i] = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    opacities[i] = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
  }
  return { positions, velY, velX, velZ, sizes, opacities };
}

interface ParticlesProps {
  count?: number;
  reduced?: boolean;
  scrollVelocityRef?: React.RefObject<number>;
}

export default function Particles({ count = 500, reduced = false, scrollVelocityRef }: ParticlesProps) {
  const fgRef = useRef<THREE.BufferAttribute>(null!);
  const mgRef = useRef<THREE.BufferAttribute>(null!);
  const bgRef = useRef<THREE.BufferAttribute>(null!);
  const dustRef = useRef<THREE.BufferAttribute>(null!);

  // ── Four-layer particle system for cinematic depth ───────────
  const fgCount = Math.floor(count * 0.10);   // foreground: near helix, large, slow
  const mgCount = Math.floor(count * 0.40);   // midground: medium spread
  const bgCount = Math.floor(count * 0.30);   // background: wide, small
  const dustCount = count - fgCount - mgCount - bgCount; // ambient dust: very fine, wide

  const { fg, mg, bg, dust } = useMemo(() => ({
    fg: buildLayer(fgCount, 4, 14, 0.45, [0.12, 0.20], [0.50, 0.70]),
    mg: buildLayer(mgCount, 7, 16, 1.0,  [0.06, 0.12], [0.40, 0.60]),
    bg: buildLayer(bgCount, 12, 20, 0.65, [0.03, 0.07], [0.30, 0.50]),
    dust: buildLayer(dustCount, 16, 24, 0.3, [0.015, 0.04], [0.15, 0.35]),
  }), [fgCount, mgCount, bgCount, dustCount]);

  useFrame((_, delta) => {
    if (reduced) return;
    const dt = Math.min(delta, 0.05);
    const sweep = Math.min((scrollVelocityRef?.current ?? 0) * 800, 3.0);
    const BOUND_XZ = 17;
    const BOUND_Y_FG = 7;
    const BOUND_Y_BG = 12;

    const tick = (layer: Layer, attr: THREE.BufferAttribute | null, n: number, boundY: number) => {
      if (!attr) return;
      const p = layer.positions;
      for (let i = 0; i < n; i++) {
        const i3 = i * 3;
        p[i3 + 1] += layer.velY[i] * dt;
        p[i3 + 0] += layer.velX[i] * sweep * dt;
        p[i3 + 2] += layer.velZ[i] * sweep * dt;
        if (p[i3 + 1] < -boundY) p[i3 + 1] = boundY;
        if (p[i3 + 0] > BOUND_XZ) p[i3 + 0] = -BOUND_XZ;
        else if (p[i3 + 0] < -BOUND_XZ) p[i3 + 0] = BOUND_XZ;
        if (p[i3 + 2] > BOUND_XZ) p[i3 + 2] = -BOUND_XZ;
        else if (p[i3 + 2] < -BOUND_XZ) p[i3 + 2] = BOUND_XZ;
      }
      attr.needsUpdate = true;
    };

    tick(fg, fgRef.current, fgCount, BOUND_Y_FG);
    tick(mg, mgRef.current, mgCount, BOUND_Y_BG);
    tick(bg, bgRef.current, bgCount, BOUND_Y_BG);
    tick(dust, dustRef.current, dustCount, BOUND_Y_BG);
  });

  if (reduced) return null;

  return (
    <group>
      {/* Foreground: champagne, large, near the helix — closest sparkle */}
      <points>
        <bufferGeometry>
          <bufferAttribute ref={fgRef} attach="attributes-position" args={[fg.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#EFDBA0"
          size={0.16}
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Midground: refined-gold, standard distribution — primary sparkle layer */}
      <points>
        <bufferGeometry>
          <bufferAttribute ref={mgRef} attach="attributes-position" args={[mg.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#C7A23A"
          size={0.09}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Background: antique-bronze, small, wide spread — depth haze */}
      <points>
        <bufferGeometry>
          <bufferAttribute ref={bgRef} attach="attributes-position" args={[bg.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#8A6A1E"
          size={0.05}
          transparent
          opacity={0.42}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient dust: very fine, wide spread — atmospheric haze / gold fog */}
      <points>
        <bufferGeometry>
          <bufferAttribute ref={dustRef} attach="attributes-position" args={[dust.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#D4A844"
          size={0.028}
          transparent
          opacity={0.25}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
