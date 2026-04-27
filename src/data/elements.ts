import { ElementData, OrbitalLevel, ConfigException } from '../types';

export const elementsData: ElementData[] = [
  { symbol: "Si", name: "Silicio", z: 14 },
  { symbol: "S", name: "Zolfo", z: 16 },
  { symbol: "Ar", name: "Argon", z: 18 },
  { symbol: "Ca", name: "Calcio", z: 20 },
  { symbol: "Fe", name: "Ferro", z: 26 },
  { symbol: "Cu", name: "Rame", z: 29 },
  { symbol: "Zn", name: "Zinco", z: 30 },
  { symbol: "Kr", name: "Kripton", z: 36 },
  { symbol: "Sr", name: "Stronzio", z: 38 },
  { symbol: "Y", name: "Ittrio", z: 39 },
  { symbol: "Mo", name: "Molibdeno", z: 42 },
  { symbol: "Ru", name: "Rutenio", z: 44 },
  { symbol: "Ag", name: "Argento", z: 47 },
  { symbol: "Te", name: "Tellurio", z: 52 },
  { symbol: "I", name: "Iodio", z: 53 },
  { symbol: "Ba", name: "Bario", z: 56 },
  { symbol: "Ta", name: "Tantalio", z: 73 },
  { symbol: "Pb", name: "Piombo", z: 82 },
  { symbol: "Po", name: "Polonio", z: 84 },
  { symbol: "Fm", name: "Fermio", z: 100 },
  { symbol: "Bh", name: "Bohrio", z: 107 }
];

export const aufbauOrder: OrbitalLevel[] = [
  { label: "1s", type: 's', count: 1 },
  { label: "2s", type: 's', count: 1 },
  { label: "2p", type: 'p', count: 3 },
  { label: "3s", type: 's', count: 1 },
  { label: "3p", type: 'p', count: 3 },
  { label: "4s", type: 's', count: 1 },
  { label: "3d", type: 'd', count: 5 },
  { label: "4p", type: 'p', count: 3 },
  { label: "5s", type: 's', count: 1 },
  { label: "4d", type: 'd', count: 5 },
  { label: "5p", type: 'p', count: 3 },
  { label: "6s", type: 's', count: 1 },
  { label: "4f", type: 'f', count: 7 },
  { label: "5d", type: 'd', count: 5 },
  { label: "6p", type: 'p', count: 3 },
  { label: "7s", type: 's', count: 1 },
  { label: "5f", type: 'f', count: 7 },
  { label: "6d", type: 'd', count: 5 },
  { label: "7p", type: 'p', count: 3 }
];

export const exceptions: Record<string, ConfigException> = {
  "Cr": { "4s": 1, "3d": 5 },
  "Cu": { "4s": 1, "3d": 10 },
  "Nb": { "5s": 1, "4d": 4 },
  "Mo": { "5s": 1, "4d": 5 },
  "Ru": { "5s": 1, "4d": 7 },
  "Rh": { "5s": 1, "4d": 8 },
  "Pd": { "5s": 0, "4d": 10 },
  "Ag": { "5s": 1, "4d": 10 },
  "Pt": { "6s": 1, "5d": 9 },
  "Au": { "6s": 1, "5d": 10 }
};
