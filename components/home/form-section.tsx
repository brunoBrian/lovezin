"use client";

import { WeddingData } from "@/lib/types";
import { PaymentSection } from "./form-section/payment-section";
import { PlanSelection } from "./form-section/plan-selection";
import { WeddingForm } from "../wedding-form";
import { SpecialMomentsForm } from "./form-section/special-moments-form";

interface FormSectionProps {
  formData: WeddingData;
  onFormChange: (data: WeddingData) => void;
}

export function FormSection({ formData, onFormChange }: FormSectionProps) {
  return (
    <div className="space-y-8">
      <PlanSelection formData={formData} onFormChange={onFormChange} />
      <WeddingForm formData={formData} onFormChange={onFormChange} />

      {formData.selectedPlan?.specialMomentsEnabled && (
        <SpecialMomentsForm formData={formData} onFormChange={onFormChange} />
      )}

      {formData.selectedPlan && <PaymentSection plan={formData.selectedPlan} />}
    </div>
  );
}
