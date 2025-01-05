"use client";

import { motion } from "framer-motion";

interface MessageProps {
  onClose: () => void;
}

export function Message({ onClose }: MessageProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div className="bg-card p-8 rounded-lg shadow-xl text-center space-y-4 max-w-md mx-4">
        <h2 className="text-3xl font-serif text-primary">Parabéns!</h2>
        <p className="text-muted-foreground">
          Sua história de amor foi criada com sucesso! Em breve você receberá o
          link por e-mail.
        </p>
        <button
          onClick={onClose}
          className="text-sm text-primary/60 hover:text-primary"
        >
          Fechar
        </button>
      </div>
    </motion.div>
  );
}
