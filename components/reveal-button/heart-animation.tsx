"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface HeartAnimationProps {
  isRevealing: boolean;
}

export function HeartAnimation({ isRevealing }: HeartAnimationProps) {
  return (
    <motion.div
      animate={
        isRevealing
          ? {
              scale: 100,
              opacity: 0,
              transition: { duration: 1.5, ease: "easeInOut" },
            }
          : {
              scale: [1, 1.2, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      className="text-primary relative z-10"
    >
      <Heart className="w-12 h-12 fill-current" />
    </motion.div>
  );
}
