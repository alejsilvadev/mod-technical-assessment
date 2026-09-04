"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "@/components/icons";

const SIZE = 480;
const CENTER = SIZE / 2;
const RADIUS = 180;
const LINE_COUNT = 15;
const TILT_DEG = 42;
// the tilt angle itself never changes — only the compass direction it points
// sweeps around, the way Earth's axis stays pointed at Polaris while the
// hemisphere it leans toward the sun rotates through the year. Sweeping this
// azimuth is a rigid rotation of the whole sphere around its own center, so
// the outer silhouette stays a perfect circle throughout — nothing squashes
// (a 180° sweep would coincidentally return to a near-identical resting look,
// since this evenly-spaced latitude pattern is symmetric about its center)
const AZIMUTH_START_DEG = -20;
const AZIMUTH_END_DEG = AZIMUTH_START_DEG + 90;
const TRACK_HEIGHT_VH = 420;
const BRAND_RED = "#d4021c";

// scroll progress runs through three sequential phases: the lines draw in
// on the right, the fully-drawn sphere then slides over to the left, and
// only once it's in place does it "unravel" — the same segment-reveal
// mechanic run in reverse, chasing the tail up to the head
const DRAW_END = 0.35;
const MOVE_END = 0.65;
const STAGGER_SPAN = 0.88;

const X_START_VW = 26;
const X_END_VW = -26;

// idle "breathing" ripple: each line oscillates along the sphere's own tilt
// axis, and lines further down lag further behind in phase — so at any
// instant the top line is already reversing while the ones below it are
// still catching up, reading as a wave that travels down the sphere and back
const BREATH_AMPLITUDE = 7;
const BREATH_PERIOD_S = 3.4;
const BREATH_PHASE_STEP = (1.6 * Math.PI) / (LINE_COUNT - 1);

// true parallels of latitude on a sphere tilted toward the viewer by
// TILT_DEG. Latitude circles lie in parallel planes (hence "parallel" to
// each other), and under orthographic projection each one becomes an
// axis-aligned ellipse — no rotation transforms needed. Derivation: a point
// at latitude phi, tilted by beta around X and projected along Z, traces
// X = R cos(phi) sin(theta), Y = R sin(phi) cos(beta) - R cos(phi) sin(beta) cos(theta),
// which is an ellipse of half-width R cos(phi), half-height R cos(phi) sin(beta),
// centered R sin(phi) cos(beta) away from the sphere's own center.
const TILT_RAD = (TILT_DEG * Math.PI) / 180;
const SIN_TILT = Math.sin(TILT_RAD);
const COS_TILT = Math.cos(TILT_RAD);

const LINES = Array.from({ length: LINE_COUNT }, (_, i) => {
  const latDeg = -80 + (i * 160) / (LINE_COUNT - 1);
  const lat = (latDeg * Math.PI) / 180;
  const rx = RADIUS * Math.cos(lat);
  return {
    id: `line-${i}`,
    rx,
    ry: rx * SIN_TILT,
    cy: CENTER + RADIUS * Math.sin(lat) * COS_TILT,
  };
});

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// how far along its own stagger slot a line is, given a 0-1 phase progress.
// `order` is the line's rank in the start sequence (0 = starts first), not
// necessarily its array index — draw goes top-to-bottom, unravel reverses it
function staggeredLocal(phaseT: number, order: number): number {
  const localStart = (order / LINE_COUNT) * STAGGER_SPAN;
  const raw = (phaseT - localStart) / Math.max(1e-4, 1 - localStart);
  return easeInOutCubic(clamp01(raw));
}

export function WireframeSphere() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  // safe to read matchMedia synchronously here: this component only ever
  // renders client-side, via next/dynamic with ssr:false
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const svg = svgRef.current;
    if (!track || !svg || reducedMotion) return;

    const lines = Array.from(svg.querySelectorAll<SVGGeometryElement>(".sphere-line"));
    const lengths = lines.map((line) => line.getTotalLength());

    if (cueRef.current) cueRef.current.style.opacity = "1";

    function applySegment(index: number, start: number, end: number) {
      const line = lines[index];
      const length = lengths[index];
      const visible = Math.max(0, end - start) * length;
      line.style.strokeDasharray = `0 ${start * length} ${visible} ${length * 2}`;
    }

    function update() {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      const progress = clamp01(raw);

      lines.forEach((_, index) => {
        if (progress <= DRAW_END) {
          // top lines (low index) start drawing first
          const phaseT = progress / DRAW_END;
          applySegment(index, 0, staggeredLocal(phaseT, index));
        } else if (progress <= MOVE_END) {
          applySegment(index, 0, 1);
        } else {
          // reversed: bottom lines (high index) start unraveling first
          const phaseT = (progress - MOVE_END) / (1 - MOVE_END);
          const order = LINE_COUNT - 1 - index;
          applySegment(index, staggeredLocal(phaseT, order), 1);
        }
      });

      let moveT = 0;
      if (progress > DRAW_END) {
        moveT = clamp01((progress - DRAW_END) / (MOVE_END - DRAW_END));
      }
      const eased = easeInOutCubic(moveT);

      if (stageRef.current) {
        const x = X_START_VW + (X_END_VW - X_START_VW) * eased;
        stageRef.current.style.transform = `translateX(${x}vw)`;
      }

      if (groupRef.current) {
        const azimuth = AZIMUTH_START_DEG + (AZIMUTH_END_DEG - AZIMUTH_START_DEG) * eased;
        groupRef.current.setAttribute("transform", `rotate(${azimuth} ${CENTER} ${CENTER})`);
      }

      if (cueRef.current) cueRef.current.style.opacity = progress > 0.03 ? "0" : "1";
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reducedMotion) return;

    const lines = Array.from(svg.querySelectorAll<SVGGeometryElement>(".sphere-line"));
    const omega = (2 * Math.PI) / BREATH_PERIOD_S;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = (now - start) / 1000;
      lines.forEach((line, index) => {
        const phase = t * omega - index * BREATH_PHASE_STEP;
        const offset = Math.sin(phase) * BREATH_AMPLITUDE;
        line.style.transform = `translateY(${offset}px)`;
      });
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <div ref={trackRef} className="relative" style={{ height: `${TRACK_HEIGHT_VH}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-white">
        <div
          ref={cueRef}
          className="absolute top-24 flex flex-col items-center gap-2 text-xs text-stone-400 opacity-0 transition-opacity duration-300"
        >
          <span>Scroll</span>
          <ArrowDownIcon className="h-3 w-3" />
        </div>

        <div ref={stageRef} className="h-[68vmin] w-[68vmin]">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            fill="none"
            className="h-full w-full"
            role="img"
            aria-label="A wireframe sphere"
          >
            <g ref={groupRef} transform={`rotate(${AZIMUTH_START_DEG} ${CENTER} ${CENTER})`}>
              {LINES.map((line) => (
                <ellipse
                  key={line.id}
                  className="sphere-line"
                  cx={CENTER}
                  cy={line.cy}
                  rx={line.rx}
                  ry={line.ry}
                  stroke={BRAND_RED}
                  strokeOpacity={0.9}
                  strokeWidth={1.4}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
