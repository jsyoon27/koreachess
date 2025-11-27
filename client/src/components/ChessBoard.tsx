import { useState } from 'react';
import './ChessBoard.css';
import Piece from './Piece';
import type { GameBoard, Player, Position } from '../logic/types';
import { GameEngine } from '../logic/gameEngine';

const POINTS_ROWS = 10;
const POINTS_COLS = 9;

type ChessBoardProps = {
  engine: GameEngine;
  board: GameBoard;
  currentPlayer: Player;
  winner: Player | null;
  onMove: (from: Position, to: Position) => boolean;
};

const ChessBoard = ({ engine, board, currentPlayer, winner, onMove }: ChessBoardProps) => {
  const [selectedFrom, setSelectedFrom] = useState<Position | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  const handleIntersectionClick = (pos: Position) => {
    if (winner) return;

    const cellPiece = board[pos.y][pos.x];

    // 첫 클릭: 현재 턴 기물 선택
    if (!selectedFrom) {
      if (cellPiece && cellPiece.player === currentPlayer) {
        setSelectedFrom(pos);
        setPossibleMoves(engine.getLegalMoves(pos));
      }
      return;
    }

    // 같은 칸 다시 클릭 -> 선택 해제
    if (selectedFrom.x === pos.x && selectedFrom.y === pos.y) {
      setSelectedFrom(null);
      setPossibleMoves([]);
      return;
    }

    // 이동 시도
    const moved = onMove(selectedFrom, pos);
    setSelectedFrom(null);
    setPossibleMoves([]);

    // 이동 실패 + 현재 턴 기물 -> 새로 선택
    if (!moved && cellPiece && cellPiece.player === currentPlayer) {
      setSelectedFrom(pos);
      setPossibleMoves(engine.getLegalMoves(pos));
    }
  };

  const getPointClass = (row: number, col: number) => {
    const isSelected = selectedFrom && selectedFrom.y === row && selectedFrom.x === col;
    const isPossible = possibleMoves.some((p) => p.y === row && p.x === col);
    const target = board[row][col];
    const isAttack = isPossible && target !== null;

    if (isAttack) return 'point attack-move';
    if (isPossible) return 'point possible-move';
    if (isSelected) return 'point selected';
    return 'point';
  };

  return (
    <div className="chess-board-wrapper">
      <div className="chess-lines">
        <svg width="450" height="500">
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

          <line x1="175" y1="25" x2="275" y2="125" stroke="#8b4513" strokeWidth="2" />
          <line x1="275" y1="25" x2="175" y2="125" stroke="#8b4513" strokeWidth="2" />
          <line x1="175" y1="375" x2="275" y2="475" stroke="#8b4513" strokeWidth="2" />
          <line x1="275" y1="375" x2="175" y2="475" stroke="#8b4513" strokeWidth="2" />
        </svg>
      </div>

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
              onClick={() => handleIntersectionClick({ y: row, x: col })}
            >
              <div className={getPointClass(row, col)}></div>
              {board[row][col] && (
                <Piece type={board[row][col]!.type} player={board[row][col]!.player} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
