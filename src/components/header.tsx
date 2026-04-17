"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLeftHanded } from "@/chords/providers/left-handed-provider";
import { Toggle } from "@/components/ui/toggle";

const navItems = [
  { href: "/chords-nav", label: "Chords" },
  { href: "/progressions", label: "Progressions" },
  { href: "/fretboard", label: "Fretboard", mobile: false },
  { href: "/metro-trainer", label: "Trainer", mobile: false },
  { href: "/terms", label: "Terms", mobile: false },
];

export function Header() {
  const pathname = usePathname();
  const { isLeftHanded, toggleLeftHanded } = useLeftHanded();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="font-semibold text-lg">
          Chord Viewer
        </Link>
        <nav className="flex items-center gap-1 text-sm ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                item.mobile === false && "hidden sm:block"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-3 pl-3 border-l">
          <Toggle
            pressed={isLeftHanded}
            onPressedChange={toggleLeftHanded}
            aria-label="Toggle left-handed mode"
            className="h-8 w-8 p-0"
          >
            <Hand className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </header>
  );
}
