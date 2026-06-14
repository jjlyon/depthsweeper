import type { FloorModifier } from '../types';
export const MODIFIERS: FloorModifier[] = [
 {id:'none', name:'No modifier', description:'No modifier.'},
 {id:'dense_veins', name:'Dense Veins', description:'More traps, more riches.'},
 {id:'unstable_ground', name:'Unstable Ground', description:'The first open cavern destabilizes the floor.'},
 {id:'echoing_depths', name:'Echoing Depths', description:'Echoes make group-clearing unsafe.'},
 {id:'fogged_numbers', name:'Fogged Numbers', description:'Some numbers are obscured.'},
 {id:'greedy_goblins', name:'Greedy Goblins', description:'Treasure is plentiful, but not always safe.'},
 {id:'cracked_lantern', name:'Cracked Lantern', description:'Early clues fade from memory.'},
 {id:'magnetic_ore', name:'Magnetic Ore', description:'Flags pull toward danger… or maybe just ore.'},
];
export const ACTIVE_MODIFIERS = MODIFIERS.filter(m => m.id !== 'none');
