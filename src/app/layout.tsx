import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip"
import Providers from "@/chords/providers";
import Link from "next/link";

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
  title: "Chord Viewer",
  description: "Interactive chord and progression visualizer",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="font-semibold text-lg">
          Chord Viewer
        </Link>
        <nav className="flex items-center gap-4 text-sm ml-auto">
          <Link href="/chords-nav" className="text-muted-foreground hover:text-foreground transition-colors">
            Chords
          </Link>
          <Link href="/progressions" className="text-muted-foreground hover:text-foreground transition-colors">
            Progressions
          </Link>
          <Link href="/fretboard" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Fretboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TooltipProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
