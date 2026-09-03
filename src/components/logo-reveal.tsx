"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { ArrowDownIcon } from "@/components/icons";

export function LogoReveal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    anime.set([".mod-m", ".mod-o", ".mod-d"], { strokeWidth: 9 });
    anime.set(".mod-reveal", { opacity: 0, translateY: 14 });
    anime.set(".mod-rule", { scaleX: 0 });
    if (cueRef.current) cueRef.current.style.opacity = "1";

    const tl = anime.timeline({ autoplay: false, easing: "easeInOutQuad" });

    tl.add({ targets: ".mod-m", strokeDashoffset: [anime.setDashoffset, 0], duration: 100 })
      .add({ targets: ".mod-o", strokeDashoffset: [anime.setDashoffset, 0], duration: 100 }, "-=60")
      .add({ targets: ".mod-d", strokeDashoffset: [anime.setDashoffset, 0], duration: 100 }, "-=60")
      .add({ targets: [".mod-m", ".mod-o", ".mod-d"], strokeWidth: [9, 15], duration: 40 })
      .add({ targets: ".mod-rule", scaleX: [0, 1], duration: 20 }, "-=15")
      .add({ targets: ".mod-reveal", opacity: [0, 1], translateY: [14, 0], duration: 30 }, "-=10");

    function update() {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      const progress = Math.min(1, Math.max(0, raw));
      tl.seek(tl.duration * progress);
      if (cueRef.current) {
        cueRef.current.style.opacity = progress > 0.04 ? "0" : "1";
      }
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
  }, []);

  return (
    <div ref={trackRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-stone-50 px-6">
        <div
          ref={cueRef}
          className="absolute top-20 flex flex-col items-center gap-2 text-xs text-stone-400 opacity-0 transition-opacity duration-300"
        >
          <span>Scroll</span>
          <ArrowDownIcon className="h-3 w-3" />
        </div>

        <svg viewBox="0 0 940 300" className="w-full max-w-xl" role="img" aria-label="MOD">
          <g
            className="stroke-stone-900"
            fill="none"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path className="mod-m" d="M60,260 L60,40 L180,190 L300,40 L300,260" />
            <ellipse className="mod-o" cx="470" cy="150" rx="95" ry="110" />
            <path className="mod-d" d="M640,40 L640,260 C 800,260 880,215 880,150 C 880,85 800,40 640,40" />
          </g>
        </svg>

        <div className="mod-reveal flex flex-col items-center gap-4 text-center">
          <div className="mod-rule h-0.5 w-12 origin-center bg-amber-500" />
          <p className="max-w-md text-lg text-stone-600">Build something worth believing.</p>
        </div>
      </div>
    </div>
  );
}
