"use client";

import { useState } from "react";
import { ImageLightbox } from "./image-lightbox";
import { WeddingData } from "@/lib/types";
import { PhotoSection } from "@/components/mobile-preview/photo-section";
import { RelationshipTimer } from "@/components/relationship-timer";
import { Timeline } from "@/components/timeline";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { formatDate } from "@/lib/utils/date";
import { SliderSection } from "./mobile-preview/slider-section";
import { FallingStars } from "./animation/falling-stars";
import { FloatingHearts } from "./animation/floating-hearts";
import { HeartPing } from "./animation/floating-rings";
import { RisingBubbles } from "./animation/rising-bubbles";
import { SparklingHearts } from "./animation/sparkling-hearts";
import { Confetti } from "./animation/confetti";
import { Fireworks } from "./animation/fireworks";

interface DesktopPreviewProps {
  data: WeddingData;
  isPreview?: boolean;
}

function getAnimation(type: WeddingData["animation"]) {
  switch (type) {
    case "hearts":
      return <FloatingHearts />;
    case "stars":
      return <FallingStars />;
    case "confetti":
      return <Confetti />;
    case "firework":
      return <Fireworks />;
    case "bubbles":
      return <RisingBubbles />;
    case "heartPing":
      return <HeartPing />;
    case "sparklingHearts":
      return <SparklingHearts />;
    case "firework":
      return <Fireworks />;
    case "confetti":
      return <Confetti />;
    default:
      return null;
  }
}

export function DesktopPreview({
  data,
  isPreview = false,
}: DesktopPreviewProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-full md:rounded-xl shadow-xl overflow-hidden">
      <div className={`relative ${!isPreview ? "md:hidden" : ""}`}>
        <PhotoSection
          mainPhoto={data.photos[0]}
          onImageClick={setSelectedImage}
        />
      </div>

      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        {data.coupleName && (
          <div className="text-center">
            <h2 className="text-4xl font-serif text-gray-800">
              {data.coupleName}
            </h2>
          </div>
        )}
      </div>

      {data.photos.length > 0 && (
        <div className={`relative ${isPreview ? "aspect-video" : ""}`}>
          <SliderSection
            photos={data.photos}
            isPreview={isPreview}
            onImageClick={setSelectedImage}
          />
        </div>
      )}

      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        <div className={`grid gap-8 ${!isPreview ? "md:grid-cols-2" : ""}`}>
          <div className="space-y-8">
            {data.relationshipStartDate && (
              <div className="text-center space-y-1">
                <p className="text-xl text-gray-700">Primeiro Encontro</p>
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
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  {data.message}
                </p>
              </div>
            )}

            {data.youtubeUrl && (
              <YouTubeEmbed
                url={data.youtubeUrl}
                className="rounded-lg overflow-hidden"
                isPreview={isPreview}
              />
            )}
          </div>

          <div className="space-y-8">
            {data.specialMoments.length > 0 && (
              <Timeline
                moments={data.specialMoments}
                onImageClick={setSelectedImage}
              />
            )}
          </div>
        </div>

        <div
          className={`h-full w-full inset-0 pointer-events-none ${
            !isPreview ? "fixed" : ""
          }`}
        >
          {data.animation && getAnimation(data.animation)}
        </div>
      </div>

      <ImageLightbox
        src={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
