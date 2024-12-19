import { DesktopPreview } from "@/components/desktop-preview";
import { PreviewContent } from "@/components/preview-content";
import { getDemoData } from "@/lib/demo-data";

export default function MeuPreviewPage() {
  const demoData = getDemoData();

  return (
    <main className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto space-y-10 my-10">
        <DesktopPreview data={demoData} />
      </div>
    </main>
  );
}
