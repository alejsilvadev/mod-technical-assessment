import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, POST_COUNT } from "@/lib/posts";
import { TrackRead } from "@/components/track-read";
import { PostCard } from "@/components/post-card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

export default async function PostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const hasPrevious = post.id > 1;
  const hasNext = post.id < POST_COUNT;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-12 pt-28">
      <TrackRead postId={post.id} />

      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-brand-800"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
        back to posts
      </Link>

      <PostCard post={post} />

      <div className="mt-4 flex items-center justify-between">
        {hasPrevious ? (
          <Link
            href={`/posts/${post.id - 1}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 hover:border-brand-300 hover:text-brand-800"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            previous
          </Link>
        ) : (
          <span />
        )}

        {hasNext ? (
          <Link
            href={`/posts/${post.id + 1}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 hover:border-brand-300 hover:text-brand-800"
          >
            next
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
