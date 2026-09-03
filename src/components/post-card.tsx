"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  return (
    <article ref={cardRef} className="mt-6 rounded-lg bg-white p-8 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-brand-700">
        Post #{post.id}
      </p>
      <h1 className="mt-2 text-2xl font-semibold capitalize leading-snug text-stone-900">
        {post.title}
      </h1>
      <div className="mt-4 h-0.5 w-12 bg-brand-600" />
      <p className="mt-4 max-w-prose leading-relaxed text-stone-600">{post.body}</p>
    </article>
  );
}
