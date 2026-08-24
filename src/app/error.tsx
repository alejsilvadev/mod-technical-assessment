"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <p className="text-zinc-700">Couldn&apos;t load the posts.</p>
      <button
        onClick={reset}
        className="mt-4 rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
      >
        try again
      </button>
    </main>
  );
}
