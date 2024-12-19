"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WeddingData } from "@/lib/types";
import { isValidYoutubeUrl } from "@/lib/utils/youtube";

interface YoutubeUrlProps {
  formData: WeddingData;
  onUpdate: (data: WeddingData) => void;
}

export function YoutubeUrl({ formData, onUpdate }: YoutubeUrlProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="youtubeUrl" className="text-muted-foreground">
        URL do Vídeo no YouTube
      </Label>
      <Input
        id="youtubeUrl"
        placeholder="https://www.youtube.com/watch?v=..."
        value={formData.youtubeUrl}
        onChange={(e) => onUpdate({ ...formData, youtubeUrl: e.target.value })}
        className={`bg-secondary/50 border-primary/20 ${
          !formData.youtubeUrl || isValidYoutubeUrl(formData.youtubeUrl)
            ? ""
            : "border-destructive"
        }`}
      />
      {formData.youtubeUrl && !isValidYoutubeUrl(formData.youtubeUrl) && (
        <p className="text-sm text-destructive">
          Por favor, insira uma URL válida do YouTube
        </p>
      )}
    </div>
  );
}