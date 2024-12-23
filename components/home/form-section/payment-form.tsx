"use client";

import { Input } from "@/components/ui/input";

type PaymentModalFormProps = {
  setEmail: (e: string) => void;
  setPhone: (e: string) => void;
};

export function PaymentModalForm({
  setEmail,
  setPhone,
}: PaymentModalFormProps) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="email"
          required
          className="bg-secondary/50 border-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Input
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone/Whatsapp"
          required
          className="bg-secondary/50 border-primary/20"
        />
      </div>
    </form>
  );
}
