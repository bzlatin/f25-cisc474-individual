import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
<<<<<<< HEAD

@Module({
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
=======
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService, PrismaService],
>>>>>>> upstream/main
})
export class AssignmentsModule {}
