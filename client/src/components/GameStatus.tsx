import React from 'react';
import './GameStatus.css';

type Props = {
  currentPlayer: 'CHO' | 'HAN';
  onNewGame: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
};

const GameStatus: React.FC<Props> = ({ currentPlayer, onNewGame, onUndo, canUndo }) => {
  return (
    <div className="StatusContainer">
      <div className="Status">현재 차례 : {currentPlayer}</div>
      <div className="actions">
        {onUndo && (
          <button className="undo-btn" onClick={onUndo} disabled={!canUndo}>
            무르기
          </button>
        )}
        <button className="reset-btn" onClick={onNewGame}>
          <span>↻</span> 새게임
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
