"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

export function FAQItem({ question, answer, index }: FAQItemProps) {
  return (
    <AccordionItem value={`item-${index}`} className="bg-card border-primary/20">
      <AccordionTrigger className="text-primary px-6">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground px-6 pb-4">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}