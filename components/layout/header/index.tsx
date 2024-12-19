"use client";

import { Logo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-center max-w-6xl mx-auto">
        <Logo />
      </div>
    </header>
  );
}
