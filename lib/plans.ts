export interface Plan {
  id: "basic" | "premium";
  name: string;
  price: number;
  features: string[];
  maxPhotos: number;
  specialMomentsEnabled: boolean;
}

export const BASIC_PLAN: Plan = {
  id: "basic",
  name: "Plano Básico",
  price: 8,
  features: [
    "Até 3 fotos",
    "Linha do tempo do relacionamento",
    "Vídeo do YouTube",
    "Link personalizado",
    "QR Code para compartilhar",
  ],
  maxPhotos: 3,
  specialMomentsEnabled: false,
};

export const PREMIUM_PLAN: Plan = {
  id: "premium",
  name: "Plano Premium",
  price: 15,
  features: [
    "Até 5 fotos",
    "Linha do tempo do relacionamento",
    "Momentos especiais",
    "Vídeo do YouTube",
    "Link personalizado",
    "QR Code para compartilhar",
  ],
  maxPhotos: 5,
  specialMomentsEnabled: true,
};

export const PLANS = [BASIC_PLAN, PREMIUM_PLAN];
