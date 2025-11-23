import type { Player, Position, GameBoard } from './types';
import { isChaMoveLegal } from './rules/cha';
import { isSaGungMoveLegal } from './rules/saGung';
import { isJolMoveLegal } from './rules/jol';
import { isMaMoveLegal } from './rules/ma';
import { isSangMoveLegal } from './rules/sang';
import { isPoMoveLegal } from './rules/po';

export class GameEngine {
  private board: GameBoard;
  private currentPlayer: Player;
  private winner: Player | null;

  constructor() {
    this.board = this.createInitialBoard(); // 게임판 초기화
    this.currentPlayer = 'CHO'; // '초'가 항상 선공
    this.winner = null;
  }

  public getGameState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      winner: this.winner,
    };
  }

  public tryMove(from: Position, to: Position): { success: boolean; winner: Player | null } {
    if (this.winner) {
      return { success: false, winner: this.winner };
    }

    if (!this.isMoveLegal(from, to)) {
      return { success: false, winner: this.winner };
    }

    const pieceToMove = this.board[from.y][from.x];
    const targetPiece = this.board[to.y][to.x];
    if (targetPiece) {
      console.log(`${targetPiece.player}의 ${targetPiece.type}을(를) 잡았습니다`);
    }

    this.board[to.y][to.x] = pieceToMove;
    this.board[from.y][from.x] = null;

    if (targetPiece?.type === 'GUNG' && pieceToMove) {
      this.winner = pieceToMove.player;
      return { success: true, winner: this.winner };
    }

    this.switchTurn();
    return { success: true, winner: this.winner };
  }

  public getLegalMoves(from: Position): Position[] {
    const piece = this.board[from.y][from.x];
    if (!piece || piece.player !== this.currentPlayer || this.winner) {
      return [];
    }

    const moves: Position[] = [];
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        if (this.isMoveLegal(from, { y, x })) {
          moves.push({ y, x });
        }
      }
    }
    return moves;
  }

  private switchTurn() {
    this.currentPlayer = this.currentPlayer === 'CHO' ? 'HAN' : 'CHO';
    console.log(`이제 ${this.currentPlayer}의 턴입니다.`);
  }

  private isMoveLegal(from: Position, to: Position): boolean {
    if (this.winner) {
      return false;
    }

    const piece = this.board[from.y][from.x];
    if (!piece) {
      return false;
    }

    if (piece.player !== this.currentPlayer) {
      return false;
    }

    const targetPiece = this.board[to.y][to.x];
    if (targetPiece && targetPiece.player === this.currentPlayer) {
      return false;
    }

    switch (piece.type) {
      case 'JOL':
        return isJolMoveLegal(this.board, from, to, piece.player);
      case 'CHA':
        return isChaMoveLegal(this.board, from, to);
      case 'MA':
        return isMaMoveLegal(this.board, from, to);
      case 'SANG':
        return isSangMoveLegal(this.board, from, to);
      case 'PO':
        return isPoMoveLegal(this.board, from, to);
      case 'SA':
      case 'GUNG':
        return isSaGungMoveLegal(this.board, from, to, piece.player);
    }
    return false;
  }

  private createInitialBoard(): GameBoard {
    const board: GameBoard = Array(10)
      .fill(null)
      .map(() => Array(9).fill(null));

    // HAN 진영
    board[0][0] = { type: 'CHA', player: 'HAN' };
    board[0][1] = { type: 'MA', player: 'HAN' };
    board[0][2] = { type: 'SANG', player: 'HAN' };
    board[0][3] = { type: 'SA', player: 'HAN' };
    board[1][4] = { type: 'GUNG', player: 'HAN' };
    board[0][5] = { type: 'SA', player: 'HAN' };
    board[0][6] = { type: 'SANG', player: 'HAN' };
    board[0][7] = { type: 'MA', player: 'HAN' };
    board[0][8] = { type: 'CHA', player: 'HAN' };
    board[2][1] = { type: 'PO', player: 'HAN' };
    board[2][7] = { type: 'PO', player: 'HAN' };
    board[3][0] = { type: 'JOL', player: 'HAN' };
    board[3][2] = { type: 'JOL', player: 'HAN' };
    board[3][4] = { type: 'JOL', player: 'HAN' };
    board[3][6] = { type: 'JOL', player: 'HAN' };
    board[3][8] = { type: 'JOL', player: 'HAN' };

    // CHO 진영
    board[9][0] = { type: 'CHA', player: 'CHO' };
    board[9][1] = { type: 'MA', player: 'CHO' };
    board[9][2] = { type: 'SANG', player: 'CHO' };
    board[9][3] = { type: 'SA', player: 'CHO' };
    board[8][4] = { type: 'GUNG', player: 'CHO' };
    board[9][5] = { type: 'SA', player: 'CHO' };
    board[9][6] = { type: 'SANG', player: 'CHO' };
    board[9][7] = { type: 'MA', player: 'CHO' };
    board[9][8] = { type: 'CHA', player: 'CHO' };
    board[7][1] = { type: 'PO', player: 'CHO' };
    board[7][7] = { type: 'PO', player: 'CHO' };
    board[6][0] = { type: 'JOL', player: 'CHO' };
    board[6][2] = { type: 'JOL', player: 'CHO' };
    board[6][4] = { type: 'JOL', player: 'CHO' };
    board[6][6] = { type: 'JOL', player: 'CHO' };
    board[6][8] = { type: 'JOL', player: 'CHO' };

    return board;
  }
}
