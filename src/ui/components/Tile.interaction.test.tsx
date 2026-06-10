import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../../app/App';
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
  it('flags the tile currently under the pointer with F and Space', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const root = createRoot(host);

    act(() => {
      root.render(<App />);
    });
    act(() => {
      host.querySelector('button')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const tile = host.querySelector<HTMLButtonElement>('.tile.hidden')!;
    const originalElementFromPoint = document.elementFromPoint;
    Object.defineProperty(document, 'elementFromPoint', { configurable: true, value: vi.fn(() => tile) });

    act(() => {
      document.dispatchEvent(new PointerEvent('pointermove', { clientX: 12, clientY: 18, bubbles: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', bubbles: true }));
    });
    expect(tile.textContent).toBe('⚑');

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    });
    expect(tile.textContent).toBe('');

    Object.defineProperty(document, 'elementFromPoint', { configurable: true, value: originalElementFromPoint });
    act(() => root.unmount());
    host.remove();
  });

  it('flags from the context menu event for right-click support', () => {
    let flags = 0;
    let hovers = 0;
    const { button, cleanup } = renderTile(() => { flags += 1; }, () => { hovers += 1; });

    act(() => {
      button.dispatchEvent(new MouseEvent('contextmenu', { button: 2, bubbles: true }));
    });

    expect(flags).toBe(1);
    expect(hovers).toBe(1);
    cleanup();
  });
});
