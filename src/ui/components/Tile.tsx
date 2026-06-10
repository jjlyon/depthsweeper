import type { KeyboardEvent, PointerEvent } from 'react';
import type { TileState } from '../../game/types';
import { getTileClass, getTileContent } from './tileDisplay';

export function Tile({ tile, onClick, onFlag, onHover }: { tile: TileState; onClick: () => void; onFlag: () => void; onHover: () => void }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'f' || event.key === 'F' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onFlag();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    onHover();
    if (event.button === 2) {
      event.preventDefault();
      event.stopPropagation();
      onFlag();
    }
  };

  return (
    <button
      className={getTileClass(tile)}
      data-x={tile.x}
      data-y={tile.y}
      onFocus={onHover}
      onKeyDown={handleKeyDown}
      onMouseEnter={onHover}
      onPointerDown={handlePointerDown}
      onPointerEnter={onHover}
      onPointerMove={onHover}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {getTileContent(tile)}
    </button>
  );
}
