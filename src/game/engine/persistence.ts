import type { SaveData } from '../types';
export const SAVE_KEY='depthsweeper.save.v1';
export const DEFAULT_SAVE: SaveData = { version:1,totalRuns:0,wins:0,losses:0,deepestFloor:0,totalGoldCollected:0,unlockedItems:[],codexSeenItems:[] };
export function normalizeSave(data:Partial<SaveData>|null|undefined): SaveData { return {...DEFAULT_SAVE,...data,version:1,unlockedItems:data?.unlockedItems??[],codexSeenItems:data?.codexSeenItems??[]}; }
export function loadSave(storage:Pick<Storage,'getItem'> = localStorage): SaveData { try { const raw=storage.getItem(SAVE_KEY); return normalizeSave(raw?JSON.parse(raw):null); } catch { return DEFAULT_SAVE; } }
export function saveData(save:SaveData, storage:Pick<Storage,'setItem'> = localStorage): void { storage.setItem(SAVE_KEY, JSON.stringify(save)); }
