# Depthsweeper

Depthsweeper is a browser roguelike built around classic Minesweeper deduction. Each floor is a mine-filled dungeon layer with treasure, relics, modifiers, health, armor, loot rewards, a shop, and persistent meta progression.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Gameplay

Start a new run and descend through 10 floors. The first reveal generates the board safely, excluding the clicked tile and its neighbors from mine placement. Reveal safe tiles to earn score, collect treasure for gold, and reach the exit threshold. Once enough safe tiles are revealed, a hidden safe tile becomes the stairs. Revealing the stairs clears the floor.

Mines deal damage instead of instantly ending the run. Armor absorbs damage first, HP loss can end the run, and relics can prevent mistakes or bend the rules. After each cleared floor before Floor 10, choose a relic reward. After Floor 5, visit the shop and spend gold. Clearing Floor 10 wins the run.

## Controls

- Left-click a hidden tile: reveal
- Right-click a hidden tile: flag/unflag
- Left-click a revealed numbered tile: chord
- Hover a hidden tile, then press `F` or `Space`: flag/unflag
- `Escape`: cancel Probe/Scan targeting
- `N`: start a new run from menu or game over
- `R`: restart after game over

## Progression

LocalStorage tracks total runs, wins, losses, deepest floor, total gold collected, unlocked rarities, and seen items. Common/uncommon relics are available immediately, rare relics unlock after reaching Floor 5, and legendary relics unlock after a win.
