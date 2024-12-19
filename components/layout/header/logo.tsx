"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity"
    >
      <Heart className="w-6 h-6 fill-current" />
      <span className="text-2xl font-serif">Recordar.me</span>
    </Link>
  );
}
