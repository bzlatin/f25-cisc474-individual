import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
<<<<<<< HEAD
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
=======
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
>>>>>>> upstream/main
})
export class UsersModule {}
