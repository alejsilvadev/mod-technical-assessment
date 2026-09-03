"use client";

import { useEffect } from "react";
import anime from "animejs";

// Real "MOD" letterform outlines traced from Bodoni Moda (ExtraBold, display
// optical size), extracted from the variable font so the draw-in follows
// actual glyph paths instead of a hand-drawn approximation.
const PATH_M =
  "M112.65 3L111.60 3L28.20-225L83.25-225L139.35-75.60L192-225L192.60-225L112.65 3M4.80-225L28.50-225L28.50-0.60L51.90-0.60L51.90 0L6.30 0L6.30-0.60L27.90-0.60L27.90-224.40L4.80-224.40L4.80-225M192.30-225L268.20-225L268.20-224.40L247.20-224.40L247.20-0.60L268.20-0.60L268.20 0L168.30 0L168.30-0.60L192.30-0.60";
const PATH_O =
  "M389.70 3Q365.10 3 345.67-5.62Q326.25-14.25 312.68-29.92Q299.10-45.60 291.97-66.67Q284.85-87.75 284.85-112.50Q284.85-137.25 292.43-158.32Q300-179.40 313.88-195.07Q327.75-210.75 347.02-219.37Q366.30-228 389.70-228Q413.10-228 432.30-219.37Q451.50-210.75 465.45-195.07Q479.40-179.40 486.90-158.32Q494.40-137.25 494.40-112.50Q494.40-87.75 487.27-66.67Q480.15-45.60 466.57-29.92Q453-14.25 433.57-5.62Q414.15 3 389.70 3M389.70 2.40Q403.50 2.40 412.13-6.22Q420.75-14.85 425.40-30.45Q430.05-46.05 431.77-66.97Q433.50-87.90 433.50-112.65Q433.50-137.10 431.40-158.03Q429.30-178.95 424.27-194.55Q419.25-210.15 410.77-218.78Q402.30-227.40 389.70-227.40Q376.95-227.40 368.47-218.70Q360-210 354.97-194.47Q349.95-178.95 347.77-158.03Q345.60-137.10 345.60-112.50Q345.60-87.90 347.40-66.97Q349.20-46.05 353.85-30.45Q358.50-14.85 367.20-6.22Q375.90 2.40 389.70 2.40";
const PATH_D =
  "M511.20-225L612.75-225Q649.50-225 675.60-211.12Q701.70-197.25 715.65-171.97Q729.60-146.70 729.60-112.50Q729.60-86.85 721.27-66.15Q712.95-45.45 697.57-30.67Q682.20-15.90 660.67-7.95Q639.15 0 612.75 0L511.20 0L511.20-0.60L538.20-0.60L538.20-224.40L511.20-224.40L511.20-225M593.10-224.40L593.10-0.60L612.75-0.60Q628.50-0.60 639.22-9.37Q649.95-18.15 656.40-33.60Q662.85-49.05 665.77-69.30Q668.70-89.55 668.70-112.65Q668.70-135.45 665.40-155.70Q662.10-175.95 655.27-191.40Q648.45-206.85 637.95-215.62Q627.45-224.40 612.75-224.40";

export function LogoReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      anime.set([".mod-m", ".mod-o", ".mod-d"], { strokeWidth: 1.5, fillOpacity: 1 });
      anime.set(".mod-reveal", { opacity: 1, translateY: 0 });
      anime.set(".mod-rule", { scaleX: 1 });
      return;
    }

    anime.set([".mod-m", ".mod-o", ".mod-d"], { strokeWidth: 6, fillOpacity: 0 });
    anime.set(".mod-reveal", { opacity: 0, translateY: 14 });
    anime.set(".mod-rule", { scaleX: 0 });

    anime
      .timeline({ easing: "easeInOutQuad" })
      .add({ targets: ".mod-m", strokeDashoffset: [anime.setDashoffset, 0], duration: 700 })
      .add({ targets: ".mod-o", strokeDashoffset: [anime.setDashoffset, 0], duration: 700 }, "-=400")
      .add({ targets: ".mod-d", strokeDashoffset: [anime.setDashoffset, 0], duration: 700 }, "-=400")
      .add(
        { targets: [".mod-m", ".mod-o", ".mod-d"], fillOpacity: [0, 1], strokeWidth: [6, 1.5], duration: 450 },
        "-=150"
      )
      .add({ targets: ".mod-rule", scaleX: [0, 1], duration: 200 }, "-=150")
      .add({ targets: ".mod-reveal", opacity: [0, 1], translateY: [14, 0], duration: 300 }, "-=100");
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-stone-50 px-6">
      <svg viewBox="-25 -258 785 291" className="w-full max-w-2xl font-serif" role="img" aria-label="MOD">
        <g
          className="fill-stone-900 stroke-stone-900"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="mod-m" d={PATH_M} />
          <path className="mod-o" d={PATH_O} />
          <path className="mod-d" d={PATH_D} />
        </g>
      </svg>

      <div className="mod-reveal flex flex-col items-center gap-4 text-center">
        <div className="mod-rule h-0.5 w-12 origin-center bg-brand-600" />
        <p className="max-w-md font-serif text-lg italic text-stone-600">
          Build something worth believing.
        </p>
      </div>
    </div>
  );
}
