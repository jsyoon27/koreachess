// src/components/Piece.tsx
import React from 'react';
import './Piece.css';

export type PieceType = 'GUNG' | 'SA' | 'SANG' | 'MA' | 'CHA' | 'PO' | 'JOL';
export type Player = 'CHO' | 'HAN';
export type PieceType = 'GUNG' | 'SA' | 'SANG' | 'MA' | 'CHA' | 'PO' | 'JOL';
export type Player = 'CHO' | 'HAN';

interface PieceProps {
  type: PieceType;
  player: Player;
  onClick?: () => void;
}

const pieceSymbols = {
  HAN: {
    GUNG: '漢',
    SA: '士',
    SANG: '象',
    MA: '馬',
    CHA: '車',
    PO: '包',
    JOL: '兵',
  },
  CHO: {
    GUNG: '楚',
    SA: '士',
    SANG: '象',
    MA: '馬',
    CHA: '車',
    PO: '包',
    JOL: '卒',
  },
};

const Piece: React.FC<PieceProps> = ({ type, player, onClick }) => {
  return (
    <div className={`piece ${player}`} onClick={onClick}>
    <div className={`piece ${player}`} onClick={onClick}>
      {pieceSymbols[player][type]}
    </div>
  );
};

export default Piece;
