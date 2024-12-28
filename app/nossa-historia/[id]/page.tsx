"use client";

import NotFound from "@/app/not-found";
import { BeatingHeart } from "@/components/animation/beating-heart";
import { HeartPing } from "@/components/animation/floating-rings";
import { DesktopPreview } from "@/components/desktop-preview";
import { getDemoData } from "@/lib/demo-data";
import { Plan } from "@/lib/plans";
import { getStoryByIdRequest } from "@/services/story";
import { StoryResponse } from "@/services/story/types";
import { useEffect, useState } from "react";

export default function MeuPreviewPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [storyData, setStoryData] = useState<StoryResponse | null>(null);

  useEffect(() => {
    getStoryByIdRequest(id).then((data) => {
      setStoryData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id || (storyData && !storyData?.id)) {
    return <NotFound />;
  }

  if (!storyData) {
    return (
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4 flex items-center flex-col">
            <BeatingHeart />
            <p className="text-4xl font-serif text-primary">
              Aguarde, estamos carregando sua história
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto space-y-10 my-10">
        {storyData && (
          <DesktopPreview
            data={{
              animation: storyData.animation,
              coupleName: storyData.coupleName,
              photos: storyData.storyImages,
              message: storyData.message,
              relationshipStartDate: storyData.relationshipStartDate,
              relationshipStartTime: storyData.relationshipStartTime,
              selectedPlan: storyData.selectedPlan as unknown as Plan,
              specialMoments: storyData.specialMoments,
              youtubeUrl: storyData.youtubeUrl,
              couplePhotos: [],
            }}
          />
        )}
      </div>
    </main>
  );
}
