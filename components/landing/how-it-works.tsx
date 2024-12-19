"use client";

import { Card } from "@/components/ui/card";
import { FileEdit, Eye, Wallet, Link as LinkIcon } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    title: "Preencha os Momentos",
    description:
      "Adicione datas, fotos e descrições que marcaram sua história.",
  },
  {
    icon: Eye,
    title: "Visualize em Tempo Real",
    description: "Veja o site ganhando vida enquanto preenche o formulário.",
  },
  {
    icon: Wallet,
    title: "Pagamento Simples",
    description: "Faça o pagamento de forma prática via Pix.",
  },
  {
    icon: LinkIcon,
    title: "Receba o Link Personalizado",
    description:
      "Após a confirmação, enviamos o site pronto e um QR code para você compartilhar.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-primary mb-16">
          Como Funciona?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 bg-card border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
