"use client";

import { useReadCounter } from "@/context/read-counter";

export function ReadCounterBadge() {
  const { count } = useReadCounter();

  return (
    <p className="text-sm text-zinc-500">
      {count === 0
        ? "You haven't read any articles yet"
        : `You've read ${count} article${count === 1 ? "" : "s"} this visit`}
    </p>
  );
}
