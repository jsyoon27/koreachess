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
        <div className="flex justify-center items-center min-h-screen bg-green-200">
          <ChessBoard />
        </div>
        <div>Description</div>
      </div>
    </>
  );
}

export default App;
