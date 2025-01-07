"use client";

import { create } from "zustand";

interface PaymentState {
  isPaid: boolean;
  setIsPaid: (value: boolean) => void;
  showSuccess: boolean;
  setShowSuccess: (value: boolean) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  isPaid: false,
  setIsPaid: (value) => set({ isPaid: value }),
  showSuccess: false,
  setShowSuccess: (value) => set({ showSuccess: value }),
}));
