import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import { createTile } from '../../game/engine/board';
import { Tile } from './Tile';

function renderTile(onFlag: () => void, onHover: () => void = () => {}) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  act(() => {
    root.render(<Tile tile={createTile(2, 3)} onClick={() => {}} onFlag={onFlag} onHover={onHover} />);
  });
  const button = host.querySelector('button')!;
  return { button, cleanup: () => { act(() => root.unmount()); host.remove(); } };
}

describe('Tile interactions', () => {
  it('flags with F and Space while the tile has keyboard focus', () => {
    let flags = 0;
    const { button, cleanup } = renderTile(() => { flags += 1; });

    act(() => {
      button.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', bubbles: true }));
      button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    });

    expect(flags).toBe(2);
    cleanup();
  });

  it('flags with right pointer button without waiting for contextmenu', () => {
    let flags = 0;
    let hovers = 0;
    const { button, cleanup } = renderTile(() => { flags += 1; }, () => { hovers += 1; });

    act(() => {
      button.dispatchEvent(new PointerEvent('pointerdown', { button: 2, bubbles: true }));
    });

    expect(flags).toBe(1);
    expect(hovers).toBe(1);
    cleanup();
  });
});
