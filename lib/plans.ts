export interface Plan {
  id: "basic" | "ultimate" | "premium" | "deluxe";
  name: string;
  price: number;
  features: string[];
  maxPhotos: number;
  specialMomentsEnabled: boolean;
  maxSpecialMomentsPhotos: number;
  youtubeVideoEnabled: boolean;
}

export const BASIC_PLAN: Plan = {
  id: "basic",
  name: "Plano Básico",
  price: 8,
  features: [
    "Até 3 fotos",
    "Contador de dias",
    "Animação",
    "Link personalizado",
    "QR Code para compartilhar",
    "Expiração em 1 ano",
  ],
  maxPhotos: 3,
  specialMomentsEnabled: false,
  youtubeVideoEnabled: false,
  maxSpecialMomentsPhotos: 0,
};

export const PREMIUM_PLAN: Plan = {
  id: "premium",
  name: "Plano Premium",
  price: 10,
  features: [
    "Até 5 fotos",
    "Contador de dias",
    "Animação",
    "Vídeo do YouTube",
    "Link personalizado",
    "QR Code para compartilhar",
    "Expiração em 1 ano",
  ],
  maxPhotos: 5,
  specialMomentsEnabled: false,
  youtubeVideoEnabled: true,
  maxSpecialMomentsPhotos: 0,
};

export const DELUXE_PLAN: Plan = {
  id: "deluxe",
  name: "Plano Deluxe",
  price: 15,
  features: [
    "Até 5 fotos",
    "Contador de dias",
    "Animação",
    "Vídeo do YouTube",
    "Até 3 Momentos especiais",
    "Link personalizado",
    "QR Code para compartilhar",
    "Para sempre",
  ],
  maxPhotos: 5,
  maxSpecialMomentsPhotos: 3,
  specialMomentsEnabled: true,
  youtubeVideoEnabled: true,
};

export const ULTIMATE_PLAN: Plan = {
  id: "ultimate",
  name: "Plano Ultimate",
  price: 20,
  features: [
    "Até 7 fotos",
    "Contador de dias",
    "Animação",
    "Vídeo do YouTube",
    "Até 5 Momentos especiais",
    "Link personalizado",
    "QR Code para compartilhar",
    "Para sempre",
  ],
  maxPhotos: 7,
  maxSpecialMomentsPhotos: 5,
  specialMomentsEnabled: true,
  youtubeVideoEnabled: true,
};

export const PLANS = [BASIC_PLAN, PREMIUM_PLAN, DELUXE_PLAN, ULTIMATE_PLAN];
