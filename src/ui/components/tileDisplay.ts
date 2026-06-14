import type { TileState } from '../../game/types';

export function getTileContent(tile: TileState): string {
  if (!tile.revealed) {
    if (tile.flagged || tile.magneticFlagged) return '⚑';
    if (tile.dangerMarked) return '!';
    if (tile.ghostNumber != null) return String(tile.ghostNumber);
    if (tile.scannedStatus === 'mine') return '!';
    if (tile.scannedStatus === 'treasure') return '◆?';
    if (tile.scannedStatus === 'exit') return '⇩?';
    if (tile.scannedStatus === 'safe') return '·';
    return '';
  }

  if (tile.exploded) return '✸';
  if (tile.kind === 'mine') return '✹';
  if (tile.kind === 'exit') return '⇩';
  if (tile.forgotten) return '·';
  if (tile.fogged && tile.adjacentMines > 0) return '?';

  const number = tile.adjacentMines > 0 ? String(tile.adjacentMines) : '';
  if (tile.kind === 'treasure') return number ? `${number}◆` : '◆';
  return number;
}

export function getTileClass(tile: TileState): string {
  const classes = ['tile'];

  if (!tile.revealed) {
    classes.push('hidden');
    if (tile.flagged) classes.push('flagged');
    else if (tile.magneticFlagged) classes.push('magnetic');
    else if (tile.dangerMarked) classes.push('danger-marked');
    else if (tile.ghostNumber != null) classes.push('ghost-number');
    else if (tile.scannedStatus != null) classes.push(`scanned-${tile.scannedStatus}`);
    return classes.join(' ');
  }

  classes.push('revealed');
  if (tile.exploded) classes.push('exploded');
  else if (tile.kind === 'mine') classes.push('mine');
  else if (tile.kind === 'treasure') classes.push('treasure');
  else if (tile.kind === 'exit') classes.push('exit');
  else classes.push('normal');

  if (tile.fogged) classes.push('fogged');
  if (tile.forgotten) classes.push('forgotten');
  if (tile.adjacentMines > 0) classes.push(`n${tile.adjacentMines}`);
  return classes.join(' ');
}
