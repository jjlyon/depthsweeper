import { useEffect, useReducer, useRef, useState } from 'react';
import { gameReducer, initialGameState } from '../game/engine/run';
import { loadSave, saveData } from '../game/engine/persistence';
import { Board } from '../ui/components/Board';
import { Hud } from '../ui/components/Hud';
import { LogPanel } from '../ui/components/LogPanel';
import { MainMenu } from '../ui/components/MainMenu';
import { RewardScreen } from '../ui/components/RewardScreen';
import { ShopScreen } from '../ui/components/ShopScreen';
import { GameOverScreen } from '../ui/components/GameOverScreen';

function readTileCoords(element: Element | null): { x: number; y: number } | null {
 const tile = element?.closest<HTMLElement>('[data-x][data-y]');
 if (!tile) return null;
 const x = Number(tile.dataset.x);
 const y = Number(tile.dataset.y);
 return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}

function isFlagKey(event: KeyboardEvent): boolean {
 return event.key === 'f' || event.key === 'F' || event.code === 'KeyF' || event.key === ' ' || event.key === 'Spacebar' || event.code === 'Space';
}

export function App(){
 const [state,dispatch]=useReducer(gameReducer, initialGameState, s => ({...s, save: loadSave()})); const [hover,setHover]=useState<{x:number;y:number}|null>(null); const hoverRef=useRef<{x:number;y:number}|null>(null); const pointerRef=useRef<{x:number;y:number}|null>(null);
 useEffect(()=>{ saveData(state.save); },[state.save]);
 useEffect(()=>{ const onPointerMove=(event:PointerEvent)=>{ pointerRef.current={x:event.clientX,y:event.clientY}; const coords=readTileCoords(document.elementFromPoint(event.clientX,event.clientY)); if(coords){ hoverRef.current=coords; setHover(coords); } }; document.addEventListener('pointermove',onPointerMove,{capture:true}); document.addEventListener('pointerover',onPointerMove,{capture:true}); return ()=>{ document.removeEventListener('pointermove',onPointerMove,{capture:true}); document.removeEventListener('pointerover',onPointerMove,{capture:true}); }; },[]);
 useEffect(()=>{ const getCurrentTile=()=>{ const pointer=pointerRef.current; if(pointer){ const coords=readTileCoords(document.elementFromPoint(pointer.x,pointer.y)); if(coords) return coords; } return hoverRef.current; }; const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') dispatch({type:'CANCEL_TARGETING'}); const target=getCurrentTile(); if(isFlagKey(e)&&target&&state.phase==='playing'){ e.preventDefault(); e.stopPropagation(); dispatch({type:'TOGGLE_FLAG',...target}); return; } if((e.key==='n'||e.key==='N')&&(state.phase==='menu'||state.phase==='gameOver')) dispatch({type:'START_RUN'}); if((e.key==='r'||e.key==='R')&&state.phase==='gameOver') dispatch({type:'START_RUN'}); }; document.addEventListener('keydown',onKey,{capture:true}); return ()=>document.removeEventListener('keydown',onKey,{capture:true}); },[state.phase]);
 if(state.phase==='menu') return <MainMenu save={state.save} onStart={()=>dispatch({type:'START_RUN'})}/>;
 if(!state.run) return null;
 if(state.phase==='reward') return <RewardScreen run={state.run} choices={state.rewardChoices} onPick={itemId=>dispatch({type:'CHOOSE_REWARD',itemId})} onReroll={()=>dispatch({type:'REROLL_REWARD'})}/>;
 if(state.phase==='shop') return <ShopScreen run={state.run} items={state.shopItems} onBuy={itemId=>dispatch({type:'BUY_ITEM',itemId})} onContinue={()=>dispatch({type:'CONTINUE_TO_NEXT_FLOOR'})}/>;
 if(state.phase==='gameOver') return <GameOverScreen run={state.run} onNew={()=>dispatch({type:'START_RUN'})} onMenu={()=>dispatch({type:'RETURN_TO_MENU'})}/>;
 return <main className="run"><Hud run={state.run} targeting={state.targetingMode} onTarget={mode=>dispatch({type:'SET_TARGETING',mode})}/><section className="play"><h1>Depthsweeper</h1>{state.targetingMode&&<p className="target-banner">Targeting {state.targetingMode}. Press Escape to cancel.</p>}<Board board={state.run.board} targeting={state.targetingMode} onHover={(x,y)=>{ const next={x,y}; hoverRef.current=next; setHover(next); }} onReveal={(x,y)=>dispatch({type:'REVEAL_TILE',x,y})} onFlag={(x,y)=>dispatch({type:'TOGGLE_FLAG',x,y})} onChord={(x,y)=>dispatch({type:'CHORD_TILE',x,y})} onProbe={(x,y)=>dispatch({type:'USE_PROBE',x,y})} onScan={(x,y)=>dispatch({type:'USE_SCAN',x,y})}/></section><LogPanel log={state.log}/></main>;
}
