"use client";

import { Heart } from "lucide-react";

export function BeatingHeart() {
  return (
    <div className="relative">
      <Heart className="w-8 h-8 text-primary fill-current animate-heartbeat" />
      <div className="absolute inset-0 animate-pulse-ring">
        <Heart className="w-8 h-8 text-primary/30" />
      </div>
    </div>
  );
}
