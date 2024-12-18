"use client";

import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./faq-item";
import { faqData } from "./faq-data";

export function FAQList() {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqData.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          index={index}
        />
      ))}
    </Accordion>
  );
}