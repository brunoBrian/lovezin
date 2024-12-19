import { WeddingData } from "@/lib/types";

export function isFormComplete(formData: WeddingData): boolean {
  const requiredFields = [
    formData.coupleName,
    formData.relationshipStartDate,
    formData.relationshipStartTime,
    formData.message,
    formData.photos.length > 0,
    formData.selectedPlan,
  ];

  // Check if all required fields are filled
  const basicFieldsComplete = requiredFields.every(Boolean);

  // If premium plan is selected, check if special moments are valid
  if (formData.selectedPlan?.specialMomentsEnabled) {
    return basicFieldsComplete && formData.specialMoments.length > 0;
  }

  return basicFieldsComplete;
}
