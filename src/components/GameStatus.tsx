import React, { useState } from 'react';
import './GameStatus.css';

type Props = {
  currentPlayer: '한' | '초';
  onNewGame: () => void;
};

const GameStatus: React.FC<Props> = ({ currentPlayer, onNewGame }) => {
  return (
    <div className="StatusContainer">
      <div className="Status">현재 차례 : {currentPlayer}</div>
      <div className="newGame">
        <button className="reset-btn" onClick={onNewGame}>
          <span>⟲</span>새 게임
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
