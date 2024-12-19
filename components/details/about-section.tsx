"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export function AboutSection() {
  return (
    <Card className="p-6 space-y-4 bg-white border-none">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-rose-500" />
        <h2 className="text-2xl font-serif text-gray-900">
          Sobre esta História
        </h2>
      </div>

      <p className="text-gray-600">
        Esta é uma história de amor especial, compartilhada com carinho. Cada
        momento capturado representa uma memória única e preciosa desta jornada
        de amor.
      </p>

      <p className="text-gray-600">
        Você também pode criar sua própria história de amor e compartilhar com
        pessoas especiais. Clique no botão e surpreenda seu amor!
      </p>

      <Link href="/" className="block">
        <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
          <Heart className="w-4 h-4 mr-2" />
          Criar Minha História
        </Button>
      </Link>
    </Card>
  );
}
