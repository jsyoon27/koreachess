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

type BoardState = { [key: string]: PiecePosition };

const initialBoard: BoardState = {
  '0-0': { type: 'rook', player: 'blue' },
  '0-1': { type: 'horse', player: 'blue' },
  '0-2': { type: 'elephant', player: 'blue' },
  '0-3': { type: 'advisor', player: 'blue' },
  '1-4': { type: 'king', player: 'blue' },
  '0-5': { type: 'advisor', player: 'blue' },
  '0-6': { type: 'elephant', player: 'blue' },
  '0-7': { type: 'horse', player: 'blue' },
  '0-8': { type: 'rook', player: 'blue' },
  '2-1': { type: 'cannon', player: 'blue' },
  '2-7': { type: 'cannon', player: 'blue' },
  '3-0': { type: 'pawn', player: 'blue' },
  '3-2': { type: 'pawn', player: 'blue' },
  '3-4': { type: 'pawn', player: 'blue' },
  '3-6': { type: 'pawn', player: 'blue' },
  '3-8': { type: 'pawn', player: 'blue' },

  '9-0': { type: 'rook', player: 'red' },
  '9-1': { type: 'horse', player: 'red' },
  '9-2': { type: 'elephant', player: 'red' },
  '9-3': { type: 'advisor', player: 'red' },
  '8-4': { type: 'king', player: 'red' },
  '9-5': { type: 'advisor', player: 'red' },
  '9-6': { type: 'elephant', player: 'red' },
  '9-7': { type: 'horse', player: 'red' },
  '9-8': { type: 'rook', player: 'red' },
  '7-1': { type: 'cannon', player: 'red' },
  '7-7': { type: 'cannon', player: 'red' },
  '6-0': { type: 'pawn', player: 'red' },
  '6-2': { type: 'pawn', player: 'red' },
  '6-4': { type: 'pawn', player: 'red' },
  '6-6': { type: 'pawn', player: 'red' },
  '6-8': { type: 'pawn', player: 'red' },
};

const ChessBoard = () => {
  const [pieces, setPieces] = useState<BoardState>(initialBoard);
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
              {pieces[`${row}-${col}`] && (
                <Piece
                  type={pieces[`${row}-${col}`].type}
                  player={pieces[`${row}-${col}`].player}
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
