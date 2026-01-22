"use client";

import { SpecialMoment } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import Image from "next/image";
import { Calendar } from "lucide-react";

interface TimelineProps {
  moments: SpecialMoment[];
}

export function Timeline({ moments }: TimelineProps) {
  if (moments.length === 0) return null;

  const sortedMoments = [...moments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Momentos Especiais
      </h3>
      <div className="space-y-8">
        {sortedMoments.map((moment, index) => (
          <div key={moment.id} className="relative">
            {index !== moments.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-rose-200" />
            )}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-rose-500" />
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-lg font-medium text-gray-900">
                    {moment.title}
                  </h4>
                  <time className="text-sm text-gray-500">
                    {formatDate(moment.date)}
                  </time>
                </div>
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={moment?.photoFile || ""}
                    alt={moment.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600">{moment.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
