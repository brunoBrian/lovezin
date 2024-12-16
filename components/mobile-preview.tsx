"use client";

import { WeddingData } from "@/lib/types";
import { Heart } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { RelationshipTimer } from "./relationship-timer";
import { Timeline } from "./timeline";
import { YouTubeEmbed } from "./youtube-embed";
import { PhotoSlider } from "./photo-slider";
import Image from "next/image";
import { FloatingHearts } from "./animation/floating-hearts";
import { BeatingHeart } from "./animation/beating-heart";
import { HeartbeatLine } from "./animation/heartbeat-line";

interface MobilePreviewProps {
  data: WeddingData;
}

export function MobilePreview({ data }: MobilePreviewProps) {
  const mainPhoto = data.photos[0];
  const remainingPhotos = data.photos.slice(1);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[320px] h-[640px] bg-white rounded-[3rem] shadow-xl overflow-hidden border-8 border-gray-800 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />

        <div className="h-full overflow-y-auto">
          {mainPhoto ? (
            <div className="relative h-80">
              <Image
                src={mainPhoto}
                alt="Foto principal"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-white text-2xl font-serif">
                  Nossa História
                </h1>
              </div>
            </div>
          ) : (
            <div className="h-80 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
              <Heart className="w-16 h-16 text-rose-400" />
            </div>
          )}

          <div className="p-6 space-y-8">
            {data.coupleName && (
              <div className="text-center">
                <h2 className="text-2xl font-serif text-gray-800">
                  {data.coupleName}
                </h2>
              </div>
            )}

            {remainingPhotos.length > 0 && (
              <PhotoSlider photos={remainingPhotos} />
            )}

            {data.relationshipStartDate && (
              <div className="text-center space-y-1">
                <p className="text-lg text-gray-700">Primeiro Encontro</p>
                <p className="text-gray-600">
                  {formatDate(data.relationshipStartDate)}
                  {data.relationshipStartTime &&
                    ` às ${data.relationshipStartTime}`}
                </p>
              </div>
            )}

            {data.relationshipStartDate && (
              <RelationshipTimer
                startDate={data.relationshipStartDate}
                startTime={data.relationshipStartTime || "00:00"}
              />
            )}

            {data.message && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">{data.message}</p>
              </div>
            )}

            {data.youtubeUrl && (
              <YouTubeEmbed
                url={data.youtubeUrl}
                className="rounded-lg overflow-hidden"
              />
            )}
            <HeartbeatLine />

            {data.specialMoments.length > 0 && (
              <Timeline moments={data.specialMoments} />
            )}
          </div>
          {/* <FloatingHearts /> */}
          {/* <BeatingHeart /> */}
        </div>
      </div>
    </div>
  );
}
