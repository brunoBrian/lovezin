"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ConfettiPiece } from "./confetti-piece";
import { Message } from "./message";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/lib/store/form-store";
import { resetForm } from "@/lib/store/selectors/form-selectors";
import { usePaymentStore } from "@/lib/store/payment-store";

interface CongratulationsProps {
  show: boolean;
}

export function Congratulations({ show }: CongratulationsProps) {
  const router = useRouter();
  const resetFormData = useFormStore(resetForm);

  const { setShowSuccess, setIsPaid } = usePaymentStore();

  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      color: string;
      x: number;
      delay: number;
      rotation: number;
    }>
  >([]);

  const colors = ["#ff0000", "#ffd700", "#ff69b4", "#00ff00", "#4169e1"];

  useEffect(() => {
    if (!show) return;

    // Create confetti pieces
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 100,
      delay: Math.random() * 2,
      rotation: Math.random() * 360,
    }));
    setConfetti(newConfetti);

    return () => {
      setConfetti([]);
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confetti.map((piece) => (
          <ConfettiPiece key={piece.id} {...piece} />
        ))}
      </div>
      <AnimatePresence>
        <Message
          onClose={() => {
            resetFormData();
            setShowSuccess(false);
            setIsPaid(false);
            router.push("/");
          }}
        />
      </AnimatePresence>
    </>
  );
}
