"use client";

interface DurationDisplayProps {
  value: number;
  label: string;
}

export function DurationDisplay({ value, label }: DurationDisplayProps) {
  return (
    <div className="bg-white rounded p-2">
      <div className="text-lg font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}