import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.assignment.findMany();
  }
  async findOne(id: string) {
    const row = await this.prisma.assignment.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Assignment ${id} not found`);
    return row;
  }
}
