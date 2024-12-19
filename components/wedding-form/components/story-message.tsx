"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WeddingData } from "@/lib/types";

interface StoryMessageProps {
  formData: WeddingData;
  onUpdate: (data: WeddingData) => void;
}

export function StoryMessage({ formData, onUpdate }: StoryMessageProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="message" className="text-muted-foreground">
        Sua História
      </Label>
      <Textarea
        id="message"
        placeholder="Conte sua história de amor..."
        className="min-h-[120px] bg-secondary/50 border-primary/20"
        value={formData.message}
        onChange={(e) => onUpdate({ ...formData, message: e.target.value })}
      />
    </div>
  );
}