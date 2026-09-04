import { getPosts } from "@/lib/posts";
import { ReadCounterBadge } from "@/components/read-counter-badge";
import { PostCarousel } from "@/components/post-carousel";
import { LogoReveal } from "@/components/logo-reveal";
import { WireframeSphereLoader } from "@/components/wireframe-sphere-loader";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <LogoReveal />

      <section id="about" className="mx-auto w-full max-w-6xl px-6">
        <WireframeSphereLoader
          backgroundClassName="bg-background"
          showScrollCue={false}
          leftSlot={
            <>
              <p className="font-sans text-[18px] font-bold uppercase leading-[28px] text-brand-700">
                About
              </p>
              <p className="mt-4 text-2xl leading-relaxed text-stone-600">
                I started out building with Legos, piecing together little worlds brick by
                brick. These days I build websites and digital experiences instead, but the
                instinct is the same: take small parts and put them together into something
                that works.
              </p>
            </>
          }
          rightSlot={
            <>
              <p className="font-sans text-[18px] font-bold uppercase leading-[28px] text-brand-700">
                Approach
              </p>
              <p className="mt-4 text-2xl leading-relaxed text-stone-600">
                I care about the details most people scroll past — the easing on a hover
                state, the way a layout still breathes at 375px. Good software feels
                inevitable once it&apos;s done; getting there is the part I actually enjoy.
              </p>
            </>
          }
        />
      </section>

      <main
        id="assessment"
        className="mx-auto flex min-h-screen w-full max-w-6xl flex-1 flex-col justify-center px-6 py-12"
      >
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
