import type { FloorConfig } from '../types';
export const FLOOR_CONFIGS: FloorConfig[] = [
 [1,8,8,.12,0,'1 common'],[2,9,9,.13,.1,'1 common'],[3,10,10,.14,.2,'1 common/uncommon'],[4,11,11,.15,.3,'1 uncommon'],[5,12,12,.16,.4,'1 uncommon + shop'],[6,13,13,.17,.5,'1 uncommon/rare'],[7,14,14,.18,.6,'1 rare chance'],[8,15,15,.19,.7,'1 rare chance'],[9,16,16,.20,.8,'1 rare'],[10,18,18,.21,1,'Final floor']
].map(([floor,width,height,minePercent,modifierChance,label]) => ({floor:floor as number,width:width as number,height:height as number,minePercent:minePercent as number,modifierChance:modifierChance as number,label:label as string}));
export function getFloorConfig(floor:number): FloorConfig { return FLOOR_CONFIGS[Math.min(floor,10)-1]; }
