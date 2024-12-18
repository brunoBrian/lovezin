"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PhotoSectionProps {
  isPreview?: boolean;
  photos: string[];
}

export function SliderSection({ photos, isPreview }: PhotoSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const remainingPhotos = photos.slice(1);

  useEffect(() => {
    if (remainingPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % remainingPhotos.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [remainingPhotos.length]);

  return (
    <>
      {remainingPhotos.length > 0 && (
        <div
          className={`relative h-72 m-8 ${
            !isPreview ? "md:h-[500px] md:m-auto md:max-w-[70%]" : ""
          }`}
        >
          <Image
            src={remainingPhotos[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            fill
            className={`object-cover rounded-lg transition-opacity duration-500 ${
              !isPreview ? "md:object-contain" : ""
            }`}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {remainingPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
