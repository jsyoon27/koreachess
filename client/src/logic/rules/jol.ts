import type { GameBoard, Position,Player } from '../types';

export function isJolMoveLegal(board: GameBoard, from: Position, to: Position, player: Player): boolean { 
        const moveUp = (from.y - 1 === to.y && from.x === to.x); // 위로 한 칸
        const moveDown = (from.y + 1 === to.y && from.x === to.x); // 아래로 한 칸
        const moveLeft = (from.y === to.y && from.x - 1 === to.x); // 왼쪽으로 한 칸
        const moveRight = (from.y === to.y && from.x + 1 === to.x); // 오른쪽으로 한 칸
        if (player === 'CHO') {
          return moveUp || moveLeft || moveRight;
        } else {
          return moveDown || moveLeft || moveRight;
        }
    }