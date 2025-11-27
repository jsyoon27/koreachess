// server/src/game/game.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  // 기보 저장(Create)
  async create(createGameDto: any) {
    return await this.gameRepository.save(createGameDto);
  }

  // 전체 기보 조회 (Read)
  async findAll() {
    return await this.gameRepository.find();
  }

  // (기보 playerId 필터)
  async findByGameId(gameId: string, playerId?: string) {
    const where: FindOptionsWhere<Game> = { gameId };
    if (playerId) {
      where.playerId = playerId;
    }
    return await this.gameRepository.find({
      where,
      order: { createdAt: 'ASC' },
    });
  }

  // 로그 삭제 (게임 ID 기준, playerId 있으면 해당 플레이어만)
  async deleteByGameId(gameId: string, playerId?: string) {
    const where: FindOptionsWhere<Game> = { gameId };
    if (playerId) {
      where.playerId = playerId;
    }
    return await this.gameRepository.delete(where);
  }
}
