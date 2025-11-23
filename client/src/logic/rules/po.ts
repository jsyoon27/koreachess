import type { GameBoard, Position } from '../types';

// 포 이동 규칙:
// - 직선(가로/세로)만 이동
// - 항상 정확히 하나의 발판(넘는 말)이 있어야 함
// - 발판이 포이면 불가능
// - 목표가 비었으면 이동, 목표가 상대 말이면 공격
// - 포는 포를 취할 수 없음
export function isPoMoveLegal(board: GameBoard, from: Position, to: Position): boolean {
  // 직선이 아니면 불가
  const isStraight = from.y === to.y || from.x === to.x;
  if (!isStraight) return false;

  const targetPiece = board[to.y][to.x];

  // 포는 포를 취할 수 없음
  if (targetPiece?.type === 'PO') return false;

  if (from.y === to.y) {
    const step = from.x < to.x ? 1 : -1;
    let obstacleCount = 0;
    for (let x = from.x + step; x !== to.x; x += step) {
      const obstacle = board[from.y][x];
      if (obstacle !== null) {
        // 발판이 포면 불가
        if (obstacle.type === 'PO') return false;
        obstacleCount++;
      }
    }

    if (obstacleCount !== 1) return false; // 정확히 하나의 발판

    // 목표가 비어있거나(이동) 상대 말이면(공격) 허용
    return targetPiece === null || targetPiece.player !== board[from.y][from.x]?.player;
  }

  // 세로 이동
  const step = from.y < to.y ? 1 : -1;
  let obstacleCount = 0;
  for (let y = from.y + step; y !== to.y; y += step) {
    const obstacle = board[y][from.x];
    if (obstacle !== null) {
      if (obstacle.type === 'PO') return false;
      obstacleCount++;
    }
  }

  if (obstacleCount !== 1) return false;

  return targetPiece === null || targetPiece.player !== board[from.y][from.x]?.player;
}
