"use client";

import { useEffect } from "react";
import { useReadCounter } from "@/context/read-counter";

export function TrackRead({ postId }: { postId: number }) {
  const { markAsRead } = useReadCounter();

  useEffect(() => {
    markAsRead(postId);
  }, [postId, markAsRead]);

  return null;
}
