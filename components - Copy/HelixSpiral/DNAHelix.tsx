"use client";

import { useMemo } from "react";
import * as THREE from "three";

const R = 2.5;
const PITCH = 1.2;
const T_MAX = 8 * Math.PI;
const TUBE_RADIUS = 0.06;
const RUNG_SPACING = 0.6;
const HELIX_COLOR = "#C7A23A"; // refined-gold — material body
const HELIX_EMISSIVE = "#EFDBA0"; // champagne — gradient highlight under bloom
// Centers the helix at y=0: t=0..8π maps y=0..~30, offset by half
const Y_OFFSET = (T_MAX * PITCH) / 2;
// Decorative node spheres: every Nth strand point gets a gold sphere
const NODE_SPACING = 10;

function buildStrandPoints(phase: number, segments: number): THREE.Vector3[] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const t = (i / segments) * T_MAX;
    return new THREE.Vector3(
      R * Math.cos(t + phase),
      t * PITCH - Y_OFFSET,
      R * Math.sin(t + phase)
    );
  });
}

interface RungData {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  length: number;
}

function buildRungData(): RungData[] {
  const rungs: RungData[] = [];
  const up = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion();
  for (let y = -Y_OFFSET; y <= Y_OFFSET; y += RUNG_SPACING) {
    const t = (y + Y_OFFSET) / PITCH;
    if (t < 0 || t > T_MAX) continue;
    const pA = new THREE.Vector3(R * Math.cos(t), y, R * Math.sin(t));
    const pB = new THREE.Vector3(R * Math.cos(t + Math.PI), y, R * Math.sin(t + Math.PI));
    const dir = new THREE.Vector3().subVectors(pB, pA).normalize();
    q.setFromUnitVectors(up, dir);
    const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
    rungs.push({
      position: [mid.x, mid.y, mid.z],
      quaternion: [q.x, q.y, q.z, q.w],
      length: pA.distanceTo(pB),
    });
  }
  return rungs;
}

// Build positions for decorative sphere nodes along both strands
interface NodeData {
  position: [number, number, number];
}

function buildNodeData(segments: number): NodeData[] {
  const nodes: NodeData[] = [];
  for (let phase of [0, Math.PI]) {
    for (let i = 0; i <= segments; i += NODE_SPACING) {
      const t = (i / segments) * T_MAX;
      const x = R * Math.cos(t + phase);
      const y = t * PITCH - Y_OFFSET;
      const z = R * Math.sin(t + phase);
      nodes.push({ position: [x, y, z] });
    }
  }
  return nodes;
}

interface DNAHelixProps {
  segments?: number;
}

export default function DNAHelix({ segments = 400 }: DNAHelixProps) {
  const { strandAGeo, strandBGeo, rungBaseGeo, helixMat, nodeMat, rungs, nodes } = useMemo(() => {
    // Premium gold material — high metalness for metallic reflections under bloom
    const mat = new THREE.MeshStandardMaterial({
      color: HELIX_COLOR,
      emissive: HELIX_EMISSIVE,
      emissiveIntensity: 0.65,
      metalness: 0.72,
      roughness: 0.18,
    });

    // Decorative node material — even more metallic for sparkle
    const nMat = new THREE.MeshStandardMaterial({
      color: "#FFCC55",
      emissive: "#EFDBA0",
      emissiveIntensity: 0.4,
      metalness: 0.92,
      roughness: 0.15,
    });

    const geoA = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(buildStrandPoints(0, segments)),
      segments,
      TUBE_RADIUS,
      8,
      false
    );
    const geoB = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(buildStrandPoints(Math.PI, segments)),
      segments,
      TUBE_RADIUS,
      8,
      false
    );
    // Unit cylinder, height=1, scaled per-rung
    const rungBase = new THREE.CylinderGeometry(0.03, 0.03, 1, 6, 1);

    return {
      strandAGeo: geoA,
      strandBGeo: geoB,
      rungBaseGeo: rungBase,
      helixMat: mat,
      nodeMat: nMat,
      rungs: buildRungData(),
      nodes: buildNodeData(segments),
    };
  }, [segments]);

  return (
    <group>
      <mesh geometry={strandAGeo} material={helixMat} />
      <mesh geometry={strandBGeo} material={helixMat} />
      {rungs.map((rung, i) => (
        <mesh
          key={`rung-${i}`}
          geometry={rungBaseGeo}
          material={helixMat}
          position={rung.position}
          quaternion={rung.quaternion}
          scale={[1, rung.length, 1]}
        />
      ))}
      {/* Decorative sphere nodes on strand points — luxury detail that catches bloom */}
      {nodes.map((node, i) => (
        <mesh
          key={`node-${i}`}
          position={node.position}
        >
          <sphereGeometry args={[0.055, 10, 10]} />
          <primitive object={nodeMat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
