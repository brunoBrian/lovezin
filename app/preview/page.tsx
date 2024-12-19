"use client";

import { useEffect, useState } from "react";
import { WeddingData } from "@/lib/types";
import { getDemoData } from "@/lib/demo-data";

import { DesktopPreview } from "@/components/desktop-preview";

export default function Preview() {
  const demoData = getDemoData();

  return (
    <main className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto space-y-10 my-10">
        <DesktopPreview data={demoData} />
      </div>
    </main>
  );
}
