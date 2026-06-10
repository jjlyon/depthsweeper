import type { BoardState, TileState } from '../types';
export function createTile(x:number,y:number): TileState { return {x,y,kind:'normal',revealed:false,flagged:false,magneticFlagged:false,dangerMarked:false,adjacentMines:0,exploded:false,ghostNumber:null,fogged:false,forgotten:false,scanned:null,trappedTreasure:false}; }
export function createBoard(width:number,height:number,mineCount:number): BoardState { return {width,height,mineCount,generated:false,tiles:Array.from({length:height},(_,y)=>Array.from({length:width},(_,x)=>createTile(x,y))),exitPlaced:false,exitAvailable:false,firstClick:true}; }
export function inBounds(board:BoardState,x:number,y:number){ return x>=0&&y>=0&&x<board.width&&y<board.height; }
export function getTile(board:BoardState,x:number,y:number){ return inBounds(board,x,y)?board.tiles[y][x]:null; }
export function neighbors(board:BoardState,x:number,y:number): TileState[] { const out:TileState[]=[]; for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++){ if(dx||dy){ const t=getTile(board,x+dx,y+dy); if(t) out.push(t); }} return out; }
export function allTiles(board:BoardState): TileState[] { return board.tiles.flat(); }
export function cloneBoard(board:BoardState): BoardState { return {...board, tiles: board.tiles.map(r=>r.map(t=>({...t})))}; }
export function recomputeAdjacent(board:BoardState){ for(const t of allTiles(board)){ t.adjacentMines = neighbors(board,t.x,t.y).filter(n=>n.kind==='mine').length; } }
export function playerFlagCount(board:BoardState){ return allTiles(board).filter(t=>t.flagged).length; }
export function safeTileCount(board:BoardState){ return board.width * board.height - board.mineCount; }
