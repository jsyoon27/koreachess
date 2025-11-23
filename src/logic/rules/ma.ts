//대각선궁성도 추가해야됨
import type { GameBoard, Position } from '../types';

export function isMaMoveLegal(board: GameBoard, from: Position, to: Position): boolean {
    // 목적지 배열 정의
    const destinations = [
        { y: from.y - 2, x: from.x - 1, block: { y: from.y - 1, x: from.x } },
        { y: from.y - 2, x: from.x + 1, block: { y: from.y - 1, x: from.x } },
        { y: from.y + 2, x: from.x - 1, block: { y: from.y + 1, x: from.x } },
        { y: from.y + 2, x: from.x + 1, block: { y: from.y + 1, x: from.x } },
        { y: from.y - 1, x: from.x - 2, block: { y: from.y, x: from.x - 1 } },
        { y: from.y - 1, x: from.x + 2, block: { y: from.y, x: from.x + 1 } },
        { y: from.y + 1, x: from.x - 2, block: { y: from.y, x: from.x - 1 } },
        { y: from.y + 1, x: from.x + 2, block: { y: from.y, x: from.x + 1 } },
    ];

    // 목적지 확인
    for (const destination of destinations) {
        if (to.y === destination.y && to.x === destination.x) {
            // 직진 경로에 장애물이 있는지 확인
            const block = board[destination.block.y]?.[destination.block.x];
            if (block !== null) {
                console.error(`경로(${destination.block.y}, ${destination.block.x})가 막혀서 이동 불가`);
                return false; // 경로가 막혀있음
            }
            // 경로가 비어있으면 이동 가능
            return true;
        }
    }

    // 목적지가 아니면 실패
    return false;
}