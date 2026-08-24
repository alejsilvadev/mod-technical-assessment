import type { Metadata } from "next";
import Link from "next/link";
import { Figtree } from "next/font/google";
import { ReadCounterProvider } from "@/context/read-counter";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOD JSON Posts",
  description: "Browse posts from the JSONPlaceholder API",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ReadCounterProvider>
          <header className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex w-full max-w-2xl items-center px-6 py-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm font-semibold tracking-tight text-stone-900">
                  MOD JSON Posts
                </span>
              </Link>
            </div>
          </header>
          {children}
        </ReadCounterProvider>
      </body>
    </html>
  );
}
