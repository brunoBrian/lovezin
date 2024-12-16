"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";

interface UrlCopyProps {
  url: string;
  copied: boolean;
  onCopy: () => void;
}

export function UrlCopy({ url, copied, onCopy }: UrlCopyProps) {
  return (
    <div className="flex gap-2">
      <Input value={url} readOnly className="bg-gray-50" />
      <Button
        variant={copied ? "success" : "secondary"}
        onClick={onCopy}
        className="flex-shrink-0"
      >
        <Copy className="w-4 h-4 mr-2" />
        {copied ? "Copiado!" : "Copiar"}
      </Button>
    </div>
  );
}