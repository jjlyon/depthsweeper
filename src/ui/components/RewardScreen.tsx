import type { LootItem, RunState } from '../../game/types';
import { ItemCard } from './ItemCard';
export function RewardScreen({run,choices,onPick,onReroll}:{run:RunState;choices:LootItem[];onPick:(id:string)=>void;onReroll:()=>void}){ return <main className="screen"><h1>Choose one relic</h1><div className="cards">{choices.map(i=><ItemCard key={i.id} item={i} action={()=>onPick(i.id)}/>)}</div>{run.player.rerolls>0&&<button onClick={onReroll}>Reroll Reward ({run.player.rerolls})</button>}</main>; }
