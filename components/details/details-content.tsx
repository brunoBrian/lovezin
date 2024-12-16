"use client";

import { MobilePreview } from "@/components/mobile-preview";
import { ShareSection } from "@/components/share";
import { AboutSection } from "./about-section";
import { getDemoData } from "@/lib/demo-data";

export function DetailsContent() {
  const data = getDemoData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <MobilePreview data={data} />
          </div>
          <div className="space-y-8">
            <ShareSection />
            <AboutSection />
          </div>
        </div>
      </div>
    </main>
  );
}