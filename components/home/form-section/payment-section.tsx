"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { PaymentModal } from "./payment-modal";

export function PaymentSection() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
            <p className="text-muted-foreground">
              Ao clicar em &quot;Finalizar&quot;, você será redirecionado para o
              pagamento via Pix. Após a confirmação, enviaremos o link do seu
              site por e-mail em até 5 minutos.
            </p>
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => setShowPaymentModal(true)}
            >
              <Heart className="w-4 h-4 mr-2" />
              Finalizar e Pagar
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
