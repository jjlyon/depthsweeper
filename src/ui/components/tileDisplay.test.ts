import { describe, expect, it } from 'vitest';
import { createTile } from '../../game/engine/board';
import type { TileKind, TileState } from '../../game/types';
import { getTileClass, getTileContent } from './tileDisplay';

function tile(kind: TileKind, patch: Partial<TileState> = {}): TileState {
  return { ...createTile(0, 0), kind, ...patch };
}

describe('tile display visibility', () => {
  it('hidden mine renders like an ordinary hidden tile', () => {
    const hiddenMine = tile('mine');
    expect(getTileContent(hiddenMine)).toBe('');
    expect(getTileClass(hiddenMine)).toBe('tile hidden');
  });

  it('hidden treasure renders like an ordinary hidden tile', () => {
    const hiddenTreasure = tile('treasure');
    expect(getTileContent(hiddenTreasure)).toBe('');
    expect(getTileClass(hiddenTreasure)).toBe('tile hidden');
  });

  it('hidden exit renders like an ordinary hidden tile', () => {
    const hiddenExit = tile('exit');
    expect(getTileContent(hiddenExit)).toBe('');
    expect(getTileClass(hiddenExit)).toBe('tile hidden');
  });

  it('hidden normal safe tile and hidden mine have the same default content and class', () => {
    const hiddenSafe = tile('normal');
    const hiddenMine = tile('mine');
    expect(getTileContent(hiddenSafe)).toBe(getTileContent(hiddenMine));
    expect(getTileClass(hiddenSafe)).toBe(getTileClass(hiddenMine));
  });

  it('revealed mine shows mine icon and class', () => {
    const revealedMine = tile('mine', { revealed: true });
    expect(getTileContent(revealedMine)).toBe('✹');
    expect(getTileClass(revealedMine)).toContain('mine');
  });

  it('revealed treasure shows treasure icon', () => {
    const revealedTreasure = tile('treasure', { revealed: true, adjacentMines: 2 });
    expect(getTileContent(revealedTreasure)).toBe('2◆');
    expect(getTileClass(revealedTreasure)).toContain('treasure');
  });

  it('revealed exit shows exit icon', () => {
    const revealedExit = tile('exit', { revealed: true });
    expect(getTileContent(revealedExit)).toBe('⇩');
    expect(getTileClass(revealedExit)).toContain('exit');
  });

  it('danger-marked hidden mine shows danger mark, not mine icon', () => {
    const markedMine = tile('mine', { dangerMarked: true });
    expect(getTileContent(markedMine)).toBe('!');
    expect(getTileContent(markedMine)).not.toBe('✹');
    expect(getTileClass(markedMine)).toBe('tile hidden danger-marked');
  });

  it('ghost-number hidden tile shows ghost number, not true tile kind', () => {
    const ghostMine = tile('mine', { ghostNumber: 3 });
    expect(getTileContent(ghostMine)).toBe('3');
    expect(getTileClass(ghostMine)).toBe('tile hidden ghost-number');
  });

  it('scanned hidden treasure shows scanned treasure marker only when scanned', () => {
    const hiddenTreasure = tile('treasure');
    const scannedTreasure = tile('treasure', { scannedStatus: 'treasure' });
    expect(getTileContent(hiddenTreasure)).toBe('');
    expect(getTileClass(hiddenTreasure)).toBe('tile hidden');
    expect(getTileContent(scannedTreasure)).toBe('◆?');
    expect(getTileClass(scannedTreasure)).toBe('tile hidden scanned-treasure');
  });
});
