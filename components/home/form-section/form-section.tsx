"use client";

import { WeddingForm } from "@/components/wedding-form";
import { SpecialMomentsCard } from "@/components/home/special-moments-card";
import { ShareSection } from "@/components/share";
import { WeddingData, SpecialMoment } from "@/lib/types";

interface FormSectionProps {
  formData: WeddingData;
  onFormChange: (data: WeddingData) => void;
  onAddMoment: (moment: SpecialMoment) => void;
  onDeleteMoment: (id: string) => void;
}

export function FormSection({
  formData,
  onFormChange,
  onAddMoment,
  onDeleteMoment,
}: FormSectionProps) {
  return (
    <div className="space-y-8">
      <WeddingForm formData={formData} onFormChange={onFormChange} />
      <SpecialMomentsCard
        moments={formData.specialMoments}
        onAdd={onAddMoment}
        onDelete={onDeleteMoment}
      />
      <ShareSection />
    </div>
  );
}
