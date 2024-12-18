import { Plan } from "./plans";

export interface SpecialMoment {
  id: string;
  title: string;
  date: string;
  description: string;
  photo: string;
}

export interface WeddingData {
  coupleName: string;
  message: string;
  photos: string[];
  relationshipStartDate: string;
  relationshipStartTime: string;
  specialMoments: SpecialMoment[];
  youtubeUrl: string;
  selectedPlan?: Plan;
}
