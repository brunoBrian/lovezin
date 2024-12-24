import { SpecialMoment } from "@/lib/types";

export interface SpecialMomentBody {
  amount: number;
  description: string;
  email: string;
  uuid: string;
}

export interface PaymentResponse {
  qrCode: string;
  pixKey: string;
  pixKeyBase64: string;
  ticket_url: string;
}
