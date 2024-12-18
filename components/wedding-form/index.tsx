"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeddingData } from "@/lib/types";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { isValidYoutubeUrl } from "@/lib/utils/youtube";

interface WeddingFormProps {
  formData: WeddingData;
  setFormData: (data: WeddingData) => void;
}

export function WeddingForm({ formData, setFormData }: WeddingFormProps) {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).slice(0, 5 - formData.photos.length);
    const photoURLs = newPhotos.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      photos: [...formData.photos, ...photoURLs].slice(0, 5),
    });
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      youtubeUrl: url,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">
          Nossa História de Amor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="coupleName">Nome do Casal</Label>
          <Input
            id="coupleName"
            placeholder="João & Maria"
            value={formData.coupleName}
            onChange={(e) =>
              setFormData({ ...formData, coupleName: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="relationshipStartDate">Quando se conheceram?</Label>
            <Input
              id="relationshipStartDate"
              type="date"
              value={formData.relationshipStartDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  relationshipStartDate: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationshipStartTime">Que horas?</Label>
            <Input
              id="relationshipStartTime"
              type="time"
              value={formData.relationshipStartTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  relationshipStartTime: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Sua História</Label>
          <Textarea
            id="message"
            placeholder="Conte sua história de amor..."
            className="min-h-[120px]"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtubeUrl">URL do Vídeo no YouTube</Label>
          <Input
            id="youtubeUrl"
            placeholder="https://www.youtube.com/watch?v=..."
            value={formData.youtubeUrl}
            onChange={handleYoutubeUrlChange}
            className={
              !formData.youtubeUrl || isValidYoutubeUrl(formData.youtubeUrl)
                ? ""
                : "border-red-500"
            }
          />
          {formData.youtubeUrl && !isValidYoutubeUrl(formData.youtubeUrl) && (
            <p className="text-sm text-red-500">
              Por favor, insira uma URL válida do YouTube
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Label>Fotos (Máximo 5)</Label>
          <div className="grid grid-cols-5 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <Image
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {formData.photos.length < 5 && (
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <ImagePlus className="w-6 h-6 text-gray-400" />
              </label>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
