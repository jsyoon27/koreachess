// src/components/Piece.tsx
import React from 'react';
import './Piece.css';

export type PieceType = 'king' | 'advisor' | 'elephant' | 'horse' | 'rook' | 'cannon' | 'pawn';
export type Player = 'red' | 'green';

interface PieceProps {
  type: PieceType;
  player: Player;
  onClick?: () => void;
}

const pieceSymbols = {
  red: {
    king: '漢',
    advisor: '士',
    elephant: '象',
    horse: '馬',
    rook: '車',
    cannon: '包',
    pawn: '兵'
  },
  green: {
    king: '楚',
    advisor: '士',
    elephant: '象',
    horse: '馬',
    rook: '車',
    cannon: '包',
    pawn: '卒'
  }
};

const Piece: React.FC<PieceProps> = ({ type, player, onClick }) => {
  return (
    <div 
      className={`piece ${player}`}
      onClick={onClick}
    >
      {pieceSymbols[player][type]}
    </div>
  );
};

export default Piece;