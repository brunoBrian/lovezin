"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WeddingData } from "@/lib/types";

interface CoupleInfoProps {
  formData: WeddingData;
  onUpdate: (data: WeddingData) => void;
}

export function CoupleInfo({ formData, onUpdate }: CoupleInfoProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="coupleName" className="text-muted-foreground">
        Nome das pessoas
      </Label>
      <Input
        id="coupleName"
        placeholder="João & Maria"
        value={formData.coupleName}
        onChange={(e) => onUpdate({ ...formData, coupleName: e.target.value })}
        className="bg-secondary/50 border-primary/20"
      />
    </div>
  );
}
