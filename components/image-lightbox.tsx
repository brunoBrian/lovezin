"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageLightboxProps {
  src: string | null;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  src,
  alt = "Imagem expandida",
  isOpen,
  onClose,
}: ImageLightboxProps) {
  if (!src) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-black/90 border-none sm:rounded-none md:rounded-lg overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="95vw"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
