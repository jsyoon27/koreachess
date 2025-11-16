import { useState } from 'react';
import './App.css';
import ChessBoard from './componets/ChessBoard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div>title</div>
        <div>status</div>
        <div className="flex justify-center items-center min-h-screen bg-green-200">
          <ChessBoard />
        </div>
        <div>description</div>
      </div>
    </>
  );
}

export default App;
