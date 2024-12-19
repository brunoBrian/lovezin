"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BeatingHeart } from "../animation/beating-heart";

export function Hero() {
  return (
    <section className="min-h-[50vh] flex items-center justify-center px-4 relative">
      <div className="max-w-4xl mx-auto text-center space-y-8 py-10">
        <h1 className="text-5xl md:text-6xl font-serif text-primary">
          Crie um site único para celebrar momentos inesquecíveis!
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Presenteie quem você ama ou celebre a amizade com um site exclusivo
          que conta a história de vocês, com uma linha do tempo repleta de
          momentos marcantes. Fácil, rápido e emocionante!
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/criar-historia">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <BeatingHeart />
              <span className="ml-2">Começar Agora</span>
            </Button>
          </Link>

          <Link href="/preview">
            <Button size="lg" variant="secondary">
              Ver Exemplo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
