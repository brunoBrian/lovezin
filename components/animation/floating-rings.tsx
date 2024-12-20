"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  scale: number;
  opacity: number;
  duration: number;
  flap: boolean;
}

export function HeartPing() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * 100,
        scale: 0.4 + Math.random() * 0.3,
        opacity: 0.4 + Math.random() * 0.6,
        duration: 8 + Math.random() * 2,
        flap: true,
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 text-primary animate-float"
          style={{
            left: `${heart.left}%`,
            transform: `scale(${heart.scale})`,
            opacity: heart.opacity,
            animation: `float ${heart.duration}s ease-out forwards`,
          }}
        >
          <Heart className="w-8 h-8 fill-red-800 animate-ping" />
        </div>
      ))}
    </div>
  );
}
