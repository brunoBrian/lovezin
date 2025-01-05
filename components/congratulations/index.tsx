"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ConfettiPiece } from "./confetti-piece";
import { Sparkle } from "./sparkle";
import { Message } from "./message";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/lib/store/form-store";
import { resetForm } from "@/lib/store/selectors/form-selectors";

interface CongratulationsProps {
  show: boolean;
}

export function Congratulations({ show }: CongratulationsProps) {
  const router = useRouter();
  const resetFormData = useFormStore(resetForm);

  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      color: string;
      x: number;
      delay: number;
      rotation: number;
    }>
  >([]);

  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      size: number;
      style: React.CSSProperties;
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

    // Create sparkles
    const sparkleInterval = setInterval(() => {
      setSparkles((prev) => [
        ...prev,
        {
          id: Date.now(),
          size: Math.random() * 4 + 2,
          style: {
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random(),
            transform: `rotate(${Math.random() * 360}deg)`,
          },
        },
      ]);
    }, 200);

    return () => {
      clearInterval(sparkleInterval);
      setConfetti([]);
      setSparkles([]);
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confetti.map((piece) => (
          <ConfettiPiece key={piece.id} {...piece} />
        ))}
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
      </div>
      <AnimatePresence>
        <Message
          onClose={() => {
            resetFormData();
            router.push("/");
          }}
        />
      </AnimatePresence>
    </>
  );
}
