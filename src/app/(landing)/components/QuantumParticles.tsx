import React from "react";
import { motion } from "framer-motion";

interface QuantumParticlesProps {
  count?: number;
  className?: string;
}

export const QuantumParticles: React.FC<QuantumParticlesProps> = ({
  count = 80,
  className = "",
}) => {
  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
