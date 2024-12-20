"use client";

import { FloatingHearts } from "@/components/animation/floating-hearts";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary relative">
      <FloatingHearts />
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <Heart className="w-16 h-16 text-primary mx-auto" />
            <h1 className="text-4xl font-serif text-primary">
              História Não Encontrada
            </h1>
            <p className="text-muted-foreground">
              Desculpe, mas não encontramos a história que você está procurando.
              Ela pode ter sido removida ou o link está incorreto.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Heart className="w-4 h-4 mr-2" />
                Criar Minha História
              </Button>
            </Link>

            <Link href="/preview">
              <Button variant="outline" className="w-full">
                Ver Exemplo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
