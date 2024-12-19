"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, AlertCircle } from "lucide-react";
import { useState } from "react";
import { isFormComplete } from "@/lib/utils/form-validation";
import { useFormStore } from "@/lib/store/form-store";
import { selectFormData } from "@/lib/store/selectors/form-selectors";
import { Plan } from "@/lib/plans";
import { PaymentModal } from "./payment-modal";

interface PaymentSectionProps {
  plan: Plan;
}

export function PaymentSection({ plan }: PaymentSectionProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const formData = useFormStore(selectFormData);
  const isComplete = isFormComplete(formData);

  return (
    <>
      <Card className="border-primary/20">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="text-2xl font-serif text-primary">
            Finalizar e Pagar
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total a pagar:</span>
              <span className="text-2xl font-bold text-primary">
                R$ {plan.price.toFixed(2)}
              </span>
            </div>

            {!isComplete && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm text-destructive">
                  <p className="font-medium">
                    Preencha todos os campos obrigatórios:
                  </p>
                  <ul className="list-disc list-inside mt-1">
                    {!formData.coupleName && <li>Nome do casal</li>}
                    {!formData.relationshipStartDate && (
                      <li>Data do primeiro encontro</li>
                    )}
                    {!formData.relationshipStartTime && (
                      <li>Horário do primeiro encontro</li>
                    )}
                    {!formData.message && <li>Sua história</li>}
                    {formData.photos.length === 0 && (
                      <li>Pelo menos uma foto</li>
                    )}
                    {formData.selectedPlan?.specialMomentsEnabled &&
                      formData.specialMoments.length === 0 && (
                        <li>Pelo menos um momento especial</li>
                      )}
                  </ul>
                </div>
              </div>
            )}

            <p className="text-muted-foreground">
              Ao clicar em "Finalizar", você será redirecionado para o pagamento
              via Pix. Após a confirmação, enviaremos o link do seu site por
              e-mail em até 5 minutos.
            </p>

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => setShowPaymentModal(true)}
              disabled={!isComplete}
            >
              <Heart className="w-4 h-4 mr-2" />
              {isComplete ? "Finalizar e Pagar" : "Preencha todos os campos"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
      />
    </>
  );
}
