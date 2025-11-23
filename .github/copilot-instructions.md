# Copilot / AI Agent Instructions for k-chess

This repo is a small React + TypeScript + Vite project implementing a Korean/Chinese chess UI and a simple game engine. The instructions below capture the concrete conventions and touchpoints an AI agent should know to be productive quickly.

1. Project entrypoints & commands
  - Dev server: `npm run dev` (starts Vite with HMR). Use this for iterative UI work.
  - Build: `npm run build` (runs `tsc -b` then `vite build`). Type-checking is enforced during build.
  - Lint: `npm run lint` (ESLint configured). Code style also includes `prettier` as a devDependency.
  - Preview production bundle: `npm run preview`.

2. High-level architecture
  - UI: `src/components/*` (React components + local CSS). Key files:
    - `src/components/ChessBoard.tsx` — renders the board (SVG grid + absolute-positioned intersections) and holds a local `BoardState` for pieces.
    - `src/components/Piece.tsx` — visual representation of a piece and symbol mapping for `HAN`/`CHO`.
  - Game logic: `src/logic/*` — pure TypeScript logic separated from React.
    - `src/logic/gameEngine.ts` — `GameEngine` class: authoritative game state, `tryMove(from,to)`, `getGameState()` and turn handling.
    - `src/logic/types.ts` — centralized types: `Player`, `PieceType`, `Position`, `GameBoard`.
    - `src/logic/rules/*.ts` — per-piece move validators (e.g. `cha.ts`, `ma.ts`, `po.ts`, `jol.ts`, `saGung.ts`, `sang.ts`). Each exports `is*MoveLegal(...)` used by `GameEngine`.

3. Important data conventions
  - Board is a 2D array: `GameBoard = (Piece | null)[][]` indexed as `board[y][x]` where `y` is row (0..9) and `x` is column (0..8).
  - `Player` values: `'CHO' | 'HAN'` (note `GameEngine` starts with `'CHO'` as first player).
  - `PieceType` literal strings: `'CHA' | 'MA' | 'SANG' | 'PO' | 'SA' | 'JOL' | 'GUNG'`. Keep these strings in sync between `Piece.tsx` and `types.ts`.

4. UI ⇄ Logic integration points
  - Currently `ChessBoard.tsx` maintains an internal `pieces` state via `createInitialBoard()` and renders `Piece` components. The engine and UI are not fully wired together yet.
  - To wire engine to UI: instantiate `GameEngine` in a React container (or a hook), call `getGameState()` to drive `pieces` and call `tryMove(from,to)` for user actions. `from`/`to` should use `{ y:number, x:number }` from DOM `data-row`/`data-col` attributes.

5. Adding or changing move rules
  - Add a new rule file in `src/logic/rules/` exporting a signature matching existing ones: `isXMoveLegal(board, from, to, [player?]) => boolean`.
  - Import it into `src/logic/gameEngine.ts` and extend the `switch` statement that dispatches by `piece.type` to call the new validator.

6. Coordinate & rendering notes (practical examples)
  - ChessBoard places intersections at pixel coordinates `left: 25 + col*50` and `top: 25 + row*50`.
  - When mapping a click to a `Position`, use integers `y=row`, `x=col`. Example: `engine.tryMove({y:3,x:0},{y:2,x:0})`.
  - `Piece` component expects `type: PieceType` and `player: Player` and displays localized symbols in `Piece.tsx`.

7. Conventions & gotchas
  - Keep types authoritative in `src/logic/types.ts`. Don't duplicate literal strings across files without updating `types.ts`.
  - The board arrays are zero-indexed row-major (`[y][x]`). Mistaking `x,y` ordering is the most common bug when touching logic or UI mapping.
  - `GameEngine` logs actions via `console.log` and does not yet implement check/checkmate detection — search for `// ...` comments in `gameEngine.ts` for unfinished areas.

8. Files to inspect for examples when making changes
  - `src/components/ChessBoard.tsx` — board rendering & mapping of pieces to positions.
  - `src/components/Piece.tsx` — piece props and symbol mapping.
  - `src/logic/gameEngine.ts` — how moves are validated and applied.
  - `src/logic/rules/*.ts` — pattern for per-piece validation functions.

9. Testing & debugging tips
  - There are no automated tests in the repo yet. Use `npm run dev` and browser DevTools to trace `console.log` outputs from `GameEngine`.
  - For type errors run `tsc -b` (used in `npm run build`).

If any of the above is unclear or you want me to include additional examples (e.g. a small hook that connects `GameEngine` to `ChessBoard`), tell me which part to expand and I will update this file.
