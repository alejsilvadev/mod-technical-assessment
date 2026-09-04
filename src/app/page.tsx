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
                I show up motivated, and I like being part of a team that pushes each
                other to do better work. I care about getting the details right, from
                the logic to the layout to the small interactions most people never
                notice. Give me something to build and I&apos;m all in.
              </p>
            </>
          }
          rightSlot={
            <>
              <p className="font-sans text-[18px] font-bold uppercase leading-[28px] text-brand-700">
                Approach
              </p>
              <p className="mt-4 text-2xl leading-relaxed text-stone-600">
                I start with the vision, then break it down into the parts that actually
                make it work. The structure, the flow, the screens, the little
                interactions that make something feel finished. Piece by piece, that
                vision turns into a real digital experience people can use.
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
