// server/src/game/game.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('games') // 주소: http://localhost:3000/games
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('log') // POST /games/log
  create(@Body() body: any) {
    return this.gameService.create(body);
  }

  @Get(':id/log') // GET /games/1/log
  findOne(@Param('id') id: string) {
    return this.gameService.findByGameId(id);
  }
}