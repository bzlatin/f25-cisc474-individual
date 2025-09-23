import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.submission.findMany();
  }
  async findOne(id: string) {
    const row = await this.prisma.submission.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Submission ${id} not found`);
    return row;
  }
}
