import type { RngState } from '../types';
export function makeSeed(): number { return Math.floor(Math.random() * 0xffffffff); }
export function random(rng: RngState): number { let t = (rng.seed += 0x6D2B79F5); t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
export function int(rng:RngState, min:number, max:number): number { return Math.floor(random(rng) * (max - min + 1)) + min; }
export function chance(rng:RngState, p:number): boolean { return random(rng) < p; }
export function pick<T>(rng:RngState, xs:T[]): T { return xs[Math.floor(random(rng) * xs.length)]; }
export function shuffle<T>(rng:RngState, xs:T[]): T[] { const a=[...xs]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(random(rng)*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
