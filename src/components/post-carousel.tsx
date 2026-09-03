"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

export function PostCarousel({ posts }: { posts: Post[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex((index + posts.length) % posts.length);
  };

  return (
    <div className="w-full">
      <div className="relative flex h-[420px] items-center justify-center overflow-hidden">
        {posts.map((post, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;
          const abs = Math.abs(offset);
          const visible = abs <= 3;

          const translate = offset * 150;
          const scale = isActive ? 1 : Math.max(0.7, 0.88 - (abs - 1) * 0.08);
          const opacity = visible ? (isActive ? 1 : Math.max(0.35, 0.75 - (abs - 1) * 0.2)) : 0;

          return (
            <div
              key={post.id}
              role="button"
              tabIndex={0}
              onClick={() => goTo(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  goTo(index);
                }
              }}
              aria-label={isActive ? `Open post: ${post.title}` : `Bring post ${post.id} to front`}
              className="absolute w-64 shrink-0 cursor-pointer text-left transition-all duration-500 ease-out sm:w-72"
              style={{
                transform: `translateX(${translate}px) scale(${scale})`,
                opacity,
                zIndex: 100 - abs,
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <article
                className={`overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-stone-200 transition-shadow duration-500 ${
                  isActive ? "shadow-xl" : "shadow-sm"
                }`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={`https://picsum.photos/seed/mod-post-${post.id}/640/480`}
                    alt=""
                    fill
                    sizes="288px"
                    className="object-cover"
                    priority={isActive}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-brand-700">
                    Post #{post.id}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-base font-semibold capitalize leading-snug text-stone-900">
                    {post.title}
                  </h3>

                  {isActive ? (
                    <Link
                      href={`/posts/${post.id}`}
                      className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Read post
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  ) : null}
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous post"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-colors hover:border-brand-300 hover:text-brand-800"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {posts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to post ${post.id}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-brand-700" : "w-1.5 bg-stone-300"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next post"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-colors hover:border-brand-300 hover:text-brand-800"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
