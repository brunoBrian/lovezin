"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface SparklingHeart {
  id: number;
  left: number;
  top: number;
  scale: number;
  opacity: number;
  duration: number;
}

export function SparklingHearts() {
  const [hearts, setHearts] = useState<SparklingHeart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: SparklingHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        scale: 0.2 + Math.random() * 0.3,
        opacity: 0.3 + Math.random() * 0.7,
        duration: 1.5 + Math.random() * 1,
      };

      setHearts((prev) => [...prev, newHeart]);

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
          className="absolute text-primary animate-pulse"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            transform: `scale(${heart.scale})`,
            opacity: heart.opacity,
            animation: `pulse ${heart.duration}s ease-in-out infinite`,
          }}
        >
          <Heart className="w-10 h-10 fill-current" />
        </div>
      ))}
    </div>
  );
}
