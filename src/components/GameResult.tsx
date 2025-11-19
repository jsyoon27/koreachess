import React from 'react';
import './GameResult.css';

interface GameResultProps {
  winner: '한' | '초' | null;
}

const GameResult: React.FC<GameResultProps> = ({ winner }) => {
  if (!winner) return null;

  return (
    <div className="game-result">
      <div className="winner-message">
        {winner} 승리!
      </div>
    </div>
  );
};

export default GameResult;