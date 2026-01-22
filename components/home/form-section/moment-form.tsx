"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { SpecialMoment } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

interface MomentFormProps {
  onAdd: (moment: SpecialMoment) => void;
  disabled: boolean;
}

export function MomentForm({ onAdd, disabled }: MomentFormProps) {
  const [photo, setPhoto] = useState<string>("");
  const [fileBuffer, setFileBuffer] = useState<File>(new File([], ""));
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setFileBuffer(file);
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
      photo,
      photoFile: fileBuffer,
    });

    setTitle("");
    setDate("");
    setDescription("");
    setPhoto("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Foto</Label>
        {photo ? (
          <div className="relative group w-full h-40">
            <Image
              src={photo}
              alt="Preview do momento"
              fill
              className="object-cover rounded-lg border border-primary/20"
            />
            <button
              type="button"
              onClick={() => setPhoto("")}
              className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-primary/20 rounded-lg h-40 flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <ImagePlus className="w-6 h-6 text-primary/60" />
          </label>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-muted-foreground">
          Título
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Primeiro Encontro"
          required
          className="bg-secondary/50 border-primary/20"
          maxLength={50}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date" className="text-muted-foreground">
          Data
        </Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="bg-secondary/50 border-primary/20"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-muted-foreground">
          Descrição
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Conte sobre este momento especial..."
          required
          className="bg-secondary/50 border-primary/20"
          maxLength={1000}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={disabled || !title || !date || !description || !photo}
      >
        Adicionar Momento Especial
      </Button>
    </form>
  );
}
