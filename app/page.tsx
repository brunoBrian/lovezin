"use client";

import { useState } from "react";
import { WeddingData, SpecialMoment } from "@/lib/types";
import { FormSection } from "@/components/home/form-section";
import { PreviewSection } from "@/components/home/preview-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState<WeddingData>({
    coupleName: "",
    message: "",
    photos: [],
    relationshipStartDate: "",
    relationshipStartTime: "",
    specialMoments: [],
    youtubeUrl: "",
  });

  const handleAddMoment = (moment: SpecialMoment) => {
    setFormData((prev) => ({
      ...prev,
      specialMoments: [...prev.specialMoments, moment].slice(0, 5),
    }));
  };

  const handleDeleteMoment = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      specialMoments: prev.specialMoments.filter((moment) => moment.id !== id),
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <FormSection
            formData={formData}
            onFormChange={setFormData}
            onAddMoment={handleAddMoment}
            onDeleteMoment={handleDeleteMoment}
          />
          <PreviewSection data={formData} />
        </div>
      </div>
    </main>
  );
}
