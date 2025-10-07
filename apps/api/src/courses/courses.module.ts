import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
<<<<<<< HEAD

@Module({
  providers: [CoursesService],
  controllers: [CoursesController],
=======
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
>>>>>>> upstream/main
})
export class CoursesModule {}
