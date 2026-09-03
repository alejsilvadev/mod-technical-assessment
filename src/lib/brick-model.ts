export type BrickPiece = {
  id: string;
  shape?: "box" | "cylinder" | "sphere";
  /** box: [width, height, depth]. cylinder: [bottom diameter, height, unused]. sphere: [diameterX, diameterY, diameterZ]. */
  size: [number, number, number];
  color: string;
  assembledPosition: [number, number, number];
  rotation: [number, number, number];
  studs?: boolean;
  transparent?: boolean;
  opacity?: number;
  /** cylinder only: ratio of top radius to bottom radius. 1 = uniform cylinder, 0 = a point (cone). Defaults to 1. */
  taper?: number;
};

const BODY_GRAY = "#b8b8b8";
const ACCENT_GRAY = "#eeeeee";
const DARK_GRAY = "#3d3d3d";
const DETAIL_GRAY = "#8c8c8c";
const LIGHT_GRAY = "#f0f0f0";

export const PIECES: BrickPiece[] = [
  // booster stage: body, base skirt ring, mid band, 4 tail fins, 4 engine bells
  { id: "booster-body", shape: "cylinder", size: [1.8, 2.0, 1.8], color: BODY_GRAY, assembledPosition: [0, 1.0, 0], rotation: [0, 0, 0] },
  { id: "booster-base-ring", shape: "cylinder", size: [1.9, 0.15, 1.9], color: DETAIL_GRAY, assembledPosition: [0, 0.075, 0], rotation: [0, 0, 0] },
  { id: "booster-accent-stripe", shape: "cylinder", size: [1.83, 0.06, 1.83], color: ACCENT_GRAY, assembledPosition: [0, 0.6, 0], rotation: [0, 0, 0] },
  { id: "booster-mid-band", shape: "cylinder", size: [1.85, 0.1, 1.85], color: DETAIL_GRAY, assembledPosition: [0, 1.4, 0], rotation: [0, 0, 0] },
  { id: "fin-north", size: [0.6, 1.0, 0.05], color: DETAIL_GRAY, assembledPosition: [0, 0.5, 0.95], rotation: [0, 0, 0], studs: true },
  { id: "fin-south", size: [0.6, 1.0, 0.05], color: DETAIL_GRAY, assembledPosition: [0, 0.5, -0.95], rotation: [0, 0, 0], studs: true },
  { id: "fin-east", size: [0.05, 1.0, 0.6], color: DETAIL_GRAY, assembledPosition: [0.95, 0.5, 0], rotation: [0, 0, 0], studs: true },
  { id: "fin-west", size: [0.05, 1.0, 0.6], color: DETAIL_GRAY, assembledPosition: [-0.95, 0.5, 0], rotation: [0, 0, 0], studs: true },
  { id: "engine-bell-1", shape: "cylinder", size: [0.56, 0.4, 0.56], color: DARK_GRAY, assembledPosition: [0.4, -0.15, 0.4], rotation: [0, 0, 0], taper: 0.55 },
  { id: "engine-bell-2", shape: "cylinder", size: [0.56, 0.4, 0.56], color: DARK_GRAY, assembledPosition: [-0.4, -0.15, 0.4], rotation: [0, 0, 0], taper: 0.55 },
  { id: "engine-bell-3", shape: "cylinder", size: [0.56, 0.4, 0.56], color: DARK_GRAY, assembledPosition: [0.4, -0.15, -0.4], rotation: [0, 0, 0], taper: 0.55 },
  { id: "engine-bell-4", shape: "cylinder", size: [0.56, 0.4, 0.56], color: DARK_GRAY, assembledPosition: [-0.4, -0.15, -0.4], rotation: [0, 0, 0], taper: 0.55 },
  { id: "access-panel-front", size: [0.35, 0.4, 0.04], color: DETAIL_GRAY, assembledPosition: [0, 0.55, 0.91], rotation: [0, 0, 0] },
  { id: "access-panel-back", size: [0.35, 0.4, 0.04], color: DETAIL_GRAY, assembledPosition: [0, 0.55, -0.91], rotation: [0, 0, 0] },
  { id: "grid-fin-front", size: [0.3, 0.25, 0.05], color: DETAIL_GRAY, assembledPosition: [0, 1.85, 0.95], rotation: [0, 0, 0] },
  { id: "grid-fin-back", size: [0.3, 0.25, 0.05], color: DETAIL_GRAY, assembledPosition: [0, 1.85, -0.95], rotation: [0, 0, 0] },
  { id: "grid-fin-right", size: [0.05, 0.25, 0.3], color: DETAIL_GRAY, assembledPosition: [0.95, 1.85, 0], rotation: [0, 0, 0] },
  { id: "grid-fin-left", size: [0.05, 0.25, 0.3], color: DETAIL_GRAY, assembledPosition: [-0.95, 1.85, 0], rotation: [0, 0, 0] },

  // interstage 1: tapered collar down to stage 2's narrower diameter
  { id: "interstage-1", shape: "cylinder", size: [1.8, 0.3, 1.8], color: DETAIL_GRAY, assembledPosition: [0, 2.15, 0], rotation: [0, 0, 0], taper: 1.5 / 1.8 },
  { id: "interstage-vent-left", size: [0.1, 0.08, 0.1], color: DARK_GRAY, assembledPosition: [0.65, 2.15, 0.4], rotation: [0, 0, 0] },
  { id: "interstage-vent-right", size: [0.1, 0.08, 0.1], color: DARK_GRAY, assembledPosition: [-0.65, 2.15, 0.4], rotation: [0, 0, 0] },

  // stage 2: body, band, accent stripe, single vernier engine, RCS thruster pods
  { id: "stage2-body", shape: "cylinder", size: [1.5, 1.6, 1.5], color: BODY_GRAY, assembledPosition: [0, 3.1, 0], rotation: [0, 0, 0] },
  { id: "stage2-band", shape: "cylinder", size: [1.53, 0.1, 1.53], color: DETAIL_GRAY, assembledPosition: [0, 3.6, 0], rotation: [0, 0, 0] },
  { id: "stage2-accent-stripe", shape: "cylinder", size: [1.52, 0.05, 1.52], color: ACCENT_GRAY, assembledPosition: [0, 3.3, 0], rotation: [0, 0, 0] },
  { id: "stage2-engine", shape: "cylinder", size: [0.44, 0.3, 0.44], color: DARK_GRAY, assembledPosition: [0, 2.15, 0], rotation: [0, 0, 0], taper: 0.55 },
  { id: "porthole-stage2", shape: "cylinder", size: [0.18, 0.03, 0.18], color: DARK_GRAY, assembledPosition: [0, 3.3, 0.76], rotation: [Math.PI / 2, 0, 0] },
  { id: "rcs-thruster-front", size: [0.15, 0.15, 0.15], color: DETAIL_GRAY, assembledPosition: [0, 3.4, 0.75], rotation: [0, 0, 0] },
  { id: "rcs-thruster-back", size: [0.15, 0.15, 0.15], color: DETAIL_GRAY, assembledPosition: [0, 3.4, -0.75], rotation: [0, 0, 0] },
  { id: "rcs-thruster-right", size: [0.15, 0.15, 0.15], color: DETAIL_GRAY, assembledPosition: [0.75, 3.4, 0], rotation: [0, 0, 0] },
  { id: "rcs-thruster-left", size: [0.15, 0.15, 0.15], color: DETAIL_GRAY, assembledPosition: [-0.75, 3.4, 0], rotation: [0, 0, 0] },

  // interstage 2: tapered collar down to stage 3
  { id: "interstage-2", shape: "cylinder", size: [1.5, 0.25, 1.5], color: DETAIL_GRAY, assembledPosition: [0, 4.025, 0], rotation: [0, 0, 0], taper: 1.2 / 1.5 },

  // stage 3: body, band, accent stripe, engine, decal
  { id: "stage3-body", shape: "cylinder", size: [1.2, 1.2, 1.2], color: BODY_GRAY, assembledPosition: [0, 4.75, 0], rotation: [0, 0, 0] },
  { id: "stage3-band", shape: "cylinder", size: [1.23, 0.1, 1.23], color: DETAIL_GRAY, assembledPosition: [0, 5.2, 0], rotation: [0, 0, 0] },
  { id: "stage3-accent-stripe", shape: "cylinder", size: [1.22, 0.05, 1.22], color: ACCENT_GRAY, assembledPosition: [0, 4.55, 0], rotation: [0, 0, 0] },
  { id: "stage3-engine", shape: "cylinder", size: [0.36, 0.25, 0.36], color: DARK_GRAY, assembledPosition: [0, 4.025, 0], rotation: [0, 0, 0], taper: 0.55 },
  { id: "porthole-stage3", shape: "cylinder", size: [0.16, 0.025, 0.16], color: DARK_GRAY, assembledPosition: [0, 4.9, 0.61], rotation: [Math.PI / 2, 0, 0] },
  { id: "decal-plate", size: [0.2, 0.15, 0.03], color: LIGHT_GRAY, assembledPosition: [0, 4.6, -0.62], rotation: [0, 0, 0] },

  // payload fairing base
  { id: "fairing-body", shape: "cylinder", size: [1.0, 0.6, 1.0], color: LIGHT_GRAY, assembledPosition: [0, 5.65, 0], rotation: [0, 0, 0] },
  { id: "fairing-band", shape: "cylinder", size: [1.04, 0.08, 1.04], color: DETAIL_GRAY, assembledPosition: [0, 5.98, 0], rotation: [0, 0, 0] },
  { id: "porthole-fairing", shape: "cylinder", size: [0.14, 0.025, 0.14], color: DARK_GRAY, assembledPosition: [0, 5.75, -0.52], rotation: [Math.PI / 2, 0, 0] },
  { id: "comms-dish", size: [0.12, 0.12, 0.06], color: LIGHT_GRAY, assembledPosition: [0, 5.5, -0.51], rotation: [0, 0, 0] },

  // nose cone: two tapered segments and a rounded tip
  { id: "nose-lower", shape: "cylinder", size: [1.0, 0.5, 1.0], color: LIGHT_GRAY, assembledPosition: [0, 6.28, 0], rotation: [0, 0, 0], taper: 0.64 },
  { id: "nose-upper", shape: "cylinder", size: [0.64, 0.55, 0.64], color: LIGHT_GRAY, assembledPosition: [0, 6.83, 0], rotation: [0, 0, 0], taper: 0.1875 },
  { id: "nose-tip-cap", shape: "sphere", size: [0.14, 0.14, 0.14], color: LIGHT_GRAY, assembledPosition: [0, 7.14, 0], rotation: [0, 0, 0] },
  { id: "antenna", shape: "cylinder", size: [0.03, 0.4, 0.03], color: DARK_GRAY, assembledPosition: [0, 7.35, 0], rotation: [0, 0, 0] },

  // launch platform, sitting under the booster
  { id: "launch-platform", size: [2.4, 0.15, 2.4], color: DETAIL_GRAY, assembledPosition: [0, -0.075, 0], rotation: [0, 0, 0], studs: true },
  { id: "support-leg-1", size: [0.15, 0.4, 0.15], color: DARK_GRAY, assembledPosition: [-1.0, -0.35, -1.0], rotation: [0, 0, 0] },
  { id: "support-leg-2", size: [0.15, 0.4, 0.15], color: DARK_GRAY, assembledPosition: [1.0, -0.35, -1.0], rotation: [0, 0, 0] },
  { id: "support-leg-3", size: [0.15, 0.4, 0.15], color: DARK_GRAY, assembledPosition: [-1.0, -0.35, 1.0], rotation: [0, 0, 0] },
  { id: "support-leg-4", size: [0.15, 0.4, 0.15], color: DARK_GRAY, assembledPosition: [1.0, -0.35, 1.0], rotation: [0, 0, 0] },
];

const DISTANCE = 3;
const STAGGER_RANGE = 0.35;

// scroll progress is split into three phases: sit assembled, explode outward,
// then keep drifting apart while fading out
const HOLD_END = 0.12;
const EXPLODE_END = 0.78;
const FADE_EXTRA_DISTANCE = 1.0;

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

function subtract(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function length(v: [number, number, number]): number {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

function normalize(v: [number, number, number], fallback: [number, number, number]): [number, number, number] {
  const len = length(v);
  if (len < 1e-4) return fallback;
  return [v[0] / len, v[1] / len, v[2] / len];
}

// deterministic pseudo-random in [0, 1) from an integer seed, so the tumble
// stays fixed per piece across renders instead of jittering every frame
function hashToUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const centroid = PIECES.reduce<[number, number, number]>(
  (acc, piece) => [
    acc[0] + piece.assembledPosition[0],
    acc[1] + piece.assembledPosition[1],
    acc[2] + piece.assembledPosition[2],
  ],
  [0, 0, 0]
).map((sum) => sum / PIECES.length) as [number, number, number];

export type PieceMeta = BrickPiece & {
  dist: number;
  direction: [number, number, number];
  explodedPosition: [number, number, number];
  tumbleAxis: [number, number, number];
  tumbleMagnitude: number;
};

export const pieceMeta: PieceMeta[] = PIECES.map((piece, index) => {
  const offset = subtract(piece.assembledPosition, centroid);
  const dist = length(offset);
  const fallbackDir: [number, number, number] = normalize(
    [Math.sin(index), 1, Math.cos(index)],
    [0, 1, 0]
  );
  const direction = normalize(offset, fallbackDir);

  const explodedPosition: [number, number, number] = [
    piece.assembledPosition[0] + direction[0] * DISTANCE,
    piece.assembledPosition[1] + direction[1] * DISTANCE,
    piece.assembledPosition[2] + direction[2] * DISTANCE,
  ];

  const tumbleAxis = normalize(
    [hashToUnit(index * 3 + 1) - 0.5, hashToUnit(index * 3 + 2) - 0.5, hashToUnit(index * 3 + 3) - 0.5],
    [0, 1, 0]
  );
  const tumbleMagnitude = 0.15 + hashToUnit(index * 7 + 5) * 0.25;

  return { ...piece, dist, direction, explodedPosition, tumbleAxis, tumbleMagnitude };
});

const maxDist = Math.max(...pieceMeta.map((p) => p.dist));

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function getPieceTransform(
  meta: PieceMeta,
  globalProgress: number
): { position: [number, number, number]; rotation: [number, number, number]; opacity: number } {
  const explodeT = clamp01((globalProgress - HOLD_END) / (EXPLODE_END - HOLD_END));

  const localStart = maxDist > 0 ? (1 - meta.dist / maxDist) * STAGGER_RANGE : 0;
  const raw = (explodeT - localStart) / Math.max(1e-4, 1 - localStart);
  const local = easeInOutCubic(clamp01(raw));

  const fadeT = clamp01((globalProgress - EXPLODE_END) / (1 - EXPLODE_END));
  const fadeEase = easeInOutCubic(fadeT);
  const extraDrift = fadeEase * FADE_EXTRA_DISTANCE;

  const position: [number, number, number] = [
    meta.assembledPosition[0] + (meta.explodedPosition[0] - meta.assembledPosition[0]) * local + meta.direction[0] * extraDrift,
    meta.assembledPosition[1] + (meta.explodedPosition[1] - meta.assembledPosition[1]) * local + meta.direction[1] * extraDrift,
    meta.assembledPosition[2] + (meta.explodedPosition[2] - meta.assembledPosition[2]) * local + meta.direction[2] * extraDrift,
  ];

  const rotation: [number, number, number] = [
    meta.rotation[0] + meta.tumbleAxis[0] * meta.tumbleMagnitude * local,
    meta.rotation[1] + meta.tumbleAxis[1] * meta.tumbleMagnitude * local,
    meta.rotation[2] + meta.tumbleAxis[2] * meta.tumbleMagnitude * local,
  ];

  const opacity = 1 - fadeEase;

  return { position, rotation, opacity };
}
