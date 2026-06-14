import type { RunState } from '../types';
import { getTile, neighbors } from './board';
import { hasItem } from './effects';
import { revealTile } from './reveal';
export function chordTile(run:RunState,x:number,y:number,log:string[]){ const tile=getTile(run.board,x,y); if(!tile||!tile.revealed||tile.adjacentMines<=0) return; if(run.modifier.id==='echoing_depths'){ log.push('Echoing Depths disables chording.'); return; } const adj=neighbors(run.board,x,y); const flags=adj.filter(t=>t.flagged||t.magneticFlagged).length; if(flags!==tile.adjacentMines) return; const wouldMine=adj.some(t=>!t.flagged&&!t.magneticFlagged&&!t.revealed&&t.kind==='mine'); if(wouldMine&&hasItem(run,'careful_hands')&&!run.floorStats.carefulHandsUsed){ run.floorStats.carefulHandsUsed=true; log.push('Careful Hands stopped an unsafe chord.'); return; } for(const n of adj) if(!n.flagged&&!n.magneticFlagged&&!n.revealed) revealTile(run,n.x,n.y,log); }
