"use client";

import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { WeddingData } from "@/lib/types";

interface PhotoGridProps {
  formData: WeddingData;
  onUpdate: (data: WeddingData) => void;
}

export function PhotoGrid({ formData, onUpdate }: PhotoGridProps) {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxPhotos = (formData?.selectedPlan?.maxPhotos as number) || 3;
    const currentPhotosLength = formData.photos.length;
    const availableSlots = maxPhotos - currentPhotosLength;

    if (availableSlots <= 0) return;

    const newFiles = Array.from(files).slice(0, availableSlots);
    const newPhotoURLs = newFiles.map((file) => URL.createObjectURL(file));

    const currentCouplePhotos = formData.couplePhotos || [];

    onUpdate({
      ...formData,
      photos: [...formData.photos, ...newPhotoURLs],
      couplePhotos: [...currentCouplePhotos, ...newFiles],
    });
  };

  const removePhoto = (index: number) => {
    onUpdate({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
      couplePhotos: (formData.couplePhotos || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-muted-foreground">
        Fotos (Máximo {formData?.selectedPlan?.maxPhotos})
      </Label>

      <div className="grid grid-cols-5 gap-4">
        {formData.photos.map((photo, index) => (
          <div key={index} className="relative group">
            <Image
              src={photo}
              alt={`Foto ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-24 object-cover rounded-lg border border-primary/20"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {formData.photos.length < (formData?.selectedPlan?.maxPhotos || 3) && (
          <label className="border-2 border-dashed border-primary/20 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <ImagePlus className="w-6 h-6 text-primary/60" />
          </label>
        )}
      </div>
    </div>
  );
}
