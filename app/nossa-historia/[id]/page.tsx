import NotFound from "@/app/not-found";
import { DesktopPreview } from "@/components/desktop-preview";
import { getDemoData } from "@/lib/demo-data";
import { Plan } from "@/lib/plans";
import { getStoryByIdRequest } from "@/services/story";

export default async function MeuPreviewPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const storyData = await getStoryByIdRequest(id);

  if (!storyData.id) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto space-y-10 my-10">
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
      </div>
    </main>
  );
}
