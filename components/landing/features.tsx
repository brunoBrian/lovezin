"use client";

import { Card } from "@/components/ui/card";
import { Palette, Share2, Clock } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Design Elegante e Personalizado",
    description: "Cada site é único e feito para você."
  },
  {
    icon: Share2,
    title: "Compartilhamento Fácil",
    description: "Use o QR code ou link para mostrar sua história a todos."
  },
  {
    icon: Clock,
    title: "Experiência Simples e Rápida",
    description: "Em poucos minutos, seu site está pronto para emocionar."
  }
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-primary mb-16">
          Por Que Escolher Nosso Serviço?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 bg-card border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-primary mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}