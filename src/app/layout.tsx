import type { Metadata } from "next";
import { Figtree, Bodoni_Moda } from "next/font/google";
import { ReadCounterProvider } from "@/context/read-counter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOD JSON Posts",
  description: "Browse posts from the JSONPlaceholder API",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${bodoniModa.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ReadCounterProvider>
          <Navbar />
          {children}
          <Footer />
        </ReadCounterProvider>
      </body>
    </html>
  );
}
