"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

interface PhotoSectionProps {
  mainPhoto?: string;
}

export function PhotoSection({ mainPhoto }: PhotoSectionProps) {
  return (
    <>
      {mainPhoto ? (
        <div className="relative h-80">
          <Image
            src={mainPhoto}
            alt="Foto principal"
            fill
            className="object-cover"
            priority
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
    </>
  );
}
