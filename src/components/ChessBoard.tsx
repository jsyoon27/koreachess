// src/components/ChessBoard.tsx
import { useState } from 'react';
import './ChessBoard.css';
import Piece, { type PieceType, type Player } from './Piece';

const POINTS_ROWS = 10;
const POINTS_COLS = 9;

interface PiecePosition {
  type: PieceType;
  player: Player;
}

type BoardState = (PiecePosition | null)[][];

interface ChessBoardProps {
  currentTurn: 'HAN' | 'CHO';
  onTurnChange: (turn: 'HAN' | 'CHO') => void;
  onGameEnd: (winner: 'HAN' | 'CHO') => void;
}

const createInitialBoard = (): BoardState => {
  const board: BoardState = Array(POINTS_ROWS)
    .fill(null)
    .map(() => Array(POINTS_COLS).fill(null));

  // HAN 진영
  board[0][0] = { type: 'CHA', player: 'HAN' };
  board[0][1] = { type: 'MA', player: 'HAN' };
  board[0][2] = { type: 'SANG', player: 'HAN' };
  board[0][3] = { type: 'SA', player: 'HAN' };
  board[1][4] = { type: 'GUNG', player: 'HAN' };
  board[0][5] = { type: 'SA', player: 'HAN' };
  board[0][6] = { type: 'SANG', player: 'HAN' };
  board[0][7] = { type: 'MA', player: 'HAN' };
  board[0][8] = { type: 'CHA', player: 'HAN' };
  board[2][1] = { type: 'PO', player: 'HAN' };
  board[2][7] = { type: 'PO', player: 'HAN' };
  board[3][0] = { type: 'JOL', player: 'HAN' };
  board[3][2] = { type: 'JOL', player: 'HAN' };
  board[3][4] = { type: 'JOL', player: 'HAN' };
  board[3][6] = { type: 'JOL', player: 'HAN' };
  board[3][8] = { type: 'JOL', player: 'HAN' };

  // CHO 진영
  board[9][0] = { type: 'CHA', player: 'CHO' };
  board[9][1] = { type: 'MA', player: 'CHO' };
  board[9][2] = { type: 'SANG', player: 'CHO' };
  board[9][3] = { type: 'SA', player: 'CHO' };
  board[8][4] = { type: 'GUNG', player: 'CHO' };
  board[9][5] = { type: 'SA', player: 'CHO' };
  board[9][6] = { type: 'SANG', player: 'CHO' };
  board[9][7] = { type: 'MA', player: 'CHO' };
  board[9][8] = { type: 'CHA', player: 'CHO' };
  board[7][1] = { type: 'PO', player: 'CHO' };
  board[7][7] = { type: 'PO', player: 'CHO' };
  board[6][0] = { type: 'JOL', player: 'CHO' };
  board[6][2] = { type: 'JOL', player: 'CHO' };
  board[6][4] = { type: 'JOL', player: 'CHO' };
  board[6][6] = { type: 'JOL', player: 'CHO' };
  board[6][8] = { type: 'JOL', player: 'CHO' };

  return board;
};

const ChessBoard = ({
  currentTurn: _currentTurn,
  onTurnChange: _onTurnChange,
  onGameEnd: _onGameEnd,
}: ChessBoardProps) => {
  const [pieces, setPieces] = useState<BoardState>(createInitialBoard());
  return (
    <div className="chess-board-wrapper">
      {/* 선을 그리는 레이어 */}
      <div className="chess-lines">
        <svg width="450" height="500">
          {/* 가로선 */}
          {Array.from({ length: POINTS_ROWS }).map((_, row) => (
            <line
              key={`h-${row}`}
              x1="25"
              y1={25 + row * 50}
              x2="425"
              y2={25 + row * 50}
              stroke="#8b4513"
              strokeWidth="2"
            />
          ))}

          {/* 세로선 */}
          {Array.from({ length: POINTS_COLS }).map((_, col) => (
            <g key={`v-${col}`}>
              <line
                x1={25 + col * 50}
                y1="25"
                x2={25 + col * 50}
                y2="475"
                stroke="#8b4513"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* 궁성 대각선 */}
          <line x1="175" y1="25" x2="275" y2="125" stroke="#8b4513" strokeWidth="2" />
          <line x1="275" y1="25" x2="175" y2="125" stroke="#8b4513" strokeWidth="2" />
          <line x1="175" y1="375" x2="275" y2="475" stroke="#8b4513" strokeWidth="2" />
          <line x1="275" y1="375" x2="175" y2="475" stroke="#8b4513" strokeWidth="2" />
        </svg>
      </div>

      {/* 교차점과 기물이 위치하는 레이어 */}
      <div className="chess-board">
        {Array.from({ length: POINTS_ROWS }).map((_, row) =>
          Array.from({ length: POINTS_COLS }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className="intersection"
              data-row={row}
              data-col={col}
              style={{
                position: 'absolute',
                left: `${25 + col * 50}px`,
                top: `${25 + row * 50}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="point"></div>
              {pieces[row][col] && (
                <Piece
                  type={pieces[row][col]!.type}
                  player={pieces[row][col]!.player}
                  onClick={() => console.log(`Clicked piece at ${row}-${col}`)}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
