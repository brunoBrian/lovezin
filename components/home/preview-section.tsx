"use client";

import { MobilePreview } from "@/components/mobile-preview";
import { WeddingData } from "@/lib/types";
import { Button } from "../ui/button";

interface PreviewSectionProps {
  data: WeddingData;
}

export function PreviewSection({ data }: PreviewSectionProps) {
  return (
    <div className="lg:sticky lg:top-8 flex flex-col items-center gap-4 lg:h-[calc(100vh-4rem)]">
      <MobilePreview data={data} />
    </div>
  );
}
