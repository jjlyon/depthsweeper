export type TileKind = 'normal' | 'mine' | 'treasure' | 'exit';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export type FloorModifierId = 'none' | 'dense_veins' | 'unstable_ground' | 'echoing_depths' | 'fogged_numbers' | 'greedy_goblins' | 'cracked_lantern' | 'magnetic_ore';
export type GamePhase = 'menu' | 'playing' | 'reward' | 'shop' | 'gameOver';
export type TargetingMode = null | 'probe' | 'scan';
export type ScannedStatus = 'mine' | 'safe' | 'treasure' | 'exit' | null;

export type TileState = {
  x: number; y: number; kind: TileKind; revealed: boolean; flagged: boolean;
  magneticFlagged: boolean; dangerMarked: boolean; adjacentMines: number; exploded: boolean;
  ghostNumber: number | null; scannedStatus: ScannedStatus; fogged: boolean; forgotten: boolean;
  trappedTreasure: boolean;
};
export type BoardState = { width: number; height: number; mineCount: number; generated: boolean; tiles: TileState[][]; exitPlaced: boolean; exitAvailable: boolean; firstClick: boolean; };
export type InventoryItem = { itemId: string; stacks: number };
export type PlayerState = { hp:number; maxHp:number; armor:number; gold:number; floor:number; items:InventoryItem[]; flagsAvailable:number|null; revealCharges:number; scanCharges:number; rerolls:number; mistakesForgiven:number; score:number; };
export type LootItem = { id:string; name:string; rarity:Rarity; type:'passive'|'active'|'consumable'; description:string; maxStacks?:number; price?:number; tags?:string[]; implemented?:boolean; };
export type FloorConfig = { floor:number; width:number; height:number; minePercent:number; modifierChance:number; label:string };
export type FloorModifier = { id:FloorModifierId; name:string; description:string };
export type FloorStats = { revealedSafe:number; damageTaken:boolean; luckyBootsUsed:boolean; hourglassUsed:boolean; carefulHandsUsed:boolean; runeUsed:boolean; trapEaterUsed:boolean; lastDescentUsed:boolean; insuranceUsed:boolean; unstableUsed:boolean; crackedCount:number; safeRevealsSinceArmor:number; goldCollected:number; minesTriggered:number; };
export type RngState = { seed:number };
export type RunState = { player:PlayerState; board:BoardState; floorConfig:FloorConfig; modifier:FloorModifier; floorStats:FloorStats; status:'active'|'won'|'lost'; rng:RngState; seed:number; finalResult?:'victory'|'defeat' };
export type SaveData = { version:number; totalRuns:number; wins:number; losses:number; deepestFloor:number; totalGoldCollected:number; unlockedItems:string[]; codexSeenItems:string[] };
export type GameState = { phase:GamePhase; run:RunState|null; save:SaveData; rewardChoices:LootItem[]; shopItems:LootItem[]; targetingMode:TargetingMode; log:string[] };
export type GameAction =
 | { type:'START_RUN' } | { type:'REVEAL_TILE'; x:number; y:number } | { type:'TOGGLE_FLAG'; x:number; y:number } | { type:'CHORD_TILE'; x:number; y:number }
 | { type:'USE_PROBE'; x:number; y:number } | { type:'USE_SCAN'; x:number; y:number } | { type:'SET_TARGETING'; mode:TargetingMode } | { type:'CANCEL_TARGETING' }
 | { type:'CHOOSE_REWARD'; itemId:string } | { type:'REROLL_REWARD' } | { type:'BUY_ITEM'; itemId:string } | { type:'CONTINUE_TO_NEXT_FLOOR' }
 | { type:'RETURN_TO_MENU' } | { type:'LOAD_SAVE'; save:SaveData };
