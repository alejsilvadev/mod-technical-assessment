import { getPosts } from "@/lib/posts";
import { ReadCounterBadge } from "@/components/read-counter-badge";
import { PostList } from "@/components/post-list";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
            From the API
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-stone-900">Latest posts</h1>
        </div>
        <ReadCounterBadge />
      </div>

      <PostList posts={posts} />
    </main>
  );
}
