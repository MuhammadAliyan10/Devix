import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GlassCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  delay?: number;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  icon: Icon,
  title,
  description,
  features = [],
  delay = 0,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative cursor-pointer"
    >
      <div className="relative p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-black/30 hover:border-white/20 transition-all duration-300 h-full">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mb-6 shadow-lg"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.8 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-white/90 transition-all duration-300">
          {title}
        </h3>

        <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300 mb-6">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300"
              >
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </motion.div>
  );
};
