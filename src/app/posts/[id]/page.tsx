import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { TrackRead } from "@/components/track-read";
import { PostCard } from "@/components/post-card";
import { ArrowLeftIcon } from "@/components/icons";

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

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <TrackRead postId={post.id} />

      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-amber-800"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
        back to posts
      </Link>

      <PostCard post={post} />
    </main>
  );
}
