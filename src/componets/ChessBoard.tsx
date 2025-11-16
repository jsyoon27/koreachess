// src/components/ChessBoard.tsx
import React from 'react';
import './ChessBoard.css';

const POINTS_ROWS = 10;
const POINTS_COLS = 9;

const ChessBoard = () => {
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
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
