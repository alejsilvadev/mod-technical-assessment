"use client";

import { useReadCounter } from "@/context/read-counter";

export function ReadCounterBadge() {
  const { count } = useReadCounter();

  return (
    <span className="shrink-0 rounded-full bg-brand-100 px-3 py-1 font-sans text-xs font-bold uppercase leading-[18px] text-brand-700">
      {count} read this visit
    </span>
  );
}
