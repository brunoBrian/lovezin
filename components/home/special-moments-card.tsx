"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SpecialMomentForm } from "@/components/special-moment-form";
import { SpecialMomentsList } from "@/components/special-moments-list";
import { SpecialMoment } from "@/lib/types";

interface SpecialMomentsCardProps {
  moments: SpecialMoment[];
  onAdd: (moment: SpecialMoment) => void;
  onDelete: (id: string) => void;
}

export function SpecialMomentsCard({
  moments,
  onAdd,
  onDelete
}: SpecialMomentsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Momentos Especiais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecialMomentForm 
          onAdd={onAdd}
          disabled={moments.length >= 5}
        />
        {moments.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Momentos Adicionados
              </h3>
              <SpecialMomentsList 
                moments={moments}
                onDelete={onDelete}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}