import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { TrackRead } from "@/components/track-read";

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
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <TrackRead postId={post.id} />

      <Link href="/" className="text-sm text-blue-600 hover:underline">
        &larr; back to posts
      </Link>

      <h1 className="mt-6 text-2xl font-semibold capitalize">{post.title}</h1>
      <p className="mt-4 leading-relaxed text-zinc-700">{post.body}</p>
    </main>
  );
}
