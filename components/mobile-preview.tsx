"use client";

import { WeddingData } from "@/lib/types";
import { DesktopPreview } from "./desktop-preview";

interface MobilePreviewProps {
  data: WeddingData;
}

export function MobilePreview({ data }: MobilePreviewProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[320px] h-[640px] bg-white rounded-[3rem] shadow-xl overflow-hidden border-8 border-gray-800 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />

        <div className="h-full overflow-y-auto">
          <DesktopPreview data={data} isPreview />
        </div>
      </div>
    </div>
  );
}
