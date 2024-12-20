"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface FallingStar {
  id: number;
  left: number;
  scale: number;
  opacity: number;
  duration: number;
}

export function FallingStars() {
  const [stars, setStars] = useState<FallingStar[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStar: FallingStar = {
        id: Date.now(),
        left: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.7,
        duration: 3 + Math.random() * 2,
      };

      setStars((prev) => [...prev, newStar]);

      setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, newStar.duration * 1000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bottom-0 text-primary animate-float"
          style={{
            left: `${star.left}%`,
            transform: `scale(${star.scale})`,
            opacity: star.opacity,
            animation: `float ${star.duration}s ease-out forwards`,
          }}
        >
          <Star className="w-6 h-6 fill-current" />
        </div>
      ))}
    </div>
  );
}
