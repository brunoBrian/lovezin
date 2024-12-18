"use client";

import { Card } from "@/components/ui/card";
import { Gift, Heart, Save } from "lucide-react";

const ideals = [
  {
    icon: Gift,
    title: "Presentes Especiais",
    description: "Perfeito para aniversários de namoro ou casamento."
  },
  {
    icon: Heart,
    title: "Surpresas Românticas",
    description: "Ideal para ocasiões especiais e momentos únicos."
  },
  {
    icon: Save,
    title: "Memórias Digitais",
    description: "Guarde suas memórias de forma digital e elegante."
  }
];

export function IdealFor() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-primary mb-16">
          Ideal Para...
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ideals.map((ideal, index) => (
            <Card key={index} className="p-8 bg-card border-primary/20 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <ideal.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-primary mb-4">{ideal.title}</h3>
              <p className="text-muted-foreground">{ideal.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}