import type { KeyboardEvent } from 'react';
import type { TileState } from '../../game/types';
import { getTileClass, getTileContent } from './tileDisplay';

export function Tile({ tile, onClick, onFlag, onHover }: { tile: TileState; onClick: () => void; onFlag: () => void; onHover: () => void }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'f' || event.key === 'F' || event.key === ' ') {
      event.preventDefault();
      onFlag();
    }
  };

  return (
    <button
      className={getTileClass(tile)}
      onFocus={onHover}
      onKeyDown={handleKeyDown}
      onMouseEnter={onHover}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault();
        onFlag();
      }}
    >
      {getTileContent(tile)}
    </button>
  );
}
