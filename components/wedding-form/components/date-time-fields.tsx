"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WeddingData } from "@/lib/types";
import { getDisabledDays } from "@/lib/utils/date";
import { useState, useEffect } from "react";

interface DateTimeFieldsProps {
  formData: WeddingData;
  onUpdate: (data: WeddingData) => void;
}

export function DateTimeFields({ formData, onUpdate }: DateTimeFieldsProps) {
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const formattedDate = today.toISOString().split("T")[0];
    setMaxDate(formattedDate);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 items-end">
      <div className="space-y-2">
        <Label
          htmlFor="relationshipStartDate"
          className="text-muted-foreground"
        >
          Quando se conheceram?
        </Label>
        <Input
          id="relationshipStartDate"
          type="date"
          value={formData.relationshipStartDate}
          onChange={(e) =>
            onUpdate({ ...formData, relationshipStartDate: e.target.value })
          }
          className="bg-secondary/50 border-primary/20"
          max={maxDate}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="relationshipStartTime"
          className="text-muted-foreground"
        >
          Que horas?
        </Label>
        <Input
          id="relationshipStartTime"
          type="time"
          value={formData.relationshipStartTime}
          onChange={(e) =>
            onUpdate({ ...formData, relationshipStartTime: e.target.value })
          }
          className="bg-secondary/50 border-primary/20"
        />
      </div>
    </div>
  );
}
