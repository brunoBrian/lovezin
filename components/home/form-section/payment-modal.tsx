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
import { PaymentModalContent } from "./payment-modal-content";
import { PaymentResponse } from "@/services/payment/types";
import { PaymentModalForm } from "./payment-form";
import { createFormData } from "@/lib/utils/formData";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const formData = useFormStore(selectFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isFormValid = email.trim() !== "" && phone.trim() !== "";

  const handleSetStoryRequest = async () => {
    setLoading(true);

    const formattedData = createFormData(formData, email, phone);

    try {
      const pixDataResponse = await fetch("/api/story", {
        method: "POST",
        body: formattedData,
      });

      const pixData = await pixDataResponse.json();

      setSuccess(true);
      setPaymentData(pixData as unknown as PaymentResponse);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
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
