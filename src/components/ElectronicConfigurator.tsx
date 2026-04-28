import React from 'react';
import { FlaskConical, Search, X, Menu } from 'lucide-react';
import { ElementData, OrbitalLevel, ConfigException } from '../types';
import { elementsData, aufbauOrder, exceptions } from '../data/elements';
import { OrbitalLevelRow } from './OrbitalLevelRow';
import { motion, AnimatePresence } from 'motion/react';

export const ElectronicConfigurator: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = React.useState<string>("Si");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  const element = React.useMemo(() => 
    elementsData.find(el => el.symbol === selectedSymbol),
  [selectedSymbol]);

  const sortedElements = React.useMemo(() => 
    [...elementsData].sort((a, b) => a.z - b.z),
  []);

  const filteredElements = React.useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return sortedElements;
    return sortedElements.filter(el => 
      el.symbol.toLowerCase().includes(term) || 
      el.name.toLowerCase().includes(term)
    );
  }, [searchTerm, sortedElements]);

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
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-[280px] lg:static lg:w-[260px] bg-quantum-sidebar border-r border-quantum-border flex flex-col p-6 overflow-hidden z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="uppercase text-[11px] font-bold tracking-[0.1em] text-neutral-500 mb-4 flex items-center justify-between">
          <span>Element Library</span>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-3 h-3" />
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 hover:bg-neutral-800 rounded-md">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-3.5 h-3.5 text-neutral-600" />
          </div>
          <input
            type="text"
            placeholder="Search symbol or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900/50 border border-quantum-border rounded-lg py-2 pl-9 pr-8 text-xs text-neutral-300 placeholder:text-neutral-700 focus:outline-none focus:border-quantum-accent/50 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-2 flex items-center text-neutral-600 hover:text-neutral-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 space-y-1">
          {filteredElements.length > 0 ? (
            filteredElements.map(el => (
              <button
                key={el.symbol}
                onClick={() => {
                  setSelectedSymbol(el.symbol);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
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
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[10px] font-bold text-neutral-700 uppercase tracking-widest">No matching elements</p>
            </div>
          )}
          <div className="px-3 py-10 mt-6 border-t border-neutral-900/30 text-center">
            <span className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest animate-pulse">
              More elements coming soon...
            </span>
          </div>
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
      <main className="flex-1 bg-[radial-gradient(circle_at_70%_30%,#171717_0%,#000000_100%)] p-4 md:p-8 lg:p-12 flex flex-col gap-6 lg:gap-8 relative overflow-hidden">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-2">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-neutral-900 border border-quantum-border rounded-lg text-quantum-accent"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-[10px] text-neutral-500 font-bold tracking-[2px] uppercase">
            Aufbau v2.0
          </div>
        </div>

        <AnimatePresence mode="wait">
          {element && (
            <motion.div 
              key={element.symbol}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-6 lg:gap-8 h-full min-h-0"
            >
              <header className="flex justify-between items-end border-b border-neutral-900 pb-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="element-badge text-5xl md:text-6xl lg:text-7xl font-black text-quantum-accent leading-none tracking-tighter"
                >
                  {element.symbol}
                </motion.div>
                <div className="text-right">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-xl md:text-2xl lg:text-3xl font-light text-slate-100 mb-1"
                  >
                    {element.name}
                  </motion.div>
                  <div className="font-mono text-neutral-600 text-[10px] md:text-xs lg:text-sm flex flex-col items-end">
                    <span>Z = {element.z}</span>
                    <span className="text-quantum-accent font-black text-[8px] md:text-[9px] lg:text-[10px] tracking-[2px] mt-1">BY SAMUEL K.</span>
                  </div>
                </div>
              </header>

              <div className="flex-1 overflow-hidden flex flex-col bg-neutral-900/10 border border-quantum-border rounded-2xl p-4 md:p-6 relative">
                <div className="absolute top-4 left-6 text-[10px] font-black text-neutral-800 uppercase tracking-widest z-0 hidden md:block">
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
                <div className="relative bg-neutral-950 border border-quantum-border p-4 lg:p-6 rounded-xl font-mono text-base md:text-lg lg:text-xl flex flex-wrap gap-x-4 gap-y-2">
                  {config.map(({ level, count }, idx) => (
                    <span key={idx} className="flex">
                      <span className="text-neutral-500 font-medium">{level.label}</span>
                      <sup className="text-quantum-accent font-black text-[10px] md:text-xs lg:text-sm ml-0.5">{count}</sup>
                    </span>
                  ))}
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Legends */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex flex-col md:flex-row gap-2 md:gap-4 pointer-events-none opacity-50 md:opacity-100">
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900/50 border border-quantum-border rounded-full shadow-sm text-[8px] md:text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
            <span className="text-quantum-accent font-serif text-base md:text-lg leading-none">↑</span> Spin Up
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-900/50 border border-quantum-border rounded-full shadow-sm text-[8px] md:text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
            <span className="text-neutral-600 font-serif text-base md:text-lg leading-none">↓</span> Spin Down
          </div>
        </div>
      </main>
    </div>
  );
};
