import type { GameBoard, Position,Player } from '../types';

export function isSaGungMoveLegal(board: GameBoard, from: Position, to: Position, player: Player): boolean {
        const moveUp = (from.y - 1 === to.y && from.x === to.x); // 위로 한 칸
        const moveDown = (from.y + 1 === to.y && from.x === to.x); // 아래로 한 칸
        const moveLeft = (from.y === to.y && from.x - 1 === to.x); // 왼쪽으로 한 칸
        const moveRight = (from.y === to.y && from.x + 1 === to.x); // 오른쪽으로 한 칸
        const movediagonal1 = (from.y - 1 === to.y && from.x - 1 === to.x);
        const movediagonal2 = (from.y - 1 === to.y && from.x + 1 === to.x);
        const movediagonal3 = (from.y + 1 === to.y && from.x - 1 === to.x);
        const movediagonal4 = (from.y + 1 === to.y && from.x + 1 === to.x);
        
        const isOneSpaceMove = moveUp || moveDown || moveLeft || moveRight ||
                              movediagonal1 || movediagonal2 || movediagonal3 || movediagonal4;

        if (!isOneSpaceMove) {
            return false; 
        }
        const palace = (player === 'HAN')
            ? { yMin: 0, yMax: 2, xMin: 3, xMax: 5 } // '한'
            : { yMin: 7, yMax: 9, xMin: 3, xMax: 5 }; // '초'

        const isOutsidePalace = (
            to.y < palace.yMin || to.y > palace.yMax || to.x < palace.xMin || to.x > palace.xMax
        );

        if (isOutsidePalace) {
            return false; 
        }

        return true;
    }