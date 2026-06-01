"use client";

import { useMemo } from "react";
import * as THREE from "three";

// ─── Helix geometry constants ──────────────────────────────────
const R = 2.5;                    // Strand orbit radius
const PITCH = 1.2;                // Vertical rise per radian
const T_MAX = 8 * Math.PI;       // Total angular sweep (4 full turns)
const TUBE_RADIUS = 0.09;        // Strand tube thickness (thicker for cinematic presence)
const RUNG_SPACING = 0.6;        // Vertical gap between rungs
const RUNG_RADIUS = 0.04;        // Rung cylinder radius (thicker for visibility)
const NODE_SPACING = 8;           // Decorative sphere spacing (more frequent)

// ─── Color palette ─────────────────────────────────────────────
const HELIX_COLOR = "#C7A23A";           // Refined gold — material body
const HELIX_EMISSIVE = "#EFDBA0";        // Champagne — gradient highlight under bloom
const NODE_COLOR = "#FFD866";            // Bright gold for nodes
const NODE_EMISSIVE = "#FFE4A0";         // Warm champagne for node glow
const RUNG_COLOR = "#B89030";            // Slightly deeper gold for rungs
const RUNG_EMISSIVE = "#E0C878";         // Warm mid-tone for rung bloom

// Centers the helix at y=0: t=0..8π maps y=0..~30, offset by half
const Y_OFFSET = (T_MAX * PITCH) / 2;

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
  for (const phase of [0, Math.PI]) {
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

// Build tiny accent spheres at each rung-strand junction point
interface JunctionData {
  position: [number, number, number];
}

function buildJunctionData(): JunctionData[] {
  const junctions: JunctionData[] = [];
  for (let y = -Y_OFFSET; y <= Y_OFFSET; y += RUNG_SPACING) {
    const t = (y + Y_OFFSET) / PITCH;
    if (t < 0 || t > T_MAX) continue;
    // Two junctions per rung — one on each strand
    junctions.push({
      position: [R * Math.cos(t), y, R * Math.sin(t)],
    });
    junctions.push({
      position: [R * Math.cos(t + Math.PI), y, R * Math.sin(t + Math.PI)],
    });
  }
  return junctions;
}

interface DNAHelixProps {
  segments?: number;
}

export default function DNAHelix({ segments = 400 }: DNAHelixProps) {
  const {
    strandAGeo, strandBGeo, rungBaseGeo, helixMat, nodeMat, rungMat,
    junctionMat, rungs, nodes, junctions,
  } = useMemo(() => {
    // ── Premium gold material — high metalness for cinematic reflections ──
    const mat = new THREE.MeshStandardMaterial({
      color: HELIX_COLOR,
      emissive: HELIX_EMISSIVE,
      emissiveIntensity: 0.7,
      metalness: 0.82,
      roughness: 0.12,
    });

    // ── Rung material — slightly deeper gold for visual separation ──
    const rMat = new THREE.MeshStandardMaterial({
      color: RUNG_COLOR,
      emissive: RUNG_EMISSIVE,
      emissiveIntensity: 0.55,
      metalness: 0.75,
      roughness: 0.2,
    });

    // ── Decorative node material — high sparkle for bloom catch ──
    const nMat = new THREE.MeshStandardMaterial({
      color: NODE_COLOR,
      emissive: NODE_EMISSIVE,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.08,
    });

    // ── Junction accent material — brightest gold for rung-strand intersections ──
    const jMat = new THREE.MeshStandardMaterial({
      color: "#FFE088",
      emissive: "#FFF0C0",
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.1,
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
    const rungBase = new THREE.CylinderGeometry(RUNG_RADIUS, RUNG_RADIUS, 1, 6, 1);

    return {
      strandAGeo: geoA,
      strandBGeo: geoB,
      rungBaseGeo: rungBase,
      helixMat: mat,
      nodeMat: nMat,
      rungMat: rMat,
      junctionMat: jMat,
      rungs: buildRungData(),
      nodes: buildNodeData(segments),
      junctions: buildJunctionData(),
    };
  }, [segments]);

  return (
    <group>
      {/* Double helix strands */}
      <mesh geometry={strandAGeo} material={helixMat} />
      <mesh geometry={strandBGeo} material={helixMat} />

      {/* Ladder rungs connecting strands */}
      {rungs.map((rung, i) => (
        <mesh
          key={`rung-${i}`}
          geometry={rungBaseGeo}
          material={rungMat}
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
          <sphereGeometry args={[0.065, 12, 12]} />
          <primitive object={nodeMat} attach="material" />
        </mesh>
      ))}

      {/* Junction accents — tiny bright spheres at rung-strand meeting points */}
      {junctions.map((j, i) => (
        <mesh
          key={`junc-${i}`}
          position={j.position}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <primitive object={junctionMat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
