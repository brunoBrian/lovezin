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

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/story/upload/image`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Falha no upload da imagem");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Erro no upload:", error);
      throw error;
    }
  };

  const handleSetStoryRequest = async () => {
    setLoading(true);

    try {
      // 1. Process Couple Photos
      const couplePhotoUrls: string[] = [];
      const allCouplePhotos: File[] = [];

      (formData.couplePhotos || []).forEach((item) => {
        if (item instanceof File) {
          allCouplePhotos.push(item);
        } else if (item instanceof FileList) {
          for (let i = 0; i < item.length; i++) {
            allCouplePhotos.push(item[i]);
          }
        }
      });

      // Sequential Upload for Couple Photos
      for (const photo of allCouplePhotos) {
        const compressed = await compressImage(photo);
        const url = await uploadImage(compressed);
        couplePhotoUrls.push(url);
      }

      // 2. Process Special Moments
      const updatedMoments = [];
      for (const moment of formData.specialMoments || []) {
        let photoUrl = moment.photo; // Keep existing URL if string

        if (moment.photoFile instanceof File) {
          const compressedPhoto = await compressImage(moment.photoFile);
          photoUrl = await uploadImage(compressedPhoto);
        }

        const { photoFile, ...rest } = moment;
        updatedMoments.push({ ...rest, photo: photoUrl, photoFile: undefined });
      }

      // 3. Prepare Final Payload (JSON)
      const payload = {
        ...formData,
        couplePhotos: [],
        storyImages: couplePhotoUrls,
        specialMoments: updatedMoments,
        email,
        phone,
      };

      console.log(
        "SENDING PAYLOAD TO /api/story:",
        JSON.stringify(payload, null, 2),
      );
      console.log("Couple Photo URLs:", couplePhotoUrls);

      const response = await fetch("/api/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro ${response.status}: ${response.statusText} - ${errorText}`,
        );
      }

      const pixData = await response.json();

      if (pixData.payment_id) {
        setSuccess(true);
        setPaymentData(pixData as unknown as PaymentResponse);

        setTimeout(() => {
          startPaymentListener(pixData.payment_id);
        }, 1500);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
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
