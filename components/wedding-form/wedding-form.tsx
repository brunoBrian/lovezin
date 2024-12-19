"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeddingData } from "@/lib/types";
import { CoupleInfo } from "./components/couple-info";
import { DateTimeFields } from "./components/date-time-fields";
import { StoryMessage } from "./components/story-message";
import { YoutubeUrl } from "./components/youtube-url";
import { PhotoGrid } from "./components/photo-grid";

interface WeddingFormProps {
  formData: WeddingData;
  onFormChange: (data: WeddingData) => void;
}

export function WeddingForm({ formData, onFormChange }: WeddingFormProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="border-b border-primary/10">
        <CardTitle className="text-2xl font-serif text-primary">
          Nossa História de Amor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <CoupleInfo formData={formData} onUpdate={onFormChange} />
        <DateTimeFields formData={formData} onUpdate={onFormChange} />
        <StoryMessage formData={formData} onUpdate={onFormChange} />
        <YoutubeUrl formData={formData} onUpdate={onFormChange} />
        <PhotoGrid formData={formData} onUpdate={onFormChange} />
      </CardContent>
    </Card>
  );
}
