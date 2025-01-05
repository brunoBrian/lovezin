import { WeddingData } from "@/lib/types";

export const selectFormData = (state: { formData: WeddingData }) =>
  state.formData;
export const selectSelectedPlan = (state: { formData: WeddingData }) =>
  state.formData.selectedPlan;
export const selectPhotos = (state: { formData: WeddingData }) =>
  state.formData.photos;
export const selectSpecialMoments = (state: { formData: WeddingData }) =>
  state.formData.specialMoments;
export const resetForm = (state: { resetForm: () => void }) => state.resetForm;
