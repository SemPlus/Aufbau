import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OrbitalBoxProps {
  electronCount: number;
  delay?: number;
}

export const OrbitalBox: React.FC<OrbitalBoxProps> = ({ electronCount, delay = 0 }) => {
  return (
    <motion.div 
      className={`orbital-box rounded-xs ${electronCount > 0 ? 'filled' : ''}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
    >
      <div className="flex relative h-full items-center justify-center">
        <AnimatePresence>
          {electronCount >= 1 && (
            <motion.span
              key="up"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className="arrow-up"
            >
              ↑
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {electronCount >= 2 && (
            <motion.span
              key="down"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              className="arrow-down"
            >
              ↓
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
