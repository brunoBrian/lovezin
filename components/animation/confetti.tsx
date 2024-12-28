"use client";

import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  x: number;
  rotation: number;
  color: string;
  size: number;
  speed: number;
}

export function Confetti() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const colors = [
    "#ff0000",
    "#ffd700",
    "#ff69b4",
    "#00ff00",
    "#4169e1",
    "#9400d3",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newConfetti: Confetti = {
        id: Date.now(),
        x: Math.random() * 100,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 1 + 2,
      };

      setConfetti((prev) => [...prev, newConfetti]);

      setTimeout(() => {
        setConfetti((prev) => prev.filter((c) => c.id !== newConfetti.id));
      }, 3000);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: "-5%",
            transform: `rotate(${piece.rotation}deg) scale(${piece.size})`,
            animation: `confetti ${piece.speed}s linear forwards`,
            backgroundColor: piece.color,
            width: "8px",
            height: "16px",
          }}
        />
      ))}
    </div>
  );
}
