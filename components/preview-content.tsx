"use client";

import { useEffect, useState } from "react";
import { WeddingData } from "@/lib/types";
import { getDemoData } from "@/lib/demo-data";
import { DesktopPreview } from "./desktop-preview";

export function PreviewContent({ id }: { id: string }) {
  const [data, setData] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos dados
    // Em um ambiente real, isso viria de uma API/banco de dados
    const loadData = async () => {
      setLoading(true);
      try {
        const demoData = getDemoData();
        setData(demoData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-rose-600">Carregando...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-gray-600">História não encontrada</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 w-full">
      <div className="max-w-7xl mx-auto space-y-10">
        <DesktopPreview data={data} />
        {/* <ShareSection /> */}
      </div>
    </main>
  );
}
