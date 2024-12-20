"use client";

import { WeddingData } from "@/lib/types";
import { DesktopPreview } from "./desktop-preview";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { RisingBubbles } from "./animation/rising-bubbles";
import { FallingStars } from "./animation/falling-stars";
import { SparklingHearts } from "./animation/sparkling-hearts";
import { HeartPing } from "./animation/floating-rings";
import { FloatingHearts } from "./animation/floating-hearts";

interface MobilePreviewProps {
  data: WeddingData;
}

function getAnimation(type: WeddingData["animation"]) {
  switch (type) {
    case "hearts":
      return <FloatingHearts />;
    case "stars":
      return <FallingStars />;
    case "bubbles":
      return <RisingBubbles />;
    case "heartPing":
      return <HeartPing />;
    case "sparklingHearts":
      return <SparklingHearts />;
    default:
      return null;
  }
}

export function MobilePreview({ data }: MobilePreviewProps) {
  return (
    <Card className="border-primary/20 w-full">
      <CardHeader className="border-b border-primary/10">
        <CardTitle className="text-2xl font-serif text-primary">
          Visualização
        </CardTitle>
      </CardHeader>

      <div className="w-full flex items-center justify-center py-10">
        <div className="w-[320px] h-[640px] bg-white rounded-[3rem] shadow-xl overflow-hidden border-8 border-gray-800 relative">
          <div className="h-full overflow-y-auto">
            <DesktopPreview data={data} isPreview />

            {getAnimation(data.animation)}
          </div>
        </div>
      </div>
    </Card>
  );
}
