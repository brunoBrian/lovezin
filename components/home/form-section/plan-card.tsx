"use client";

import { Button } from "@/components/ui/button";
import { Check, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Plan } from "@/lib/plans";

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}

export function PlanCard({ plan, isSelected, onSelect }: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border-2 p-6 space-y-4 cursor-pointer transition-colors",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-primary/20 hover:border-primary/40"
      )}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3">
          <div className="bg-primary text-white p-1.5 rounded-full">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-xl font-medium text-primary">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary">
            R$ {plan.price.toFixed(2)}
          </span>
        </div>
      </div>

      <ul className="space-y-2">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Heart className="w-4 h-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className={cn(
          "w-full",
          isSelected
            ? "bg-primary hover:bg-primary/90"
            : "bg-secondary hover:bg-secondary/90"
        )}
      >
        {isSelected ? "Selecionado" : "Selecionar"}
      </Button>
    </div>
  );
}
