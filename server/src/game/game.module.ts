// server/src/game/game.module.ts
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game])], // ★ 이 줄 필수!
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}