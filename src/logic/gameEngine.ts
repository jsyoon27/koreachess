// src/logic/gameEngine.ts

import type { Player, Piece, Position, GameBoard, PieceType } from './types';

/**
 * GameEngine (심판) 클래스
 * - React의 존재를 전혀 모릅니다.
 * - 오직 장기 규칙과 게임 상태만 관리합니다.
 */
export class GameEngine {
  private board: GameBoard;
  private currentPlayer: Player;

  constructor() {
    this.board = this.initializeBoard(); // 게임판 초기화
    this.currentPlayer = 'HAN'; // 'HAN'이 항상 선공
  }

  /**
   * (1) 외부(React)에서 현재 게임 상태를 가져갈 수 있도록 제공하는 함수
   */
  public getGameState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
    };
  }

  /**
   * (2) 외부(React)에서 "수"를 시도하는 함수
   * @param from 시작 위치
   * @param to   도착 위치
   * @returns {boolean} 이동 성공 여부
   */
  public tryMove(from: Position, to: Position): boolean {
    // 1. 이 이동이 규칙에 맞는지 검증합니다. (가장 중요)
    if (!this.isMoveLegal(from, to)) {
      console.error('규칙에 맞지 않는 수입니다.');
      return false; // 실패
    }

    // 2. 규칙에 맞다면, 실제 기물을 이동시킵니다.
    const pieceToMove = this.board[from.y][from.x];

    // 2a. (잡기) 도착 위치에 상대 기물이 있다면 잡습니다. (지금은 그냥 덮어씀)
    const targetPiece = this.board[to.y][to.x];
    if (targetPiece) {
      console.log(`${targetPiece.player}의 ${targetPiece.type}을(를) 잡았습니다.`);
    }

    // 2b. (이동)
    this.board[to.y][to.x] = pieceToMove;
    this.board[from.y][from.x] = null; // 원래 있던 자리는 비웁니다.

    // 3. (향후) '장군'이나 '외통수'인지 확인합니다.
    // ...

    // 4. 턴을 상대방에게 넘깁니다.
    this.switchTurn();
    return true; // 성공
  }

  /**
   * (3) [내부함수] 턴을 넘깁니다.
   */
  private switchTurn() {
    this.currentPlayer = this.currentPlayer === 'CHO' ? 'HAN' : 'CHO';
    console.log(`이제 ${this.currentPlayer}의 턴입니다.`);
  }

  /**
   * (4) [내부함수] 이 게임의 "핵심" 로직
   * 이 이동이 장기 규칙상 유효한지 검사합니다.
   *
   * @param from 시작 위치
   * @param to   도착 위치
   * @returns {boolean} 이동 가능 여부
   */
  private isMoveLegal(from: Position, to: Position): boolean {
    const piece = this.board[from.y][from.x];

    // --- 1. 기본 중의 기본 검증 ---
    // a. 움직일 기물이 있나?
    if (!piece) {
      console.error('(규칙 위반) 빈 칸을 선택했습니다.');
      return false;
    }

    // b. 현재 턴의 플레이어 기물이 맞나?
    if (piece.player !== this.currentPlayer) {
      console.error(`(규칙 위반) 지금은 ${this.currentPlayer}의 턴입니다.`);
      return false;
    }

    // c. 도착 지점에 내 기물이 있나? (내 기물은 잡을 수 없음)
    const targetPiece = this.board[to.y][to.x];
    if (targetPiece && targetPiece.player === this.currentPlayer) {
      console.error('(규칙 위반) 자신의 기물은 잡을 수 없습니다.');
      return false;
    }

    // --- 2. 기물별 "행마" (이동 규칙) 검증 ---
    // (!!!)
    // 여기가 이 프로젝트에서 가장 복잡하고 핵심적인 부분입니다.
    // 우선 '졸'의 움직임만 간단히 구현해봅니다.
    //
    // TODO: 모든 기물의 이동 규칙 (멱, 궁성, ... )을 여기에 구현해야 합니다.
    //
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);

    switch (piece.type) {
      case 'JOL':
        const direction = piece.player === 'CHO' ? -1 : 1;
        return dy === direction && dx === 0;

      case 'CHA':
        return (dx === 0 || dy === 0) && this.isPathClear(from, to);

      case 'MA':
        return (
          ((adx === 1 && ady === 2) || (adx === 2 && ady === 1)) &&
          this.board[from.y + (ady === 2 ? (dy > 0 ? 1 : -1) : 0)][
            from.x + (adx === 2 ? (dx > 0 ? 1 : -1) : 0)
          ] === null
        );

      case 'SANG':
        return (
          adx === 3 &&
          ady === 2 &&
          this.board[from.y + (dy > 0 ? 1 : -1)][from.x + (dx > 0 ? 1 : -1)] === null &&
          this.board[from.y + (dy > 0 ? 1 : -1)][from.x + (dx > 0 ? 2 : -2)] === null
        );

      case 'PO':
        return (
          (dx === 0 || dy === 0) &&
          this.countPiecesInPath(from, to) === 1 &&
          this.board[to.y][to.x] !== null
        );

      case 'SA':
        return (
          this.isInPalace(to) &&
          ((adx === 1 && ady === 1) || (from.x === 4 && to.x === 4 && ady === 1))
        );

      case 'GUNG':
        return this.isInPalace(to) && adx <= 1 && ady <= 1 && adx + ady > 0;

      default:
        return false;
    }
  }

  private isPathClear(from: Position, to: Position): boolean {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

    let x = from.x + stepX;
    let y = from.y + stepY;

    while (x !== to.x || y !== to.y) {
      if (this.board[y][x] !== null) return false;
      x += stepX;
      y += stepY;
    }
    return true;
  }

  private countPiecesInPath(from: Position, to: Position): number {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

    let count = 0;
    let x = from.x + stepX;
    let y = from.y + stepY;

    while (x !== to.x || y !== to.y) {
      if (this.board[y][x] !== null) count++;
      x += stepX;
      y += stepY;
    }
    return count;
  }

  private isInPalace(pos: Position): boolean {
    return pos.x >= 3 && pos.x <= 5 && ((pos.y >= 0 && pos.y <= 2) || (pos.y >= 7 && pos.y <= 9));
  }

  /**
   * (5) [내부함수] 게임 시작 시 장기판을 초기 상태로 설정합니다.
   * (장기판 좌표: 0,0이 왼쪽 위, 9,8이 오른쪽 아래)
   */
  private initializeBoard(): GameBoard {
    // 10행 9열의 빈 보드를 생성합니다.
    const board: GameBoard = Array(10)
      .fill(null)
      .map(() => Array(9).fill(null));

    // 기물 생성을 위한 헬퍼 함수
    const P = (player: Player, type: PieceType): Piece => ({ player, type });

    // --- 'HAN' (Red) 기물 배치 (상단) ---
    board[0][0] = P('HAN', 'CHA');
    board[0][1] = P('HAN', 'MA');
    board[0][2] = P('HAN', 'SANG');
    board[0][3] = P('HAN', 'SA');
    board[0][4] = P('HAN', 'GUNG'); // 궁
    board[0][5] = P('HAN', 'SA');
    board[0][6] = P('HAN', 'SANG');
    board[0][7] = P('HAN', 'MA');
    board[0][8] = P('HAN', 'CHA');

    board[2][1] = P('HAN', 'PO'); // 포
    board[2][7] = P('HAN', 'PO');

    board[3][0] = P('HAN', 'JOL');
    board[3][2] = P('HAN', 'JOL');
    board[3][4] = P('HAN', 'JOL');
    board[3][6] = P('HAN', 'JOL');
    board[3][8] = P('HAN', 'JOL');

    // --- 'CHO' (Green) 기물 배치 (하단) ---
    board[9][0] = P('CHO', 'CHA');
    board[9][1] = P('CHO', 'MA');
    board[9][2] = P('CHO', 'SANG');
    board[9][3] = P('CHO', 'SA');
    board[9][4] = P('CHO', 'GUNG'); // 궁
    board[9][5] = P('CHO', 'SA');
    board[9][6] = P('CHO', 'SANG');
    board[9][7] = P('CHO', 'MA');
    board[9][8] = P('CHO', 'CHA');

    board[7][1] = P('CHO', 'PO'); // 포
    board[7][7] = P('CHO', 'PO');

    board[6][0] = P('CHO', 'JOL');
    board[6][2] = P('CHO', 'JOL');
    board[6][4] = P('CHO', 'JOL');
    board[6][6] = P('CHO', 'JOL');
    board[6][8] = P('CHO', 'JOL');

    return board;
  }
}
