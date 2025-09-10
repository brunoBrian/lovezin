"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStore } from "@/lib/store/form-store";
import { selectFormData } from "@/lib/store/selectors/form-selectors";
import { PaymentModalContent } from "./payment-modal-content";
import { PaymentResponse } from "@/services/payment/types";
import { PaymentModalForm } from "./payment-form";
import { createFormData } from "@/lib/utils/formData";

import { Plan } from "@/lib/plans";
import { startPaymentListener } from "@/lib/payment-listener";
import { usePaymentStore } from "@/lib/store/payment-store";
import imageCompression from "browser-image-compression";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const formData = useFormStore(selectFormData);
  const setFormData = useFormStore((state) => state.setFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const showSuccess = usePaymentStore((state) => state.showSuccess);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isFormValid = email.trim() !== "" && phone.trim() !== "";

  const compressImage = async (imageFile: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return imageFile; // Return original if compression fails
    }
  };

  const handleSetStoryRequest = async () => {
    setLoading(true);

    const compressedCouplePhotos = await Promise.all(
      (formData.couplePhotos || []).map(compressImage)
    );

    const compressedSpecialMoments = await Promise.all(
      (formData.specialMoments || []).map(async (moment) => {
        if (moment.photoFile) {
          const compressedPhoto = await compressImage(moment.photoFile);
          return { ...moment, photoFile: compressedPhoto };
        }
        return moment;
      })
    );

    const updatedFormData = {
      ...formData,
      couplePhotos: compressedCouplePhotos,
      specialMoments: compressedSpecialMoments,
    };

    const formattedData = createFormData(updatedFormData, email, phone);

    try {
      const pixDataResponse = await fetch("/api/story", {
        method: "POST",
        body: formattedData,
      });

      if (!pixDataResponse.ok) {
        const errorText = await pixDataResponse.text();
        throw new Error(
          `Erro ${pixDataResponse.status}: ${pixDataResponse.statusText} - ${errorText}`
        );
      }

      let pixData;
      try {
        pixData = await pixDataResponse.json();
      } catch (jsonError) {
        throw new Error("Erro ao converter resposta da API para JSON.");
      }

      if (pixData.payment_id) {
        setSuccess(true);
        setPaymentData(pixData as unknown as PaymentResponse);

        setTimeout(() => {
          startPaymentListener(pixData.payment_id);
        }, 1500);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);

      // Exibe erro de forma mais legível
      alert(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      onOpenChange(false);
    }
  }, [showSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary text-center">
            Pagamento via Pix
          </DialogTitle>

          {!success && !paymentData?.qrCode ? (
            <DialogDescription className="text-center space-y-4">
              <p>
                Preencha os dados e clique no botão abaixo para gerar o QR Code
                do Pix
              </p>

              <PaymentModalForm setEmail={setEmail} setPhone={setPhone} />
            </DialogDescription>
          ) : (
            <DialogDescription className="text-center">
              Escaneie o QR Code ou copie o código Pix para realizar o pagamento
            </DialogDescription>
          )}
        </DialogHeader>

        {success && paymentData?.qrCode ? (
          <PaymentModalContent paymentData={paymentData} />
        ) : (
          <div className="sm:max-w-md overflow-auto max-h-[90vh]">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleSetStoryRequest}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando QR Code...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar QR Code do Pix
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
