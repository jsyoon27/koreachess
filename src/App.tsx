import { useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div>Title</div>
        <div>Game Status</div>
        <div>Game Result</div>

        <ChessBoard />

        <div>Description</div>
      </div>
    </>
  );
}

export default App;
