"use client";

import { useEffect, useState } from "react";
import { Circle } from "lucide-react";

interface Bubble {
  id: number;
  left: number;
  scale: number;
  opacity: number;
  duration: number;
}

export function RisingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBubble: Bubble = {
        id: Date.now(),
        left: Math.random() * 100,
        scale: 0.3 + Math.random() * 0.4,
        opacity: 0.2 + Math.random() * 0.5,
        duration: 4 + Math.random() * 3,
      };

      setBubbles((prev) => [...prev, newBubble]);

      setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, newBubble.duration * 1000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 text-primary/30 animate-float"
          style={{
            left: `${bubble.left}%`,
            transform: `scale(${bubble.scale})`,
            opacity: bubble.opacity,
            animation: `float ${bubble.duration}s ease-out forwards`,
          }}
        >
          <Circle className="w-6 h-6 fill-current" />
        </div>
      ))}
    </div>
  );
}
