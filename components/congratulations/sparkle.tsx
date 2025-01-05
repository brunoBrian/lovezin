"use client";

interface SparkleProps {
  size: number;
  style: React.CSSProperties;
}

export function Sparkle({ size, style }: SparkleProps) {
  return (
    <div
      className="absolute animate-sparkle"
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full text-primary animate-spin-slow"
      >
        <path
          d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
