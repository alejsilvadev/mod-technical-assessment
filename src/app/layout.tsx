import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReadCounterProvider } from "@/context/read-counter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSONPlaceholder Posts",
  description: "Browse posts from the JSONPlaceholder API",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReadCounterProvider>{children}</ReadCounterProvider>
      </body>
    </html>
  );
}
