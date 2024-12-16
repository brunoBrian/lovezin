"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  scale: number;
  opacity: number;
  duration: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.7,
        duration: 3 + Math.random() * 2,
      };

      setHearts((prev) => [...prev, newHeart]);

      // Remove hearts after animation completes
      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 300);

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
          <Heart className="w-10 h-10 fill-current" />
        </div>
      ))}
    </div>
  );
}
