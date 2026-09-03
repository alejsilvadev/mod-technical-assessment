"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { Post } from "@/lib/posts";
import { ArrowRightIcon } from "@/components/icons";

export function PostList({ posts }: { posts: Post[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = listRef.current.querySelectorAll("li");
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, []);

  return (
    <ul ref={listRef} className="divide-y divide-stone-200 border-t border-stone-200">
      {posts.map((post, index) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="group flex items-center gap-4 py-4 capitalize text-stone-800 transition-colors hover:text-brand-800"
          >
            <span className="text-xs text-stone-300 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">{post.title}</span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-stone-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-600" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
