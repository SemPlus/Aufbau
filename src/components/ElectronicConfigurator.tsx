import React from 'react';
import { FlaskConical } from 'lucide-react';
import { ElementData, OrbitalLevel, ConfigException } from '../types';
import { elementsData, aufbauOrder, exceptions } from '../data/elements';
import { OrbitalLevelRow } from './OrbitalLevelRow';
import { motion, AnimatePresence } from 'motion/react';

export const ElectronicConfigurator: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = React.useState<string>("H");

  const element = React.useMemo(() => 
    elementsData.find(el => el.symbol === selectedSymbol),
  [selectedSymbol]);

  const sortedElements = React.useMemo(() => 
    [...elementsData].sort((a, b) => a.z - b.z),
  []);

  const config = React.useMemo(() => {
    if (!element) return [];

    let remaining = element.z;
    const result: { level: OrbitalLevel; count: number }[] = [];
    const elementExceptions = exceptions[element.symbol] || {};

    for (const level of aufbauOrder) {
      if (remaining <= 0) break;

      let electronsInLevel = 0;
      const maxCapacity = level.count * 2;

      if (elementExceptions[level.label] !== undefined) {
        electronsInLevel = elementExceptions[level.label];
      } else {
        electronsInLevel = Math.min(remaining, maxCapacity);
      }

      result.push({ level, count: electronsInLevel });
      remaining -= electronsInLevel;
      if (remaining < 0) remaining = 0;
    }

    return result;
  }, [element]);

  return (
    <div className="fixed inset-0 flex bg-quantum-bg text-neutral-300 border border-quantum-border overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] bg-quantum-sidebar border-r border-quantum-border flex flex-col p-6 overflow-hidden">
        <div className="uppercase text-[11px] font-bold tracking-[0.1em] text-neutral-500 mb-6 flex items-center justify-between">
          <span>Element Library</span>
          <FlaskConical className="w-3 h-3" />
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 space-y-1">
          {sortedElements.map(el => (
            <button
              key={el.symbol}
              onClick={() => setSelectedSymbol(el.symbol)}
              className={`w-full flex justify-between items-center px-3 py-2.5 rounded-lg text-sm transition-all group ${
                selectedSymbol === el.symbol 
                ? 'bg-quantum-accent text-black font-bold' 
                : 'hover:bg-neutral-800/30 text-neutral-500'
              }`}
            >
              <span className="flex gap-3">
                <span className="w-4 font-mono font-black">{el.symbol}</span>
                <span className={selectedSymbol === el.symbol ? 'text-black' : 'text-neutral-300'}>{el.name}</span>
              </span>
              <span className={`font-mono text-[10px] ${selectedSymbol === el.symbol ? 'text-black opacity-40' : 'opacity-40 group-hover:opacity-80'}`}>
                {el.z}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-quantum-border flex flex-col gap-2">
          <div className="text-[10px] text-neutral-700 font-bold tracking-[2px] uppercase">
            Aufbau Matrix v2.0
          </div>
          <div className="text-[12px] text-quantum-accent font-black tracking-[1px] uppercase">
            By Samuel K.
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 bg-[radial-gradient(circle_at_70%_30%,#171717_0%,#000000_100%)] p-12 flex flex-col gap-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {element && (
            <motion.div 
              key={element.symbol}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-8 h-full"
            >
              <header className="flex justify-between items-end border-b border-neutral-900 pb-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="element-badge text-7xl font-black text-quantum-accent leading-none tracking-tighter"
                >
                  {element.symbol}
                </motion.div>
                <div className="text-right">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-light text-slate-100 mb-1"
                  >
                    {element.name}
                  </motion.div>
                  <div className="font-mono text-neutral-600 text-sm flex flex-col items-end">
                    <span>Z = {element.z}</span>
                    <span className="text-quantum-accent font-black text-[10px] tracking-[2px] mt-1">BY SAMUEL K.</span>
                  </div>
                </div>
              </header>

              <div className="flex-1 overflow-hidden flex flex-col bg-neutral-900/10 border border-quantum-border rounded-2xl p-6 relative">
                <div className="absolute top-4 left-6 text-[10px] font-black text-neutral-800 uppercase tracking-widest z-0">
                  Shell Configuration
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col pr-2 relative z-10">
                  {config.map((item, idx) => (
                    <OrbitalLevelRow 
                      key={item.level.label} 
                      level={item.level} 
                      electronsInLevel={item.count} 
                      index={idx}
                    />
                  ))}
                </div>
              </div>

              <footer className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-quantum-accent/20 to-neutral-700/10 rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-neutral-950 border border-quantum-border p-6 rounded-xl font-mono text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {config.map(({ level, count }, idx) => (
                    <span key={idx} className="flex">
                      <span className="text-neutral-500 font-medium">{level.label}</span>
                      <sup className="text-quantum-accent font-black text-sm ml-0.5">{count}</sup>
                    </span>
                  ))}
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Legends */}
        <div className="absolute bottom-12 right-12 flex gap-4 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900/50 border border-quantum-border rounded-full shadow-sm text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
            <span className="text-quantum-accent font-serif text-lg leading-none">↑</span> Spin Up
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900/50 border border-quantum-border rounded-full shadow-sm text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
            <span className="text-neutral-600 font-serif text-lg leading-none">↓</span> Spin Down
          </div>
        </div>
      </main>
    </div>
  );
};
