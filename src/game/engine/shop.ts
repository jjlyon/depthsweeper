import type { LootItem, RunState, SaveData } from '../types';
import { ITEMS, ITEM_BY_ID } from '../data/items';
import { pick } from './rng';
import { addItem, hasItem } from './effects';
import { canOffer } from './loot';
export function generateShop(run:RunState, save:SaveData): LootItem[] { const count=hasItem(run,'dragons_hoard_contract')?5:4; const items=[ITEM_BY_ID.breakfast_ration]; let guard=0; while(items.length<count && guard++<100){ const pool=ITEMS.filter(i=>i.price&&canOffer(run,i,save)&&!items.some(o=>o.id===i.id)); if(!pool.length) break; items.push(pick(run.rng,pool)); } return items; }
export function buyItem(run:RunState,itemId:string): boolean { const item=ITEM_BY_ID[itemId]; if(!item?.price || run.player.gold<item.price) return false; run.player.gold-=item.price; addItem(run,itemId); return true; }
