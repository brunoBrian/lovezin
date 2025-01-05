"use client";

import { Input } from "@/components/ui/input";
import { utilsPhoneWithDDD } from "@/lib/mask";

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
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="bg-secondary/50 border-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Input
          required
          id="phone"
          placeholder="Telefone/Whatsapp"
          className="bg-secondary/50 border-primary/20"
          onChange={(e) => {
            e.target.value = utilsPhoneWithDDD.masked(e.target.value);
            setPhone(e.target.value);
          }}
        />
      </div>
    </form>
  );
}
