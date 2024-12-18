"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo demora para receber o site pronto?",
    answer:
      "Após o pagamento via Pix ser confirmado, o link é enviado para seu e-mail em até 5 minutos.",
  },
  {
    question: "O que posso adicionar na linha do tempo?",
    answer:
      "Você pode incluir datas, descrições e fotos que marcaram sua história juntos.",
  },
  {
    question: "O QR code expira?",
    answer:
      "Não, o QR code é permanente e pode ser usado sempre que quiser compartilhar seu site.",
  },
  {
    question: "Posso editar o site depois de pronto?",
    answer:
      "Por enquanto, o site não permite edições após a criação. Certifique-se de revisar as informações antes de finalizar!",
  },
  {
    question: "Como é feito o pagamento?",
    answer: "O pagamento é realizado de forma segura e rápida via Pix.",
  },
  {
    question: "Como o link do site será entregue?",
    answer:
      "Você receberá o link e o QR code no e-mail cadastrado ao finalizar o processo.",
  },
  {
    question: "É necessário ter conhecimentos técnicos para usar o serviço?",
    answer:
      "Não, nossa plataforma é super intuitiva e qualquer pessoa pode criar seu site em poucos minutos.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-primary mb-16">
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border-primary/20"
            >
              <AccordionTrigger className="text-primary px-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-6 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
