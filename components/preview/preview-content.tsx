"use client";

import { useEffect, useState } from "react";
import { WeddingData } from "@/lib/types";
import { MobilePreview } from "@/components/mobile-preview";
import { getDemoData } from "@/lib/demo-data";
import { PreviewSidebar } from "./preview-sidebar";
import { Loading } from "./loading";
import { Error } from "./error";
import { PreviewLayout } from "./preview-layout";

export function PreviewContent({ id }: { id: string }) {
  const [data, setData] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const demoData = getDemoData(id);
        setData(demoData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <Error message="História não encontrada" />;
  }

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