// server/src/game/entities/game.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Game {
  // 클래스 이름은 Game 또는 MoveLog 자유입니다
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameId: string; // "game-1" 같은 방 번호

  @Column()
  player: string; // 'CHO' or 'HAN'

  @Column({ nullable: true })
  playerId: string; // 실제 사용자 ID

  @Column()
  pieceType: string; // 'CHA', 'JOL'...

  @Column('json')
  from: { y: number; x: number };

  @Column('json')
  to: { y: number; x: number };

  @CreateDateColumn()
  createdAt: Date; // 언제 뒀는지 시간
}
