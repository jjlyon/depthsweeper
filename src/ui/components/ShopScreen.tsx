import type { LootItem, RunState } from '../../game/types';
import { ItemCard } from './ItemCard';
export function ShopScreen({run,items,onBuy,onContinue}:{run:RunState;items:LootItem[];onBuy:(id:string)=>void;onContinue:()=>void}){ return <main className="screen"><h1>Lantern Shop</h1><p>Gold: {run.player.gold}</p><div className="cards">{items.map(i=><ItemCard key={i.id} item={i} price={i.price??0} disabled={run.player.gold<(i.price??0)} action={()=>onBuy(i.id)}/>)}</div><button onClick={onContinue}>Continue</button></main>; }
