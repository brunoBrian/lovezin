"use client";

interface ConfettiPieceProps {
  color: string;
  x: number;
  delay: number;
  rotation: number;
}

export function ConfettiPiece({
  color,
  x,
  delay,
  rotation,
}: ConfettiPieceProps) {
  return (
    <div
      className="absolute w-2 h-4 animate-confetti"
      style={
        {
          backgroundColor: color,
          left: `${x}%`,
          top: "-5%",
          animationDelay: `${delay}s`,
          "--rotation": `${rotation}deg`,
        } as React.CSSProperties
      }
    />
  );
}
