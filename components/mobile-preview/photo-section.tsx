"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface PhotoSectionProps {
  mainPhoto?: string;
  photos: string[];
}

export function PhotoSection({ mainPhoto, photos }: PhotoSectionProps) {
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
      {mainPhoto ? (
        <div className="relative h-80">
          <Image
            src={mainPhoto}
            alt="Foto principal"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-white text-2xl font-serif">Nossa História</h1>
          </div>
        </div>
      ) : (
        <div className="h-80 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
          <Heart className="w-16 h-16 text-rose-400" />
        </div>
      )}

      {remainingPhotos.length > 0 && (
        <div className="relative h-60 mt-4">
          <Image
            src={remainingPhotos[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            fill
            className="object-cover rounded-lg transition-opacity duration-500"
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