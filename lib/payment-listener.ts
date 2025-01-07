"use client";

import { usePaymentStore } from "./store/payment-store";

export async function startPaymentListener(payment_id: string) {
  const { setShowSuccess } = usePaymentStore.getState();

  // Start polling the payment status endpoint
  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/pagamento/check/${payment_id}`
      );

      const data = await response.json();

      if (data.status === "approved") {
        setShowSuccess(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking payment status:", error);
      return false;
    }
  };

  // Poll every 3 seconds
  const interval = setInterval(async () => {
    const isPaid = await checkPaymentStatus();
    if (isPaid) {
      clearInterval(interval);
    }
  }, 3000);

  // Clean up interval after 10 minutes
  setTimeout(() => clearInterval(interval), 600000);
}
