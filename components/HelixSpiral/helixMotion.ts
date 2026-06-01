import * as THREE from "three";

// ────────────────────────────────────────────────────────────────
//  Cinematic Helix Motion — scroll-driven camera choreography
//
//  Every value is a PURE, deterministic function of scroll progress (0..1).
//  The same progress always yields the same camera / diamond state, so the
//  scene reverses frame-for-frame.  Smoothness comes from Lenis-smoothed
//  `progress`, not per-frame damping.
//
//  Camera choreography phases:
//    WIDE   (0–12%)  — establishing shot, helix visible in full, camera far
//    PUSH   (12–22%) — dramatic push-in toward the helix
//    RIDE   (22–78%) — camera travels along the helix axis, dwelling on each
//                       diamond with zoom emphasis and subtle FOV shifts
//    MACRO  (78–88%) — close-up reveal on final diamonds
//    RETREAT(88–100%)— camera pulls back to a wide final tableau
// ────────────────────────────────────────────────────────────────

export const DIAMOND_COUNT = 8;

// Y position of diamond i (and the camera height when centred on it).
export const diamondY = (i: number) => (i - (DIAMOND_COUNT - 1) / 2) * 1.5;

// ─── Phase boundaries ──────────────────────────────────────────
const PHASE_WIDE_END    = 0.12;
const PHASE_PUSH_END    = 0.22;
const PHASE_RIDE_END    = 0.78;
const PHASE_MACRO_END   = 0.88;
// After MACRO → RETREAT through progress=1

// ─── Camera keyframes per phase ────────────────────────────────
// Each keyframe: { position: [x,y,z], fov, lookAtOffset: [x,y,z] }
// lookAtOffset is relative to the "base" lookAt on the helix axis.

interface CamKeyframe {
  pos: [number, number, number];
  fov: number;
  lookOffset: [number, number, number];
}

const CAM_WIDE: CamKeyframe = {
  pos: [0, 2, 16],
  fov: 42,
  lookOffset: [0, 0, 0],
};

const CAM_PUSH_START: CamKeyframe = {
  pos: [0, 1, 12],
  fov: 44,
  lookOffset: [0, 0, 0],
};

const CAM_PUSH_END: CamKeyframe = {
  pos: [1.5, diamondY(0) + 0.5, 7.5],
  fov: 50,
  lookOffset: [0, 0, 0],
};

const CAM_RIDE: CamKeyframe = {
  pos: [0, 0, 7.5],  // y is dynamically computed
  fov: 50,
  lookOffset: [0, 0, 0],
};

const CAM_MACRO: CamKeyframe = {
  pos: [1.8, diamondY(7) + 0.8, 4.5],
  fov: 58,
  lookOffset: [0, 0.3, 0],
};

const CAM_RETREAT: CamKeyframe = {
  pos: [0, 2, 18],
  fov: 40,
  lookOffset: [0, 0, 0],
};

// ─── Helper: smoothstep & phase lerp ──────────────────────────

function smoothstep(x: number): number {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

function lerpKF(a: CamKeyframe, b: CamKeyframe, t: number): CamKeyframe {
  const lt = smoothstep(t);
  return {
    pos: [
      THREE.MathUtils.lerp(a.pos[0], b.pos[0], lt),
      THREE.MathUtils.lerp(a.pos[1], b.pos[1], lt),
      THREE.MathUtils.lerp(a.pos[2], b.pos[2], lt),
    ],
    fov: THREE.MathUtils.lerp(a.fov, b.fov, lt),
    lookOffset: [
      THREE.MathUtils.lerp(a.lookOffset[0], b.lookOffset[0], lt),
      THREE.MathUtils.lerp(a.lookOffset[1], b.lookOffset[1], lt),
      THREE.MathUtils.lerp(a.lookOffset[2], b.lookOffset[2], lt),
    ],
  };
}

// ─── Camera state from progress ────────────────────────────────

export interface CameraState {
  position: [number, number, number];
  fov: number;
  lookAt: [number, number, number];
}

export function getCameraState(progress: number): CameraState {
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  let kf: CamKeyframe;
  let baseY = 0;

  if (p <= PHASE_WIDE_END) {
    // WIDE: hold establishing shot with a very subtle drift
    const t = p / PHASE_WIDE_END;
    kf = lerpKF(CAM_WIDE, CAM_PUSH_START, t * 0.3); // subtle drift, mostly static
    baseY = 0;
  } else if (p <= PHASE_PUSH_END) {
    // PUSH: dramatic zoom from wide to first diamond
    const t = (p - PHASE_WIDE_END) / (PHASE_PUSH_END - PHASE_WIDE_END);
    kf = lerpKF(CAM_PUSH_START, CAM_PUSH_END, t);
    baseY = THREE.MathUtils.lerp(0, diamondY(0), t);
  } else if (p <= PHASE_RIDE_END) {
    // RIDE: camera travels along the helix axis, dwelling on each diamond
    const rideProgress = (p - PHASE_PUSH_END) / (PHASE_RIDE_END - PHASE_PUSH_END);
    const camIndex = progressToCamIndex(rideProgress);
    baseY = diamondY(camIndex);

    // Subtle FOV breathing: widen slightly between diamonds, tighten on dwell
    const segFrac = (rideProgress * (DIAMOND_COUNT - 1)) % 1;
    const fovBreath = Math.sin(segFrac * Math.PI) * 2.5; // ±2.5° breath

    // Subtle lateral sway as camera moves between diamonds
    const sway = Math.sin(rideProgress * Math.PI * 4) * 0.6;

    kf = {
      pos: [sway, baseY + 0.5, 7.5],
      fov: CAM_RIDE.fov + fovBreath,
      lookOffset: [0, 0, 0],
    };
  } else if (p <= PHASE_MACRO_END) {
    // MACRO: tight close-up on final diamonds
    const t = (p - PHASE_RIDE_END) / (PHASE_MACRO_END - PHASE_RIDE_END);
    const rideEnd = diamondY(DIAMOND_COUNT - 1);
    const fromKf: CamKeyframe = {
      pos: [0, rideEnd + 0.5, 7.5],
      fov: 50,
      lookOffset: [0, 0, 0],
    };
    kf = lerpKF(fromKf, CAM_MACRO, t);
    baseY = THREE.MathUtils.lerp(rideEnd, diamondY(DIAMOND_COUNT - 1), t);
  } else {
    // RETREAT: pull back to wide tableau
    const t = (p - PHASE_MACRO_END) / (1 - PHASE_MACRO_END);
    kf = lerpKF(CAM_MACRO, CAM_RETREAT, t);
    baseY = THREE.MathUtils.lerp(diamondY(DIAMOND_COUNT - 1), 0, t);
  }

  return {
    position: kf.pos,
    fov: kf.fov,
    lookAt: [kf.lookOffset[0], baseY + kf.lookOffset[1], kf.lookOffset[2]],
  };
}

// ─── Diamond / helix mapping ───────────────────────────────────

// Maps RIDE-phase progress (0..1) to a continuous "camera index" (0..7) that
// dwells near each diamond and eases through the gaps.
export function progressToCamIndex(progress: number): number {
  const f = THREE.MathUtils.clamp(progress, 0, 1) * (DIAMOND_COUNT - 1);
  const seg = Math.floor(f);
  const frac = f - seg;
  // Hold near `seg` for frac<0.35, ease across 0.35..0.65, hold near seg+1.
  const eased = THREE.MathUtils.smoothstep(frac, 0.35, 0.65);
  return Math.min(seg + eased, DIAMOND_COUNT - 1);
}

// 0..1 "activeness" of diamond i for the current camera index. Peaks at 1 when
// the camera is centred on it and smoothly falls to 0 by ~0.75 away.
export function diamondActiveness(camIndex: number, i: number): number {
  const t = THREE.MathUtils.clamp(1 - Math.abs(camIndex - i) / 0.75, 0, 1);
  return t * t * (3 - 2 * t); // smoothstep
}

// ─── Scroll-driven rotation for the outer group ────────────────

// Full rotation during RIDE phase only — more cinematic than constant spin.
export function getHelixRotation(progress: number): number {
  if (progress <= PHASE_PUSH_END) {
    // During WIDE+PUSH: gentle slow rotation (quarter turn)
    return progress * Math.PI * 0.5;
  } else if (progress <= PHASE_RIDE_END) {
    // During RIDE: full revolution
    const rideP = (progress - PHASE_PUSH_END) / (PHASE_RIDE_END - PHASE_PUSH_END);
    return Math.PI * 0.5 + rideP * Math.PI * 2;
  } else {
    // During MACRO+RETREAT: slow final rotation
    const endP = (progress - PHASE_RIDE_END) / (1 - PHASE_RIDE_END);
    return Math.PI * 0.5 + Math.PI * 2 + endP * Math.PI * 0.25;
  }
}

// ─── Bloom intensity keyed to camera proximity ─────────────────

export function getBloomIntensity(progress: number): number {
  const cam = getCameraState(progress);
  const dist = Math.sqrt(cam.position[0] ** 2 + cam.position[2] ** 2);
  // Closer camera → more bloom (max 1.2 at z=4.5, min 0.5 at z=18)
  return THREE.MathUtils.lerp(1.2, 0.5, (dist - 4.5) / 13.5);
}
