import { getPosts } from "@/lib/posts";
import { ReadCounterBadge } from "@/components/read-counter-badge";
import { PostCarousel } from "@/components/post-carousel";
import { LogoReveal } from "@/components/logo-reveal";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <LogoReveal />

      <section id="about" className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p className="font-sans text-[18px] font-bold uppercase leading-[28px] text-brand-700">
              About
            </p>
            <p className="mt-4 text-2xl leading-relaxed text-stone-600">
              I started out building with Legos, piecing together little worlds brick by
              brick. These days I build websites and digital experiences instead, but the
              instinct is the same: take small parts and put them together into something
              that works.
            </p>
          </div>
          <div />
        </div>
      </section>

      <main id="assessment" className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[18px] font-bold uppercase leading-[28px] text-brand-700">
              From the API
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-stone-900">Latest posts</h1>
          </div>
          <ReadCounterBadge />
        </div>

        <PostCarousel posts={posts} />
      </main>
    </>
  );
}
