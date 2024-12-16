"use client";

import { WeddingData } from "@/lib/types";
import { PhotoSection } from "@/components/mobile-preview/photo-section";
import { RelationshipTimer } from "@/components/relationship-timer";
import { Timeline } from "@/components/timeline";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { formatDate } from "@/lib/utils/date";

interface DesktopPreviewProps {
  data: WeddingData;
}

export function DesktopPreview({ data }: DesktopPreviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="aspect-video relative">
        <PhotoSection mainPhoto={data.photos[0]} photos={data.photos} />
      </div>

      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        {data.coupleName && (
          <div className="text-center">
            <h2 className="text-4xl font-serif text-gray-800">
              {data.coupleName}
            </h2>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
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
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  {data.message}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {data.youtubeUrl && (
              <YouTubeEmbed
                url={data.youtubeUrl}
                className="rounded-lg overflow-hidden"
              />
            )}

            {data.specialMoments.length > 0 && (
              <Timeline moments={data.specialMoments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
