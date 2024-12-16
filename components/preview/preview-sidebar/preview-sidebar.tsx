"use client";

import { ShareSection } from "@/components/share";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

export function PreviewSidebar() {
  return (
    <div className="space-y-8">
      <ShareSection />
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <h2 className="text-2xl font-serif text-gray-900">Sobre esta História</h2>
        </div>
        
        <p className="text-gray-600">
          Esta é uma história de amor especial, compartilhada com carinho.
          Você pode criar a sua própria história clicando no botão abaixo.
        </p>

        <Link href="/" className="block">
          <Button 
            className="w-full bg-rose-600 hover:bg-rose-700 text-white"
          >
            <Heart className="w-4 h-4 mr-2" />
            Criar Minha História
          </Button>
        </Link>
      </Card>
    </div>
  );
}