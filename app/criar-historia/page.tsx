"use client";

import { useState } from "react";
import { SpecialMoment, WeddingData } from "@/lib/types";
import { FloatingHearts } from "@/components/animation/floating-hearts";
import { FormSection } from "@/components/home/form-section";
import { PreviewSection } from "@/components/home/preview-section";
import { PaymentSection } from "@/components/home/form-section/payment-section";
import { useFormStore } from "@/lib/store/form-store";
import { selectFormData } from "@/lib/store/selectors/form-selectors";

export default function CreatePage() {
  const formData = useFormStore(selectFormData);
  const setFormData = useFormStore((state) => state.setFormData);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <FormSection formData={formData} onFormChange={setFormData} />

          <PreviewSection data={formData} />
        </div>
      </div>
    </main>
  );
}
