"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimationType } from "@/lib/types";
import { Heart, Star, Circle, Bird, Sparkles } from "lucide-react";
import { useFormStore } from "@/lib/store/form-store";

const animations = [
  { value: "none", label: "Selecionar", icon: null },
  { value: "hearts", label: "Corações Flutuantes", icon: Heart },
  { value: "stars", label: "Estrelas Cadentes", icon: Star },
  { value: "bubbles", label: "Bolhas Subindo", icon: Circle },
  { value: "heartPing", label: "Coraões Pulsantes", icon: Heart },
  { value: "sparklingHearts", label: "Corações Cintilantes", icon: Sparkles },
] as const;

export function AnimationSelect() {
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);

  const handleValueChange = (value: AnimationType) => {
    setFormData({ animation: value });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="animation" className="text-muted-foreground">
        Animação do Fundo
      </Label>
      <Select
        value={formData.animation || undefined}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          id="animation"
          className="bg-secondary/50 border-primary/20"
        >
          <SelectValue placeholder="Escolha uma animação" />
        </SelectTrigger>
        <SelectContent>
          {animations.map(({ value, label, icon: Icon }) => (
            <SelectItem key={value} value={value}>
              <div className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
