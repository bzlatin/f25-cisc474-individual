import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.score.findMany();
  }
  async findOne(id: string) {
    const row = await this.prisma.score.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Score ${id} not found`);
    return row;
  }
}
