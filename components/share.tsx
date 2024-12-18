"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Facebook, Zap, Twitter } from "lucide-react";
import { useState } from "react";

export function ShareSection() {
  const [copied, setCopied] = useState(false);
  const href = typeof window !== "undefined" ? window.location.href : "";
  const url = `${href}?shared=true`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar URL:", err);
    }
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2 text-gray-900">
        <Share2 className="w-5 h-5" />
        <h2 className="text-lg font-medium">Compartilhar História</h2>
      </div>

      <div className="flex gap-2">
        <Input value={url} readOnly className="bg-gray-50" />
        <Button
          variant={copied ? "outline" : "default"}
          onClick={copyToClipboard}
          className="flex-shrink-0"
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? "Copiado!" : "Copiar"}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={shareOnFacebook}>
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
        <Button variant="outline" className="flex-1" onClick={shareOnWhatsApp}>
          <Zap className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
        <Button variant="outline" className="flex-1" onClick={shareOnTwitter}>
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </Button>
      </div>
    </Card>
  );
}
