import React from 'react';
import { elementsData } from '../data/elements';
import { motion } from 'motion/react';

interface PeriodicTableProps {
  selectedSymbol: string;
  onSelect: (symbol: string) => void;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ selectedSymbol, onSelect }) => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="grid grid-cols-18 gap-1 md:gap-1.5 p-1 md:p-2 bg-neutral-900/20 border border-quantum-border rounded-xl">
        {elementsData.map((el) => {
          if (!el.period || !el.group || el.period > 7) return null;
          return (
            <button
              key={el.symbol}
              onClick={() => onSelect(el.symbol)}
              style={{
                gridRow: el.period,
                gridColumn: el.group,
              }}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-[2px] md:rounded-sm transition-all relative group
                ${selectedSymbol === el.symbol 
                  ? 'bg-quantum-accent text-black scale-110 z-10 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                  : 'bg-neutral-900/40 border border-neutral-800/50 hover:bg-neutral-800 hover:border-neutral-700'
                }
              `}
            >
              <span className="text-[6px] md:text-[8px] font-mono opacity-50 absolute top-0.5 left-0.5">{el.z}</span>
              <span className="text-[10px] md:text-xs lg:text-sm font-black tracking-tighter leading-none">{el.symbol}</span>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-950 border border-quantum-border rounded text-[9px] font-bold text-neutral-300 opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap hidden md:block">
                {el.name} (Z={el.z})
              </div>
            </button>
          );
        })}

        {/* Separator / Gap for Lanthanides/Actinides */}
        <div className="grid-row-8 grid-column-all h-4" />

        {/* Lanthanides & Actinides */}
        {elementsData.map((el) => {
          if (!el.period || !el.group || el.period < 9) return null;
          const adjustedRow = el.period === 9 ? 9 : 10;
          const adjustedCol = el.group;
          return (
            <button
              key={el.symbol}
              onClick={() => onSelect(el.symbol)}
              style={{
                gridRow: adjustedRow,
                gridColumn: adjustedCol,
              }}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-[2px] md:rounded-sm transition-all relative group
                ${selectedSymbol === el.symbol 
                  ? 'bg-quantum-accent text-black scale-110 z-10 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                  : 'bg-neutral-900/40 border border-neutral-800/50 hover:bg-neutral-800 hover:border-neutral-700'
                }
              `}
            >
              <span className="text-[6px] md:text-[8px] font-mono opacity-50 absolute top-0.5 left-0.5">{el.z}</span>
              <span className="text-[10px] md:text-xs lg:text-sm font-black tracking-tighter leading-none">{el.symbol}</span>
            </button>
          );
        })}
      </div>
      
      {/* Legend / Info */}
      <div className="hidden lg:flex gap-6 items-center px-4 py-2 border-t border-neutral-900/50 bg-neutral-900/10 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-quantum-accent" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-800" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Available</span>
        </div>
        <div className="ml-auto text-[9px] font-mono text-neutral-700 uppercase">
          118 Elements Integrated
        </div>
      </div>
    </div>
  );
};
