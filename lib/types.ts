import { Plan } from "./plans";

export interface SpecialMoment {
  id: string;
  title: string;
  date: string;
  description: string;
  photo: string;
  photoFile?: File;
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
  couplePhotos?: (File | FileList)[];
  animation: string;
}

export type AnimationType =
  | "hearts"
  | "stars"
  | "bubbles"
  | "doves"
  | "sparklingHearts";
