import { getPosts } from "@/lib/posts";
import { ReadCounterBadge } from "@/components/read-counter-badge";
import { PostList } from "@/components/post-list";
import { LogoReveal } from "@/components/logo-reveal";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <LogoReveal />

      <section id="about" className="mx-auto w-full max-w-2xl px-6 py-24">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-700">About</p>
        <h2 className="mt-2 text-2xl font-semibold text-stone-900">More soon.</h2>
        <p className="mt-4 max-w-prose leading-relaxed text-stone-600">
          This section is still being written.
        </p>
      </section>

      <main id="assessment" className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-brand-700">
              From the API
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-stone-900">Latest posts</h1>
          </div>
          <ReadCounterBadge />
        </div>

        <PostList posts={posts} />
      </main>
    </>
  );
}
