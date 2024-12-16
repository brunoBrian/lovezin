"use client";

import { Card } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { ShareButtons } from "./share-buttons";
import { UrlCopy } from "./url-copy";
import { useShareActions } from "@/hooks/use-share-actions";

export function ShareSection() {
  const {
    url,
    copied,
    copyToClipboard,
    shareOnFacebook,
    shareOnWhatsApp,
    shareOnTwitter
  } = useShareActions();

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2 text-gray-900">
        <Share2 className="w-5 h-5" />
        <h2 className="text-lg font-medium">Compartilhar História</h2>
      </div>

      <UrlCopy 
        url={url} 
        copied={copied} 
        onCopy={copyToClipboard} 
      />

      <ShareButtons
        onFacebookShare={shareOnFacebook}
        onWhatsAppShare={shareOnWhatsApp}
        onTwitterShare={shareOnTwitter}
      />
    </Card>
  );
}