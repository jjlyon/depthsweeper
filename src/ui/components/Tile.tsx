import type { PointerEvent } from 'react';
import type { TileState } from '../../game/types';
import { getTileClass, getTileContent } from './tileDisplay';

export function Tile({ tile, onClick, onFlag, onHover }: { tile: TileState; onClick: () => void; onFlag: () => void; onHover: () => void }) {
  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    onHover();
    if (event.button === 2) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <button
      className={getTileClass(tile)}
      data-x={tile.x}
      data-y={tile.y}
      tabIndex={-1}
      onFocus={onHover}
      onMouseEnter={onHover}
      onPointerDown={handlePointerDown}
      onPointerEnter={onHover}
      onPointerMove={onHover}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onHover();
        onFlag();
      }}
    >
      {getTileContent(tile)}
    </button>
  );
}
