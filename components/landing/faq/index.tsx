"use client";

import { FAQList } from "./faq-list";

export function FAQ() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-primary mb-16">
          Perguntas Frequentes
        </h2>
        <FAQList />
      </div>
    </section>
  );
}