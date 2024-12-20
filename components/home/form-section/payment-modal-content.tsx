"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useFormStore } from "@/lib/store/form-store";
import { selectFormData } from "@/lib/store/selectors/form-selectors";

export function PaymentModalContent() {
  const formData = useFormStore(selectFormData);
  const [copied, setCopied] = useState(false);
  const pixCode =
    "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Fulano de Tal6008BRASILIA62070503***6304E2CA";

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar código Pix:", err);
    }
  };

  return (
    <DialogContent className="sm:max-w-md overflow-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-serif text-primary text-center">
          Pagamento via Pix
        </DialogTitle>
        <DialogDescription className="text-center">
          Escaneie o QR Code ou copie o código Pix para realizar o pagamento
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 bg-white p-4 rounded-lg">
            <Image
              src="https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Fulano de Tal6008BRASILIA62070503***6304E2CA"
              alt="QR Code Pix"
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <QrCode className="w-4 h-4" />
            <span>Código Pix</span>
          </div>
          <div className="flex gap-2">
            <code className="flex-1 p-2 bg-secondary/50 rounded-md text-xs break-all">
              {pixCode}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={copyPixCode}
              className="flex-shrink-0"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Após o pagamento, você receberá o link do seu site por e-mail em até
            5 minutos.
          </p>
          <p className="text-sm font-medium text-primary">
            Valor: R$ {formData?.selectedPlan?.price.toFixed(2)}
          </p>
        </div>
      </div>
    </DialogContent>
  );
}
