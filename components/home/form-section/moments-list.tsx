"use client";

import { SpecialMoment } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MomentsListProps {
  moments: SpecialMoment[];
  onDelete: (id: string) => void;
}

export function MomentsList({ moments, onDelete }: MomentsListProps) {
  if (moments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum momento especial adicionado ainda
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {moments.map((moment) => (
          <div
            key={moment.id}
            className="flex gap-4 p-4 bg-card rounded-lg border border-primary/20"
          >
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={moment.photo}
                alt={moment.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-primary">{moment.title}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  onClick={() => onDelete(moment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <time className="text-sm text-muted-foreground">
                {formatDate(moment.date)}
              </time>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {moment.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}