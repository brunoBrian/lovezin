"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WeddingData } from "@/lib/types";

interface DateTimeFieldsProps {
  formData: WeddingData;
  onUpdate: (data: WeddingData) => void;
}

export function DateTimeFields({ formData, onUpdate }: DateTimeFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="relationshipStartDate" className="text-muted-foreground">
          Quando se conheceram?
        </Label>
        <Input
          id="relationshipStartDate"
          type="date"
          value={formData.relationshipStartDate}
          onChange={(e) => onUpdate({ ...formData, relationshipStartDate: e.target.value })}
          className="bg-secondary/50 border-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="relationshipStartTime" className="text-muted-foreground">
          Que horas?
        </Label>
        <Input
          id="relationshipStartTime"
          type="time"
          value={formData.relationshipStartTime}
          onChange={(e) => onUpdate({ ...formData, relationshipStartTime: e.target.value })}
          className="bg-secondary/50 border-primary/20"
        />
      </div>
    </div>
  );
}