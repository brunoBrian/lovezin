"use client";

import { create } from "zustand";
import { WeddingData } from "@/lib/types";
import { BASIC_PLAN } from "../plans";

interface FormStore {
  formData: WeddingData;
  setFormData: (data: Partial<WeddingData>) => void;
  resetForm: () => void;
}

const initialState: WeddingData = {
  coupleName: "",
  message: "",
  photos: [],
  relationshipStartDate: "",
  relationshipStartTime: "",
  specialMoments: [],
  youtubeUrl: "",
  selectedPlan: BASIC_PLAN,
  couplePhotos: [],
  animation: "",
};

export const useFormStore = create<FormStore>((set) => ({
  formData: initialState,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ formData: initialState }),
}));
