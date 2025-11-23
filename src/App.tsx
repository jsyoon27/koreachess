import { useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import Title from './components/Title';
import GameStatus from './components/GameStatus';
import GameResult from './components/GameResult';
import Description from './components/Description';

function App() {
  const [currentTurn, setCurrentTurn] = useState<'HAN' | 'CHO'>('HAN');
  const [gameKey, setGameKey] = useState(0);
  const [winner, setWinner] = useState<'HAN' | 'CHO' | null>(null);

  const handleNewGame = () => {
    setCurrentTurn('HAN');
    setWinner(null);
    setGameKey((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <Title />
        <GameStatus currentPlayer={currentTurn} onNewGame={handleNewGame} />
        <GameResult winner={winner} />

        <ChessBoard
          key={gameKey}
          currentTurn={currentTurn}
          onTurnChange={setCurrentTurn}
          onGameEnd={setWinner}
        />

        <Description />
      </div>
    </>
  );
}

export default App;
