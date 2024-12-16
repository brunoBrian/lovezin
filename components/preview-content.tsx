"use client";

import { useEffect, useState } from "react";
import { WeddingData } from "@/lib/types";
import { MobilePreview } from "@/components/mobile-preview";
import { ShareSection } from "@/components/share";
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
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <MobilePreview data={data} />
          </div>
          <div className="space-y-8">
            <ShareSection />
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <h2 className="text-2xl font-serif text-gray-900">
                Sobre esta História
              </h2>
              <p className="text-gray-600">
                Esta é uma história de amor especial, compartilhada com carinho.
                Você pode criar a sua própria história clicando no botão abaixo.
              </p>
              <a
                href="/"
                className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
              >
                Criar Minha História
              </a>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
          <DesktopPreview data={data} />
        </div>
      </div>
    </main>
  );
}
