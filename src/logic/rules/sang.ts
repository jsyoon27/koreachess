import type { GameBoard, Position } from '../types';

export function isSangMoveLegal(board: GameBoard, from: Position, to: Position): boolean {
    // 목적지 배열 정의
    const destinations = [
        { y: from.y - 3, x: from.x + 2, path: [{ y: from.y - 1, x: from.x }, { y: from.y - 2, x: from.x + 1 }] },
        { y: from.y - 3, x: from.x - 2, path: [{ y: from.y - 1, x: from.x }, { y: from.y - 2, x: from.x - 1 }] },
        { y: from.y + 3, x: from.x + 2, path: [{ y: from.y + 1, x: from.x }, { y: from.y + 2, x: from.x + 1 }] },
        { y: from.y + 3, x: from.x - 2, path: [{ y: from.y + 1, x: from.x }, { y: from.y + 2, x: from.x - 1 }] },
        { y: from.y - 2, x: from.x + 3, path: [{ y: from.y, x: from.x + 1 }, { y: from.y - 1, x: from.x + 2 }] },
        { y: from.y - 2, x: from.x - 3, path: [{ y: from.y, x: from.x - 1 }, { y: from.y - 1, x: from.x - 2 }] },
        { y: from.y + 2, x: from.x + 3, path: [{ y: from.y, x: from.x + 1 }, { y: from.y + 1, x: from.x + 2 }] },
        { y: from.y + 2, x: from.x - 3, path: [{ y: from.y, x: from.x - 1 }, { y: from.y + 1, x: from.x - 2 }] },
    ];

    // 목적지 확인
    for (const destination of destinations) {
        if (to.y === destination.y && to.x === destination.x) {
            // 경로 확인
            for (const path of destination.path) {
                if (board[path.y]?.[path.x] !== null) {
                    console.error(`멱(${path.y}, ${path.x})이 막혀서 이동 불가`);
                    return false; // 경로가 막혀있음
                }
            }
            // 경로가 모두 비어있으면 이동 가능
            return true;
        }
    }

    // 목적지가 아니면 실패
    return false;
}