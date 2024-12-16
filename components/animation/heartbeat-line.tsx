"use client";

export function HeartbeatLine() {
  return (
    <div className="relative h-20 w-full overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 25"
      >
        <path
          d="M0 12.5 L20 12.5 L25 0 L30 25 L35 12.5 L100 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary animate-heartbeat-line"
        />
      </svg>
    </div>
  );
}
