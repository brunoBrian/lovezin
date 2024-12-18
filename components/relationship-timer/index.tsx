"use client";

import { useEffect, useState } from "react";
import { calculateDuration } from "@/lib/utils/time";
import { Clock } from "lucide-react";
import { DurationDisplay } from "./duration-display";

interface RelationshipTimerProps {
  startDate: string;
  startTime: string;
}

export function RelationshipTimer({
  startDate,
  startTime,
}: RelationshipTimerProps) {
  const [duration, setDuration] = useState(
    calculateDuration(startDate, startTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(calculateDuration(startDate, startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, startTime]);

  if (!duration) return null;

  return (
    <div className="bg-rose-50 rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2 text-rose-600 mb-2">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">Tempo Juntos</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {duration.years > 0 && (
          <DurationDisplay value={duration.years} label="Anos" />
        )}
        {duration.months > 0 && (
          <DurationDisplay value={duration.months} label="Meses" />
        )}
        <DurationDisplay value={duration.days} label="Dias" />
        <DurationDisplay value={duration.hours} label="Horas" />
        <DurationDisplay value={duration.minutes} label="Minutos" />
        <DurationDisplay value={duration.seconds} label="Segundos" />
      </div>
    </div>
  );
}
