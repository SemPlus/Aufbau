export interface ElementData {
  symbol: string;
  name: string;
  z: number;
}

export interface OrbitalLevel {
  label: string;
  type: 's' | 'p' | 'd' | 'f';
  count: number; // Number of orbital boxes (s=1, p=3, d=5, f=7)
}

export interface ConfigException {
  [levelLabel: string]: number;
}
