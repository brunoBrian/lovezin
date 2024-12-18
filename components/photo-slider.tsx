"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoSliderProps {
  photos: string[];
  interval?: number;
}

export function PhotoSlider({ photos, interval = 3000 }: PhotoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [photos.length, interval]);

  if (photos.length === 0) return null;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((current) => (current - 1 + photos.length) % photos.length);
  };

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % photos.length);
  };

  return (
    <div className="relative h-80 group">
      <Image
        src={photos[currentIndex]}
        alt={`Foto ${currentIndex + 1}`}
        fill
        className="object-cover transition-opacity duration-500"
      />

      {photos.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentIndex === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
