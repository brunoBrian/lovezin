"use client";

import { BeatingHeart } from "@/components/animation/beating-heart";
import { FloatingHearts } from "@/components/animation/floating-hearts";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { IdealFor } from "@/components/landing/ideal-for";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="relative">
        <FloatingHearts />

        <Hero />

        <HowItWorks />

        <Features />

        <IdealFor />

        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif text-primary">Comece Agora!</h2>
            <p className="text-lg text-muted-foreground">
              Clique no botão abaixo, preencha os momentos mais importantes e
              crie um site inesquecível para seu amor.
            </p>
            <div className="flex justify-center">
              <Link href="/criar-historia">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <BeatingHeart />
                  <span className="ml-2">Criar Minha História</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FAQ />
      </div>
    </main>
  );
}
