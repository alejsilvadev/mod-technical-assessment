"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ReadCounterValue {
  count: number;
  markAsRead: (postId: number) => void;
}

const ReadCounterContext = createContext<ReadCounterValue | null>(null);

export function ReadCounterProvider({ children }: { children: ReactNode }) {
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const markAsRead = (postId: number) => {
    setReadIds((prev) => {
      if (prev.has(postId)) return prev;
      const next = new Set(prev);
      next.add(postId);
      return next;
    });
  };

  return (
    <ReadCounterContext.Provider value={{ count: readIds.size, markAsRead }}>
      {children}
    </ReadCounterContext.Provider>
  );
}

export function useReadCounter() {
  const ctx = useContext(ReadCounterContext);
  if (!ctx) {
    throw new Error("useReadCounter must be used within a ReadCounterProvider");
  }
  return ctx;
}
