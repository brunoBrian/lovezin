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
  const aaa = await getStoryByIdRequest(id);

  console.log(aaa);

  if (!aaa.id) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto space-y-10 my-10">
        <DesktopPreview
          data={{
            animation: "none",
            coupleName: aaa.coupleName,
            photos: aaa.storyImages,
            message: aaa.message,
            relationshipStartDate: aaa.relationshipStartDate,
            relationshipStartTime: aaa.relationshipStartTime,
            selectedPlan: aaa.selectedPlan as unknown as Plan,
            specialMoments: aaa.specialMoments,
            youtubeUrl: aaa.youtubeUrl,
            couplePhotos: [],
          }}
        />
      </div>
    </main>
  );
}
