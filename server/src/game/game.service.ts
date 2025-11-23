// server/src/game/game.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity'; // (파일명 확인 필요)

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  // 기보 저장 (Create)
  async create(createGameDto: any) {
    return await this.gameRepository.save(createGameDto);
  }

  // 전체 기보 조회 (Read)
  async findAll() {
    return await this.gameRepository.find();
  }

  // 특정 게임 기보 조회
  async findByGameId(gameId: string) {
    return await this.gameRepository.find({
        where: { gameId },
        order: { createdAt: 'ASC' } // 순서대로
    });
  }
}