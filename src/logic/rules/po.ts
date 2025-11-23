import type { GameBoard, Position } from '../types';

export function isPoMoveLegal(board: GameBoard, from: Position, to: Position): boolean {
    // 같은 행으로 이동
    if (from.y === to.y) {
        const step = from.x < to.x ? 1 : -1; // 이동 방향
        let obstacleCount = 0;
        for (let x = from.x + step; x !== to.x; x += step) {
            const obstacle = board[from.y][x];
            if (obstacle !== null) {
                // 장애물이 '포'인 경우 이동 불가
                if (obstacle.type === 'PO') {
                    console.error(`경로(${from.y}, ${x})에 포가 있어 이동 불가`);
                    return false;
                }
                obstacleCount++;
            }
        }
        const targetPiece = board[to.y][to.x];
        if (obstacleCount === 1) {
            // 잡기: 목적지에 상대 기물이 있어야 함
            return targetPiece !== null && targetPiece.player !== board[from.y][from.x]?.player;
        }
        if (obstacleCount === 0) {
            // 일반 이동: 목적지에 기물이 없어야 함
            return targetPiece === null;
        }
        return false; // 장애물이 두 개 이상이면 이동 불가
    }

    // 같은 열로 이동
    if (from.x === to.x) {
        const step = from.y < to.y ? 1 : -1; // 이동 방향
        let obstacleCount = 0;
        for (let y = from.y + step; y !== to.y; y += step) {
            const obstacle = board[y][from.x];
            if (obstacle !== null) {
                // 장애물이 '포'인 경우 이동 불가
                if (obstacle.type === 'PO') {
                    console.error(`경로(${y}, ${from.x})에 포가 있어 이동 불가`);
                    return false;
                }
                obstacleCount++;
            }
        }
        const targetPiece = board[to.y][to.x];
        if (obstacleCount === 1) {
            // 잡기: 목적지에 상대 기물이 있어야 함
            return targetPiece !== null && targetPiece.player !== board[from.y][from.x]?.player;
        }
        if (obstacleCount === 0) {
            // 일반 이동: 목적지에 기물이 없어야 함
            return targetPiece === null;
        }
        return false; // 장애물이 두 개 이상이면 이동 불가
    }

    // 직선 이동이 아니면 실패
    return false;
}