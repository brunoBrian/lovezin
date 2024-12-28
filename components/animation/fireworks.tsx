"use client";

import { useEffect, useState } from "react";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const colors = [
    "#ff0000",
    "#ffd700",
    "#ff69b4",
    "#00ff00",
    "#4169e1",
    "#ff0000",
    "#ffd700",
    "#ff69b4",
    "#00ff00",
    "#4169e1",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newFirework: Firework = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 60 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
      }, 1000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute animate-firework"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          <div className="relative" style={{ color: firework.color }}>
            <div className="absolute animate-spark-1 w-5 h-5 rounded-full bg-current" />
            <div className="absolute animate-spark-2 w-5 h-5 rounded-full bg-current" />
            <div className="absolute animate-spark-3 w-5 h-5 rounded-full bg-current" />
            <div className="absolute animate-spark-4 w-5 h-5 rounded-full bg-current" />
            <div className="absolute animate-spark-5 w-5 h-5 rounded-full bg-current" />
            <div className="absolute animate-spark-6 w-5 h-5 rounded-full bg-current" />
            <div className="absolute animate-spark-7 w-5 h-5 rounded-full bg-current" />
            <div className="absolute animate-spark-8 w-5 h-5 rounded-full bg-current" />
          </div>
        </div>
      ))}
    </div>
  );
}
