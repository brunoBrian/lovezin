"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartAnimation } from "./heart-animation";

interface RevealButtonProps {
  onReveal: () => void;
}

export function RevealButton({ onReveal }: RevealButtonProps) {
  const [isRevealing, setIsRevealing] = useState(false);

  const handleReveal = () => {
    setIsRevealing(true);
    setTimeout(onReveal, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-background to-secondary z-50"
      >
        <div className="text-center space-y-8 p-8 max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-serif text-primary"
          >
            Uma História de Amor Especial
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Alguém muito especial compartilhou uma linda história de amor com
            você. Clique no coração para revelar esses momentos únicos.
          </motion.p>

          <motion.button
            onClick={handleReveal}
            className="transition-transform hover:scale-110 focus:outline-none relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={isRevealing}
          >
            <HeartAnimation isRevealing={isRevealing} />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
