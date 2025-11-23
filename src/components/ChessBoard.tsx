import { useState } from 'react';
import './ChessBoard.css';
import Piece from './Piece';
import { GameEngine } from '../logic/gameEngine';
import type { Position } from '../logic/types';

const POINTS_ROWS = 10;
const POINTS_COLS = 9;

type ChessBoardProps = {
  currentTurn: 'CHO' | 'HAN';
  onTurnChange?: (next: 'CHO' | 'HAN') => void;
  onGameEnd?: (winner: 'CHO' | 'HAN') => void;
};

const ChessBoard = ({ onTurnChange, onGameEnd }: ChessBoardProps) => {
  const [engine] = useState(() => new GameEngine());
  const [gameState, setGameState] = useState(engine.getGameState());
  const [selectedFrom, setSelectedFrom] = useState<Position | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  const handleMove = (from: Position, to: Position) => {
    const result = engine.tryMove(from, to);
    if (!result.success) {
      return false;
    }

    const nextState = engine.getGameState();
    setGameState(nextState);

    if (result.winner) {
      onGameEnd?.(result.winner);
    } else {
      onTurnChange?.(nextState.currentPlayer);
    }
    return true;
  };

  const handleIntersectionClick = (pos: Position) => {
    if (gameState.winner) return;

    const cellPiece = gameState.board[pos.y][pos.x];

    // 첫 클릭: 현재 턴의 기물을 선택하고 이동 가능 칸 표시
    if (!selectedFrom) {
      if (cellPiece && cellPiece.player === gameState.currentPlayer) {
        setSelectedFrom(pos);
        setPossibleMoves(engine.getLegalMoves(pos));
      }
      return;
    }

    // 같은 칸을 다시 누르면 선택 해제
    if (selectedFrom.x === pos.x && selectedFrom.y === pos.y) {
      setSelectedFrom(null);
      setPossibleMoves([]);
      return;
    }

    // 이동 시도
    const moved = handleMove(selectedFrom, pos);
    setSelectedFrom(null);
    setPossibleMoves([]);

    // 이동 실패했고 다른 아군 기물이면 그 기물로 선택 전환
    if (!moved && cellPiece && cellPiece.player === gameState.currentPlayer) {
      setSelectedFrom(pos);
      setPossibleMoves(engine.getLegalMoves(pos));
    }
  };

  const getPointClass = (row: number, col: number) => {
    const isSelected = selectedFrom && selectedFrom.y === row && selectedFrom.x === col;
    const isPossible = possibleMoves.some((p) => p.y === row && p.x === col);
    const target = gameState.board[row][col];
    const isAttack = isPossible && target !== null;

    if (isAttack) return 'point attack-move';
    if (isPossible) return 'point possible-move';
    if (isSelected) return 'point selected';
    return 'point';
  };

  return (
    <div className="chess-board-wrapper">
      {/* 보드 격자 */}
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

      {/* 교차점과 기물 배치 */}
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
              {gameState.board[row][col] && (
                <Piece
                  type={gameState.board[row][col]!.type}
                  player={gameState.board[row][col]!.player}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
