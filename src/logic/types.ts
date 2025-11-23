// src/logic/types.ts

// 'CHO' 또는 'HAN'
export type Player = 'CHO' | 'HAN';

// 기물의 종류 (임시로 간단하게)
export type PieceType = 'CHA' | 'MA' | 'SANG' | 'PO' | 'SA' | 'JOL' | 'GUNG';

// 기물 하나를 나타내는 객체
export interface Piece {
  type: PieceType;
  player: Player;
}

// 위치 (좌표)
export interface Position {
  y: number; // 0-9 (세로)
  x: number; // 0-8 (가로)
}

// null은 빈 칸을 의미합니다.
export type GameBoard = (Piece | null)[][];
