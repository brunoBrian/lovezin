"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { SpecialMoment } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

interface SpecialMomentFormProps {
  onAdd: (moment: SpecialMoment) => void;
  disabled: boolean;
}

export function SpecialMomentForm({ onAdd, disabled }: SpecialMomentFormProps) {
  const [photo, setPhoto] = useState<string>("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !description || !photo) return;

    onAdd({
      id: Date.now().toString(),
      title,
      date,
      description,
      photo
    });

    setTitle("");
    setDate("");
    setDescription("");
    setPhoto("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Photo</Label>
        {photo ? (
          <div className="relative group w-full h-40">
            <Image
              src={photo}
              alt="Moment preview"
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setPhoto("")}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <ImagePlus className="w-6 h-6 text-gray-400" />
          </label>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="First Date"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about this special moment..."
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={disabled || !title || !date || !description || !photo}
      >
        Add Special Moment
      </Button>
    </form>
  );
}