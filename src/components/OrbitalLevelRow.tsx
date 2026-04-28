import React from 'react';
import { motion } from 'motion/react';
import { OrbitalBox } from './OrbitalBox';
import { OrbitalLevel } from '../types';

interface OrbitalLevelRowProps {
  level: OrbitalLevel;
  electronsInLevel: number;
  index: number;
}

export const OrbitalLevelRow: React.FC<OrbitalLevelRowProps> = ({ level, electronsInLevel, index }) => {
  // Distribution according to Hund's rule:
  // First pass: 1 electron in each orbital
  // Second pass: Pair them up
  const orbitalCounts = Array(level.count).fill(0);
  let remaining = electronsInLevel;

  // Hund's Rule - First Pass (Parallel spins)
  for (let i = 0; i < level.count && remaining > 0; i++) {
    orbitalCounts[i]++;
    remaining--;
  }

  // Second Pass (Coupled spins)
  for (let i = 0; i < level.count && remaining > 0; i++) {
    orbitalCounts[i]++;
    remaining--;
  }

  const getSubshellColor = (type: string) => {
    switch (type) {
      case 's': return 'bg-red-50 border-red-200 text-red-600';
      case 'p': return 'bg-blue-50 border-blue-200 text-blue-600';
      case 'd': return 'bg-green-50 border-green-200 text-green-600';
      case 'f': return 'bg-amber-50 border-amber-200 text-amber-600';
      default: return 'bg-slate-50 border-slate-200 text-slate-600';
    }
  };

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="grid grid-cols-[40px_1fr_60px] md:grid-cols-[60px_1fr_100px] items-center py-1.5 md:py-2 px-1 md:px-3 rounded-sm transition-colors hover:bg-yellow-500/5 group"
    >
      <div className="font-mono font-bold text-neutral-600 text-xs md:text-sm group-hover:text-neutral-400 transition-colors">
        {level.label}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {orbitalCounts.map((count, i) => (
          <OrbitalBox key={i} electronCount={count} delay={index * 0.05 + i * 0.02} />
        ))}
      </div>
 
      <div className="text-right font-mono text-[9px] md:text-[10px] text-neutral-700">
        <span className="hidden sm:inline">[{electronsInLevel} / {level.count * 2}]</span>
        <span className="sm:hidden">{electronsInLevel}</span>
      </div>
    </motion.div>
  );
};
