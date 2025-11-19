import { useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import Title from './components/Title';
import GameStatus from './components/GameStatus';
import GameResult from './components/GameResult';
import Description from './components/Description';

function App() {
  const [currentTurn, setCurrentTurn] = useState<'한' | '초'>('한');
  const [gameKey, setGameKey] = useState(0);
  const [winner, setWinner] = useState<'한' | '초' | null>(null);

  const handleNewGame = () => {
    setCurrentTurn('초');
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
