"use client";

import { WeddingData } from "@/lib/types";
import { PhotoSection } from "./photo-section";
import { RelationshipTimer } from "@/components/relationship-timer";
import { Timeline } from "@/components/timeline";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { formatDate } from "@/lib/utils/date";

interface MobilePreviewProps {
  data: WeddingData;
}

export function MobilePreview({ data }: MobilePreviewProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[320px] h-[640px] bg-white rounded-[3rem] shadow-xl overflow-hidden border-8 border-gray-800 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />
        
        <div className="h-full overflow-y-auto">
          <PhotoSection mainPhoto={data.photos[0]} photos={data.photos} />

          <div className="p-6 space-y-8">
            {data.coupleName && (
              <div className="text-center">
                <h2 className="text-2xl font-serif text-gray-800">{data.coupleName}</h2>
              </div>
            )}

            {data.relationshipStartDate && (
              <div className="text-center space-y-1">
                <p className="text-lg text-gray-700">Primeiro Encontro</p>
                <p className="text-gray-600">
                  {formatDate(data.relationshipStartDate)}
                  {data.relationshipStartTime && ` às ${data.relationshipStartTime}`}
                </p>
              </div>
            )}

            {data.relationshipStartDate && (
              <RelationshipTimer 
                startDate={data.relationshipStartDate}
                startTime={data.relationshipStartTime || '00:00'}
              />
            )}

            {data.message && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">{data.message}</p>
              </div>
            )}

            {data.youtubeUrl && (
              <YouTubeEmbed url={data.youtubeUrl} className="rounded-lg overflow-hidden" />
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