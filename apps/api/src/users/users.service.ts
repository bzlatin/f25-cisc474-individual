import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const row = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!row) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return row;
  }
}
