import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <p className="text-zinc-700">That post doesn&apos;t exist.</p>
      <Link href="/" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
        &larr; back to posts
      </Link>
    </main>
  );
}
