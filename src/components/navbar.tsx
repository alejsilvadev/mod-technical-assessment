"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/#about" },
  { id: "assessment", label: "Assessment", href: "/#assessment" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrollActive, setScrollActive] = useState<string>("home");
  const active = pathname !== "/" ? "assessment" : scrollActive;

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["about", "assessment"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Trigger line sits just below the floating pill nav. Whichever
    // section's top has scrolled above it (last, in document order)
    // is the active one — this works regardless of how tall or short
    // a given section is, unlike comparing IntersectionObserver ratios.
    const TRIGGER_OFFSET = 120;

    function update() {
      let current = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= TRIGGER_OFFSET) {
          current = section.id;
        }
      }
      setScrollActive(current);
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
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <div className="flex items-center gap-1 rounded-full bg-stone-900 p-1.5 text-sm text-stone-300 shadow-lg shadow-stone-900/20">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "rounded-full bg-brand-600 px-4 py-2 font-medium text-white"
                  : "rounded-full px-4 py-2 font-medium transition-colors hover:bg-stone-800 hover:text-white"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
