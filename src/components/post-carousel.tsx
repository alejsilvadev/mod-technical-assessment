"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { ArrowRightIcon } from "@/components/icons";

const ACTIVE_WIDTH = 46;
const ITEM_WIDTH = 24;
const GAP = 1;
// Picsum photo IDs hand-picked for city/nature shots, in place of the
// previous random per-post seed (which could land on anything).
const CARD_IMAGE_IDS = [122, 860, 231, 1058, 740, 1075, 430, 49, 10, 29];
// Must match the outgoing card's fade duration below (search
// "duration-[100ms]" — Tailwind needs that as a literal string, so it
// can't be generated from this constant). Keep these two in sync by hand.
const TRANSITION_MS = 100;
const AUTOPLAY_MS = 6000;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServer() {
  return false;
}

export function PostCarousel({ posts }: { posts: Post[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // The card leaving the active slot fades out in place instead of
  // sliding to its new position, while every other card still slides.
  const [outgoingId, setOutgoingId] = useState<number | null>(null);
  // Once the fade finishes, that card needs to jump to its real (side)
  // position/opacity — but it must do so with no transition at all, or
  // it'd animate (slide + fade back in) from its frozen, invisible spot,
  // which is exactly the motion this is meant to prevent. settledId marks
  // it for one paint so that jump renders instantly, then clears so the
  // card goes back to sliding normally on future clicks.
  const [settledId, setSettledId] = useState<number | null>(null);
  const outgoingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleFrameRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );

  useEffect(() => {
    return () => {
      if (outgoingTimeoutRef.current) clearTimeout(outgoingTimeoutRef.current);
      if (settleFrameRef.current !== null) cancelAnimationFrame(settleFrameRef.current);
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = ((index % posts.length) + posts.length) % posts.length;
      if (nextIndex === activeIndex) return;

      const leavingId = posts[activeIndex].id;
      setOutgoingId(leavingId);
      setActiveIndex(nextIndex);

      if (outgoingTimeoutRef.current) clearTimeout(outgoingTimeoutRef.current);
      outgoingTimeoutRef.current = setTimeout(() => {
        setOutgoingId(null);
        setSettledId(leavingId);
        settleFrameRef.current = requestAnimationFrame(() => {
          settleFrameRef.current = requestAnimationFrame(() => setSettledId(null));
        });
      }, TRANSITION_MS);
    },
    [activeIndex, posts]
  );

  // Auto-advance every AUTOPLAY_MS, resetting on any navigation (manual
  // or automatic) so the cadence is always measured from the last slide
  // change. Paused on hover and for prefers-reduced-motion.
  useEffect(() => {
    if (isHovered || reducedMotion || posts.length <= 1) return;
    const timeout = setTimeout(() => goTo(activeIndex + 1), AUTOPLAY_MS);
    return () => clearTimeout(timeout);
  }, [activeIndex, isHovered, reducedMotion, posts.length, goTo]);

  return (
    <div className="w-full">
      <div
        className="relative h-96 w-full overflow-hidden sm:h-[28rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {posts.map((post, index) => {
          const offset = (index - activeIndex + posts.length) % posts.length;
          const isActive = offset === 0;
          const isOutgoing = post.id === outgoingId;
          const isSettling = post.id === settledId;

          const left =
            offset === 0 ? 0 : ACTIVE_WIDTH + GAP + (offset - 1) * (ITEM_WIDTH + GAP);
          const width = isActive ? ACTIVE_WIDTH : ITEM_WIDTH;

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
              className={`absolute h-full cursor-pointer text-left ease-out ${
                isOutgoing
                  ? "transition-opacity duration-[100ms]"
                  : isSettling
                    ? "transition-none"
                    : "transition-all duration-[1200ms]"
              }`}
              style={{
                // The outgoing card stays frozen in the active slot and
                // fades to fully transparent there, instead of also
                // snapping to its new (smaller, repositioned) size at the
                // same instant — that instant resize was what made it
                // read as "disappearing" rather than fading.
                left: isOutgoing ? 0 : `${left}%`,
                width: isOutgoing ? `${ACTIVE_WIDTH}%` : `${width}%`,
                opacity: isOutgoing ? 0 : isActive ? 1 : 0.75,
                // Kept below everything else so the incoming card visibly
                // slides in over it as it fades, per "next card comes over".
                zIndex: isOutgoing ? 0 : posts.length - offset,
              }}
            >
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-xl shadow-md ring-1 ring-stone-200 transition-shadow duration-500 ${
                  isActive ? "shadow-xl" : "shadow-sm"
                }`}
              >
                <Image
                  src={`https://picsum.photos/id/${CARD_IMAGE_IDS[(post.id - 1) % CARD_IMAGE_IDS.length]}/640/480`}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 46vw, 70vw"
                  className="object-cover"
                  priority={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="relative mt-auto flex flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-brand-700">
                    Post #{post.id}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-base font-semibold capitalize leading-snug text-white">
                    {post.title}
                  </h3>

                  {isActive ? (
                    <Link
                      href={`/posts/${post.id}`}
                      className="group mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white hover:text-brand-200"
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

      <div className="mt-10 flex items-center justify-center gap-5">
        {posts.map((post, index) => (
          <button
            key={post.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to post ${post.id}`}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-20 bg-brand-700" : "w-3 bg-stone-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
