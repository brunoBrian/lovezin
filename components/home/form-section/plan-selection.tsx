"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart } from "lucide-react";
import { WeddingData } from "@/lib/types";
import { PLANS } from "@/lib/plans";
import { PlanCard } from "./plan-card";

interface PlanSelectionProps {
  formData: WeddingData;
  onFormChange: (data: WeddingData) => void;
}

export function PlanSelection({ formData, onFormChange }: PlanSelectionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="plans" className="border-primary/20">
        <AccordionTrigger className="px-6 py-4 bg-card hover:bg-secondary/50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-serif text-primary">
              {formData.selectedPlan
                ? `${
                    formData.selectedPlan.name
                  } - R$ ${formData.selectedPlan.price.toFixed(2)}`
                : "Escolha seu Plano"}
            </h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-6 px-6 pb-6 border border-t-0 border-primary/20 rounded-b-lg">
          <div className="grid md:grid-cols-2 gap-4">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isSelected={formData.selectedPlan?.id === plan.id}
                onSelect={() => {
                  const updatedPhotos =
                    plan.id === "basic"
                      ? formData.photos.slice(0, 3)
                      : formData.photos;

                  const updatedMoments =
                    plan.id === "basic" ? [] : formData.specialMoments;

                  onFormChange({
                    ...formData,
                    selectedPlan: plan,
                    photos: updatedPhotos,
                    specialMoments: updatedMoments,
                  });
                }}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
