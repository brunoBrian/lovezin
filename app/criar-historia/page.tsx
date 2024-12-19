"use client";

import { useState } from "react";
import { SpecialMoment, WeddingData } from "@/lib/types";
import { FloatingHearts } from "@/components/animation/floating-hearts";
import { FormSection } from "@/components/home/form-section";
import { PreviewSection } from "@/components/home/preview-section";
import { PaymentSection } from "@/components/home/form-section/payment-section";

export default function CreatePage() {
  const [formData, setFormData] = useState<WeddingData>({
    coupleName: "",
    message: "",
    photos: [],
    relationshipStartDate: "",
    relationshipStartTime: "",
    specialMoments: [],
    youtubeUrl: "",
  });

  const handleAddMoment = (moment: SpecialMoment) => {
    setFormData((prev) => ({
      ...prev,
      specialMoments: [...prev.specialMoments, moment].slice(0, 5),
    }));
  };

  const handleDeleteMoment = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      specialMoments: prev.specialMoments.filter((moment) => moment.id !== id),
    }));
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormSection
              formData={formData}
              onFormChange={setFormData}
              onAddMoment={handleAddMoment}
              onDeleteMoment={handleDeleteMoment}
            />
            <PaymentSection />
          </div>

          <PreviewSection data={formData} />
        </div>
      </div>
    </main>
  );
}
