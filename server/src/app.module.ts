// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root', // ★ 본인의 MySQL 아이디 (보통 root)
      password: 'root', // ★ 본인의 MySQL 비밀번호로 꼭 바꾸세요!!
      database: 'janggi_db', // 아까 만든 DB 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 테이블 자동 생성 옵션 (개발용)
    }),
    GameModule,
  ],
})
export class AppModule {}