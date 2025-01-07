"use client";

import { usePaymentStore } from "./store/payment-store";

export async function startPaymentListener(pixCode: string) {
  const { setShowSuccess } = usePaymentStore.getState();

  // Start polling the payment status endpoint
  const checkPaymentStatus = async () => {
    try {
      const response = await fetch("/api/payment/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pixCode }),
      });

      const data = await response.json();

      if (data.status === "paid") {
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
