import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { ReadCounterBadge } from "@/components/read-counter-badge";

export default async function Home() {
  const posts = await getPosts(10);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <ReadCounterBadge />
      </header>

      <ul className="divide-y divide-zinc-200">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="block py-4 capitalize text-zinc-800 hover:text-blue-600"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
