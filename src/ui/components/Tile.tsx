import type { TileState } from '../../game/types';
import { getTileClass, getTileContent } from './tileDisplay';

export function Tile({ tile, onClick, onFlag, onHover }: { tile: TileState; onClick: () => void; onFlag: () => void; onHover: () => void }) {
  return (
    <button
      className={getTileClass(tile)}
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
