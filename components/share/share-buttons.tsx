"use client";

import { Button } from "@/components/ui/button";
import { Facebook, WhatsApp, Twitter } from "lucide-react";

interface ShareButtonsProps {
  onFacebookShare: () => void;
  onWhatsAppShare: () => void;
  onTwitterShare: () => void;
}

export function ShareButtons({
  onFacebookShare,
  onWhatsAppShare,
  onTwitterShare
}: ShareButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex-1"
        onClick={onFacebookShare}
      >
        <Facebook className="w-4 h-4 mr-2" />
        Facebook
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={onWhatsAppShare}
      >
        <WhatsApp className="w-4 h-4 mr-2" />
        WhatsApp
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={onTwitterShare}
      >
        <Twitter className="w-4 h-4 mr-2" />
        Twitter
      </Button>
    </div>
  );
}