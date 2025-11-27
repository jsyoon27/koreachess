import { useState } from 'react';
import './App.css';

import ChessBoard from './components/ChessBoard';
import Title from './components/Title';
import GameStatus from './components/GameStatus';
import GameResult from './components/GameResult';
import Description from './components/Description';
import PlayerModal from './components/PlayerModal';

import { GameEngine, type GameSnapshot } from './logic/gameEngine';
import type { Position, Player } from './logic/types';

const API_URL = 'http://localhost:3000/games';
const GAME_ID = 'game-1';

type PlayerNames = { CHO: string; HAN: string };

function App() {
  const [engine, setEngine] = useState(() => new GameEngine());
  const [gameState, setGameState] = useState(engine.getGameState());
  const [winner, setWinner] = useState<Player | null>(null);
  const [playerIds, setPlayerIds] = useState<PlayerNames>({ CHO: 'cho-user', HAN: 'han-user' });
  const [showPlayerModal, setShowPlayerModal] = useState(true);
  const [history, setHistory] = useState<GameSnapshot[]>([]);

  const sendMoveLog = async (piece: any, from: Position, to: Position) => {
    try {
      const response = await fetch(`${API_URL}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: GAME_ID,
          player: piece.player,
          playerId: playerIds[piece.player],
          pieceType: piece.type,
          from,
          to,
        }),
      });

      if (!response.ok) {
        console.error('서버 로그 전송 실패:', response.status);
      }
    } catch (error) {
      console.error('서버 연결 에러:', error);
    }
  };

  const loadHistory = async (player?: Player) => {
    const query = player ? `?playerId=${playerIds[player]}` : '';
    try {
      const res = await fetch(`${API_URL}/${GAME_ID}/log${query}`);
      const logs = await res.json();
      console.log('서버 기보:', logs);
      alert(`${player ? player + ' player' : 'all players'}: ${logs.length} logs (see console)`);
    } catch (e) {
      console.error('기보 불러오기 실패', e);
    }
  };

  const handleMoveAttempt = (from: Position, to: Position) => {
    if (winner) return false;

    const movingPiece = engine.getGameState().board[from.y][from.x];
    const snapshot = engine.getSnapshot();
    const { success, winner: newWinner } = engine.tryMove(from, to);

    if (success && movingPiece) {
      setHistory((prev) => [...prev, snapshot]);
      const newState = engine.getGameState();
      setGameState({ ...newState });
      if (newWinner) setWinner(newWinner);
      sendMoveLog(movingPiece, from, to);
      return true;
    }

    alert('규칙에 맞지 않는 이동입니다');
    return false;
  };

  const handleStartGame = (names: PlayerNames) => {
    setPlayerIds(names);
    const newEngine = new GameEngine();
    setEngine(newEngine);
    setGameState(newEngine.getGameState());
    setWinner(null);
    setHistory([]);
    setShowPlayerModal(false);
    console.log('새 게임을 시작했습니다');
  };

  const handleOpenPlayerModal = () => {
    setShowPlayerModal(true);
  };

  const handleClosePlayerModal = () => {
    setShowPlayerModal(false);
  };

  const handleUndo = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    engine.restoreSnapshot(prev);
    const restored = engine.getGameState();
    setGameState({ ...restored });
    setWinner(prev.winner);
    setHistory(history.slice(0, -1));
  };

  return (
    <div className="app-container">
      <Title />

      <GameStatus
        currentPlayer={gameState.currentPlayer}
        onNewGame={handleOpenPlayerModal}
        onUndo={handleUndo}
        canUndo={history.length > 0}
      />

      <GameResult winner={winner} />

      <ChessBoard
        engine={engine}
        board={gameState.board}
        currentPlayer={gameState.currentPlayer}
        winner={winner}
        onMove={handleMoveAttempt}
      />

      <Description />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => loadHistory('CHO')} style={{ padding: '10px 12px' }}>
          초(ID {playerIds.CHO}) 로그
        </button>
        <button onClick={() => loadHistory('HAN')} style={{ padding: '10px 12px', marginLeft: 8 }}>
          한(ID {playerIds.HAN}) 로그
        </button>
        <button onClick={() => loadHistory()} style={{ padding: '10px 12px', marginLeft: 8 }}>
          전체 로그
        </button>
      </div>

      <PlayerModal
        isOpen={showPlayerModal}
        initialNames={playerIds}
        onConfirm={handleStartGame}
        onClose={handleClosePlayerModal}
      />
    </div>
  );
}

export default App;
