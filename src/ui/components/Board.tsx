import type { BoardState, TargetingMode } from '../../game/types';
import { Tile } from './Tile';
export function Board({board,targeting,onReveal,onFlag,onChord,onProbe,onScan,onHover}:{board:BoardState;targeting:TargetingMode;onReveal:(x:number,y:number)=>void;onFlag:(x:number,y:number)=>void;onChord:(x:number,y:number)=>void;onProbe:(x:number,y:number)=>void;onScan:(x:number,y:number)=>void;onHover:(x:number,y:number)=>void}){
 return <div className={`board ${targeting?'targeting':''}`} style={{gridTemplateColumns:`repeat(${board.width}, 32px)`}} onContextMenu={e=>e.preventDefault()}>{board.tiles.flat().map(tile=><Tile key={`${tile.x},${tile.y}`} tile={tile} onHover={()=>onHover(tile.x,tile.y)} onFlag={()=>onFlag(tile.x,tile.y)} onClick={()=>{ if(targeting==='probe') onProbe(tile.x,tile.y); else if(targeting==='scan') onScan(tile.x,tile.y); else if(tile.revealed) onChord(tile.x,tile.y); else onReveal(tile.x,tile.y); }}/>)}</div>;
}
