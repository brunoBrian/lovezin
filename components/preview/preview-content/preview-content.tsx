"use client";

import { MobilePreview } from "@/components/mobile-preview";
import { PreviewSidebar } from "../preview-sidebar";
import { PreviewLayout } from "../preview-layout";
import { getDemoData } from "@/lib/demo-data";

export function PreviewContent() {
  const data = getDemoData();

  return (
    <PreviewLayout>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
          <MobilePreview data={data} />
        </div>
        <PreviewSidebar />
      </div>
    </PreviewLayout>
  );
}