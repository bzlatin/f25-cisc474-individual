import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
<<<<<<< HEAD

@Module({
  providers: [SubmissionsService],
  controllers: [SubmissionsController],
=======
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SubmissionsController],
  providers: [SubmissionsService, PrismaService],
>>>>>>> upstream/main
})
export class SubmissionsModule {}
