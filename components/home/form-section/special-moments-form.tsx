"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WeddingData, SpecialMoment } from "@/lib/types";
import { MomentForm } from "./moment-form";
import { MomentsList } from "./moments-list";

interface SpecialMomentsFormProps {
  formData: WeddingData;
  onFormChange: (data: WeddingData) => void;
}

export function SpecialMomentsForm({
  formData,
  onFormChange,
}: SpecialMomentsFormProps) {
  const handleAddMoment = (moment: SpecialMoment) => {
    onFormChange({
      ...formData,
      specialMoments: [...formData.specialMoments, moment].slice(0, 5),
    });
  };

  const handleDeleteMoment = (id: string) => {
    onFormChange({
      ...formData,
      specialMoments: formData.specialMoments.filter(
        (moment) => moment.id !== id
      ),
    });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="border-b border-primary/10">
        <CardTitle className="text-2xl font-serif text-primary">
          Momentos Especiais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <MomentForm
          onAdd={handleAddMoment}
          disabled={formData.specialMoments.length >= 5}
        />
        {formData.specialMoments.length > 0 && (
          <>
            <Separator className="bg-primary/10" />
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">
                Momentos Adicionados
              </h3>
              <MomentsList
                moments={formData.specialMoments}
                onDelete={handleDeleteMoment}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
