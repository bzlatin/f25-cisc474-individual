import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';

@Module({
  providers: [ScoresService],
  controllers: [ScoresController],
})
export class ScoresModule {}
