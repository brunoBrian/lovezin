"use client";

import { useEffect, useState } from "react";
import { calculateDuration } from "@/lib/utils/time";
import { Clock } from "lucide-react";
import { HeartbeatLine } from "./animation/heartbeat-line";
import { BeatingHeart } from "./animation/beating-heart";

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-rose-600 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Tempo Juntos</span>
        </div>

        <BeatingHeart />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {duration.years > 0 && (
          <div className="bg-white rounded p-2">
            <div className="text-lg font-bold text-gray-800">
              {duration.years}
            </div>
            <div className="text-xs text-gray-500">Anos</div>
          </div>
        )}
        {duration.months > 0 && (
          <div className="bg-white rounded p-2">
            <div className="text-lg font-bold text-gray-800">
              {duration.months}
            </div>
            <div className="text-xs text-gray-500">Meses</div>
          </div>
        )}
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-gray-800">{duration.days}</div>
          <div className="text-xs text-gray-500">Dias</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-gray-800">
            {duration.hours}
          </div>
          <div className="text-xs text-gray-500">Horas</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-gray-800">
            {duration.minutes}
          </div>
          <div className="text-xs text-gray-500">Minutos</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-gray-800">
            {duration.seconds}
          </div>
          <div className="text-xs text-gray-500">Segundos</div>
        </div>
      </div>
    </div>
  );
}
