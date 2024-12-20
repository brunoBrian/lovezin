export interface SpecialMoment {
  id: string;
  title: string;
  date: string;
  description: string;
  photo: string;
}

export interface StoryResponse {
  id: string;
  coupleName: string;
  message: string;
  relationshipStartDate: string;
  relationshipStartTime: string;
  selectedPlan: string;
  youtubeUrl: string;
  animation: string;
  specialMoments: SpecialMoment[];
  storyImages: string[];
  uuid: string;
  createdAt: string;
}
