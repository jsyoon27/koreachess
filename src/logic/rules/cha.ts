import type { GameBoard, Position } from '../types';

export function isChaMoveLegal(board: GameBoard, from: Position, to: Position): boolean {
    // 같은 행으로 이동
    if (from.y === to.y) {
        const step = from.x < to.x ? 1 : -1; 
        for (let x = from.x + step; x !== to.x; x += step) {
            if (board[from.y][x] !== null) {
                console.error(`경로(${from.y}, ${x})가 막혀서 이동 불가`);
                return false; 
            }
        }
        return true; 
    }

    // 같은 열로 이동
    if (from.x === to.x) {
        const step = from.y < to.y ? 1 : -1; 
        for (let y = from.y + step; y !== to.y; y += step) {
            if (board[y][from.x] !== null) {
                console.error(`경로(${y}, ${from.x})가 막혀서 이동 불가`);
                return false; 
            }
        }
        return true; 
    }

    // 직선 이동이 아니면 실패
    return false;
}