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
import { useState } from "react";
import { useFormStore } from "@/lib/store/form-store";
import { selectFormData } from "@/lib/store/selectors/form-selectors";
import { setStoryRequest } from "@/services/story";
import { PaymentModalContent } from "./payment-modal-content";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const formData = useFormStore(selectFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setStory = async () => {
    setLoading(true);

    const formDatas = new FormData();

    formDatas.append("coupleName", formData.coupleName);
    formDatas.append("message", formData.message);
    formDatas.append("relationshipStartDate", formData.relationshipStartDate);
    formDatas.append("relationshipStartTime", formData.relationshipStartTime);
    formDatas.append("selectedPlan", JSON.stringify(formData.selectedPlan));
    formDatas.append("youtubeUrl", formData.youtubeUrl);
    formDatas.append(
      "animation",
      formData.animation === "none" ? "" : formData.animation
    );

    formData?.couplePhotos?.forEach((image) => {
      formDatas.append("storyImages", image as File);
    });

    if (formData?.specialMoments.length) {
      formData.specialMoments.forEach((moment, index) => {
        // Adiciona os dados do momento (sem o arquivo)
        formDatas.append(
          `specialMoments[${index}]`,
          JSON.stringify({
            id: moment.id,
            title: moment.title,
            date: moment.date,
            description: moment.description,
          })
        );

        if (moment.photoFile) {
          formDatas.append(
            `specialMoments[${index}][photoFile]`,
            moment.photoFile
          );
        }
      });
    }

    try {
      await setStoryRequest(formDatas);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary text-center">
            Pagamento via Pix
          </DialogTitle>

          <DialogDescription className="text-center">
            {!success
              ? "Clique no botão abaixo para gerar o QR Code do Pix"
              : "Escaneie o QR Code ou copie o código Pix para realizar o pagamento"}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <PaymentModalContent />
        ) : (
          <div className="sm:max-w-md overflow-auto max-h-[90vh]">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={setStory}
              disabled={loading}
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
